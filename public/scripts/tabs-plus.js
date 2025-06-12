/**
 * プラスオンタブ用の表示処理
 */

/**
 * プラスオンタブのデータを表示
 * @param {Object} plus - プラスオンデータ
 */
export function populatePlusTab(plus) {
  if (!plus) {
    console.warn('プラスオンデータがありません');
    return;
  }

  console.log('プラスオンタブの表示処理を開始');

  // 各セクションのデータを表示
  populateAsCustomerSection(plus.asCustomer);
  populateAsSubordinateSection(plus.asSubordinate);
  populateAsLeaderSection(plus.asLeader);

  console.log('プラスオンタブの表示処理が完了');
}

/**
 * お客様としての接し方セクションを表示
 * @param {Object} asCustomer - お客様としての接し方データ
 */
function populateAsCustomerSection(asCustomer) {
  if (!asCustomer) {
    console.warn('お客様としての接し方データがありません');
    return;
  }

  // コンテナIDを確認
  const container = document.getElementById('as-customer-container');
  if (!container) {
    console.error('お客様としての接し方コンテナが見つかりません: as-customer-container');
    // 代替のコンテナを探す
    const alternativeContainer = document.getElementById('as-boss-container');
    if (alternativeContainer) {
      console.log('代替コンテナ(as-boss-container)を使用します');
      alternativeContainer.id = 'as-customer-container';
      populateAsCustomerSection(asCustomer);
      return;
    }
    return;
  }

  console.log('お客様としての接し方コンテナを取得しました。コンテンツをクリアします');

  // コンテナをクリア
  container.innerHTML = '';

  // 美容傾向
  if (asCustomer.beautyTendencies && asCustomer.beautyTendencies.length) {
    const tendenciesContainer = document.createElement('div');
    tendenciesContainer.className = 'mb-6';

    tendenciesContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 flex items-center">
        <i class="fas fa-magic text-purple-500 mr-2"></i>美容傾向
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${asCustomer.beautyTendencies.map(item => `
          <div class="border rounded-lg p-4">
            <h4 class="font-bold mb-2">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(tendenciesContainer);
  }

  // おすすめスクリプト
  if (asCustomer.recommendedScripts && asCustomer.recommendedScripts.length) {
    const scriptsContainer = document.createElement('div');
    scriptsContainer.className = 'mb-6';

    scriptsContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 flex items-center">
        <i class="fas fa-comment-dots text-blue-500 mr-2"></i>おすすめスクリプト
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${asCustomer.recommendedScripts.map(item => `
          <div class="border rounded-lg p-4">
            <h4 class="font-bold mb-2">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(scriptsContainer);
  }

  // 段階的提案
  if (asCustomer.stepByStepProposal) {
    const proposalContainer = document.createElement('div');
    proposalContainer.className = 'mb-6';

    // プロセス
    if (asCustomer.stepByStepProposal.process && asCustomer.stepByStepProposal.process.length) {
      const processSection = document.createElement('div');
      processSection.className = 'mb-6';

      processSection.innerHTML = `
        <h3 class="text-xl font-bold mb-4 flex items-center">
          <i class="fas fa-tasks text-green-500 mr-2"></i>段階的提案プロセス
        </h3>
        <div class="grid grid-cols-1 gap-4">
          ${asCustomer.stepByStepProposal.process.map((item, index) => `
            <div class="border rounded-lg p-4">
              <h4 class="font-bold mb-2">ステップ${index + 1}: ${item.step}</h4>
              <p class="text-sm">${item.description}</p>
            </div>
          `).join('')}
        </div>
      `;

      proposalContainer.appendChild(processSection);
    }

    // 高額商品ガイド
    if (asCustomer.stepByStepProposal.highEndProductGuide &&
        asCustomer.stepByStepProposal.highEndProductGuide.products) {
      const productsSection = document.createElement('div');
      productsSection.className = 'mb-6';

      productsSection.innerHTML = `
        <h3 class="text-xl font-bold mb-4 flex items-center">
          <i class="fas fa-crown text-yellow-500 mr-2"></i>高額商品ガイド
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${asCustomer.stepByStepProposal.highEndProductGuide.products.map(item => `
            <div class="border rounded-lg p-4">
              <h4 class="font-bold mb-2">${item.name}</h4>
              <p class="text-sm">${item.description}</p>
            </div>
          `).join('')}
        </div>
      `;

      proposalContainer.appendChild(productsSection);
    }

    // 特別オファー効果
    if (asCustomer.stepByStepProposal.specialOfferEffect &&
        asCustomer.stepByStepProposal.specialOfferEffect.offers) {
      const offersSection = document.createElement('div');
      offersSection.className = 'mb-6';

      offersSection.innerHTML = `
        <h3 class="text-xl font-bold mb-4 flex items-center">
          <i class="fas fa-gift text-red-500 mr-2"></i>特別オファー効果
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${asCustomer.stepByStepProposal.specialOfferEffect.offers.map(item => `
            <div class="border rounded-lg p-4">
              <h4 class="font-bold mb-2">${item.name}</h4>
              <p class="text-sm">${item.description}</p>
            </div>
          `).join('')}
        </div>
      `;

      proposalContainer.appendChild(offersSection);
    }

    container.appendChild(proposalContainer);
  }

  console.log('お客様としての接し方セクションの表示を完了しました');
}

/**
 * 部下としての接し方セクションを表示
 * @param {Object} asSubordinate - 部下としての接し方データ
 */
function populateAsSubordinateSection(asSubordinate) {
  if (!asSubordinate) {
    console.warn('部下としての接し方データがありません');
    return;
  }

  const container = document.getElementById('as-subordinate-container');
  if (!container) {
    console.error('部下としての接し方コンテナが見つかりません: as-subordinate-container');
    return;
  }

  console.log('部下としての接し方コンテナを取得しました。コンテンツをクリアします');

  // コンテナをクリア
  container.innerHTML = '';

  // 効果的なアプローチ
  if (asSubordinate.effectiveApproach && asSubordinate.effectiveApproach.length) {
    const approachContainer = document.createElement('div');
    approachContainer.className = 'mb-6';

    approachContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 flex items-center">
        <i class="fas fa-hands-helping text-green-500 mr-2"></i>効果的なアプローチ
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${asSubordinate.effectiveApproach.map(item => `
          <div class="border rounded-lg p-4">
            <h4 class="font-bold mb-2">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(approachContainer);
  }

  // 注意サイン
  if (asSubordinate.warningSignals && asSubordinate.warningSignals.length) {
    const warningContainer = document.createElement('div');
    warningContainer.className = 'mb-6';

    warningContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 flex items-center">
        <i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>注意サイン
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${asSubordinate.warningSignals.map(item => `
          <div class="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <h4 class="font-bold mb-2 text-yellow-700">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(warningContainer);
  }

  console.log('部下としての接し方セクションの表示を完了しました');
}

/**
 * リーダーとしてのアプローチセクションを表示
 * @param {Object} asLeader - リーダーとしてのアプローチデータ
 */
function populateAsLeaderSection(asLeader) {
  if (!asLeader) {
    console.warn('リーダーとしてのアプローチデータがありません');
    return;
  }

  const container = document.getElementById('as-leader-container');
  if (!container) {
    console.error('リーダーとしてのアプローチコンテナが見つかりません: as-leader-container');
    return;
  }

  console.log('リーダーとしてのアプローチコンテナを取得しました。コンテンツをクリアします');

  // コンテナをクリア
  container.innerHTML = '';

  // 目標設定
  if (asLeader.goalDirections && asLeader.goalDirections.length) {
    const goalContainer = document.createElement('div');
    goalContainer.className = 'mb-6';

    goalContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 flex items-center">
        <i class="fas fa-bullseye text-red-500 mr-2"></i>効果的な目標設定
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${asLeader.goalDirections.map(item => `
          <div class="border rounded-lg p-4">
            <h4 class="font-bold mb-2">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(goalContainer);
  }

  // チーム編成
  if (asLeader.teamComposition && asLeader.teamComposition.length) {
    const teamContainer = document.createElement('div');
    teamContainer.className = 'mb-6';

    teamContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 flex items-center">
        <i class="fas fa-users text-blue-500 mr-2"></i>理想的なチーム編成
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${asLeader.teamComposition.map(item => `
          <div class="border rounded-lg p-4">
            <h4 class="font-bold mb-2">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(teamContainer);
  }

  console.log('リーダーとしてのアプローチセクションの表示を完了しました');
}
