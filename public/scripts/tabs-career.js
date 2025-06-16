/**
 * 美容施術提案タブ用の表示処理
 */

/**
 * 美容施術データの検証
 * @param {Object} career - 美容施術データ
 * @returns {boolean} データが有効な場合はtrue
 */
function validateCareerData(career) {
    if (!career) return false;

    // 美容施術に関連するキーワードのリスト（拡充版）
    const beautyKeywords = [
        // 施術関連
        '美容', 'エステ', 'スキンケア', 'リフトアップ', '美白', '保湿', 'シワ', 'たるみ', '毛穴', 'ニキビ',
        'フェイシャル', 'マッサージ', 'トリートメント', 'パック', 'クレンジング', '化粧水', '美容液',
        'クリーム', 'サプリメント', 'サロン', 'クリニック', '施術', '治療', 'ケア',
        // 効果関連
        '美肌', '若返り', 'アンチエイジング', '肌質改善', '肌トラブル', '肌荒れ', '乾燥', '敏感',
        'ハリ', 'ツヤ', '透明感', 'くすみ', 'シミ', 'くま', '目の下', '頬', '口元',
        // 部位関連
        '顔', '目', '頬', '口元', '額', '首', 'デコルテ', 'ボディ',
        // その他
        'メンテナンス', 'ケア', 'お手入れ', 'スキンケア', 'ビューティー', '美容', '美しさ'
    ];

    // 各項目の内容を検証
    const hasBeautyContent = (text) => {
        if (!text) return false;
        return beautyKeywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
    };

    // 必須フィールドの存在確認
    if (!career.motivationScores || !career.purchasePatterns ||
        !career.investmentTendencies || !career.recommendedServices) {
        console.error('Invalid career data: Missing required fields');
        return false;
    }

    // motivationScoresの検証
    if (career.motivationScores.length < 5) {
        console.error('Invalid career data: Insufficient motivation scores');
        return false;
    }

    // 各セクションの美容関連コンテンツ検証
    const hasValidContent =
        // motivationScoresの検証（少なくとも3つ以上のスコアに美容関連キーワードが含まれていること）
        career.motivationScores.filter(score => hasBeautyContent(score.description)).length >= 3 &&
        // purchasePatternsの検証（少なくとも2つ以上のパターンに美容関連キーワードが含まれていること）
        career.purchasePatterns.filter(pattern =>
            hasBeautyContent(pattern.description) || hasBeautyContent(pattern.proposalScript)
        ).length >= 2 &&
        // investmentTendenciesの検証（少なくとも2つ以上の傾向に美容関連キーワードが含まれていること）
        career.investmentTendencies.filter(tendency =>
            hasBeautyContent(tendency.description)
        ).length >= 2 &&
        // recommendedServicesの検証（少なくとも3つ以上のサービスに美容関連キーワードが含まれていること）
        career.recommendedServices.filter(service =>
            hasBeautyContent(service.description) || hasBeautyContent(service.scriptExample)
        ).length >= 3;

    if (!hasValidContent) {
        console.error('Invalid career data: Insufficient beauty treatment related content');
        return false;
    }

    return true;
}

/**
 * 美容施術提案タブのデータを表示
 * @param {Object} career - 美容施術データ
 */
export function populateCareerTab(career) {
    if (!career || !validateCareerData(career)) {
        console.error('Invalid career data: Not beauty treatment focused');
        return;
    }

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
