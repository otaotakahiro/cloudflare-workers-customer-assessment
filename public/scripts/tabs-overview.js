/**
 * 人物概要タブのデータを設定するモジュール
 */

/**
 * 人物概要タブのデータを設定
 * @param {Object} overview - 人物概要データ
 */
export function populateOverviewTab(overview) {
    console.log('人物概要タブのデータ:', overview);

    if (!overview) {
        console.error('人物概要データが存在しません');
        return;
    }

    // 全体のコンテナを取得
    const container = document.getElementById('overview-content');
    if (!container) {
        console.error('人物概要コンテナが見つかりません');
        return;
    }

    // HTMLの既存の構造を保持するため、強みと短所のh2要素を維持
    // タイトルを追加する代わりに既存のHTMLタイトルを活用

    // 強み表示
    populateStrengths(overview.strengths);

    // 短所表示
    populateWeaknesses(overview.weaknesses);

    // 相性タイプと人物像を格納するフレックスコンテナを作成
    const flexContainer = document.createElement('div');
    flexContainer.className = 'grid grid-cols-1 md:grid-cols-2 gap-6 mt-8';
    container.appendChild(flexContainer);

    // 相性タイプと人物像のコンテナを作成
    const compatibilityContainer = document.createElement('div');
    compatibilityContainer.id = 'compatibility-container';
    flexContainer.appendChild(compatibilityContainer);

    const personalityContainer = document.createElement('div');
    personalityContainer.id = 'personality-container';
    flexContainer.appendChild(personalityContainer);

    // 相性タイプ表示
    populateCompatibility(overview.compatibility);

    // 人物像表示
    populatePersonality(overview.personality);
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
