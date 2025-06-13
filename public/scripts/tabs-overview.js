/**
 * 人物概要タブのデータを設定するモジュール
 */

/**
 * 人物概要タブのデータを設定
 * @param {Object} overview - 人物概要データ
 */
export function populateOverviewTab(overview) {
    if (!overview) return;

    const container = document.getElementById('overview-content');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Create main sections
    const sections = [
        { id: 'satisfaction-factors', title: '満足要因' },
        { id: 'dissatisfaction-factors', title: '不満要因' },
        { id: 'optimal-staff-types', title: '最適スタッフタイプ' },
        { id: 'service-scripts', title: '接客スクリプト' }
    ];

    sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'overview-section';
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
    populateSatisfactionFactors(overview.satisfactionFactors);
    populateDissatisfactionFactors(overview.dissatisfactionFactors);
    populateOptimalStaffTypes(overview.optimalStaffTypes);
    populateServiceScripts(overview.serviceScripts);
}

function populateSatisfactionFactors(factors) {
    const container = document.querySelector('#satisfaction-factors .section-content');
    if (!container || !factors) return;

    const list = document.createElement('ul');
    list.className = 'factors-list';

    factors.forEach(factor => {
        const item = document.createElement('li');
        item.className = 'factor-item';
        item.textContent = factor;
        list.appendChild(item);
    });

    container.appendChild(list);
}

function populateDissatisfactionFactors(factors) {
    const container = document.querySelector('#dissatisfaction-factors .section-content');
    if (!container || !factors) return;

    const list = document.createElement('ul');
    list.className = 'factors-list';

    factors.forEach(factor => {
        const item = document.createElement('li');
        item.className = 'factor-item';
        item.textContent = factor;
        list.appendChild(item);
    });

    container.appendChild(list);
}

function populateOptimalStaffTypes(types) {
    const container = document.querySelector('#optimal-staff-types .section-content');
    if (!container || !types) return;

    const grid = document.createElement('div');
    grid.className = 'staff-types-grid';

    types.types.forEach(type => {
        const card = document.createElement('div');
        card.className = 'staff-type-card';

        const title = document.createElement('div');
        title.className = 'type-title';
        title.textContent = type.title;

        const description = document.createElement('div');
        description.className = 'type-description';
        description.textContent = type.description;

        const tags = document.createElement('div');
        tags.className = 'type-tags';
        type.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'tag';
            tagSpan.textContent = tag;
            tags.appendChild(tagSpan);
        });

        const script = document.createElement('div');
        script.className = 'type-script';
        script.textContent = type.scriptExample;

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(tags);
        card.appendChild(script);
        grid.appendChild(card);
    });

    container.appendChild(grid);
}

function populateServiceScripts(scripts) {
    const container = document.querySelector('#service-scripts .section-content');
    if (!container || !scripts) return;

    const sections = [
        { key: 'greeting', title: '来店時' },
        { key: 'counseling', title: 'カウンセリング時' },
        { key: 'closing', title: 'クロージング時' },
        { key: 'followUp', title: 'アフターフォロー時' }
    ];

    sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'script-section';

        const title = document.createElement('h3');
        title.className = 'script-title';
        title.textContent = section.title;

        const script = document.createElement('div');
        script.className = 'script-content';
        script.textContent = scripts[section.key].script;

        const purpose = document.createElement('div');
        purpose.className = 'script-purpose';
        purpose.textContent = scripts[section.key].purpose;

        sectionDiv.appendChild(title);
        sectionDiv.appendChild(script);
        sectionDiv.appendChild(purpose);
        container.appendChild(sectionDiv);
    });
}

/**
 * 強みリストの表示
 * @param {Array} strengths - 強みの配列
 */
function populateStrengths(strengths) {
    console.log('強みデータ:', strengths);

    if (!strengths || !strengths.length) {
        console.warn('強みデータが存在しないか空です');
        return;
    }

    const container = document.getElementById('strengths-list');
    if (!container) {
        console.error('強みコンテナが見つかりません (ID: strengths-list)');
        return;
    }

    container.innerHTML = '';
    container.className = 'mt-2';

    strengths.forEach((strength, index) => {
        console.log(`強み ${index + 1}:`, strength);
        const li = document.createElement('li');
        li.className = 'flex items-start mb-1';
        li.innerHTML = `
            <span class="mr-2">•</span>
            <span>${strength}</span>
        `;
        container.appendChild(li);
    });
}

/**
 * 短所リストの表示
 * @param {Array} weaknesses - 短所の配列
 */
function populateWeaknesses(weaknesses) {
    console.log('短所データ:', weaknesses);

    if (!weaknesses || !weaknesses.length) {
        console.warn('短所データが存在しないか空です');
        return;
    }

    const container = document.getElementById('weaknesses-list');
    if (!container) {
        console.error('短所コンテナが見つかりません (ID: weaknesses-list)');
        return;
    }

    container.innerHTML = '';
    container.className = 'mt-2';

    weaknesses.forEach((weakness, index) => {
        console.log(`短所 ${index + 1}:`, weakness);
        const li = document.createElement('li');
        li.className = 'flex items-start mb-1';
        li.innerHTML = `
            <span class="mr-2">•</span>
            <span>${weakness}</span>
        `;
        container.appendChild(li);
    });
}

/**
 * 相性タイプセクションの表示
 * @param {Object} compatibility - 相性タイプデータ
 */
function populateCompatibility(compatibility) {
    if (!compatibility || !compatibility.types || !compatibility.types.length) return;

    const container = document.getElementById('compatibility-container');
    if (!container) return;

    // コンテナをクリア
    container.innerHTML = '';

    // 相性タイプのコンテナ（白背景のカード）
    const compatibilitySection = document.createElement('div');
    compatibilitySection.className = 'bg-white rounded-lg p-5 shadow-sm';

    // アイコン付きタイトル
    const compatibilityTitle = document.createElement('h2');
    compatibilityTitle.className = 'text-xl font-bold mb-3 flex items-center text-green-700 bg-green-50 p-2 rounded-md';
    compatibilityTitle.innerHTML = '<i class="fas fa-handshake text-green-500 mr-2"></i>相性の良いスタッフタイプ';
    compatibilitySection.appendChild(compatibilityTitle);

    // コンテンツコンテナ
    const contentContainer = document.createElement('div');
    contentContainer.className = 'space-y-4';
    compatibilitySection.appendChild(contentContainer);

    // 各タイプの表示
    compatibility.types.forEach((type, index) => {
        const typeDiv = document.createElement('div');
        typeDiv.className = index < compatibility.types.length - 1 ? 'pb-4 border-b border-gray-200' : '';

        // タイトル（太字）
        const typeTitle = document.createElement('div');
        typeTitle.className = 'font-bold mb-1';
        typeTitle.textContent = type.title;
        typeDiv.appendChild(typeTitle);

        // 説明文
        const typeDesc = document.createElement('p');
        typeDesc.className = 'text-sm mb-2';
        typeDesc.textContent = type.description;
        typeDiv.appendChild(typeDesc);

        // タグの表示
        if (type.tags && type.tags.length) {
            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'flex flex-wrap gap-2 mb-2';

            type.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'inline-block bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs';
                tagSpan.textContent = tag;
                tagsContainer.appendChild(tagSpan);
            });

            typeDiv.appendChild(tagsContainer);
        }

        // 注釈がある場合
        if (type.note) {
            const noteP = document.createElement('p');
            noteP.className = 'text-xs text-gray-500 mt-1';
            noteP.textContent = type.note;
            typeDiv.appendChild(noteP);
        }

        contentContainer.appendChild(typeDiv);
    });

    container.appendChild(compatibilitySection);
}

/**
 * 人物像セクションの表示
 * @param {Object} personality - 人物像データ
 */
function populatePersonality(personality) {
    if (!personality) return;

    const container = document.getElementById('personality-container');
    if (!container) return;

    // コンテナをクリア
    container.innerHTML = '';

    // 人物像コンテナ（白背景のカード）
    const personalitySection = document.createElement('div');
    personalitySection.className = 'bg-white rounded-lg p-5 shadow-sm';

    // アイコン付きタイトル
    const personalityTitle = document.createElement('h2');
    personalityTitle.className = 'text-xl font-bold mb-3 flex items-center text-purple-700 bg-purple-50 p-2 rounded-md';
    personalityTitle.innerHTML = '<i class="fas fa-user text-purple-500 mr-2"></i>顧客特性総括';
    personalitySection.appendChild(personalityTitle);

    // コンテンツコンテナ
    const contentContainer = document.createElement('div');
    contentContainer.className = 'space-y-4';
    personalitySection.appendChild(contentContainer);

    // 人物像の要約
    if (personality.summary) {
        const summaryP = document.createElement('p');
        summaryP.className = 'mb-3';
        summaryP.textContent = personality.summary;
        contentContainer.appendChild(summaryP);
    }

    // 行動特性と印象のグリッド
    const traitsGrid = document.createElement('div');
    traitsGrid.className = 'grid grid-cols-1 gap-4 mt-2';

    // 行動特性
    if (personality.behavior) {
        const behaviorDiv = document.createElement('div');
        behaviorDiv.className = 'bg-gray-50 p-3 rounded-md border border-gray-200';

        const behaviorTitle = document.createElement('div');
        behaviorTitle.className = 'text-sm font-semibold mb-1';
        behaviorTitle.textContent = '行動特性';
        behaviorDiv.appendChild(behaviorTitle);

        const behaviorType = document.createElement('p');
        behaviorType.className = 'text-sm font-medium';
        behaviorType.textContent = personality.behavior.type || '';
        behaviorDiv.appendChild(behaviorType);

        const behaviorDesc = document.createElement('p');
        behaviorDesc.className = 'text-xs text-gray-600 mt-1';
        behaviorDesc.textContent = personality.behavior.description || '';
        behaviorDiv.appendChild(behaviorDesc);

        traitsGrid.appendChild(behaviorDiv);
    }

    // 印象
    if (personality.impression) {
        const impressionDiv = document.createElement('div');
        impressionDiv.className = 'bg-gray-50 p-3 rounded-md border border-gray-200';

        const impressionTitle = document.createElement('div');
        impressionTitle.className = 'text-sm font-semibold mb-1';
        impressionTitle.textContent = '印象';
        impressionDiv.appendChild(impressionTitle);

        const impressionType = document.createElement('p');
        impressionType.className = 'text-sm font-medium';
        impressionType.textContent = personality.impression.type || '';
        impressionDiv.appendChild(impressionType);

        const impressionDesc = document.createElement('p');
        impressionDesc.className = 'text-xs text-gray-600 mt-1';
        impressionDesc.textContent = personality.impression.description || '';
        impressionDiv.appendChild(impressionDesc);

        traitsGrid.appendChild(impressionDiv);
    }

    contentContainer.appendChild(traitsGrid);
    container.appendChild(personalitySection);
}
