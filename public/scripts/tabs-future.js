/**
 * リピート促進・フォローアップ戦略タブ用の表示処理
 */

/**
 * リピート促進・フォローアップ戦略タブのデータを表示
 * @param {Object} future - リピート促進・フォローアップ戦略データ
 */
export function populateFutureTab(future) {
  if (!future) return;

  console.log('リピート促進・フォローアップ戦略タブの表示処理を開始');

  // リピート促進方法の表示
  populateRepeatPromotion(future.repeatPromotion);

  // フォローアップ戦略の表示
  populateFollowUpStrategy(future.followUpStrategy);

  console.log('リピート促進・フォローアップ戦略タブの表示処理が完了');
}

/**
 * リピート促進方法の表示
 * @param {Object} repeatPromotion - リピート促進データ
 */
function populateRepeatPromotion(repeatPromotion) {
  if (!repeatPromotion) {
    console.warn('リピート促進データがありません');
    return;
  }

  const container = document.getElementById('timeline-container');
  if (!container) {
    console.error('リピート促進コンテナが見つかりません: timeline-container');
    return;
  }

  console.log('リピート促進コンテナを取得しました。コンテンツをクリアします');

  // コンテナをクリア
  container.innerHTML = '';

  // タイミングセクション
  if (repeatPromotion.timing && repeatPromotion.timing.length) {
    const timingSection = document.createElement('div');
    timingSection.className = 'mb-8';

    // タイミングのタイトル
    const timingTitle = document.createElement('h3');
    timingTitle.className = 'text-xl font-bold mb-4 flex items-center text-blue-700 bg-blue-50 p-2 rounded-md';
    timingTitle.innerHTML = '<i class="fas fa-clock text-blue-500 mr-2"></i>フォローアップタイミング';
    timingSection.appendChild(timingTitle);

    // タイミングリスト
    const timingList = document.createElement('div');
    timingList.className = 'space-y-4';

    repeatPromotion.timing.forEach(item => {
      const timingItem = document.createElement('div');
      timingItem.className = 'bg-white p-4 border rounded-lg shadow-sm';

      // 期間
      const period = document.createElement('div');
      period.className = 'font-bold text-blue-600 mb-2';
      period.textContent = item.period;
      timingItem.appendChild(period);

      // 方法
      const method = document.createElement('div');
      method.className = 'mb-2';
      method.innerHTML = `<span class="font-semibold">方法：</span>${item.method}`;
      timingItem.appendChild(method);

      // 内容
      const content = document.createElement('div');
      content.className = 'mb-2';
      content.innerHTML = `<span class="font-semibold">内容：</span>${item.content}`;
      timingItem.appendChild(content);

      // 期待効果
      const effect = document.createElement('div');
      effect.className = 'text-sm text-gray-600';
      effect.innerHTML = `<span class="font-semibold">期待効果：</span>${item.expectedEffect}`;
      timingItem.appendChild(effect);

      timingList.appendChild(timingItem);
    });

    timingSection.appendChild(timingList);
    container.appendChild(timingSection);
  }

  // コミュニケーションセクション
  if (repeatPromotion.communication) {
    const communicationSection = document.createElement('div');
    communicationSection.className = 'mb-8';

    // コミュニケーションのタイトル
    const communicationTitle = document.createElement('h3');
    communicationTitle.className = 'text-xl font-bold mb-4 flex items-center text-green-700 bg-green-50 p-2 rounded-md';
    communicationTitle.innerHTML = '<i class="fas fa-comments text-green-500 mr-2"></i>コミュニケーション戦略';
    communicationSection.appendChild(communicationTitle);

    // 好ましい方法
    const preferredMethod = document.createElement('div');
    preferredMethod.className = 'bg-white p-4 border rounded-lg shadow-sm mb-4';
    preferredMethod.innerHTML = `
      <div class="font-bold text-green-600 mb-2">好ましいコミュニケーション方法</div>
      <div>${repeatPromotion.communication.preferredMethod}</div>
    `;
    communicationSection.appendChild(preferredMethod);

    // キーポイント
    if (repeatPromotion.communication.keyPoints && repeatPromotion.communication.keyPoints.length) {
      const keyPoints = document.createElement('div');
      keyPoints.className = 'bg-white p-4 border rounded-lg shadow-sm mb-4';
      keyPoints.innerHTML = `
        <div class="font-bold text-green-600 mb-2">重要なポイント</div>
        <ul class="list-disc pl-5 space-y-1">
          ${repeatPromotion.communication.keyPoints.map(point => `<li>${point}</li>`).join('')}
        </ul>
      `;
      communicationSection.appendChild(keyPoints);
    }

    // 避けるべきポイント
    if (repeatPromotion.communication.avoidPoints && repeatPromotion.communication.avoidPoints.length) {
      const avoidPoints = document.createElement('div');
      avoidPoints.className = 'bg-white p-4 border rounded-lg shadow-sm';
      avoidPoints.innerHTML = `
        <div class="font-bold text-red-600 mb-2">避けるべきポイント</div>
        <ul class="list-disc pl-5 space-y-1">
          ${repeatPromotion.communication.avoidPoints.map(point => `<li>${point}</li>`).join('')}
        </ul>
      `;
      communicationSection.appendChild(avoidPoints);
    }

    container.appendChild(communicationSection);
  }

  console.log('リピート促進方法の表示を完了しました');
}

/**
 * フォローアップ戦略の表示
 * @param {Object} followUpStrategy - フォローアップ戦略データ
 */
function populateFollowUpStrategy(followUpStrategy) {
  if (!followUpStrategy) {
    console.warn('フォローアップ戦略データがありません');
    return;
  }

  const container = document.getElementById('career-proposals-container');
  if (!container) {
    console.error('フォローアップ戦略コンテナが見つかりません: career-proposals-container');
    return;
  }

  console.log('フォローアップ戦略コンテナを取得しました。コンテンツをクリアします');

  // コンテナをクリア
  container.innerHTML = '';

  // 各期間の戦略を表示
  const periods = [
    { key: 'shortTerm', title: '短期戦略（1-3ヶ月）', icon: 'rocket', color: 'blue' },
    { key: 'mediumTerm', title: '中期戦略（3-6ヶ月）', icon: 'chart-line', color: 'green' },
    { key: 'longTerm', title: '長期戦略（6ヶ月以上）', icon: 'mountain', color: 'purple' }
  ];

  periods.forEach(period => {
    const strategy = followUpStrategy[period.key];
    if (!strategy) return;

    const strategyItem = document.createElement('div');
    strategyItem.className = 'border rounded-lg p-5 mb-5 shadow-sm';

    // タイトル部分
    const titleSection = document.createElement('div');
    titleSection.className = `text-lg font-bold mb-3 p-2 rounded-md bg-${period.color}-50 text-${period.color}-700 inline-block`;
    titleSection.innerHTML = `<i class="fas fa-${period.icon} mr-2"></i>${period.title}`;
    strategyItem.appendChild(titleSection);

    // アクションリスト
    if (strategy.actions && strategy.actions.length) {
      const actionsList = document.createElement('div');
      actionsList.className = 'mb-4';
      actionsList.innerHTML = `
        <div class="font-semibold text-gray-700 mb-2">具体的なアクション</div>
        <ul class="space-y-2 ml-6 list-disc">
          ${strategy.actions.map(action => `<li class="text-sm">${action}</li>`).join('')}
        </ul>
      `;
      strategyItem.appendChild(actionsList);
    }

    // 目標リスト
    if (strategy.goals && strategy.goals.length) {
      const goalsList = document.createElement('div');
      goalsList.innerHTML = `
        <div class="font-semibold text-gray-700 mb-2">達成目標</div>
        <ul class="space-y-2 ml-6 list-disc">
          ${strategy.goals.map(goal => `<li class="text-sm">${goal}</li>`).join('')}
        </ul>
      `;
      strategyItem.appendChild(goalsList);
    }

    container.appendChild(strategyItem);
  });

  console.log('フォローアップ戦略の表示を完了しました');
}
