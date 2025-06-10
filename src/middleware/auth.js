/**
 * Adminページの認証ミドルウェア
 * 環境変数 ADMIN_PASSWORD に設定されたパスワードでBasic認証を行う
 */
const adminAuthMiddleware = async (c, next) => {
  try {
    console.log('Starting auth middleware...');

    // 複数の方法で環境変数にアクセスを試行
    const envPassword1 = c.env?.ADMIN_PASSWORD;
    const envPassword2 = c.env?.['ADMIN_PASSWORD'];
    const envPassword3 = c.env && c.env['ADMIN_PASSWORD'];
    const envPassword4 = c.env && c.env.ADMIN_PASSWORD;

    console.log('Environment access tests:', {
      hasEnv: !!c.env,
      method1_dotNotation: envPassword1,
      method2_bracket: envPassword2,
      method3_safeBracket: envPassword3,
      method4_safeDot: envPassword4,
      envType: typeof c.env,
      envKeys: c.env ? Object.keys(c.env) : 'no env'
    });

    // 最初に取得できた値を使用
    const envPassword = envPassword1 || envPassword2 || envPassword3 || envPassword4;

    console.log('Final password check:', {
      hasPassword: !!envPassword,
      passwordType: typeof envPassword,
      passwordLength: envPassword ? envPassword.length : 0
    });

    if (!envPassword) {
      console.error('ADMIN_PASSWORD is not accessible through any method.');
      return c.text('Internal Server Error: Admin password not configured.', 500);
    }

    // Authorization ヘッダーを取得
    const authHeader = c.req.header('Authorization');
    console.log('Auth header present:', !!authHeader);

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      console.log('No valid auth header, requesting authentication');
      c.header('WWW-Authenticate', 'Basic realm="Admin Area"');
      return c.text('Unauthorized', 401);
    }

    // Basic認証をデコード
    try {
      const encodedCredentials = authHeader.substring(6); // "Basic " を除去
      const credentials = atob(encodedCredentials);
      const [username, password] = credentials.split(':');

      console.log('Decoded credentials:', {
        hasUsername: !!username,
        hasPassword: !!password,
        usernameMatch: username === 'admin'
      });

      if (username === 'admin' && password === envPassword) {
        console.log('Authentication successful');
        return await next();
      } else {
        console.log('Authentication failed - invalid credentials');
        c.header('WWW-Authenticate', 'Basic realm="Admin Area"');
        return c.text('Unauthorized', 401);
      }
    } catch (decodeError) {
      console.error('Error decoding credentials:', decodeError);
      c.header('WWW-Authenticate', 'Basic realm="Admin Area"');
      return c.text('Unauthorized', 401);
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return c.text('Internal Server Error: Authentication failed.', 500);
  }
};

export default adminAuthMiddleware;
