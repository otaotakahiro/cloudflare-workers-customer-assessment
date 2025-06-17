// タブモジュールをインポート
import { populateOverviewTab } from './tabs-overview.js';
import { populateSkillsTab } from './tabs-skills.js';
import { populateLifeStyleTab } from './tabs-career.js';
import { populateFutureTab } from './tabs-future.js';
import { populatePlusTab } from './tabs-plus.js';

// インポートの確認用ログ
console.log('タブモジュールのインポート状態:');
console.log('- populateOverviewTab:', typeof populateOverviewTab === 'function' ? '読み込み成功' : '読み込み失敗');
console.log('- populateSkillsTab:', typeof populateSkillsTab === 'function' ? '読み込み成功' : '読み込み失敗');
console.log('- populateLifeStyleTab:', typeof populateLifeStyleTab === 'function' ? '読み込み成功' : '読み込み失敗');
console.log('- populateFutureTab:', typeof populateFutureTab === 'function' ? '読み込み成功' : '読み込み失敗');
console.log('- populatePlusTab:', typeof populatePlusTab === 'function' ? '読み込み成功' : '読み込み失敗');

// グローバル変数としてデータを保持
let profileData = null;

// テスト用のモックデータ
// const TEST_DATA = {
//     name: "テスト 太郎",
//     birthDate: "1990年1月1日",
//     gender: "男性",
//     analysisDate: "2025年4月",
//     overview: {
//         strengths: ["論理的思考力が高い", "忍耐強く取り組める", "細部への配慮ができる", "誠実で信頼される", "集中力がある"],
//         weaknesses: ["完璧主義の傾向がある", "決断に時間がかかる", "感情表現が少ない", "柔軟性に欠けることがある", "自己主張が弱い"],
//         compatibility: {
//             types: [
//                 {
//                     title: "論理派リーダー",
//                     description: "物事を論理的に分析し、合理的な判断で組織を導く力があります。",
//                     tags: ["分析力", "論理性", "決断力"],
//                     note: "感情的要素も取り入れるとより良いバランスになります"
//                 },
//                 {
//                     title: "誠実なサポーター",
//                     description: "周囲の人を支える力があり、信頼関係を築くのが上手です。",
//                     tags: ["信頼性", "サポート力", "忍耐力"],
//                     note: "自分の意見も積極的に出すとより貢献度が増します"
//                 },
//                 {
//                     title: "細部重視の実務家",
//                     description: "細部まで注意を払い、確実に仕事を進めることができます。",
//                     tags: ["正確性", "実務力", "集中力"],
//                     note: "全体像を意識しながら進めることで、より効果的な成果を出せます"
//                 }
//             ]
//         },
//         personality: {
//             summary: "論理的で誠実、責任感が強く信頼される人物です。細部に注意を払い、確実に仕事を進めます。",
//             behavior: {
//                 type: "計画型",
//                 description: "事前に計画を立て、手順通りに進めることを好みます。"
//             },
//             impression: {
//                 type: "信頼型",
//                 description: "約束を守り、期待通りの成果を出す人という印象を与えます。"
//             }
//         },
//         evaluation: {
//             summary: "分析力と忍耐力に優れ、長期的なプロジェクトで実力を発揮します。",
//             strengths: "論理的思考と計画性が高く、複雑な問題を着実に解決する能力があります。また、誠実さから信頼される人物です。",
//             weaknesses: "完璧を求める傾向があり、時に決断が遅れる場合があります。また、変化への適応には時間がかかることがあります。",
//             conclusion: "計画と分析が必要な長期的なプロジェクトでリーダーシップを発揮できる人材です。"
//         }
//     },
//     skills: {
//         evaluations: [
//             { name: "リーダー適性", score: 4, description: "論理的な判断と誠実さで周囲からの信頼を得ることができます。" },
//             { name: "協調性", score: 3, description: "チームの一員として貢献する力がありますが、意見の主張はやや控えめです。" },
//             { name: "ストレス耐性", score: 4, description: "忍耐強く長期的な問題に対処する力があります。" },
//             { name: "柔軟性", score: 2, description: "計画変更や急な状況変化への適応にはやや時間がかかります。" },
//             { name: "主体性", score: 3, description: "自分の担当範囲では主体的に行動できますが、新規の取り組みには慎重です。" }
//         ],
//         interviewQuestions: [
//             {
//                 question: "計画通りに進まなかった状況で、どのように対応したか例を挙げてください。",
//                 purpose: "柔軟性と問題解決能力を見るための質問です。計画変更への対応が弱点の可能性があるため、実際の行動を確認します。"
//             },
//             {
//                 question: "チーム内で意見が分かれた時、あなたはどのように行動しましたか？",
//                 purpose: "意見対立における調整能力と自己主張のバランスを確認します。やや自己主張が弱い面があるため、その対処法を見ます。"
//             }
//         ],
//         warningSignals: [
//             "完璧を求めすぎて進捗が止まる場合がある",
//             "意思決定に必要以上に時間をかけることがある",
//             "変化やルール変更に強い抵抗を示すことがある",
//             "自分の意見を表明せず、不満を内に溜め込むことがある"
//         ]
//     },
//     career: {
//         aptitudeScores: [
//             { field: "フェイシャルエステ", score: 90 },
//             { field: "ボディケア", score: 85 },
//             { field: "ヘアケア", score: 80 },
//             { field: "ネイルケア", score: 75 },
//             { field: "メイクアップ", score: 65 }
//         ],
//         businessAreas: [
//             {
//                 name: "アンチエイジングケア",
//                 icon: "lightbulb",
//                 description: "肌の若返りと美しさを保つための総合的なケアプログラム",
//                 tags: ["若返り", "美肌", "リフトアップ"]
//             },
//             {
//                 name: "ボディシェイプアップ",
//                 icon: "chart-line",
//                 description: "理想的な体型を実現するためのボディケアプログラム",
//                 tags: ["ダイエット", "シェイプアップ", "ボディライン"]
//             }
//         ],
//         successKeywords: [
//             {
//                 title: "定期的なケア習慣",
//                 icon: "graduation-cap",
//                 description: "定期的な施術とホームケアの組み合わせで効果を最大化"
//             },
//             {
//                 title: "カスタマイズケア",
//                 icon: "chart-line",
//                 description: "個人の肌質や体質に合わせたオーダーメイドのケアプログラム"
//             },
//             {
//                 title: "長期的な美しさ",
//                 icon: "handshake",
//                 description: "一時的な効果ではなく、持続的な美しさを実現するケア"
//             }
//         ],
//         suitableFields: [
//             {
//                 name: "フェイシャルエステ",
//                 examples: "リフトアップ、美白、保湿、毛穴ケアなど",
//                 description: "肌の状態を改善し、若々しい印象を与える施術が適しています。定期的なケアで効果を維持できます。"
//             },
//             {
//                 name: "ボディケア",
//                 examples: "脂肪吸引、セルライト除去、ボディシェイプなど",
//                 description: "体型の悩みを解決し、理想的なボディラインを実現する施術が効果的です。"
//             },
//             {
//                 name: "ヘアケア",
//                 examples: "育毛、ヘッドスパ、トリートメントなど",
//                 description: "髪の健康と美しさを保つための施術が適しています。頭皮環境の改善も期待できます。"
//             }
//         ]
//     },
//     future: {
//         timeline: [
//             {
//                 period: "半年後",
//                 term: "短期",
//                 phase: "適応期",
//                 description: "現在の環境で信頼を獲得する時期。担当業務で確実な成果を出し、周囲からの評価を高めています。"
//             },
//             {
//                 period: "1年後",
//                 term: "中期",
//                 phase: "成長期",
//                 description: "より責任のある業務を任されるようになります。専門知識を深め、チーム内での存在感が増します。"
//             },
//             {
//                 period: "3年後",
//                 term: "中期",
//                 phase: "発展期",
//                 description: "これまでの経験を活かしたプロジェクトリーダーとしての役割が期待されます。後進の指導も担当します。"
//             },
//             {
//                 period: "5年後",
//                 term: "長期",
//                 phase: "確立期",
//                 description: "専門分野でのエキスパートとして認められ、組織内での立場が確立します。管理職への道も開けてきます。"
//             }
//         ],
//         careerProposals: [
//             {
//                 term: "短期（1年以内）",
//                 title: "基盤固めと専門性強化",
//                 icon: "rocket",
//                 actions: [
//                     "現在の業務での成果を確実に出し、信頼を獲得する",
//                     "専門知識を深めるための資格取得や学習に取り組む",
//                     "組織内の人間関係を強化し、協力体制を築く"
//                 ]
//             },
//             {
//                 term: "中期（1～3年）",
//                 title: "視野拡大と責任範囲の拡大",
//                 icon: "chart-line",
//                 actions: [
//                     "小規模なプロジェクトのリーダーとしての経験を積む",
//                     "部門を越えた横断的な知識を習得する",
//                     "自分の専門性を活かした改善提案を積極的に行う"
//                 ]
//             },
//             {
//                 term: "長期（5年以上）",
//                 title: "組織的影響力の確立",
//                 icon: "mountain",
//                 actions: [
//                     "専門分野でのエキスパートとして組織に貢献する",
//                     "管理職として部下の育成とチーム力向上に取り組む",
//                     "業界内でのネットワークを構築し、外部との連携を強化する"
//                 ]
//             }
//         ]
//     },
//     plus: {
//         asCustomer: {
//             beautyTendencies: [
//                 {
//                     title: "美容傾向1",
//                     description: "お客さんの美容に関する傾向とその特徴を説明"
//                 },
//                 {
//                     title: "美容傾向2",
//                     description: "お客さんの美容に関する傾向とその特徴を説明"
//                 },
//                 {
//                     title: "美容傾向3",
//                     description: "お客さんの美容に関する傾向とその特徴を説明"
//                 }
//             ],
//             recommendedScripts: [
//                 {
//                     title: "おすすめスクリプト1",
//                     description: "お客さんの美容に関するおすすめスクリプトとその効果を説明"
//                 },
//                 {
//                     title: "おすすめスクリプト2",
//                     description: "お客さんの美容に関するおすすめスクリプトとその効果を説明"
//                 },
//                 {
//                     title: "おすすめスクリプト3",
//                     description: "お客さんの美容に関するおすすめスクリプトとその効果を説明"
//                 }
//             ],
//             stepByStepProposal: {
//                 process: [
//                     {
//                         step: "段階1",
//                         description: "お客さんの美容に関する段階的提案プロセスの説明"
//                     },
//                     {
//                         step: "段階2",
//                         description: "お客さんの美容に関する段階的提案プロセスの説明"
//                     },
//                     {
//                         step: "段階3",
//                         description: "お客さんの美容に関する段階的提案プロセスの説明"
//                     }
//                 ],
//                 highEndProductGuide: {
//                     products: [
//                         {
//                             name: "高額商品1",
//                             description: "お客さんの美容に関する高額商品の説明とその効果"
//                         },
//                         {
//                             name: "高額商品2",
//                             description: "お客さんの美容に関する高額商品の説明とその効果"
//                         },
//                         {
//                             name: "高額商品3",
//                             description: "お客さんの美容に関する高額商品の説明とその効果"
//                         }
//                     ]
//                 },
//                 specialOfferEffect: {
//                     offers: [
//                         {
//                             name: "特別オファー1",
//                             description: "お客さんの美容に関する特別オファーの説明とその効果"
//                         },
//                         {
//                             name: "特別オファー2",
//                             description: "お客さんの美容に関する特別オファーの説明とその効果"
//                         },
//                         {
//                             name: "特別オファー3",
//                             description: "お客さんの美容に関する特別オファーの説明とその効果"
//                         }
//                     ]
//                 }
//             }
//         }
//     }
// }

// // デバッグ情報を処理するための機能（コンソールのみに出力）
// function updateDebug(message) {
//     // コンソール出力のみにする
//     if (process.env.NODE_ENV !== 'production') {
//         console.log("デバッグ情報:", message);
//     }
// }

// // グローバルスコープでアクセス可能なテストデータロード関数
// window.loadTestData = function() {
//     console.log('loadTestData関数が呼び出されました');

//     // テストデータを直接使用
//     profileData = TEST_DATA;

//     // 基本情報を更新
//     updateBasicInfo();

//     // 全タブのデータを設定
//     populateAllTabs();

//     // ローディングインジケータを非表示
//     showLoadingIndicator(false);

//     console.log('テストデータのロードが完了しました');
// };

// 自動テストデータロードを無効化（API動作テストのため）
// window.addEventListener('load', function() {
//    console.log('ページロード完了、テストデータを自動ロードします');
//    window.loadTestData();
// });

// DOMロード時の処理
document.addEventListener('DOMContentLoaded', function() {
    console.log('ドキュメントロード完了、スクリプト初期化開始');

    // tab-content-containerのパディングを0に設定
    const tabContentContainer = document.querySelector('.tab-content-container');
    if (tabContentContainer) {
        tabContentContainer.style.padding = '0';
        console.log('tab-content-containerのパディングを0に設定しました');
    }

    // HTMLコンテナの存在確認
    console.log('HTMLコンテナの存在確認:');

    const containers = [
        'strengths-list',
        'weaknesses-list',
        'compatibility-container',
        'personality-container',
        'evaluation-container',
        'skills-evaluations-container',
        'interview-questions-container',
        'warning-signals-container',
        'aptitude-scores-container',
        'business-areas-container',
        'success-keywords-container',
        'suitable-fields-container',
        'timeline-container',
        'career-proposals-container',
        'as-boss-container',
        'as-subordinate-container',
        'as-leader-container'
    ];

    containers.forEach(id => {
        const el = document.getElementById(id);
        console.log(`- ${id}:`, el ? '存在します' : '見つかりません');
    });

    // タブ切り替え処理
    initializeTabs();

    // ★ データ読み込み処理を変更
    // loadResultData(); // API経由での読み込みは一旦停止
    loadEmbeddedData(); // HTML埋め込みデータの読み込み処理を呼び出す

    // スワイプによるタブナビゲーションを初期化
    initializeSwipeNavigation();

    // 「トップに戻る」ボタンの初期化とイベントリスナー設定
    initializeBackToTopButton();

    // スティッキータブ関連の初期化（スクロールとリサイズに対応）
    initializeStickyActiveTab();

    console.log('初期化処理が完了しました');
});

/**
 * タブの初期化と切り替え処理
 */
function initializeTabs() {
    // 新しく追加されたid属性に基づいてタブボタンを選択
    const tabButtons = [
        document.getElementById('overview-tab'),
        document.getElementById('skills-tab'),
        document.getElementById('lifestyle-tab'),
        document.getElementById('future-tab'),
        document.getElementById('plus-tab')
    ].filter(button => button !== null); // nullの要素を除外

    console.log('タブボタン取得状態:', tabButtons.length, '個見つかりました');

    // タブコンテンツ要素を取得
    const tabContents = [
        document.getElementById('overview-content'),
        document.getElementById('skills-content'),
        document.getElementById('lifestyle-content'),
        document.getElementById('future-content'),
        document.getElementById('plus-content')
    ].filter(content => content !== null);

    console.log('タブコンテンツ取得状態:', tabContents.length, '個見つかりました');

    // ボタンが見つからない場合は処理を終了
    if (tabButtons.length === 0) {
        console.error('タブボタンが見つかりませんでした。HTMLを確認してください。');
        return;
    }

    // 各タブボタンにクリックイベントを設定
    tabButtons.forEach((button, index) => {
        // ID名からタブIDを抽出（例: overview-tab → overview-content）
        const baseId = button.id.replace('-tab', '');
        const tabId = `${baseId}-content`;

        console.log(`タブ設定: ${button.id} → ${tabId}`);

        button.addEventListener('click', function() {
            console.log(`タブクリック: ${this.id} → ${tabId}`);

            // すべてのタブからアクティブクラスを削除
            tabButtons.forEach(btn => {
                if (btn) btn.classList.remove('active');
            });

            // すべてのコンテンツからアクティブクラスを削除
            tabContents.forEach(content => {
                if (content) content.classList.remove('active');
            });

            // クリックされたタブとそれに対応するコンテンツをアクティブにする
            this.classList.add('active');
            const contentElement = document.getElementById(tabId);
            if (contentElement) {
                contentElement.classList.add('active');
            } else {
                console.error(`対応するタブコンテンツが見つかりません: ${tabId}`);
            }
        });
    });

    // 初期状態として最初のタブをアクティブに設定
    if (tabButtons.length > 0) {
        tabButtons[0].click();
    }
}

/**
 * エラーメッセージの表示
 */
function showError(message) {
    console.error('エラーメッセージを表示:', message);

    // エラーメッセージのHTML要素がある場合はそのテキストを設定して表示
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        console.log('エラー要素が見つかりました');
        // エラーテキスト要素を探す
        const errorTextElement = document.getElementById('error-text');
        if (errorTextElement) {
            errorTextElement.textContent = message;
        } else {
            errorElement.innerHTML = `<p>${message}</p>`;
        }
        errorElement.classList.remove('hidden');
    } else {
        // エラー要素がない場合はアラートを表示
        alert(`エラー: ${message}`);
    }
}

/**
 * ★ 新規追加: HTMLに埋め込まれたデータを読み込む関数
 */
function loadEmbeddedData() {
  try {
    showLoadingIndicator(true);
    console.log('埋め込みデータ読み込み開始');

    if (typeof window.profileData !== 'undefined' && window.profileData !== null) {
      console.log('window.profileDataが見つかりました。データを使用します。');
      profileData = window.profileData;

      // より詳細なデバッグログ
      console.log('%c=== データ構造の詳細な診断 ===', 'color: red; font-weight: bold;');
      console.log('1. profileDataの型:', typeof profileData);
      console.log('2. profileDataのキー:', Object.keys(profileData));

      if (profileData.analysis) {
        console.log('3. analysisの型:', typeof profileData.analysis);
        console.log('4. analysisのキー:', Object.keys(profileData.analysis));

        if (profileData.analysis.data) {
          console.log('5. analysis.dataの型:', typeof profileData.analysis.data);
          console.log('6. analysis.dataのキー:', Object.keys(profileData.analysis.data));

          if (profileData.analysis.data.lifestyle) {
            console.log('7. lifestyleの型:', typeof profileData.analysis.data.lifestyle);
            console.log('8. lifestyleのキー:', Object.keys(profileData.analysis.data.lifestyle));
          } else {
            console.log('7. lifestyleは存在しません');
          }
        } else {
          console.log('5. analysis.dataは存在しません');
        }
      } else {
        console.log('3. analysisは存在しません');
      }

      // 元のデバッグログ
      console.log('%c埋め込みプロファイルデータ 詳細:', 'color: blue; font-weight: bold;');
      console.log('profileData:', profileData);
      console.log('profileData.analysis:', profileData.analysis);
      console.log('profileData.analysis?.data:', profileData.analysis?.data);
      console.log('profileData.analysis?.data?.career:', profileData.analysis?.data?.career);
      console.log('profileData.analysis?.data?.career?.lifestyle:', profileData.analysis?.data?.career?.lifestyle);

      // lifestyleデータの詳細な構造確認
      if (profileData.analysis?.data?.career?.lifestyle) {
        console.log('%cLifestyle Data Structure:', 'color: orange; font-weight: bold;');
        console.log('lifestyle keys:', Object.keys(profileData.analysis.data.career.lifestyle));
        console.log('lifestyle.beautyAcupunctureMotivations:', profileData.analysis.data.career.lifestyle.beautyAcupunctureMotivations);
        console.log('lifestyle.motivationScores:', profileData.analysis.data.career.lifestyle.motivationScores);
        console.log('lifestyle.purchasePatterns:', profileData.analysis.data.career.lifestyle.purchasePatterns);
        console.log('lifestyle.recommendedServices:', profileData.analysis.data.career.lifestyle.recommendedServices);
      } else {
        console.log('%cLifestyle data not found in career.lifestyle', 'color: red; font-weight: bold;');
      }

      // ★ データから基本情報を抽出して表示更新
      const userInfo = {
          name: profileData.inputs?.name || `${profileData.inputs?.familyName || ''} ${profileData.inputs?.firstName || ''}`.trim(),
          familyName: profileData.inputs?.familyName || '',
          firstName: profileData.inputs?.firstName || '',
          birthDate: profileData.inputs?.birthdate || '',
          gender: profileData.inputs?.gender || '',
          analysisDate: profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString('ja-JP') : new Date().toLocaleDateString('ja-JP')
      };

      console.log('抽出したユーザー情報:', userInfo);
      updateProfileInfo(userInfo);

      // ★ 全タブの内容を更新
      console.log('データ構造に合わせて各タブのデータを抽出します...');
      const analysisData = profileData.analysis?.data;
      console.log('analysisData:', analysisData);

      // ★★★ ここを修正: より深い階層からデータを取得 ★★★
      const overviewData = analysisData?.overview?.overview;
      console.log('overviewData:', overviewData);
      const skillsData = analysisData?.skills?.skills;
      const lifestyleData = analysisData?.career?.lifestyle;
      console.log('lifestyleData (before populate):', lifestyleData);
      const futureData = analysisData?.future?.future;
      const plusData = analysisData?.plus?.plus;

      // デバッグ用にplusDataの構造を詳細に出力
      console.log('%cPlus Data Structure:', 'color: green; font-weight: bold;');
      console.log('plusData:', plusData);
      console.log('plusData type:', typeof plusData);
      console.log('plusData keys:', plusData ? Object.keys(plusData) : 'null');

      console.log('抽出した各タブデータ:', {
        overview: overviewData ? '取得成功' : '取得失敗/null',
        skills: skillsData ? '取得成功' : '取得失敗/null',
        lifestyle: lifestyleData ? '取得成功' : '取得失敗/null',
        future: futureData ? '取得成功' : '取得失敗/null',
        plus: plusData ? '取得成功' : '取得失敗/null'
      });

      populateAllTabsWithData(overviewData, skillsData, lifestyleData, futureData, plusData);
      console.log('lifestyleData (after populate):', lifestyleData);

      // グローバル変数を設定（tabs-plus.jsで使用）
      window.currentPageId = profileData.id || 'default-page';
      window.profileData = profileData; // 既存のprofileDataをwindowオブジェクトにも設定

      showLoadingIndicator(false);
      console.log('埋め込みデータの処理が完了しました');

    } else {
      console.error('window.profileDataが見つかりません。データがHTMLに正しく埋め込まれていません。');
      showError('表示するデータが見つかりませんでした。ページを再読み込みするか、管理者に連絡してください。');
      showLoadingIndicator(false);
    }
  } catch (error) {
    console.error('埋め込みデータの処理中にエラーが発生しました:', error);
    showError(`データの表示中にエラーが発生しました: ${error.message}`);
    showLoadingIndicator(false);
  }
}

/**
 * プロファイル情報（ヘッダー部分）を更新
 * @param {Object} userInfo - ユーザー情報オブジェクト
 */
function updateProfileInfo(userInfo) {
    if (!userInfo) {
        console.error('updateProfileInfo: userInfoがnullまたはundefinedです');
        return;
    }

    // 姓名を取得
    const familyName = userInfo.familyName || '';
    const firstName = userInfo.firstName || '';
    // nameを優先的に使用し、ない場合は姓名から生成
    const fullName = userInfo.name || `${familyName} ${firstName}`.trim();

    console.log('プロファイル情報更新詳細:', {
        familyName,
        firstName,
        fullName,
        birthDate: userInfo.birthDate,
        gender: userInfo.gender,
        analysisDate: userInfo.analysisDate
    });

    // ヘッダー情報を更新
    const nameElement = document.getElementById('person-name');
    if (nameElement) {
        // タイトルは「総合プロファイリング」のみを表示
        nameElement.textContent = '総合プロファイリング';
        console.log('タイトルを更新しました:', nameElement.textContent);
    } else {
        console.error('person-name要素が見つかりません');
    }

    // 氏名欄を更新
    const fullNameElement = document.getElementById('full-name');
    if (fullNameElement) {
        fullNameElement.textContent = fullName || '';
        console.log('氏名要素を更新しました:', fullNameElement.textContent);
    } else {
        console.error('full-name要素が見つかりません');
    }

    // 生年月日欄を更新
    const birthElement = document.getElementById('birth-date');
    if (birthElement) {
        birthElement.textContent = userInfo.birthDate || '';
        console.log('生年月日要素を更新しました:', birthElement.textContent);
    } else {
        console.error('birth-date要素が見つかりません');
    }

    // 性別欄を更新
    const genderElement = document.getElementById('gender');
    if (genderElement) {
        // 性別の表示形式を調整
        let displayGender = userInfo.gender || '';
        if (displayGender === 'male') {
            displayGender = '男性';
        } else if (displayGender === 'female') {
            displayGender = '女性';
        }
        genderElement.textContent = displayGender;
        console.log('性別要素を更新しました:', genderElement.textContent);
    } else {
        console.error('gender要素が見つかりません');
    }

    // 分析日欄を更新
    const analysisElement = document.getElementById('analysis-date');
    if (analysisElement) {
        // 常に年月日形式で表示
        let analysisDate = userInfo.analysisDate || '';
        if (!analysisDate) {
            const now = new Date();
            analysisDate = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
        } else if (!analysisDate.includes('日')) {
            // 日付の部分がない場合、現在の日付を使用
            const now = new Date();
            if (analysisDate.match(/^\d{4}年\d{1,2}月$/)) {
                analysisDate = `${analysisDate}${now.getDate()}日`;
            }
        }
        analysisElement.textContent = analysisDate;
        console.log('分析日要素を更新しました:', analysisElement.textContent);
    } else {
        console.error('analysis-date要素が見つかりません');
    }
}

/**
 * 基本情報を更新
 */
function updateBasicInfo() {
    if (!profileData) {
        return;
    }

    // 姓名を取得
    const familyName = profileData.familyName || '';
    const firstName = profileData.firstName || '';
    const fullName = profileData.name || `${familyName} ${firstName}`;

    // タイトルは「総合プロファイリング」のみを表示
    const nameElement = document.getElementById('person-name');
    if (nameElement) {
        nameElement.textContent = '総合プロファイリング';
    }

    // 氏名欄を更新
    const fullNameElement = document.getElementById('full-name');
    if (fullNameElement) {
        fullNameElement.textContent = fullName || '';
    }

    const birthElement = document.getElementById('birth-date');
    if (birthElement) {
        birthElement.textContent = profileData.birthDate || '';
    }

    const genderElement = document.getElementById('gender');
    if (genderElement) {
        // 性別の表示形式を調整
        let displayGender = profileData.gender || '';
        if (displayGender === 'male') {
            displayGender = '男性';
        } else if (displayGender === 'female') {
            displayGender = '女性';
        }
        genderElement.textContent = displayGender;
    }

    const analysisElement = document.getElementById('analysis-date');
    if (analysisElement) {
        // 常に年月日形式で表示
        let analysisDate = profileData.analysisDate || '';

        // 分析日がない場合は現在の日付を使用
        if (!analysisDate) {
            const now = new Date();
            analysisDate = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
        } else if (!analysisDate.includes('日')) {
            // 日付の部分がない場合、現在の日付を使用
            const now = new Date();
            if (analysisDate.match(/^\d{4}年\d{1,2}月$/)) {
                analysisDate = `${analysisDate}${now.getDate()}日`;
            }
        }

        analysisElement.textContent = analysisDate;
    }
}

/**
 * ★ 修正: 全タブのデータを設定 (引数でデータを受け取るように変更)
 */
function populateAllTabsWithData(overview, skills, lifestyle, future, plus) {
    console.log('全タブのデータを設定します (引数データ使用)');

    try {
        // --- 新フィールドの有無をデバッグ出力 ---
        if (overview) {
            console.log('[overview] beautyAcupunctureNeeds:', Array.isArray(overview.beautyAcupunctureNeeds) ? 'あり' : 'なし');
        } else {
            console.warn('人物概要データがありません');
        }
        if (skills) {
            console.log('[skills] customerPersonality:', skills.customerPersonality ? 'あり' : 'なし');
        } else {
            console.warn('能力評価データがありません');
        }
        if (lifestyle) {
            console.log('[lifestyle] customerPersonality:', lifestyle.customerPersonality ? 'あり' : 'なし');
            console.log('[lifestyle] beautyAcupunctureMotivations:', Array.isArray(lifestyle.beautyAcupunctureMotivations) ? 'あり' : 'なし');
        } else {
            console.warn('美容施術提案データがありません');
        }
        if (future) {
            console.log('[future] customerPersonality:', future.customerPersonality ? 'あり' : 'なし');
            console.log('[future] beautyAcupunctureContinuityMotivations:', Array.isArray(future.beautyAcupunctureContinuityMotivations) ? 'あり' : 'なし');
        } else {
            console.warn('未来予測データがありません');
        }

        // --- 既存の各タブ呼び出し ---
        if (overview) {
            populateOverviewTab(overview);
        }
        if (skills) {
            populateSkillsTab(skills);
        }
        if (lifestyle) {
            populateLifeStyleTab(lifestyle);
        }
        if (future) {
            populateFutureTab(future);
        }
        if (plus) {
            populatePlusTab(plus);
        }

        console.log('全タブのデータ設定が完了しました');
    } catch (error) {
        console.error('タブデータの設定中にエラーが発生しました:', error);
        showError('データの表示中にエラーが発生しました: ' + error.message);
    }
}

/**
 * ローディングインジケータの表示/非表示
 */
function showLoadingIndicator(show) {
    console.log('ローディングインジケーター表示状態:', show ? '表示' : '非表示');

    // ローディングインジケータのHTML要素がある場合はその表示/非表示を切り替え
    const loadingElement = document.getElementById('loading-indicator');
    if (loadingElement) {
        console.log('ローディング要素が見つかりました');
        loadingElement.style.display = show ? 'block' : 'none';
    } else {
        console.warn('ローディング要素が見つかりません');
    }
}

/**
 * APIデータ構造を診断するヘルパー関数
 * @param {Object} data - 分析するAPIレスポンスデータ
 * @return {string} 診断結果のメッセージ
 */
function diagnoseApiStructure(data) {
    if (!data) {
        return "APIデータが空です";
    }

    let msg = [];
    msg.push("APIデータ構造診断:");

    // result確認
    if (!data.result) {
        msg.push("- result属性が存在しません！");
        return msg.join("\n");
    }

    // 新API構造チェック
    if (data.result.data && data.result.status) {
        msg.push("- 新API構造を検出（result.data + result.status）");

        const source = data.result.data;
        // 各セクションの存在確認
        ['overview', 'skills', 'career', 'future', 'plus'].forEach(section => {
            if (source[section]) {
                msg.push(`- ${section}セクション: 存在`);

                // 特定のキーのチェック
                if (section === 'overview') {
                    checkKeys(source[section], ['strengths', 'weaknesses', 'compatibility', 'personality', 'evaluation'], msg, section);
                } else if (section === 'skills') {
                    checkKeys(source[section], ['evaluations', 'interviewQuestions', 'warningSignals'], msg, section);
                } else if (section === 'career') {
                    checkKeys(source[section], ['lifestyle'], msg, section);
                    if (source[section].lifestyle) {
                        checkKeys(source[section].lifestyle, ['beautyAcupunctureMotivations', 'motivationScores', 'purchasePatterns', 'recommendedServices'], msg, 'career.lifestyle');
                    }
                } else if (section === 'future') {
                    checkKeys(source[section], ['timeline', 'careerProposals'], msg, section);
                } else if (section === 'plus') {
                    checkKeys(source[section], ['asCustomer', 'asSubordinate'], msg, section);
                }

                // 入れ子構造のチェック
                if (source[section][section]) {
                    msg.push(`  - 入れ子構造: ${section}.${section}が存在`);
                }

                // dataサブオブジェクトのチェック
                if (source[section].data) {
                    msg.push(`  - ${section}.dataサブオブジェクトが存在`);
                }
            } else {
                msg.push(`- ${section}セクション: 存在しません！`);
            }
        });

        // ユーザー情報のチェック
        if (source.userInfo) {
            msg.push("- userInfo: 存在");
        }
    }
    // 従来のAPI構造チェック
    else {
        msg.push("- 従来のAPI構造を検出");

        // 基本情報のチェック
        checkKeys(data.result, ['name', 'birthDate', 'gender', 'analysisDate'], msg, 'result');

        // 各タブセクションのチェック
        ['overview', 'skills', 'career', 'future', 'plus'].forEach(section => {
            if (data.result[section]) {
                msg.push(`- ${section}セクション: 存在`);
            } else {
                msg.push(`- ${section}セクション: 存在しません！`);
            }
        });
    }

    return msg.join("\n");
}

/**
 * オブジェクト内の特定のキーの存在を確認する
 * @param {Object} obj - チェック対象のオブジェクト
 * @param {Array<string>} keys - 確認するキーの配列
 * @param {Array<string>} messages - メッセージを追加する配列
 * @param {string} section - セクション名
 */
function checkKeys(obj, keys, messages, section) {
    keys.forEach(key => {
        if (obj[key]) {
            let info = `  - ${key}: 存在`;
            if (Array.isArray(obj[key])) {
                info += ` (${obj[key].length}件)`;
            }
            messages.push(info);
        } else {
            messages.push(`  - ${key}: 存在しません！`);
        }
    });
}

// グローバルスコープから診断関数を実行するためのヘルパー
window.diagnoseCurrentApiData = function() {
    try {
        const lastApiResponse = localStorage.getItem('last_api_response');
        if (lastApiResponse) {
            const data = JSON.parse(lastApiResponse);
            const diagnosisResult = diagnoseApiStructure({result: data});
            console.log(diagnosisResult);
            alert(diagnosisResult);
            return diagnosisResult;
        } else {
            alert("ローカルストレージにAPIレスポンスがありません");
            return "ローカルストレージにAPIレスポンスがありません";
        }
    } catch (e) {
        console.error("診断中にエラーが発生しました:", e);
        alert("診断中にエラーが発生しました: " + e.message);
        return "エラー: " + e.message;
    }
};

/**
 * スワイプによるタブナビゲーションを初期化
 */
function initializeSwipeNavigation() {
    const tabContainer = document.querySelector('.tab-content-container');
    if (!tabContainer) {
        console.error('Tab content container not found for swipe navigation.');
        return;
    }

    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    const swipeThreshold = 50; // Minimum distance for a swipe
    const verticalThreshold = 75; // Max vertical distance to allow swipe

    tabContainer.addEventListener('touchstart', (event) => {
        // Ignore if touching interactive elements like buttons or links inside tabs
        if (event.target.closest('button, a')) {
            return;
        }
        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;
    }, { passive: true });

    tabContainer.addEventListener('touchend', (event) => {
        if (event.target.closest('button, a')) {
            return;
        }
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
        handleSwipeGesture();
    }, { passive: true });

    function handleSwipeGesture() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Only handle horizontal swipes, ignore if vertical scroll is significant
        if (Math.abs(deltaX) > swipeThreshold && Math.abs(deltaY) < verticalThreshold) {
            const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
            const currentActiveIndex = tabButtons.findIndex(button => button.classList.contains('active'));

            if (currentActiveIndex === -1) return; // No active tab found

            let nextIndex;
            if (deltaX < 0) {
                // Swipe Left (Next Tab)
                nextIndex = (currentActiveIndex + 1) % tabButtons.length;
            } else {
                // Swipe Right (Previous Tab)
                nextIndex = (currentActiveIndex - 1 + tabButtons.length) % tabButtons.length;
            }

            console.log(`Swipe detected. Current: ${currentActiveIndex}, Next: ${nextIndex}`);
            if (tabButtons[nextIndex]) {
                tabButtons[nextIndex].click(); // Simulate click on the next/previous tab
            }
        }
    }

    console.log('Swipe navigation initialized.');
}

/**
 * 「トップに戻る」ボタンの初期化とイベントリスナー設定
 */
function initializeBackToTopButton() {
    const btn = document.getElementById('back-to-top-btn');
    if (!btn) {
        console.error('Back to top button not found.');
        return;
    }

    // スクロールイベントリスナー
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // スクロール可能な高さが存在する場合のみ計算
        const scrollableHeight = scrollHeight - clientHeight;
        if (scrollableHeight <= 0) {
            btn.classList.add('hidden');
            return;
        }

        const scrollPercent = (scrollTop / scrollableHeight) * 100;

        if (scrollPercent >= 35) { // 35%スクロールしたら表示
            btn.classList.remove('hidden');
        } else {
            btn.classList.add('hidden');
        }
    }, { passive: true }); // Performance optimization

    // クリックイベントリスナー
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // スムーズスクロール
        });
    });

    console.log('Back to Top button initialized.');
}

/**
 * スティッキータブ関連の初期化（スクロールとリサイズに対応）
 */
function initializeStickyActiveTab() {
    // スクロールイベントリスナーを追加
    window.addEventListener('scroll', handleStickyActiveTabVisibility, { passive: true });
    // リサイズイベントリスナーを追加
    window.addEventListener('resize', handleStickyActiveTabVisibility, { passive: true }); // passiveはresizeでは不要かもですが念のため

    // 初期表示状態を設定
    handleStickyActiveTabVisibility();
    console.log('Sticky active tab handler initialized for scroll and resize.');
}

/**
 * スクロール位置と画面幅に基づいてタブの表示/非表示を切り替える (改修版)
 */
function handleStickyActiveTabVisibility() {
    const tabButtonContainer = document.querySelector(".header-section .inline-flex");
    const header = document.querySelector(".header-section");

    if (!tabButtonContainer || !header) {
        return;
    }

    const tabButtons = tabButtonContainer.querySelectorAll(".tab-button");
    const scrollY = window.scrollY;
    const threshold = 5;
    const screenWidth = window.innerWidth;
    const breakpoint = 768;

    if (screenWidth < breakpoint) {
        if (scrollY > threshold) {
            tabButtons.forEach(button => {
                const isActive = button.classList.contains('active');
                if (!isActive) {
                    button.style.display = 'none';
                } else {
                    button.style.display = '';
                }
            });
        } else {
            tabButtons.forEach(button => {
                button.style.display = '';
            });
        }
    } else {
        tabButtons.forEach(button => {
            button.style.display = '';
        });
    }
}
