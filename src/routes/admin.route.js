import { Hono } from 'hono';
import adminAuthMiddleware from '../middleware/auth.js';

/**
 * @typedef {object} CompanyData
 * @property {string} id - 12桁の会社ID
 * @property {string} companyName
 * @property {string} email
 * @property {string} contactPerson
 * @property {string} phoneNumber
 */

/**
 * 12桁の会社IDを生成する関数
 * @returns {string} 12桁の英数字（大文字・小文字・数字）
 */
function generateCompanyId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const adminRoute = (app) => {
  // ミドルウェアをこのルートグループ全体に適用するのをやめる
  // app.use('/*', adminAuthMiddleware);

  // --- Admin ページ表示 (GET /) --- : ミドルウェアを個別適用
  app.get('/', adminAuthMiddleware, (c) => {
    // 初期表示用の会社IDを生成
    const initialCompanyId = generateCompanyId();

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin - 美容クリニック顧客分析システム</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          body { background-color: #f3f4f6; padding: 2rem; }
          .container { max-width: 800px; margin: auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #374151; }
          input[type="text"], input[type="email"], input[type="tel"] {
            width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #d1d5db; border-radius: 4px;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
          }
          input:focus { outline: none; border-color: #4f46e5; box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.5); }
          button { background-color: #4f46e5; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; }
          button:hover { background-color: #4338ca; }
          .btn-secondary { background-color: #6b7280; }
          .btn-secondary:hover { background-color: #4b5563; }
          .error-message { color: #ef4444; font-size: 0.875rem; margin-top: 1rem; }
          .success-message { color: #10b981; font-size: 0.875rem; margin-top: 1rem; }
          .nav-link { display: inline-block; margin-right: 1rem; padding: 0.5rem 1rem; background-color: #6b7280; color: white; text-decoration: none; border-radius: 4px; transition: background-color 0.2s; }
          .nav-link:hover { background-color: #4b5563; }
          .nav-link.active { background-color: #4f46e5; }
          .id-input-group { display: flex; gap: 0.5rem; align-items: flex-start; }
          .id-input-group input { flex: 1; margin-bottom: 0; }
          .id-input-group button { margin-bottom: 1rem; white-space: nowrap; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">美容クリニック顧客分析システム - 管理画面</h1>

          <!-- ナビゲーション -->
          <div class="mb-8 text-center">
            <a href="/admin/" class="nav-link active">会社登録</a>
            <a href="/admin/companies" class="nav-link">登録会社一覧</a>
          </div>

          <div class="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">会社情報登録</h2>
            <form id="companyForm" method="POST" action="/admin/api/companies">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="mb-4">
                  <label for="companyId">会社ID (12桁)</label>
                  <div class="id-input-group">
                    <input type="text" id="companyId" name="pageId" required minlength="12" maxlength="12" pattern="[a-zA-Z0-9]{12}" title="12桁の英数字" value="${initialCompanyId}">
                    <button type="button" id="generateIdBtn" class="btn-secondary">ID再生成</button>
                  </div>
                </div>
                <div class="mb-4">
                  <label for="companyName">会社名</label>
                  <input type="text" id="companyName" name="companyName" required>
                </div>
                <div class="mb-4">
                  <label for="email">メールアドレス</label>
                  <input type="email" id="email" name="email" required>
                </div>
                <div class="mb-4">
                  <label for="contactPerson">担当者名</label>
                  <input type="text" id="contactPerson" name="contactPerson" required>
                </div>
              </div>
              <div class="mb-4">
                <label for="phoneNumber">電話番号</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" required class="md:w-1/2">
              </div>
              <div class="text-center">
                <button type="submit">登録</button>
              </div>
            </form>
            <div id="messageArea" class="mt-4 text-center"></div>
          </div>

          <!-- 使用方法の説明 -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-2 text-gray-800">使用方法</h3>
            <ol class="list-decimal list-inside space-y-1 text-sm text-gray-600">
              <li>上記フォームで美容クリニックの会社情報を登録</li>
              <li>登録後、専用ページURL（/c/{会社ID}）が生成されます</li>
              <li>そのURLを各クリニックに提供し、顧客分析システムとして活用</li>
              <li>各クリニックは独自のカスタマイズされたページで顧客分析を実行可能</li>
            </ol>
          </div>
        </div>

        <script>
          // 会社ID生成関数
          function generateCompanyId() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < 12; i++) {
              result += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return result;
          }

          // ID再生成ボタンのイベント
          document.getElementById('generateIdBtn').addEventListener('click', function() {
            const newId = generateCompanyId();
            document.getElementById('companyId').value = newId;
          });

          const form = document.getElementById('companyForm');
          const messageArea = document.getElementById('messageArea');

          form.addEventListener('submit', async (event) => {
            event.preventDefault();
            messageArea.textContent = '';
            messageArea.className = 'mt-4 text-center';

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Basic client-side validation for pageId length
            if (data.pageId.length !== 12) {
              messageArea.textContent = '会社IDは12桁で入力してください。';
              messageArea.classList.add('error-message');
              return;
            }

            try {
              const response = await fetch('/admin/api/companies', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });

              const result = await response.json();

              if (response.ok) {
                messageArea.textContent = result.message || '登録が成功しました。3秒後に会社一覧ページに遷移します...';
                messageArea.classList.add('success-message');
                form.reset();
                // 新しいIDを生成してフォームに設定
                document.getElementById('companyId').value = generateCompanyId();

                // 3秒後に会社一覧ページに遷移
                setTimeout(() => {
                  window.location.href = '/admin/companies';
                }, 3000);
              } else {
                messageArea.textContent = result.error || '登録に失敗しました。';
                messageArea.classList.add('error-message');
              }
            } catch (error) {
              console.error('Error submitting form:', error);
              messageArea.textContent = '通信エラーが発生しました。';
              messageArea.classList.add('error-message');
            }
          });
        </script>
      </body>
      </html>
    `;

    return c.html(htmlContent);
  });

  // --- 登録会社一覧ページ (GET /companies) ---
  app.get('/companies', adminAuthMiddleware, async (c) => {
    try {
      // KVから全ての会社情報を取得
      const { keys } = await c.env.COMPANY_KV.list({ prefix: 'company:' });
      const companies = [];

      for (const key of keys) {
        const companyData = await c.env.COMPANY_KV.get(key.name);
        if (companyData) {
          companies.push(JSON.parse(companyData));
        }
      }

      // 会社名でソート
      companies.sort((a, b) => a.companyName.localeCompare(b.companyName));

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="ja">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>登録会社一覧 - 美容クリニック顧客分析システム</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body { background-color: #f3f4f6; padding: 2rem; }
            .container { max-width: 1200px; margin: auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .nav-link { display: inline-block; margin-right: 1rem; padding: 0.5rem 1rem; background-color: #6b7280; color: white; text-decoration: none; border-radius: 4px; transition: background-color 0.2s; }
            .nav-link:hover { background-color: #4b5563; }
            .nav-link.active { background-color: #4f46e5; }
            .company-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; transition: shadow 0.2s; }
            .company-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
            .company-link { background-color: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; display: inline-block; transition: background-color 0.2s; }
            .company-link:hover { background-color: #059669; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">登録会社一覧</h1>

            <!-- ナビゲーション -->
            <div class="mb-8 text-center">
              <a href="/admin" class="nav-link">会社登録</a>
              <a href="/admin/companies" class="nav-link active">登録会社一覧</a>
            </div>

            <div class="mb-4">
              <p class="text-gray-600">登録済み会社数: <strong>${companies.length}</strong></p>
            </div>

            ${companies.length === 0 ?
              '<div class="text-center py-8 text-gray-500">まだ会社が登録されていません。</div>' :
              companies.map(company => `
                <div class="company-card">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div>
                      <h3 class="text-xl font-semibold text-gray-800">${company.companyName}</h3>
                      <p class="text-sm text-gray-600">ID: ${company.id}</p>
                    </div>
                    <div class="text-sm text-gray-600">
                      <p><strong>担当者:</strong> ${company.contactPerson}</p>
                      <p><strong>メール:</strong> ${company.email}</p>
                      <p><strong>電話:</strong> ${company.phoneNumber}</p>
                    </div>
                    <div class="text-center">
                      <a href="/c/${company.id}" class="company-link" target="_blank">
                        会社専用ページを開く
                      </a>
                      <p class="text-xs text-gray-500 mt-1">登録日: ${new Date(company.createdAt).toLocaleDateString('ja-JP')}</p>
                    </div>
                  </div>
                </div>
              `).join('')
            }
          </div>
        </body>
        </html>
      `;

      return c.html(htmlContent);
    } catch (error) {
      console.error('Error fetching companies:', error);
      return c.html(`
        <html>
          <body>
            <h1>エラーが発生しました</h1>
            <p>会社一覧の取得に失敗しました。</p>
            <a href="/admin/">管理画面に戻る</a>
          </body>
        </html>
      `, 500);
    }
  });

  // --- 会社情報登録 API (POST /api/companies) --- : ミドルウェアを個別適用
  app.post('/api/companies', adminAuthMiddleware, async (c) => {
    try {
      /** @type {CompanyData} */
      const body = await c.req.json();

      // --- バリデーション ---
      if (!body.pageId || typeof body.pageId !== 'string' || body.pageId.length !== 12 || !/^[a-zA-Z0-9]{12}$/.test(body.pageId)) {
        return c.json({ error: '会社IDは12桁の英数字で入力してください。' }, 400);
      }

      // 既存の会社IDチェック
      const existingCompany = await c.env.COMPANY_KV.get(`company:${body.pageId}`);
      if (existingCompany) {
        return c.json({ error: 'この会社IDは既に使用されています。別のIDを入力してください。' }, 400);
      }

      if (!body.companyName || typeof body.companyName !== 'string') {
        return c.json({ error: '会社名を入力してください。' }, 400);
      }
       if (!body.email || typeof body.email !== 'string' /* Add more robust email validation if needed */) {
        return c.json({ error: '有効なメールアドレスを入力してください。' }, 400);
      }
      if (!body.contactPerson || typeof body.contactPerson !== 'string') {
        return c.json({ error: '担当者名を入力してください。' }, 400);
      }
      if (!body.phoneNumber || typeof body.phoneNumber !== 'string' /* Add phone number format validation if needed */) {
        return c.json({ error: '電話番号を入力してください。' }, 400);
      }
      // --- バリデーション終了 ---

      const kvKey = `company:${body.pageId}`;
      const companyDataToStore = {
        id: body.pageId,
        companyName: body.companyName,
        email: body.email,
        contactPerson: body.contactPerson,
        phoneNumber: body.phoneNumber,
        createdAt: new Date().toISOString(),
      };

      await c.env.COMPANY_KV.put(kvKey, JSON.stringify(companyDataToStore));

      return c.json({
        message: `会社「${body.companyName}」(ID: ${body.pageId}) を登録しました。`,
        pageId: body.pageId,
        companyPageUrl: `/c/${body.pageId}`
      });
    } catch (error) {
      console.error('Error processing company registration:', error);
      if (error instanceof SyntaxError) { // JSON parse error
          return c.json({ error: '無効なリクエスト形式です。' }, 400);
      }
      // KVへの書き込みエラーなども考慮
      return c.json({ error: 'サーバー内部でエラーが発生しました。' }, 500);
    }
  });

  return app;
};

export default adminRoute;
