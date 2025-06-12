/**
 * 美容施術提案タブ用の表示処理
 */

/**
 * 美容施術提案タブのデータを表示
 * @param {Object} career - 美容施術データ
 */
export function populateCareerTab(career) {
  if (!career) return;

  // 美容領域スコアと施術提案方法を横並びにするためのグリッドを作成
  createTopGrid(career.aptitudeScores, career.businessAreas, career.successKeywords);

  // 推奨施術・商品表示
  populateSuitableFields(career.suitableFields);
}

/**
 * 美容領域スコアと施術提案方法を横並びに表示し、投資傾向をその下に表示するグリッドを作成
 * @param {Array} scores - 美容領域スコアの配列
 * @param {Array} areas - 施術提案方法の配列
 * @param {Array} keywords - 投資傾向の配列
 */
function createTopGrid(scores, areas, keywords) {
  // 美容施術提案タブのコンテナを取得
  const careerContent = document.getElementById('career-content');
  if (!careerContent) return;

  // 既存のタイトル要素を保持
  const h2Title = careerContent.querySelector('h2');

  // 各セクションを取得
  const scoresSection = careerContent.querySelector('.mb-10:nth-child(2)');
  const areasSection = careerContent.querySelector('.mb-10:nth-child(3)');
  const keywordsSection = careerContent.querySelector('.mb-10:nth-child(4)');
  const fieldsSection = careerContent.querySelector('.mb-10:nth-child(5)');

  if (!scoresSection || !areasSection || !keywordsSection) return;

  // 既存のセクションを削除（スコア、施術提案方法、投資傾向のみ）
  careerContent.removeChild(scoresSection);
  careerContent.removeChild(areasSection);
  careerContent.removeChild(keywordsSection);

  // タイトルの後に新しいコンテナを作成
  const newContainer = document.createElement('div');
  newContainer.className = 'mb-10';

  if (h2Title) {
    h2Title.insertAdjacentElement('afterend', newContainer);
  } else {
    careerContent.prepend(newContainer);
  }

  // 1. 美容領域スコアと施術提案方法を横並びにするグリッドを作成
  const topGridContainer = document.createElement('div');
  topGridContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-6 mb-6';
  newContainer.appendChild(topGridContainer);

  // グリッドコンテナに美容領域スコアと施術提案方法のセクションを追加
  topGridContainer.appendChild(scoresSection);
  topGridContainer.appendChild(areasSection);

  // 2. 美容投資の傾向をその下に配置
  newContainer.appendChild(keywordsSection);

  // 美容領域スコア表示
  populateAptitudeScores(scores);

  // 施術提案方法表示
  populateBusinessAreas(areas);

  // 美容投資の傾向表示
  populateSuccessKeywords(keywords);
}

/**
 * 美容領域スコアの表示
 * @param {Array} scores - 美容領域スコアの配列
 */
function populateAptitudeScores(scores) {
  if (!scores || !scores.length) return;

  const container = document.getElementById('aptitude-scores-container');
  if (!container) return;

  container.innerHTML = '';

  scores.forEach(score => {
    const scoreItem = document.createElement('div');
    scoreItem.className = 'border rounded-lg p-4 mb-4';

    const progressValue = score.score / 100 * 100; // スコアを0-100%に変換

    scoreItem.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <span class="font-bold">${score.field}</span>
        <span class="font-bold text-blue-600">${score.score}点</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2.5">
        <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${progressValue}%"></div>
      </div>
    `;

    container.appendChild(scoreItem);
  });
}

/**
 * 施術提案方法の表示
 * @param {Array} areas - 施術提案方法の配列
 */
function populateBusinessAreas(areas) {
  if (!areas || !areas.length) return;

  const container = document.getElementById('business-areas-container');
  if (!container) return;

  container.innerHTML = '';

  areas.forEach(area => {
    const areaItem = document.createElement('div');
    areaItem.className = 'border rounded-lg p-4 mb-4';

    // タグを生成
    const tagsHtml = area.tags ? area.tags.map(tag =>
      `<span class="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs">${tag}</span>`
    ).join('') : '';

    // アイコンのマッピング
    const iconClass = getIconClass(area.icon);

    areaItem.innerHTML = `
      <div class="flex items-center mb-2">
        <div class="text-${getColorByIcon(area.icon)}-500 mr-2"><i class="fas fa-${iconClass}"></i></div>
        <h4 class="font-bold">${area.name}</h4>
      </div>
      <p class="text-sm mb-3">${area.description}</p>
      <div class="flex flex-wrap gap-2">
        ${tagsHtml}
      </div>
    `;

    container.appendChild(areaItem);
  });
}

/**
 * 美容投資の傾向表示
 * @param {Array} keywords - 投資傾向の配列
 */
function populateSuccessKeywords(keywords) {
  if (!keywords || !keywords.length) return;

  const container = document.getElementById('success-keywords-container');
  if (!container) return;

  // コンテナをクリア
  container.innerHTML = '';

  // グリッドレイアウトを作成
  const keywordsGrid = document.createElement('div');
  keywordsGrid.className = 'grid grid-cols-1 md:grid-cols-3 gap-4';

  keywords.forEach(keyword => {
    const keywordItem = document.createElement('div');
    keywordItem.className = `bg-${getColorByIcon(keyword.icon)}-50 rounded-lg p-4`;

    // アイコンのマッピング
    const iconClass = getIconClass(keyword.icon);

    keywordItem.innerHTML = `
      <div class="flex items-center mb-2">
        <div class="text-${getColorByIcon(keyword.icon)}-500 mr-2"><i class="fas fa-${iconClass}"></i></div>
        <h4 class="font-bold">${keyword.title}</h4>
      </div>
      <p class="text-sm">${keyword.description}</p>
    `;

    keywordsGrid.appendChild(keywordItem);
  });

  container.appendChild(keywordsGrid);
}

/**
 * 推奨施術・商品表示
 * @param {Array} fields - 推奨施術・商品の配列
 */
function populateSuitableFields(fields) {
  if (!fields || !fields.length) return;

  const container = document.getElementById('suitable-fields-container');
  if (!container) return;

  container.innerHTML = '';

  fields.forEach((field, index) => {
    const fieldItem = document.createElement('div');
    fieldItem.className = 'mb-5 border-b pb-5';
    if (index === fields.length - 1) {
      fieldItem.classList.remove('border-b');
    }

    fieldItem.innerHTML = `
      <h3 class="text-lg font-bold mb-2">${field.name}</h3>
      <p class="text-sm text-gray-600 mb-2">${field.examples}</p>
      <p class="text-sm">${field.description}</p>
    `;

    container.appendChild(fieldItem);
  });
}

/**
 * アイコン名からFontAwesomeのアイコンクラスを取得
 * @param {string} icon - アイコン名
 * @return {string} FontAwesomeのアイコンクラス
 */
function getIconClass(icon) {
  const iconMap = {
    'lightbulb': 'lightbulb',
    'graduation-cap': 'graduation-cap',
    'heart': 'heart',
    'map-marker-alt': 'map-marker-alt',
    'chart-line': 'chart-line',
    'hands-helping': 'hands-helping',
    'balance-scale': 'balance-scale',
    'mountain': 'mountain',
    'rocket': 'rocket'
  };

  return iconMap[icon] || 'circle'; // デフォルトはサークル
}

/**
 * アイコン名から色を決定
 * @param {string} icon - アイコン名
 * @return {string} Tailwind CSSの色クラス
 */
function getColorByIcon(icon) {
  const colorMap = {
    'lightbulb': 'yellow',
    'graduation-cap': 'green',
    'heart': 'purple',
    'map-marker-alt': 'red',
    'chart-line': 'blue',
    'hands-helping': 'purple',
    'balance-scale': 'green',
    'mountain': 'indigo',
    'rocket': 'orange'
  };

  return colorMap[icon] || 'blue'; // デフォルトは青
}
