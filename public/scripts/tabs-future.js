/**
 * リピート促進・フォローアップ戦略タブ用の表示処理
 */

/**
 * リピート促進・フォローアップ戦略タブのデータを表示
 * @param {Object} future - リピート促進・フォローアップ戦略データ
 */
export function populateFutureTab(future) {
  if (!future) return;

  const container = document.getElementById('future-content');
  if (!container) return;

  // Clear existing content
  container.innerHTML = '';

  // Create main sections
  const sections = [
    { id: 'continuity-motivation', title: '継続動機' },
    { id: 'repeat-acquisition', title: 'リピート獲得' },
    { id: 'relationship-building', title: '関係構築' }
  ];

  sections.forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'future-section';
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
  populateContinuityMotivation(future.continuityMotivation);
  populateRepeatAcquisitionScripts(future.repeatAcquisitionScripts);
  populateRelationshipBuilding(future.relationshipBuilding);
}

function populateContinuityMotivation(motivation) {
  const container = document.querySelector('#continuity-motivation .section-content');
  if (!container || !motivation) return;

  // Primary Motives
  const primaryMotivesDiv = document.createElement('div');
  primaryMotivesDiv.className = 'primary-motives';

  const motivesTitle = document.createElement('h3');
  motivesTitle.className = 'subsection-title';
  motivesTitle.textContent = '主要な継続動機';
  primaryMotivesDiv.appendChild(motivesTitle);

  const motivesGrid = document.createElement('div');
  motivesGrid.className = 'motives-grid';

  motivation.primaryMotives.forEach(motive => {
    const card = document.createElement('div');
    card.className = 'motive-card';

    const type = document.createElement('div');
    type.className = 'motive-type';
    type.textContent = motive.type;

    const strength = document.createElement('div');
    strength.className = 'motive-strength';
    strength.textContent = `強度: ${motive.strength}`;

    const description = document.createElement('div');
    description.className = 'motive-description';
    description.textContent = motive.description;

    const approach = document.createElement('div');
    approach.className = 'motive-approach';
    approach.textContent = motive.approachMethod;

    card.appendChild(type);
    card.appendChild(strength);
    card.appendChild(description);
    card.appendChild(approach);
    motivesGrid.appendChild(card);
  });

  primaryMotivesDiv.appendChild(motivesGrid);
  container.appendChild(primaryMotivesDiv);

  // Retention Strategy
  const strategyDiv = document.createElement('div');
  strategyDiv.className = 'retention-strategy';

  const strategyTitle = document.createElement('h3');
  strategyTitle.className = 'subsection-title';
  strategyTitle.textContent = '継続戦略';
  strategyDiv.appendChild(strategyTitle);

  const strategyContent = document.createElement('div');
  strategyContent.className = 'strategy-content';

  const visitCycle = document.createElement('div');
  visitCycle.className = 'strategy-item';
  visitCycle.innerHTML = `<strong>推奨来店周期:</strong> ${motivation.retentionStrategy.visitCycle}`;

  const optimalTiming = document.createElement('div');
  optimalTiming.className = 'strategy-item';
  optimalTiming.innerHTML = `<strong>最適なアプローチタイミング:</strong> ${motivation.retentionStrategy.optimalTiming}`;

  const keyPoints = document.createElement('div');
  keyPoints.className = 'strategy-item';
  keyPoints.innerHTML = `
    <strong>継続促進のポイント:</strong>
    <ul>
      ${motivation.retentionStrategy.keyPoints.map(point => `<li>${point}</li>`).join('')}
    </ul>
  `;

  strategyContent.appendChild(visitCycle);
  strategyContent.appendChild(optimalTiming);
  strategyContent.appendChild(keyPoints);
  strategyDiv.appendChild(strategyContent);
  container.appendChild(strategyDiv);
}

function populateRepeatAcquisitionScripts(scripts) {
  const container = document.querySelector('#repeat-acquisition .section-content');
  if (!container || !scripts) return;

  const grid = document.createElement('div');
  grid.className = 'scripts-grid';

  scripts.forEach(script => {
    const card = document.createElement('div');
    card.className = 'script-card';

    const timing = document.createElement('div');
    timing.className = 'script-timing';
    timing.textContent = script.timing;

    const scriptContent = document.createElement('div');
    scriptContent.className = 'script-content';
    scriptContent.textContent = script.script;

    const effect = document.createElement('div');
    effect.className = 'script-effect';
    effect.textContent = script.expectedEffect;

    const followUp = document.createElement('div');
    followUp.className = 'script-followup';
    followUp.textContent = script.followUpAction;

    card.appendChild(timing);
    card.appendChild(scriptContent);
    card.appendChild(effect);
    card.appendChild(followUp);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function populateRelationshipBuilding(building) {
  const container = document.querySelector('#relationship-building .section-content');
  if (!container || !building) return;

  const content = document.createElement('div');
  content.className = 'relationship-content';

  // Communication Style
  const styleDiv = document.createElement('div');
  styleDiv.className = 'communication-style';
  styleDiv.innerHTML = `
    <h3 class="subsection-title">コミュニケーションスタイル</h3>
    <p>${building.communicationStyle}</p>
  `;
  content.appendChild(styleDiv);

  // Trust Factors
  const trustDiv = document.createElement('div');
  trustDiv.className = 'trust-factors';
  trustDiv.innerHTML = `
    <h3 class="subsection-title">信頼関係構築要因</h3>
    <ul>
      ${building.trustFactors.map(factor => `<li>${factor}</li>`).join('')}
    </ul>
  `;
  content.appendChild(trustDiv);

  // Loyalty Program
  const loyaltyDiv = document.createElement('div');
  loyaltyDiv.className = 'loyalty-program';
  loyaltyDiv.innerHTML = `
    <h3 class="subsection-title">ロイヤリティプログラム</h3>
    <p><strong>適したタイプ:</strong> ${building.loyaltyProgram.suitableType}</p>
    <h4>効果的なインセンティブ:</h4>
    <ul>
      ${building.loyaltyProgram.incentives.map(incentive => `<li>${incentive}</li>`).join('')}
    </ul>
  `;
  content.appendChild(loyaltyDiv);

  container.appendChild(content);
}
