import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import type { Request, Response, NextFunction } from 'express';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const SESSION_COOKIE_NAME = 'gh_session';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const OAUTH_STATE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const SESSION_SIGNING_KEY = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');

interface GitHubUser {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  public_repos: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  followers: number;
  following: number;
}

interface SessionRecord {
  id: string;
  accessToken: string;
  scope: string;
  user: GitHubUser;
  createdAt: number;
  expiresAt: number;
}

interface PendingStateRecord {
  createdAt: number;
  expiresAt: number;
}

const sessions = new Map<string, SessionRecord>();
const pendingStates = new Map<string, PendingStateRecord>();

// Periodic cleanup of expired OAuth states and sessions
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of pendingStates.entries()) {
    if (entry.expiresAt <= now) pendingStates.delete(key);
  }
  for (const [key, session] of sessions.entries()) {
    if (session.expiresAt <= now) sessions.delete(key);
  }
}, 60_000).unref();

function getAppUrl(): string {
  const raw = process.env.APP_URL || `http://localhost:${PORT}`;
  return raw.replace(/\/+$/, '');
}

function getCallbackUrl(): string {
  return `${getAppUrl()}/auth/callback`;
}

function getOAuthCredentials(): { clientId: string; clientSecret: string } | null {
  const clientId = (process.env.GITHUB_CLIENT_ID || process.env.CLIENT_ID || '').trim();
  const clientSecret = (process.env.GITHUB_CLIENT_SECRET || process.env.CLIENT_SECRET || '').trim();
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

function signSessionId(sessionId: string): string {
  const signature = crypto
    .createHmac('sha256', SESSION_SIGNING_KEY)
    .update(sessionId)
    .digest('base64url');
  return `${sessionId}.${signature}`;
}

function verifySignedSessionToken(token: string): string | null {
  const dotIndex = token.indexOf('.');
  if (dotIndex <= 0) return null;
  const sessionId = token.slice(0, dotIndex);
  const providedSig = token.slice(dotIndex + 1);
  if (!sessionId || !providedSig) return null;

  const expectedSig = crypto
    .createHmac('sha256', SESSION_SIGNING_KEY)
    .update(sessionId)
    .digest('base64url');

  const a = Buffer.from(providedSig, 'utf8');
  const b = Buffer.from(expectedSig, 'utf8');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return null;
  }
  return sessionId;
}

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  const result: Record<string, string> = {};
  if (!cookieHeader) return result;
  for (const part of cookieHeader.split(';')) {
    const eqIndex = part.indexOf('=');
    if (eqIndex <= 0) continue;
    const key = part.slice(0, eqIndex).trim();
    const val = part.slice(eqIndex + 1).trim();
    try {
      result[key] = decodeURIComponent(val);
    } catch {
      result[key] = val;
    }
  }
  return result;
}

function resolveSession(req: Request): SessionRecord | null {
  let token: string | null = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.slice(7).trim();
  }
  if (!token) {
    const cookies = parseCookies(req.headers.cookie);
    token = cookies[SESSION_COOKIE_NAME] || null;
  }
  if (!token) return null;

  const sessionId = verifySignedSessionToken(token);
  if (!sessionId) return null;

  const record = sessions.get(sessionId);
  if (!record) return null;
  if (record.expiresAt <= Date.now()) {
    sessions.delete(sessionId);
    return null;
  }
  return record;
}

function setSessionCookie(res: Response, signedToken: string): void {
  const maxAgeSeconds = Math.floor(SESSION_TTL_MS / 1000);
  const cookieValue = `${SESSION_COOKIE_NAME}=${encodeURIComponent(signedToken)}; Max-Age=${maxAgeSeconds}; Path=/; HttpOnly; Secure; SameSite=None; Partitioned`;
  res.setHeader('Set-Cookie', cookieValue);
}

function clearSessionCookie(res: Response): void {
  res.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE_NAME}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=None; Partitioned`
  );
}

function isValidSlug(value: string): boolean {
  return /^[a-zA-Z0-9._-]{1,100}$/.test(value) && value !== '.' && value !== '..';
}

function isValidUsername(value: string): boolean {
  return /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(value);
}

function sanitizeRepoPath(rawPath: string): string | null {
  const trimmed = rawPath.replace(/^\/+|\/+$/g, '');
  if (!trimmed) return '';
  const segments = trimmed.split('/');
  for (const seg of segments) {
    if (!seg || seg === '.' || seg === '..' || /[\x00-\x1f\\]/.test(seg)) {
      return null;
    }
  }
  return segments.map((s) => encodeURIComponent(s)).join('/');
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function githubFetch(
  endpoint: string,
  accessToken?: string,
  options: RequestInit = {}
): Promise<globalThis.Response> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'GitHub-Connect-Workspace/1.0',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(options.headers as Record<string, string> | undefined),
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  return fetch(`https://api.github.com${endpoint}`, {
    ...options,
    headers,
  });
}

function extractRateLimit(response: globalThis.Response) {
  const limit = response.headers.get('x-ratelimit-limit');
  const remaining = response.headers.get('x-ratelimit-remaining');
  const reset = response.headers.get('x-ratelimit-reset');
  if (!limit || !remaining) return null;
  return {
    limit: Number(limit),
    remaining: Number(remaining),
    resetAt: reset ? Number(reset) * 1000 : null,
  };
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const session = resolveSession(req);
  if (!session) {
    res.status(401).json({ error: 'Authentication required. Connect your GitHub account first.' });
    return;
  }
  (req as Request & { session: SessionRecord }).session = session;
  next();
}

async function createApp() {
  const app = express();
  app.set('trust proxy', 1);
  app.use(express.json({ limit: '256kb' }));

  // OAuth & session status
  app.get('/api/auth/status', (req, res) => {
    const creds = getOAuthCredentials();
    const session = resolveSession(req);
    res.json({
      authenticated: Boolean(session),
      configured: Boolean(creds),
      callbackUrl: getCallbackUrl(),
      appUrl: getAppUrl(),
      scopes: session ? session.scope.split(/[,\s]+/).filter(Boolean) : [],
      user: session ? session.user : null,
    });
  });

  // Construct GitHub OAuth authorization URL for popup flow
  app.get('/api/auth/github/url', (_req, res) => {
    const creds = getOAuthCredentials();
    if (!creds) {
      res.status(400).json({
        error: 'GitHub OAuth is not configured yet. Add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Settings -> Secrets.',
        callbackUrl: getCallbackUrl(),
      });
      return;
    }

    const state = crypto.randomBytes(24).toString('hex');
    const now = Date.now();
    pendingStates.set(state, {
      createdAt: now,
      expiresAt: now + OAUTH_STATE_TTL_MS,
    });

    const params = new URLSearchParams({
      client_id: creds.clientId,
      redirect_uri: getCallbackUrl(),
      scope: 'read:user user:email repo',
      state,
    });

    res.json({
      url: `https://github.com/login/oauth/authorize?${params.toString()}`,
    });
  });

  // OAuth callback handler (supports both /auth/callback and /auth/callback/)
  const handleOAuthCallback = async (req: Request, res: Response) => {
    const code = typeof req.query.code === 'string' ? req.query.code : '';
    const state = typeof req.query.state === 'string' ? req.query.state : '';
    const oauthError = typeof req.query.error === 'string' ? req.query.error : '';
    const oauthErrorDesc = typeof req.query.error_description === 'string' ? req.query.error_description : '';

    const sendPopupResult = (payload: Record<string, unknown>, message: string, isError = false) => {
      const safeJson = JSON.stringify(payload).replace(/</g, '\\u003c');
      const safeMessage = escapeHtml(message);
      res.status(isError ? 400 : 200).send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>GitHub Authentication</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #f8fafc; color: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; }
      .box { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px 28px; max-width: 420px; text-align: center; }
      h1 { font-size: 16px; margin: 0 0 8px; }
      p { font-size: 13px; color: #475569; margin: 0; line-height: 1.5; }
    </style>
  </head>
  <body>
    <div class="box">
      <h1>${isError ? 'GitHub Connection Failed' : 'GitHub Connected'}</h1>
      <p>${safeMessage}</p>
    </div>
    <script>
      (function () {
        var payload = ${safeJson};
        if (window.opener && !window.opener.closed) {
          try {
            window.opener.postMessage(payload, window.location.origin);
          } catch (e) {
            window.opener.postMessage(payload, '*');
          }
          setTimeout(function () { window.close(); }, 300);
        }
      })();
    </script>
  </body>
</html>`);
    };

    if (oauthError) {
      sendPopupResult(
        { type: 'OAUTH_AUTH_ERROR', error: oauthErrorDesc || oauthError },
        oauthErrorDesc || `GitHub declined authorization (${oauthError}).`,
        true
      );
      return;
    }

    if (!code || !state) {
      sendPopupResult(
        { type: 'OAUTH_AUTH_ERROR', error: 'Missing authorization code or state.' },
        'Missing authorization code or state parameter.',
        true
      );
      return;
    }

    const stateRecord = pendingStates.get(state);
    pendingStates.delete(state);
    if (!stateRecord || stateRecord.expiresAt <= Date.now()) {
      sendPopupResult(
        { type: 'OAUTH_AUTH_ERROR', error: 'Invalid or expired OAuth state. Please try connecting again.' },
        'Invalid or expired authorization state. Please close this window and try again.',
        true
      );
      return;
    }

    const creds = getOAuthCredentials();
    if (!creds) {
      sendPopupResult(
        { type: 'OAUTH_AUTH_ERROR', error: 'OAuth credentials are missing on the server.' },
        'Server OAuth credentials are not configured.',
        true
      );
      return;
    }

    try {
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: creds.clientId,
          client_secret: creds.clientSecret,
          code,
          redirect_uri: getCallbackUrl(),
        }),
      });

      const tokenData = (await tokenResponse.json()) as {
        access_token?: string;
        scope?: string;
        error?: string;
        error_description?: string;
      };

      if (!tokenResponse.ok || !tokenData.access_token) {
        const msg = tokenData.error_description || tokenData.error || 'Failed to exchange authorization code.';
        sendPopupResult({ type: 'OAUTH_AUTH_ERROR', error: msg }, msg, true);
        return;
      }

      const userResponse = await githubFetch('/user', tokenData.access_token);
      if (!userResponse.ok) {
        sendPopupResult(
          { type: 'OAUTH_AUTH_ERROR', error: 'Failed to load GitHub user profile.' },
          'Could not retrieve your GitHub profile after token exchange.',
          true
        );
        return;
      }

      const user = (await userResponse.json()) as GitHubUser;
      if (!user.email) {
        try {
          const emailRes = await githubFetch('/user/emails', tokenData.access_token);
          if (emailRes.ok) {
            const emails = (await emailRes.json()) as Array<{ email: string; primary: boolean; verified: boolean }>;
            const primary = emails.find((e) => e.primary && e.verified) || emails.find((e) => e.verified) || emails[0];
            if (primary) user.email = primary.email;
          }
        } catch {
          // Email lookup is optional if scope was adjusted
        }
      }

      const sessionId = crypto.randomBytes(24).toString('hex');
      const now = Date.now();
      const record: SessionRecord = {
        id: sessionId,
        accessToken: tokenData.access_token,
        scope: tokenData.scope || 'read:user',
        user,
        createdAt: now,
        expiresAt: now + SESSION_TTL_MS,
      };
      sessions.set(sessionId, record);

      const signedToken = signSessionId(sessionId);
      setSessionCookie(res, signedToken);

      sendPopupResult(
        {
          type: 'OAUTH_AUTH_SUCCESS',
          sessionToken: signedToken,
          user: { login: user.login, avatar_url: user.avatar_url },
        },
        `Signed in as @${user.login}. Returning to workspace...`,
        false
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unexpected OAuth exchange error.';
      sendPopupResult({ type: 'OAUTH_AUTH_ERROR', error: msg }, msg, true);
    }
  };

  app.get(['/auth/callback', '/auth/callback/'], handleOAuthCallback);

  // Logout (CSRF-guarded for cookie-based calls)
  app.post('/api/auth/logout', (req, res) => {
    const origin = req.headers.origin;
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const hasCustomHeader = req.headers['x-requested-with'] === 'XMLHttpRequest';
    if (origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== String(host) && !hasCustomHeader) {
          res.status(403).json({ error: 'Cross-origin logout rejected.' });
          return;
        }
      } catch {
        res.status(403).json({ error: 'Invalid origin.' });
        return;
      }
    } else if (!hasCustomHeader && !req.headers.authorization) {
      res.status(403).json({ error: 'Missing request verification header.' });
      return;
    }

    const session = resolveSession(req);
    if (session) {
      sessions.delete(session.id);
    }
    clearSessionCookie(res);
    res.json({ ok: true });
  });

  // List authenticated user's repositories
  app.get('/api/github/repos', requireAuth, async (req, res) => {
    const session = (req as Request & { session: SessionRecord }).session;
    try {
      const ghRes = await githubFetch(
        '/user/repos?sort=updated&per_page=100&affiliation=owner,collaborator,organization_member',
        session.accessToken
      );
      if (!ghRes.ok) {
        const errBody = await ghRes.json().catch(() => ({}));
        res.status(ghRes.status).json({
          error: (errBody as { message?: string }).message || 'Failed to load repositories from GitHub.',
        });
        return;
      }
      const repos = await ghRes.json();
      res.json({
        repos,
        rateLimit: extractRateLimit(ghRes),
      });
    } catch (err) {
      res.status(502).json({ error: err instanceof Error ? err.message : 'GitHub API request failed.' });
    }
  });

  // Inspect any repository (uses user's OAuth token when signed in, or public API when signed out)
  app.get('/api/github/repo/:owner/:repo', async (req, res) => {
    const { owner, repo } = req.params;
    if (!isValidSlug(owner) || !isValidSlug(repo)) {
      res.status(400).json({ error: 'Invalid repository owner or name.' });
      return;
    }

    const session = resolveSession(req);
    const token = session?.accessToken;

    try {
      const repoRes = await githubFetch(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`, token);
      if (repoRes.status === 404) {
        res.status(404).json({
          error: session
            ? `Repository ${owner}/${repo} was not found or your account lacks permission.`
            : `Repository ${owner}/${repo} is private or does not exist. Connect your GitHub account to access private repositories.`,
          requiresAuth: !session,
        });
        return;
      }
      if (!repoRes.ok) {
        const errBody = await repoRes.json().catch(() => ({}));
        res.status(repoRes.status).json({
          error: (errBody as { message?: string }).message || 'Failed to fetch repository metadata.',
          rateLimit: extractRateLimit(repoRes),
        });
        return;
      }

      const repoData = (await repoRes.json()) as { default_branch: string; has_pages?: boolean };
      const requestedRef = typeof req.query.ref === 'string' && /^[a-zA-Z0-9._\/-]{1,120}$/.test(req.query.ref)
        ? req.query.ref
        : repoData.default_branch;

      const encodedOwner = encodeURIComponent(owner);
      const encodedRepo = encodeURIComponent(repo);
      const encodedRef = encodeURIComponent(requestedRef);

      const [branchesRes, commitsRes, pullsRes, issuesRes, contentsRes, languagesRes] = await Promise.all([
        githubFetch(`/repos/${encodedOwner}/${encodedRepo}/branches?per_page=40`, token),
        githubFetch(`/repos/${encodedOwner}/${encodedRepo}/commits?sha=${encodedRef}&per_page=20`, token),
        githubFetch(`/repos/${encodedOwner}/${encodedRepo}/pulls?state=all&per_page=20`, token),
        githubFetch(`/repos/${encodedOwner}/${encodedRepo}/issues?state=all&per_page=20`, token),
        githubFetch(`/repos/${encodedOwner}/${encodedRepo}/contents?ref=${encodedRef}`, token),
        githubFetch(`/repos/${encodedOwner}/${encodedRepo}/languages`, token),
      ]);

      const branches = branchesRes.ok ? await branchesRes.json() : [];
      const commits = commitsRes.ok ? await commitsRes.json() : [];
      const pulls = pullsRes.ok ? await pullsRes.json() : [];
      const rawIssues = issuesRes.ok ? ((await issuesRes.json()) as Array<{ pull_request?: unknown }>) : [];
      const issues = Array.isArray(rawIssues) ? rawIssues.filter((item) => !item.pull_request) : [];
      const contents = contentsRes.ok ? await contentsRes.json() : [];
      const languages = languagesRes.ok ? await languagesRes.json() : {};

      res.json({
        repository: repoData,
        activeRef: requestedRef,
        branches,
        commits,
        pulls,
        issues,
        contents: Array.isArray(contents) ? contents : [],
        languages,
        rateLimit: extractRateLimit(repoRes),
        authenticated: Boolean(session),
      });
    } catch (err) {
      res.status(502).json({ error: err instanceof Error ? err.message : 'GitHub API error.' });
    }
  });

  // Browse directory or read file contents in repository
  app.get('/api/github/repo/:owner/:repo/contents', async (req, res) => {
    const { owner, repo } = req.params;
    if (!isValidSlug(owner) || !isValidSlug(repo)) {
      res.status(400).json({ error: 'Invalid repository owner or name.' });
      return;
    }

    const rawPath = typeof req.query.path === 'string' ? req.query.path : '';
    const safePath = sanitizeRepoPath(rawPath);
    if (safePath === null) {
      res.status(400).json({ error: 'Invalid file or directory path.' });
      return;
    }

    const ref = typeof req.query.ref === 'string' && /^[a-zA-Z0-9._\/-]{1,120}$/.test(req.query.ref)
      ? req.query.ref
      : '';

    const session = resolveSession(req);
    const endpointPath = safePath ? `/${safePath}` : '';
    const querySuffix = ref ? `?ref=${encodeURIComponent(ref)}` : '';

    try {
      const ghRes = await githubFetch(
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents${endpointPath}${querySuffix}`,
        session?.accessToken
      );

      if (!ghRes.ok) {
        const errBody = await ghRes.json().catch(() => ({}));
        res.status(ghRes.status).json({
          error: (errBody as { message?: string }).message || 'Unable to load path contents.',
        });
        return;
      }

      const data = await ghRes.json();
      if (Array.isArray(data)) {
        res.json({ kind: 'dir', entries: data, path: rawPath });
        return;
      }

      const fileObj = data as {
        type: string;
        name: string;
        path: string;
        size: number;
        sha: string;
        html_url: string;
        encoding?: string;
        content?: string;
      };

      let decodedText: string | null = null;
      let isBinary = false;
      if (fileObj.encoding === 'base64' && typeof fileObj.content === 'string') {
        if (fileObj.size > 512 * 1024) {
          decodedText = null;
        } else {
          const buf = Buffer.from(fileObj.content.replace(/\n/g, ''), 'base64');
          if (buf.includes(0)) {
            isBinary = true;
          } else {
            decodedText = buf.toString('utf8');
          }
        }
      }

      res.json({
        kind: 'file',
        file: {
          name: fileObj.name,
          path: fileObj.path,
          size: fileObj.size,
          sha: fileObj.sha,
          html_url: fileObj.html_url,
          isBinary,
          tooLarge: fileObj.size > 512 * 1024,
          text: decodedText,
        },
      });
    } catch (err) {
      res.status(502).json({ error: err instanceof Error ? err.message : 'GitHub API error.' });
    }
  });

  // Create a new issue in a repository (authenticated only)
  app.post('/api/github/repo/:owner/:repo/issues', requireAuth, async (req, res) => {
    const session = (req as Request & { session: SessionRecord }).session;
    const { owner, repo } = req.params;
    if (!isValidSlug(owner) || !isValidSlug(repo)) {
      res.status(400).json({ error: 'Invalid repository owner or name.' });
      return;
    }

    const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';
    const body = typeof req.body?.body === 'string' ? req.body.body.trim() : '';
    if (!title || title.length > 256) {
      res.status(400).json({ error: 'Issue title is required (max 256 characters).' });
      return;
    }

    try {
      const ghRes = await githubFetch(
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/issues`,
        session.accessToken,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, body }),
        }
      );

      const data = await ghRes.json().catch(() => ({}));
      if (!ghRes.ok) {
        res.status(ghRes.status).json({
          error: (data as { message?: string }).message || 'Failed to create issue.',
        });
        return;
      }

      res.status(201).json({ issue: data });
    } catch (err) {
      res.status(502).json({ error: err instanceof Error ? err.message : 'GitHub API error.' });
    }
  });

  // Fetch public GitHub user profile + repositories
  app.get('/api/github/public/user/:username', async (req, res) => {
    const { username } = req.params;
    if (!isValidUsername(username)) {
      res.status(400).json({ error: 'Invalid GitHub username format.' });
      return;
    }

    const session = resolveSession(req);
    try {
      const [userRes, reposRes] = await Promise.all([
        githubFetch(`/users/${encodeURIComponent(username)}`, session?.accessToken),
        githubFetch(`/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=30`, session?.accessToken),
      ]);

      if (!userRes.ok) {
        const errBody = await userRes.json().catch(() => ({}));
        res.status(userRes.status).json({
          error: (errBody as { message?: string }).message || `User @${username} not found.`,
        });
        return;
      }

      const user = await userRes.json();
      const repos = reposRes.ok ? await reposRes.json() : [];

      res.json({
        user,
        repos,
        rateLimit: extractRateLimit(userRes),
      });
    } catch (err) {
      res.status(502).json({ error: err instanceof Error ? err.message : 'GitHub API error.' });
    }
  });

  // Serve static public files and direct ZIP download before Vite SPA catch-all
  const publicDir = path.resolve(__dirname, 'public');
  app.get('/DB.136.zip', (_req, res) => {
    const zipPath = path.join(publicDir, 'DB.136.zip');
    res.download(zipPath, 'DB.136.zip', (err) => {
      if (err && !res.headersSent) {
        res.status(404).json({ error: 'DB.136.zip not found' });
      }
    });
  });
  app.use(express.static(publicDir));

  // Serve Vite in dev or static dist in production
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GitHub Connect server listening on http://0.0.0.0:${PORT}`);
  });
}

createApp().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
