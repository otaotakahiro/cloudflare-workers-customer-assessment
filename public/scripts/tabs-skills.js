/**
 * 美容クリニック接客戦略タブのデータを設定するモジュール
 */

/**
 * 接客戦略タブのデータを設定
 * @param {Object} skills - 接客戦略データ
 */
export function populateSkillsTab(skills) {
    if (!skills) return;

    const container = document.getElementById('skills-content');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Create main sections
    const sections = [
        { id: 'customer-preferences', title: '顧客の好み' },
        { id: 'guidance-scripts', title: '案内スクリプト' },
        { id: 'satisfaction-indicators', title: '満足度指標' },
        { id: 'warning-signals', title: '警告サイン' }
    ];

    sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'skills-section';
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
    populateCustomerPreferences(skills.customerPreferences);
    populateGuidanceScripts(skills.guidanceScripts);
    populateSatisfactionIndicators(skills.satisfactionIndicators);
    populateWarningSignals(skills.warningSignals);
}

function populateCustomerPreferences(preferences) {
    const container = document.querySelector('#customer-preferences .section-content');
    if (!container || !preferences) return;

    const grid = document.createElement('div');
    grid.className = 'preferences-grid';

    preferences.forEach(preference => {
        const card = document.createElement('div');
        card.className = 'preference-card';

        const name = document.createElement('div');
        name.className = 'preference-name';
        name.textContent = preference.name;

        const level = document.createElement('div');
        level.className = 'preference-level';
        level.textContent = `レベル: ${preference.level}`;

        const description = document.createElement('div');
        description.className = 'preference-description';
        description.textContent = preference.description;

        const approach = document.createElement('div');
        approach.className = 'preference-approach';
        approach.textContent = preference.approachMethod;

        card.appendChild(name);
        card.appendChild(level);
        card.appendChild(description);
        card.appendChild(approach);
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

function populateGuidanceScripts(scripts) {
    const container = document.querySelector('#guidance-scripts .section-content');
    if (!container || !scripts) return;

    const grid = document.createElement('div');
    grid.className = 'scripts-grid';

    scripts.forEach(script => {
        const card = document.createElement('div');
        card.className = 'script-card';

        const situation = document.createElement('div');
        situation.className = 'script-situation';
        situation.textContent = script.situation;

        const scriptContent = document.createElement('div');
        scriptContent.className = 'script-content';
        scriptContent.textContent = script.script;

        const reaction = document.createElement('div');
        reaction.className = 'script-reaction';
        reaction.textContent = script.expectedReaction;

        const nextAction = document.createElement('div');
        nextAction.className = 'script-next-action';
        nextAction.textContent = script.nextAction;

        card.appendChild(situation);
        card.appendChild(scriptContent);
        card.appendChild(reaction);
        card.appendChild(nextAction);
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

function populateSatisfactionIndicators(indicators) {
    const container = document.querySelector('#satisfaction-indicators .section-content');
    if (!container || !indicators) return;

    const list = document.createElement('ul');
    list.className = 'indicators-list';

    indicators.forEach(indicator => {
        const item = document.createElement('li');
        item.className = 'indicator-item';
        item.textContent = indicator;
        list.appendChild(item);
    });

    container.appendChild(list);
}

function populateWarningSignals(signals) {
    const container = document.querySelector('#warning-signals .section-content');
    if (!container || !signals) return;

    const list = document.createElement('ul');
    list.className = 'signals-list';

    signals.forEach(signal => {
        const item = document.createElement('li');
        item.className = 'signal-item';
        item.textContent = signal;
        list.appendChild(item);
    });

    container.appendChild(list);
}
