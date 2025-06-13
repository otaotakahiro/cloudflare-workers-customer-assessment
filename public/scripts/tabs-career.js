/**
 * 美容施術提案タブ用の表示処理
 */

/**
 * 美容施術提案タブのデータを表示
 * @param {Object} career - 美容施術データ
 */
export function populateCareerTab(career) {
  if (!career) return;

  const container = document.getElementById('career-content');
  if (!container) return;

  // Clear existing content
  container.innerHTML = '';

  // Create main sections
  const sections = [
    { id: 'motivation-scores', title: '購買動機スコア' },
    { id: 'purchase-patterns', title: '購買パターン' },
    { id: 'investment-tendencies', title: '投資傾向' },
    { id: 'recommended-services', title: '推奨サービス' }
  ];

  sections.forEach(section => {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'career-section';
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
  populateMotivationScores(career.motivationScores);
  populatePurchasePatterns(career.purchasePatterns);
  populateInvestmentTendencies(career.investmentTendencies);
  populateRecommendedServices(career.recommendedServices);
}

function populateMotivationScores(scores) {
  const container = document.querySelector('#motivation-scores .section-content');
  if (!container || !scores) return;

  const grid = document.createElement('div');
  grid.className = 'motivation-scores-grid';

  scores.forEach(score => {
    const card = document.createElement('div');
    card.className = 'motivation-score-card';

    const scoreValue = document.createElement('div');
    scoreValue.className = 'score-value';
    scoreValue.textContent = score.score;

    const type = document.createElement('div');
    type.className = 'score-type';
    type.textContent = score.type;

    const description = document.createElement('div');
    description.className = 'score-description';
    description.textContent = score.description;

    card.appendChild(scoreValue);
    card.appendChild(type);
    card.appendChild(description);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function populatePurchasePatterns(patterns) {
  const container = document.querySelector('#purchase-patterns .section-content');
  if (!container || !patterns) return;

  const grid = document.createElement('div');
  grid.className = 'purchase-patterns-grid';

  patterns.forEach(pattern => {
    const card = document.createElement('div');
    card.className = 'purchase-pattern-card';

    const name = document.createElement('div');
    name.className = 'pattern-name';
    name.textContent = pattern.name;

    const description = document.createElement('div');
    description.className = 'pattern-description';
    description.textContent = pattern.description;

    const script = document.createElement('div');
    script.className = 'pattern-script';
    script.textContent = pattern.proposalScript;

    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(script);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function populateInvestmentTendencies(tendencies) {
  const container = document.querySelector('#investment-tendencies .section-content');
  if (!container || !tendencies) return;

  const grid = document.createElement('div');
  grid.className = 'investment-tendencies-grid';

  tendencies.forEach(tendency => {
    const card = document.createElement('div');
    card.className = 'investment-tendency-card';

    const title = document.createElement('div');
    title.className = 'tendency-title';
    title.textContent = tendency.title;

    const description = document.createElement('div');
    description.className = 'tendency-description';
    description.textContent = tendency.description;

    card.appendChild(title);
    card.appendChild(description);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}

function populateRecommendedServices(services) {
  const container = document.querySelector('#recommended-services .section-content');
  if (!container || !services) return;

  const grid = document.createElement('div');
  grid.className = 'recommended-services-grid';

  services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'recommended-service-card';

    const name = document.createElement('div');
    name.className = 'service-name';
    name.textContent = service.name;

    const examples = document.createElement('div');
    examples.className = 'service-examples';
    examples.textContent = service.examples;

    const description = document.createElement('div');
    description.className = 'service-description';
    description.textContent = service.description;

    const timing = document.createElement('div');
    timing.className = 'service-timing';
    timing.textContent = service.proposalTiming;

    const script = document.createElement('div');
    script.className = 'service-script';
    script.textContent = service.scriptExample;

    card.appendChild(name);
    card.appendChild(examples);
    card.appendChild(description);
    card.appendChild(timing);
    card.appendChild(script);
    grid.appendChild(card);
  });

  container.appendChild(grid);
}
