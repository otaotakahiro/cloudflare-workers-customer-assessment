/**
 * 美容施術提案タブ用の表示処理（最適化版）
 * 静的HTML + 内容挿入方式
 */

/**
 * 美容施術データの検証
 * @param {Object} lifestyle - 美容施術データ
 * @returns {boolean} データが有効な場合はtrue
 */
function validateLifeStyleData(lifestyle) {
    // デバッグ情報の出力
    console.log('Validating lifestyle data:', {
        hasData: !!lifestyle,
        dataType: lifestyle ? typeof lifestyle : 'undefined',
        keys: lifestyle ? Object.keys(lifestyle) : [],
        beautyAcupunctureMotivations: lifestyle?.beautyAcupunctureMotivations ? {
            length: lifestyle.beautyAcupunctureMotivations.length,
            firstItem: lifestyle.beautyAcupunctureMotivations[0]
        } : null,
        motivationScores: lifestyle?.motivationScores ? {
            length: lifestyle.motivationScores.length,
            firstItem: lifestyle.motivationScores[0]
        } : null,
        purchasePatterns: lifestyle?.purchasePatterns ? {
            length: lifestyle.purchasePatterns.length,
            firstItem: lifestyle.purchasePatterns[0]
        } : null,
        recommendedServices: lifestyle?.recommendedServices ? {
            length: lifestyle.recommendedServices.length,
            firstItem: lifestyle.recommendedServices[0]
        } : null
    });

    if (!lifestyle) {
        console.error('Invalid lifestyle data: Data is null or undefined');
        return false;
    }

    // 必須フィールドの存在確認（新しい構造に対応）
    const requiredFields = ['beautyAcupunctureMotivations', 'motivationScores', 'purchasePatterns', 'recommendedServices'];
    const missingFields = requiredFields.filter(field => !lifestyle[field]);

    if (missingFields.length > 0) {
        console.error(`Invalid lifestyle data: Missing required fields: ${missingFields.join(', ')}`);
        return false;
    }

    // 各セクションのデータ構造と内容の検証
    try {
        // beautyAcupunctureMotivationsの検証
        if (!Array.isArray(lifestyle.beautyAcupunctureMotivations) || lifestyle.beautyAcupunctureMotivations.length < 1) {
            console.error('Invalid lifestyle data: beautyAcupunctureMotivations must be an array with at least 1 item');
            return false;
        }

        // 各beautyAcupunctureMotivationの構造検証
        const invalidMotivations = lifestyle.beautyAcupunctureMotivations.filter(motivation =>
            !motivation.rank ||
            !motivation.motivation ||
            !motivation.description ||
            !motivation.staffCommunication ||
            motivation.description.trim().length < 10
        );

        if (invalidMotivations.length > 0) {
            console.error('Invalid lifestyle data: Some beautyAcupunctureMotivations have invalid structure or content');
            return false;
        }

        // motivationScoresの検証
        if (!Array.isArray(lifestyle.motivationScores) || lifestyle.motivationScores.length < 3) {
            console.error('Invalid lifestyle data: motivationScores must be an array with at least 3 items');
            return false;
        }

        // 各motivationScoreの構造検証
        const invalidScores = lifestyle.motivationScores.filter(score =>
            !score.type ||
            typeof score.score !== 'number' ||
            score.score < 1 ||
            score.score > 100 ||
            !score.description ||
            score.description.trim().length < 10
        );

        if (invalidScores.length > 0) {
            console.error('Invalid lifestyle data: Some motivationScores have invalid structure or content');
            return false;
        }

        // purchasePatternsの検証
        if (!Array.isArray(lifestyle.purchasePatterns) || lifestyle.purchasePatterns.length < 2) {
            console.error('Invalid lifestyle data: purchasePatterns must be an array with at least 2 items');
            return false;
        }

        // 各purchasePatternの構造検証
        const invalidPatterns = lifestyle.purchasePatterns.filter(pattern =>
            !pattern.name ||
            !pattern.description ||
            !pattern.proposalScript ||
            pattern.description.trim().length < 10 ||
            pattern.proposalScript.trim().length < 10
        );

        if (invalidPatterns.length > 0) {
            console.error('Invalid lifestyle data: Some purchasePatterns have invalid structure or content');
            return false;
        }

        // recommendedServicesの検証
        if (!Array.isArray(lifestyle.recommendedServices) || lifestyle.recommendedServices.length < 3) {
            console.error('Invalid lifestyle data: recommendedServices must be an array with at least 3 items');
            return false;
        }

        // 各recommendedServiceの構造検証
        const invalidServices = lifestyle.recommendedServices.filter(service =>
            !service.name ||
            !service.description ||
            !service.proposalTiming ||
            !service.scriptExample ||
            service.description.trim().length < 10 ||
            service.scriptExample.trim().length < 10
        );

        if (invalidServices.length > 0) {
            console.error('Invalid lifestyle data: Some recommendedServices have invalid structure or content');
            return false;
        }

        // 検証結果の詳細なログ出力
        const validationResults = {
            beautyAcupunctureMotivations: {
                isArray: Array.isArray(lifestyle.beautyAcupunctureMotivations),
                length: lifestyle.beautyAcupunctureMotivations?.length || 0,
                validItems: lifestyle.beautyAcupunctureMotivations?.filter(motivation =>
                    motivation.rank &&
                    motivation.motivation &&
                    motivation.description &&
                    motivation.staffCommunication &&
                    motivation.description.trim().length >= 10
                ).length || 0
            },
            motivationScores: {
                isArray: Array.isArray(lifestyle.motivationScores),
                length: lifestyle.motivationScores?.length || 0,
                validItems: lifestyle.motivationScores?.filter(score =>
                    score.type &&
                    typeof score.score === 'number' &&
                    score.score >= 1 &&
                    score.score <= 100 &&
                    score.description &&
                    score.description.trim().length >= 10
                ).length || 0
            },
            purchasePatterns: {
                isArray: Array.isArray(lifestyle.purchasePatterns),
                length: lifestyle.purchasePatterns?.length || 0,
                validItems: lifestyle.purchasePatterns?.filter(pattern =>
                    pattern.name &&
                    pattern.description &&
                    pattern.proposalScript &&
                    pattern.description.trim().length >= 10 &&
                    pattern.proposalScript.trim().length >= 10
                ).length || 0
            },
            recommendedServices: {
                isArray: Array.isArray(lifestyle.recommendedServices),
                length: lifestyle.recommendedServices?.length || 0,
                validItems: lifestyle.recommendedServices?.filter(service =>
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
        console.error('Error validating lifestyle data:', error);
        return false;
    }
}

/**
 * 美容施術提案タブのデータを表示
 * @param {Object} lifestyle - 美容施術データ
 */
export function populateLifeStyleTab(lifestyle) {
    if (!lifestyle || !validateLifeStyleData(lifestyle)) {
        console.error('Invalid lifestyle data: Not beauty treatment focused');
        return;
    }

    console.log('Populating lifestyle tab with data:', lifestyle);

    // 美容鍼施術に対する購買動機
    populateBeautyAcupunctureMotivations(lifestyle.beautyAcupunctureMotivations);

    // 購買動機スコア
    populateMotivationScores(lifestyle.motivationScores);

    // 購買パターン
    populatePurchasePatterns(lifestyle.purchasePatterns);

    // 推奨サービス
    populateRecommendedServices(lifestyle.recommendedServices);
}

/**
 * 美容鍼施術に対する購買動機を表示
 * @param {Array} motivations - 購買動機データ配列
 */
function populateBeautyAcupunctureMotivations(motivations) {
    if (!Array.isArray(motivations)) return;

    motivations.forEach((motivation, index) => {
        const cardId = index + 1;
        const cardEl = document.getElementById(`motivation-card-${cardId}`);

        if (!cardEl) return;

        // カードを表示
        cardEl.style.display = 'block';

        // 動機タイトル
        const titleEl = document.getElementById(`motivation-title-${cardId}`);
        if (titleEl) {
            titleEl.textContent = motivation.motivation || '';
        }

        // 説明
        const descEl = document.getElementById(`motivation-description-${cardId}`);
        if (descEl) {
            descEl.textContent = motivation.description || '';
        }

        // スタッフコミュニケーション
        const commEl = document.getElementById(`motivation-comm-${cardId}`);
        if (commEl && motivation.staffCommunication) {
            commEl.innerHTML = `
                <strong>伝えるべき内容:</strong> ${motivation.staffCommunication.whatToConvey}<br>
                <strong>伝え方:</strong> ${motivation.staffCommunication.howToConvey}<br>
                <strong>タイミング:</strong> ${motivation.staffCommunication.timing}
            `;
        }
    });
}

/**
 * 購買動機スコアを表示
 * @param {Array} scores - スコアデータ配列
 */
function populateMotivationScores(scores) {
    if (!Array.isArray(scores)) return;

    scores.forEach((score, index) => {
        const cardId = index + 1;
        const cardEl = document.getElementById(`score-card-${cardId}`);

        if (!cardEl) return;

        // カードを表示
        cardEl.style.display = 'block';

        // スコア値
        const valueEl = document.getElementById(`score-value-${cardId}`);
        if (valueEl) {
            valueEl.textContent = score.score || '';
        }

        // タイプ
        const typeEl = document.getElementById(`score-type-${cardId}`);
        if (typeEl) {
            typeEl.textContent = score.type || '';
        }

        // 説明
        const descEl = document.getElementById(`score-description-${cardId}`);
        if (descEl) {
            descEl.textContent = score.description || '';
        }
    });
}

/**
 * 購買パターンを表示
 * @param {Array} patterns - パターンデータ配列
 */
function populatePurchasePatterns(patterns) {
    if (!Array.isArray(patterns)) return;

    patterns.forEach((pattern, index) => {
        const cardId = index + 1;
        const cardEl = document.getElementById(`pattern-card-${cardId}`);

        if (!cardEl) return;

        // カードを表示
        cardEl.style.display = 'block';

        // 名前
        const nameEl = document.getElementById(`pattern-name-${cardId}`);
        if (nameEl) {
            nameEl.textContent = pattern.name || '';
        }

        // 説明
        const descEl = document.getElementById(`pattern-description-${cardId}`);
        if (descEl) {
            descEl.textContent = pattern.description || '';
        }

        // スクリプト
        const scriptEl = document.getElementById(`pattern-script-${cardId}`);
        if (scriptEl) {
            scriptEl.textContent = pattern.proposalScript || '';
        }
    });
}

/**
 * 推奨サービスを表示
 * @param {Array} services - サービスデータ配列
 */
function populateRecommendedServices(services) {
    if (!Array.isArray(services)) return;

    services.forEach((service, index) => {
        const cardId = index + 1;
        const cardEl = document.getElementById(`service-card-${cardId}`);

        if (!cardEl) return;

        // カードを表示
        cardEl.style.display = 'block';

        // サービスの一意のIDを生成
        const serviceId = `recommended-service-${service.name?.toLowerCase().replace(/\s+/g, '-')}`;
        cardEl.id = serviceId;

        // service-cardクラスを追加
        cardEl.classList.add('service-card');

        // ローカルストレージから状態を復元
        const savedState = localStorage.getItem(serviceId);
        cardEl.dataset.completed = savedState === 'true' ? 'true' : 'false';
        if (savedState === 'true') {
            cardEl.classList.add('completed');
        }

        // サービス名
        const nameEl = document.getElementById(`service-name-${cardId}`);
        if (nameEl) {
            nameEl.textContent = service.name || '';
        }

        // 例
        const examplesEl = document.getElementById(`service-examples-${cardId}`);
        if (examplesEl) {
            examplesEl.textContent = service.examples || '';
        }

        // 説明
        const descEl = document.getElementById(`service-description-${cardId}`);
        if (descEl) {
            descEl.textContent = service.description || '';
        }

        // タイミング
        const timingEl = document.getElementById(`service-timing-${cardId}`);
        if (timingEl) {
            timingEl.textContent = service.proposalTiming || '';
        }

        // スクリプト例
        const scriptEl = document.getElementById(`service-script-${cardId}`);
        if (scriptEl) {
            scriptEl.textContent = service.scriptExample || '';
        }

        // 完了ボタンを追加
        const completionButton = document.createElement('button');
        completionButton.className = 'completion-button mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors';
        completionButton.id = `service-completion-${service.name?.toLowerCase().replace(/\s+/g, '-')}`;
        completionButton.innerHTML = savedState === 'true'
            ? '<i class="fas fa-check-circle"></i> 完了'
            : '<i class="fas fa-circle"></i> 未実行';

        if (savedState === 'true') {
            completionButton.classList.add('completed', 'bg-green-100', 'text-green-700', 'border-green-300');
        } else {
            completionButton.classList.add('bg-gray-100', 'text-gray-700', 'border-gray-300');
        }

        // 完了ボタンのクリックイベント
        completionButton.addEventListener('click', async function(e) {
            e.stopPropagation();

            const serviceCard = this.closest('.service-card');
            if (!serviceCard) {
                console.error('Service card element not found');
                showToast('カード要素が見つかりません。', 'error');
                return;
            }

            const isCompleted = serviceCard.dataset.completed === 'true';
            const newCompletedState = !isCompleted;

            try {
                const response = await fetch('/api/results/update-completion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pageId: window.currentPageId,
                        resultId: window.profileData.resultId,
                        stepId: serviceId,
                        completed: newCompletedState
                    })
                });

                if (!response.ok) {
                    throw new Error('API呼び出しに失敗しました');
                }

                serviceCard.dataset.completed = newCompletedState.toString();

                if (newCompletedState) {
                    serviceCard.classList.add('completed');
                    this.classList.add('completed', 'bg-green-100', 'text-green-700', 'border-green-300');
                    this.classList.remove('bg-gray-100', 'text-gray-700', 'border-gray-300');
                    this.innerHTML = '<i class="fas fa-check-circle"></i> 完了';
                } else {
                    serviceCard.classList.remove('completed');
                    this.classList.remove('completed', 'bg-green-100', 'text-green-700', 'border-green-300');
                    this.classList.add('bg-gray-100', 'text-gray-700', 'border-gray-300');
                    this.innerHTML = '<i class="fas fa-circle"></i> 未実行';
                }

                localStorage.setItem(serviceId, newCompletedState.toString());

            } catch (error) {
                console.error('Error updating completion status:', error);
                serviceCard.dataset.completed = isCompleted.toString();
                showToast('実行完了状態の更新に失敗しました。', 'error');
            }
        });

        // カードに完了ボタンを追加
        cardEl.appendChild(completionButton);

        // カード全体のクリックイベント
        cardEl.addEventListener('click', async function(e) {
            if (e.target === completionButton || completionButton.contains(e.target)) {
                return;
            }

            // this.datasetが存在することを確認
            if (!this || !this.dataset) {
                console.error('Card element or dataset not found');
                showToast('カード要素が見つかりません。', 'error');
                return;
            }

            const isCompleted = this.dataset.completed === 'true';
            const newCompletedState = !isCompleted;

            try {
                const response = await fetch('/api/results/update-completion', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pageId: window.currentPageId,
                        resultId: window.profileData.resultId,
                        stepId: serviceId,
                        completed: newCompletedState
                    })
                });

                if (!response.ok) {
                    throw new Error('API呼び出しに失敗しました');
                }

                this.dataset.completed = newCompletedState.toString();

                if (newCompletedState) {
                    this.classList.add('completed');
                    completionButton.classList.add('completed', 'bg-green-100', 'text-green-700', 'border-green-300');
                    completionButton.classList.remove('bg-gray-100', 'text-gray-700', 'border-gray-300');
                    completionButton.innerHTML = '<i class="fas fa-check-circle"></i> 完了';
                } else {
                    this.classList.remove('completed');
                    completionButton.classList.remove('completed', 'bg-green-100', 'text-green-700', 'border-green-300');
                    completionButton.classList.add('bg-gray-100', 'text-gray-700', 'border-gray-300');
                    completionButton.innerHTML = '<i class="fas fa-circle"></i> 未実行';
                }

                localStorage.setItem(serviceId, newCompletedState.toString());

            } catch (error) {
                console.error('Error updating completion status:', error);
                this.dataset.completed = isCompleted.toString();
                showToast('実行完了状態の更新に失敗しました。', 'error');
            }
        });
    });
}

// ページ読み込み時に実行完了状態を取得
async function loadCompletionStatus() {
  // グローバル変数の存在確認を強化
  if (!window.currentPageId || !window.profileData?.resultId) {
    console.log('pageId or resultId not available, skipping completion status load');
    console.log('window.currentPageId:', window.currentPageId);
    console.log('window.profileData:', window.profileData);
    return;
  }

  try {
    const response = await fetch(`/api/results/completion-status?pageId=${window.currentPageId}&resultId=${window.profileData.resultId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch completion status');
    }
    const { data } = await response.json();

    // 各ステップの完了状態を更新
    Object.entries(data.steps).forEach(([stepId, stepData]) => {
      const stepCard = document.getElementById(stepId);
      if (stepCard) {
        const completionButton = stepCard.querySelector('.completion-button');
        if (completionButton) {
          stepCard.dataset.completed = stepData.completed.toString();
          if (stepData.completed) {
            stepCard.classList.add('completed');
            completionButton.classList.add('completed', 'bg-green-100', 'text-green-700', 'border-green-300');
            completionButton.classList.remove('bg-gray-100', 'text-gray-700', 'border-gray-300');
            completionButton.innerHTML = '<i class="fas fa-check-circle"></i> 完了';
          }
        }
      }
    });

    // 推奨サービスの完了状態を更新
    document.querySelectorAll('.service-card').forEach(card => {
      const stepId = card.id;
      const savedState = localStorage.getItem(stepId);
      if (savedState === 'true') {
        card.dataset.completed = 'true';
        card.classList.add('completed');
        const button = card.querySelector('.completion-button');
        if (button) {
          button.classList.add('completed', 'bg-green-100', 'text-green-700', 'border-green-300');
          button.classList.remove('bg-gray-100', 'text-gray-700', 'border-gray-300');
          button.innerHTML = '<i class="fas fa-check-circle"></i> 完了';
        }
      }
    });

  } catch (error) {
    console.error('Error loading completion status:', error);
    // エラー時はローカルストレージのデータを使用
    document.querySelectorAll('.service-card').forEach(card => {
      const stepId = card.id;
      const savedState = localStorage.getItem(stepId);
      if (savedState === 'true') {
        card.dataset.completed = 'true';
        card.classList.add('completed');
        const button = card.querySelector('.completion-button');
        if (button) {
          button.classList.add('completed', 'bg-green-100', 'text-green-700', 'border-green-300');
          button.classList.remove('bg-gray-100', 'text-gray-700', 'border-gray-300');
          button.innerHTML = '<i class="fas fa-check-circle"></i> 完了';
        }
      }
    });
  }
}

// DOMContentLoadedイベントで実行完了状態を読み込む
document.addEventListener('DOMContentLoaded', () => {
  loadCompletionStatus();
});
