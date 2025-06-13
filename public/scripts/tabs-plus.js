/**
 * プラスオンタブ用の表示処理
 */

/**
 * プラスオンタブのデータを表示
 * @param {Object} plus - プラスオンデータ
 */
export function populatePlusTab(plus) {
  if (!plus) return;

  const container = document.getElementById('plus-content');
  if (!container) return;

  // Clear existing content
  container.innerHTML = '';

  // Create main sections
  const sections = [
    { id: 'value-system', title: '価値観システム' },
    { id: 'upsell-strategies', title: 'アップセル戦略' }
  ];

  sections.forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'plus-section';
    sectionDiv.id = section.id;

    const titleDiv = document.createElement('div');
    titleDiv.className = 'section-title';
    titleDiv.textContent = section.title;

    const contentDiv = document.createElement('div');
    contentDiv.className = 'section-content';

    sectionDiv.appendChild(titleDiv);
    sectionDiv.appendChild(contentDiv);
    container.appendChild(sectionDiv);
  });

  // Populate each section
  populateValueSystem(plus.valueSystem);
  populateUpsellStrategies(plus.upsellStrategies);
}

function populateValueSystem(system) {
  const container = document.querySelector('#value-system .section-content');
  if (!container || !system) return;

  // Investment Values
  const valuesDiv = document.createElement('div');
  valuesDiv.className = 'investment-values';

  const valuesTitle = document.createElement('h3');
  valuesTitle.className = 'subsection-title';
  valuesTitle.textContent = '投資価値観';
  valuesDiv.appendChild(valuesTitle);

  const valuesGrid = document.createElement('div');
  valuesGrid.className = 'values-grid';

  system.investmentValues.forEach(value => {
    const card = document.createElement('div');
    card.className = 'value-card';

    const type = document.createElement('div');
    type.className = 'value-type';
    type.textContent = value.type;

    const priority = document.createElement('div');
    priority.className = 'value-priority';
    priority.textContent = `優先度: ${value.priority}`;

    const description = document.createElement('div');
    description.className = 'value-description';
    description.textContent = value.description;

    const approach = document.createElement('div');
    approach.className = 'value-approach';
    approach.textContent = value.upsellApproach;

    card.appendChild(type);
    card.appendChild(priority);
    card.appendChild(description);
    card.appendChild(approach);
    valuesGrid.appendChild(card);
  });

  valuesDiv.appendChild(valuesGrid);
  container.appendChild(valuesDiv);

  // Decision Factors
  const factorsDiv = document.createElement('div');
  factorsDiv.className = 'decision-factors';

  const factorsTitle = document.createElement('h3');
  factorsTitle.className = 'subsection-title';
  factorsTitle.textContent = '決定要因';
  factorsDiv.appendChild(factorsTitle);

  const factorsList = document.createElement('ul');
  factorsList.className = 'factors-list';

  system.decisionFactors.forEach(factor => {
    const item = document.createElement('li');
    item.className = 'factor-item';
    item.textContent = factor;
    factorsList.appendChild(item);
  });

  factorsDiv.appendChild(factorsList);
  container.appendChild(factorsDiv);
}

function populateUpsellStrategies(strategies) {
  const container = document.querySelector('#upsell-strategies .section-content');
  if (!container || !strategies) return;

  // Stepwise Approach
  const stepsDiv = document.createElement('div');
  stepsDiv.className = 'stepwise-approach';

  const stepsTitle = document.createElement('h3');
  stepsTitle.className = 'subsection-title';
  stepsTitle.textContent = '段階的アプローチ';
  stepsDiv.appendChild(stepsTitle);

  const stepsList = document.createElement('div');
  stepsList.className = 'steps-list';

  strategies.stepwiseApproach.forEach(step => {
    const stepCard = document.createElement('div');
    stepCard.className = 'step-card';

    // ステップの一意のIDを生成
    const stepId = `step-${step.step.toLowerCase().replace(/\s+/g, '-')}`;
    stepCard.id = stepId;

    // ローカルストレージから状態を復元
    const savedState = localStorage.getItem(stepId);
    stepCard.dataset.completed = savedState === 'true' ? 'true' : 'false';
    if (savedState === 'true') {
      stepCard.classList.add('completed');
    }

    const stepHeader = document.createElement('div');
    stepHeader.className = 'step-header';

    const titleContainer = document.createElement('div');
    titleContainer.className = 'title-container';

    const stepTitle = document.createElement('div');
    stepTitle.className = 'step-title';
    stepTitle.textContent = step.step;

    const completionButton = document.createElement('button');
    completionButton.className = 'completion-button';
    completionButton.innerHTML = savedState === 'true'
      ? '<i class="fas fa-check-circle"></i> 完了'
      : '<i class="fas fa-circle"></i> 未実行';
    completionButton.id = `step-completion-${step.step.toLowerCase().replace(/\s+/g, '-')}`;

    if (savedState === 'true') {
      completionButton.classList.add('completed');
    }

    titleContainer.appendChild(stepTitle);
    stepHeader.appendChild(titleContainer);
    stepHeader.appendChild(completionButton);

    const method = document.createElement('div');
    method.className = 'step-method';
    method.textContent = step.method;

    const script = document.createElement('div');
    script.className = 'step-script';
    script.textContent = step.script;

    const timeline = document.createElement('div');
    timeline.className = 'step-timeline';
    timeline.textContent = step.timeline;

    stepCard.appendChild(stepHeader);
    stepCard.appendChild(method);
    stepCard.appendChild(script);
    stepCard.appendChild(timeline);

    // カード全体のクリックイベント
    stepCard.addEventListener('click', function(e) {
      // ボタン自体のクリックは無視（イベントの伝播を停止）
      if (e.target === completionButton || completionButton.contains(e.target)) {
        return;
      }

      const isCompleted = this.dataset.completed === 'true';
      this.dataset.completed = !isCompleted;

      if (!isCompleted) {
        this.classList.add('completed');
        completionButton.classList.add('completed');
        completionButton.innerHTML = '<i class="fas fa-check-circle"></i> 完了';
      } else {
        this.classList.remove('completed');
        completionButton.classList.remove('completed');
        completionButton.innerHTML = '<i class="fas fa-circle"></i> 未実行';
      }

      // 状態をローカルストレージに保存
      localStorage.setItem(stepId, (!isCompleted).toString());
    });

    stepsList.appendChild(stepCard);
  });

  stepsDiv.appendChild(stepsList);
  container.appendChild(stepsDiv);

  // Premium Service Proposals
  const premiumDiv = document.createElement('div');
  premiumDiv.className = 'premium-services';

  const premiumTitle = document.createElement('h3');
  premiumTitle.className = 'subsection-title';
  premiumTitle.textContent = 'プレミアムサービス提案';
  premiumDiv.appendChild(premiumTitle);

  const servicesGrid = document.createElement('div');
  servicesGrid.className = 'services-grid';

  strategies.premiumServiceProposal.recommendedServices.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';

    const serviceName = document.createElement('div');
    serviceName.className = 'service-name';
    serviceName.textContent = service.service;

    const reason = document.createElement('div');
    reason.className = 'service-reason';
    reason.textContent = service.reason;

    const script = document.createElement('div');
    script.className = 'service-script';
    script.textContent = service.proposalScript;

    const objection = document.createElement('div');
    objection.className = 'service-objection';
    objection.textContent = service.objectionHandling;

    serviceCard.appendChild(serviceName);
    serviceCard.appendChild(reason);
    serviceCard.appendChild(script);
    serviceCard.appendChild(objection);
    servicesGrid.appendChild(serviceCard);
  });

  premiumDiv.appendChild(servicesGrid);
  container.appendChild(premiumDiv);

  // Special Offers
  const offersDiv = document.createElement('div');
  offersDiv.className = 'special-offers';

  const offersTitle = document.createElement('h3');
  offersTitle.className = 'subsection-title';
  offersTitle.textContent = '特別オファー';
  offersDiv.appendChild(offersTitle);

  const offersGrid = document.createElement('div');
  offersGrid.className = 'offers-grid';

  strategies.specialOffers.effectiveOffers.forEach(offer => {
    const offerCard = document.createElement('div');
    offerCard.className = 'offer-card';

    const type = document.createElement('div');
    type.className = 'offer-type';
    type.textContent = offer.type;

    const description = document.createElement('div');
    description.className = 'offer-description';
    description.textContent = offer.description;

    const script = document.createElement('div');
    script.className = 'offer-script';
    script.textContent = offer.presentationScript;

    const urgency = document.createElement('div');
    urgency.className = 'offer-urgency';
    urgency.textContent = offer.urgencyFactor;

    offerCard.appendChild(type);
    offerCard.appendChild(description);
    offerCard.appendChild(script);
    offerCard.appendChild(urgency);
    offersGrid.appendChild(offerCard);
  });

  offersDiv.appendChild(offersGrid);
  container.appendChild(offersDiv);
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
