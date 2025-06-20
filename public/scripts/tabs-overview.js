/**
 * 人物概要タブのデータを設定するモジュール（最適化版）
 * 静的HTML + 内容挿入方式
 */

/**
 * 人物概要タブのデータを設定
 * @param {Object} overview - 人物概要データ
 */
export function populateOverviewTab(overview) {
    if (!overview) {
        console.warn('overview data is null or undefined');
        return;
    }

    console.log('Populating overview tab with data:', overview);

    // customerPersonalityは内部分析用のため表示しない
    // populateCustomerPersonality(overview.customerPersonality);

    // 顧客思考パターン
    populateCustomerThinkingPatterns(overview.customerThinkingPatterns);

    // 消費行動判断軸
    populateConsumptionDecisionAxes(overview.consumptionDecisionAxes);

    // 美容鍼施術に対する要望
    populateBeautyAcupunctureNeeds(overview.beautyAcupunctureNeeds);

    // 最適スタッフタイプ
    populateOptimalStaffTypes(overview.optimalStaffTypes);
}

/**
 * 顧客思考パターンを表示
 * @param {Array} patterns - 思考パターンデータ配列
 */
function populateCustomerThinkingPatterns(patterns) {
    if (!Array.isArray(patterns)) return;

    patterns.forEach((pattern, index) => {
        const cardId = index + 1;
        const cardEl = document.getElementById(`thinking-pattern-card-${cardId}`);

        if (!cardEl) return;

        // カードを表示
        cardEl.style.display = 'block';

        // パターン名
        const patternEl = document.getElementById(`thinking-pattern-name-${cardId}`);
        if (patternEl) {
            patternEl.textContent = pattern.pattern || '';
        }

        // レベル
        const levelEl = document.getElementById(`thinking-pattern-level-${cardId}`);
        if (levelEl) {
            levelEl.textContent = pattern.level || '';
        }

        // 説明
        const descEl = document.getElementById(`thinking-pattern-description-${cardId}`);
        if (descEl) {
            descEl.textContent = pattern.description || '';
        }

        // 決定要因
        const decisionEl = document.getElementById(`thinking-pattern-decision-factors-${cardId}`);
        if (decisionEl) {
            decisionEl.textContent = pattern.decisionFactors || '';
        }

        // 美容鍼施術への訴求
        const appealEl = document.getElementById(`thinking-pattern-beauty-acupuncture-appeal-${cardId}`);
        if (appealEl) {
            appealEl.textContent = pattern.beautyAcupunctureAppeal || '';
        }

        // 追加情報（interestTriggers, communicationPreference, satisfactionFactors, budgetJustification, commitmentMotivation）
        const additionalEl = document.getElementById(`thinking-pattern-interest-triggers-${cardId}`);
        if (additionalEl) {
            const additionalInfo = pattern.interestTriggers ||
                                  pattern.communicationPreference ||
                                  pattern.satisfactionFactors ||
                                  pattern.budgetJustification ||
                                  pattern.commitmentMotivation || '';
            additionalEl.textContent = additionalInfo;
        }
    });
}

/**
 * 顧客の性格・傾向サマリーを表示（内部分析用のため非表示）
 * @param {Object} personality - 性格データ
 */
function populateCustomerPersonality(personality) {
    // 内部分析用のため表示処理を無効化
    console.log('customerPersonality is for internal analysis only - not displaying');
    return;
}

/**
 * 美容鍼施術に対する要望を表示
 * @param {Array} needs - 要望データ配列
 */
function populateBeautyAcupunctureNeeds(needs) {
    if (!Array.isArray(needs)) return;

    needs.forEach((need, index) => {
        const cardId = index + 1;
        const cardEl = document.getElementById(`need-card-${cardId}`);

        if (!cardEl) return;

        // カードを表示
        cardEl.style.display = 'block';

        // タイトル
        const titleEl = document.getElementById(`need-title-${cardId}`);
        if (titleEl) {
            titleEl.textContent = need.need || '';
        }

        // 説明
        const descEl = document.getElementById(`need-description-${cardId}`);
        if (descEl) {
            descEl.textContent = need.description || '';
        }

        // スタッフコミュニケーション
        const commEl = document.getElementById(`need-comm-${cardId}`);
        if (commEl && need.staffCommunication) {
            commEl.innerHTML = `
                <strong>伝えるべき内容:</strong> ${need.staffCommunication.whatToConvey}<br>
                <strong>伝え方:</strong> ${need.staffCommunication.howToConvey}<br>
                <strong>タイミング:</strong> ${need.staffCommunication.timing}
            `;
        }
    });
}

/**
 * 最適スタッフタイプを表示
 * @param {Object} types - スタッフタイプデータ
 */
function populateOptimalStaffTypes(types) {
    if (!types || !Array.isArray(types.types)) return;

    types.types.forEach((type, index) => {
        const cardId = index + 1;
        const cardEl = document.getElementById(`staff-type-card-${cardId}`);

        if (!cardEl) return;

        // カードを表示
        cardEl.style.display = 'block';

        // タイトル
        const titleEl = document.getElementById(`staff-type-title-${cardId}`);
        if (titleEl) {
            titleEl.textContent = type.title || '';
        }

        // 説明
        const descEl = document.getElementById(`staff-type-description-${cardId}`);
        if (descEl) {
            descEl.textContent = type.description || '';
        }

        // タグ
        const tagsEl = document.getElementById(`staff-type-tags-${cardId}`);
        if (tagsEl && Array.isArray(type.tags)) {
            tagsEl.innerHTML = type.tags.map(tag =>
                `<span class="tag">${tag}</span>`
            ).join('');
        }

        // スクリプト例
        const scriptEl = document.getElementById(`staff-type-script-${cardId}`);
        if (scriptEl) {
            scriptEl.textContent = type.scriptExample || '';
        }
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

/**
 * 消費行動判断軸を表示
 * @param {Array} axes - 消費行動判断軸データ配列
 */
function populateConsumptionDecisionAxes(axes) {
    if (!Array.isArray(axes)) return;

    axes.forEach((axis, index) => {
        const cardId = index + 1;
        const cardEl = document.getElementById(`consumption-axis-card-${cardId}`);

        if (!cardEl) return;

        // カードを表示
        cardEl.style.display = 'block';

        // 判断軸名
        const axisEl = document.getElementById(`consumption-axis-name-${cardId}`);
        if (axisEl) {
            axisEl.textContent = axis.axis || '';
        }

        // 優先度
        const priorityEl = document.getElementById(`consumption-axis-priority-${cardId}`);
        if (priorityEl) {
            priorityEl.textContent = axis.priority || '';
        }

        // 説明
        const descEl = document.getElementById(`consumption-axis-description-${cardId}`);
        if (descEl) {
            descEl.textContent = axis.description || '';
        }

        // 決定プロセス
        const processEl = document.getElementById(`consumption-axis-process-${cardId}`);
        if (processEl) {
            processEl.textContent = axis.decisionProcess || '';
        }

        // 美容鍼施術での対応
        const contextEl = document.getElementById(`consumption-axis-context-${cardId}`);
        if (contextEl) {
            contextEl.textContent = axis.beautyAcupunctureContext || '';
        }

        // スタッフ指針
        const guidanceEl = document.getElementById(`consumption-axis-guidance-${cardId}`);
        if (guidanceEl) {
            guidanceEl.textContent = axis.staffGuidance || '';
        }
    });
}
