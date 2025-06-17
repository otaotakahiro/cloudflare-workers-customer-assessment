/**
 * 美容クリニック接客戦略タブのデータを設定するモジュール（最適化版）
 * 静的HTML + 内容挿入方式
 */

/**
 * 接客戦略タブのデータを設定
 * @param {Object} skills - 接客戦略データ
 */
export function populateSkillsTab(skills) {
    if (!skills) return;

    console.log('Populating skills tab with data:', skills);

    // 顧客の好み
    populateCustomerPreferences(skills.customerPreferences);

    // 案内スクリプト
    populateGuidanceScripts(skills.guidanceScripts);

    // 満足度指標
    populateSatisfactionIndicators(skills.satisfactionIndicators);

    // 警告サイン
    populateWarningSignals(skills.warningSignals);
}

/**
 * 顧客の好みを表示
 * @param {Array} preferences - 好みデータ配列
 */
function populateCustomerPreferences(preferences) {
    if (!Array.isArray(preferences)) return;

    preferences.forEach((preference, index) => {
        const cardId = index + 1;
        const cardEl = document.getElementById(`preference-card-${cardId}`);

        if (!cardEl) return;

        // カードを表示
        cardEl.style.display = 'block';

        // 名前
        const nameEl = document.getElementById(`preference-name-${cardId}`);
        if (nameEl) {
            nameEl.textContent = preference.name || '';
        }

        // レベル
        const levelEl = document.getElementById(`preference-level-${cardId}`);
        if (levelEl) {
            levelEl.textContent = `レベル: ${preference.level || ''}`;
        }

        // 説明
        const descEl = document.getElementById(`preference-description-${cardId}`);
        if (descEl) {
            descEl.textContent = preference.description || '';
        }

        // アプローチ方法
        const approachEl = document.getElementById(`preference-approach-${cardId}`);
        if (approachEl) {
            approachEl.textContent = preference.approachMethod || '';
        }

        const beautyAcupunctureContextEl = document.getElementById(`preference-beautyAcupunctureContext-${cardId}`);
        if (beautyAcupunctureContextEl) {
            beautyAcupunctureContextEl.textContent = preference.beautyAcupunctureContext || '';
        }
    });
}

/**
 * 案内スクリプトを表示
 * @param {Array} scripts - スクリプトデータ配列
 */
function populateGuidanceScripts(scripts) {
    if (!Array.isArray(scripts)) return;

    scripts.forEach((script, index) => {
        const cardId = index + 1;
        const cardEl = document.getElementById(`script-card-${cardId}`);

        if (!cardEl) return;

        // カードを表示
        cardEl.style.display = 'block';

        // 状況
        const situationEl = document.getElementById(`script-situation-${cardId}`);
        if (situationEl) {
            situationEl.textContent = script.situation || '';
        }

        // スクリプト内容
        const contentEl = document.getElementById(`script-content-${cardId}`);
        if (contentEl) {
            contentEl.textContent = script.script || '';
        }

        // 期待される反応
        const reactionEl = document.getElementById(`script-reaction-${cardId}`);
        if (reactionEl) {
            reactionEl.textContent = script.expectedReaction || '';
        }

        // 次のアクション
        const nextActionEl = document.getElementById(`script-next-action-${cardId}`);
        if (nextActionEl) {
            nextActionEl.textContent = script.nextAction || '';
        }
    });
}

/**
 * 満足度指標を表示
 * @param {Array} indicators - 満足度指標データ配列
 */
function populateSatisfactionIndicators(indicators) {
    if (!Array.isArray(indicators)) return;

    const listEl = document.getElementById('indicators-list');
    if (!listEl) return;

    listEl.innerHTML = '';

    indicators.forEach(indicator => {
        const item = document.createElement('li');
        item.className = 'indicator-item';

        // オブジェクトの場合は適切なプロパティを表示
        if (typeof indicator === 'object' && indicator !== null) {
            const indicatorText = indicator.indicator || '';
            const beautyAcupunctureContext = indicator.beautyAcupunctureContext || '';
            const staffResponse = indicator.staffResponse || '';

            item.innerHTML = `
                <div class="indicator-content">
                    <div class="indicator-title"><strong>${indicatorText}</strong></div>
                    <div class="indicator-context">美容鍼施術でのサイン: ${beautyAcupunctureContext}</div>
                    <div class="indicator-response">スタッフ対応: ${staffResponse}</div>
                </div>
            `;
        } else {
            // 文字列の場合はそのまま表示
            item.textContent = indicator;
        }

        listEl.appendChild(item);
    });
}

/**
 * 警告サインを表示
 * @param {Array} signals - 警告サインデータ配列
 */
function populateWarningSignals(signals) {
    if (!Array.isArray(signals)) return;

    const listEl = document.getElementById('signals-list');
    if (!listEl) return;

    listEl.innerHTML = '';

    signals.forEach(signal => {
        const item = document.createElement('li');
        item.className = 'signal-item';

        // オブジェクトの場合は適切なプロパティを表示
        if (typeof signal === 'object' && signal !== null) {
            const signalText = signal.signal || '';
            const beautyAcupunctureContext = signal.beautyAcupunctureContext || '';
            const staffResponse = signal.staffResponse || '';

            item.innerHTML = `
                <div class="signal-content">
                    <div class="signal-title"><strong>${signalText}</strong></div>
                    <div class="signal-context">美容鍼施術でのサイン: ${beautyAcupunctureContext}</div>
                    <div class="signal-response">スタッフ対応: ${staffResponse}</div>
                </div>
            `;
        } else {
            // 文字列の場合はそのまま表示
            item.textContent = signal;
        }

        listEl.appendChild(item);
    });
}
