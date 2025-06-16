/**
 * 美容施術提案タブ用の表示処理
 */

/**
 * 美容施術データの検証
 * @param {Object} career - 美容施術データ
 * @returns {boolean} データが有効な場合はtrue
 */
function validateCareerData(career) {
    // デバッグ情報の出力
    console.log('Validating career data:', {
        hasData: !!career,
        dataType: career ? typeof career : 'undefined',
        keys: career ? Object.keys(career) : [],
        motivationScores: career?.motivationScores ? {
            length: career.motivationScores.length,
            firstItem: career.motivationScores[0]
        } : null,
        purchasePatterns: career?.purchasePatterns ? {
            length: career.purchasePatterns.length,
            firstItem: career.purchasePatterns[0]
        } : null,
        investmentTendencies: career?.investmentTendencies ? {
            length: career.investmentTendencies.length,
            firstItem: career.investmentTendencies[0]
        } : null,
        recommendedServices: career?.recommendedServices ? {
            length: career.recommendedServices.length,
            firstItem: career.recommendedServices[0]
        } : null
    });

    if (!career) {
        console.error('Invalid career data: Data is null or undefined');
        return false;
    }

    // 必須フィールドの存在確認
    const requiredFields = ['motivationScores', 'purchasePatterns', 'investmentTendencies', 'recommendedServices'];
    const missingFields = requiredFields.filter(field => !career[field]);

    if (missingFields.length > 0) {
        console.error(`Invalid career data: Missing required fields: ${missingFields.join(', ')}`);
        return false;
    }

    // 各セクションのデータ構造と内容の検証
    try {
        // motivationScoresの検証
        if (!Array.isArray(career.motivationScores) || career.motivationScores.length < 3) {
            console.error('Invalid career data: motivationScores must be an array with at least 3 items');
            return false;
        }

        // 各motivationScoreの構造検証
        const invalidScores = career.motivationScores.filter(score =>
            !score.type ||
            typeof score.score !== 'number' ||
            score.score < 1 ||
            score.score > 100 ||
            !score.description ||
            score.description.trim().length < 10
        );

        if (invalidScores.length > 0) {
            console.error('Invalid career data: Some motivationScores have invalid structure or content');
            return false;
        }

        // purchasePatternsの検証
        if (!Array.isArray(career.purchasePatterns) || career.purchasePatterns.length < 2) {
            console.error('Invalid career data: purchasePatterns must be an array with at least 2 items');
            return false;
        }

        // 各purchasePatternの構造検証
        const invalidPatterns = career.purchasePatterns.filter(pattern =>
            !pattern.name ||
            !pattern.description ||
            !pattern.proposalScript ||
            pattern.description.trim().length < 10 ||
            pattern.proposalScript.trim().length < 10
        );

        if (invalidPatterns.length > 0) {
            console.error('Invalid career data: Some purchasePatterns have invalid structure or content');
            return false;
        }

        // investmentTendenciesの検証
        if (!Array.isArray(career.investmentTendencies) || career.investmentTendencies.length < 2) {
            console.error('Invalid career data: investmentTendencies must be an array with at least 2 items');
            return false;
        }

        // 各investmentTendencyの構造検証
        const invalidTendencies = career.investmentTendencies.filter(tendency =>
            !tendency.title ||
            !tendency.description ||
            tendency.description.trim().length < 10
        );

        if (invalidTendencies.length > 0) {
            console.error('Invalid career data: Some investmentTendencies have invalid structure or content');
            return false;
        }

        // recommendedServicesの検証
        if (!Array.isArray(career.recommendedServices) || career.recommendedServices.length < 3) {
            console.error('Invalid career data: recommendedServices must be an array with at least 3 items');
            return false;
        }

        // 各recommendedServiceの構造検証
        const invalidServices = career.recommendedServices.filter(service =>
            !service.name ||
            !service.description ||
            !service.proposalTiming ||
            !service.scriptExample ||
            service.description.trim().length < 10 ||
            service.scriptExample.trim().length < 10
        );

        if (invalidServices.length > 0) {
            console.error('Invalid career data: Some recommendedServices have invalid structure or content');
            return false;
        }

        // 検証結果の詳細なログ出力
        const validationResults = {
            motivationScores: {
                isArray: Array.isArray(career.motivationScores),
                length: career.motivationScores?.length || 0,
                validItems: career.motivationScores?.filter(score =>
                    score.type &&
                    typeof score.score === 'number' &&
                    score.score >= 1 &&
                    score.score <= 100 &&
                    score.description &&
                    score.description.trim().length >= 10
                ).length || 0
            },
            purchasePatterns: {
                isArray: Array.isArray(career.purchasePatterns),
                length: career.purchasePatterns?.length || 0,
                validItems: career.purchasePatterns?.filter(pattern =>
                    pattern.name &&
                    pattern.description &&
                    pattern.proposalScript &&
                    pattern.description.trim().length >= 10 &&
                    pattern.proposalScript.trim().length >= 10
                ).length || 0
            },
            investmentTendencies: {
                isArray: Array.isArray(career.investmentTendencies),
                length: career.investmentTendencies?.length || 0,
                validItems: career.investmentTendencies?.filter(tendency =>
                    tendency.title &&
                    tendency.description &&
                    tendency.description.trim().length >= 10
                ).length || 0
            },
            recommendedServices: {
                isArray: Array.isArray(career.recommendedServices),
                length: career.recommendedServices?.length || 0,
                validItems: career.recommendedServices?.filter(service =>
                    service.name &&
                    service.description &&
                    service.proposalTiming &&
                    service.scriptExample &&
                    service.description.trim().length >= 10 &&
                    service.scriptExample.trim().length >= 10
                ).length || 0
            }
        };

        console.log('Validation results:', validationResults);

        // すべての検証をパス
        return true;

    } catch (error) {
        console.error('Error validating career data:', error);
        return false;
    }
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
