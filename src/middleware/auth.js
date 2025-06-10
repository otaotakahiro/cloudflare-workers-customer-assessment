import { basicAuth } from 'hono/basic-auth';

/**
 * Adminページの認証ミドルウェア
 * 環境変数 ADMIN_PASSWORD に設定されたパスワードでBasic認証を行う
 */
const createAdminAuthMiddleware = (c) => {
  const password = c.env.ADMIN_PASSWORD;

  if (!password) {
    console.error('ADMIN_PASSWORD is not set in environment variables.');
    throw new Error('Admin password not configured');
  }

  return basicAuth({
    username: 'admin',
    password: password,
  });
};

const adminAuthMiddleware = async (c, next) => {
  try {
    const auth = createAdminAuthMiddleware(c);
    return auth(c, next);
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.text('Internal Server Error: Admin password not configured.', 500);
  }
};

export default adminAuthMiddleware;
