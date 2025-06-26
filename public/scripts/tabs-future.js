/**
 * リピート促進・フォローアップ戦略タブ用の表示処理（最適化版）
 * 静的HTML + 内容挿入方式
 */

/**
 * リピート促進・フォローアップ戦略タブのデータを表示
 * @param {Object} future - リピート促進・フォローアップ戦略データ
 */
export function populateFutureTab(future) {
  if (!future) return;

  console.log('Populating future tab with data:', future);

  // 美容鍼施術に対する継続動機
  populateBeautyAcupunctureContinuityMotivations(future.beautyAcupunctureContinuityMotivations);

  // 継続動機
  populateContinuityMotivation(future.continuityMotivation);

  // リピート獲得
  populateRepeatAcquisitionScripts(future.repeatAcquisitionScripts);

  // 関係構築
  populateRelationshipBuilding(future.relationshipBuilding);
}

/**
 * 美容鍼施術に対する継続動機を表示
 * @param {Array} motivations - 継続動機データ配列
 */
function populateBeautyAcupunctureContinuityMotivations(motivations) {
  if (!Array.isArray(motivations)) return;

  motivations.forEach((motivation, index) => {
    const cardId = index + 1;
    const cardEl = document.getElementById(`continuity-motivation-card-${cardId}`);

    if (!cardEl) return;

    // カードを表示
    cardEl.style.display = 'block';

    // 動機タイトル
    const titleEl = document.getElementById(`continuity-motivation-title-${cardId}`);
    if (titleEl) {
      titleEl.textContent = motivation.motivation || '';
    }

    // 説明
    const descEl = document.getElementById(`continuity-motivation-description-${cardId}`);
    if (descEl) {
      descEl.textContent = motivation.description || '';
    }

    // スタッフコミュニケーション
    const commEl = document.getElementById(`continuity-motivation-comm-${cardId}`);
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
 * 継続動機を表示
 * @param {Object} motivation - 継続動機データ
 */
function populateContinuityMotivation(motivation) {
  if (!motivation) return;

  // 主要な継続動機
  if (Array.isArray(motivation.primaryMotives)) {
    motivation.primaryMotives.forEach((motive, index) => {
      const cardId = index + 1;
      const cardEl = document.getElementById(`motive-card-${cardId}`);

      if (!cardEl) return;

      // カードを表示
      cardEl.style.display = 'block';

      // タイプ
      const typeEl = document.getElementById(`motive-type-${cardId}`);
      if (typeEl) {
        typeEl.textContent = motive.type || '';
      }

      // 強度
      const strengthEl = document.getElementById(`motive-strength-${cardId}`);
      if (strengthEl) {
        strengthEl.textContent = `強度: ${motive.strength || ''}`;
      }

      // 説明
      const descEl = document.getElementById(`motive-description-${cardId}`);
      if (descEl) {
        descEl.textContent = motive.description || '';
      }

      // アプローチ方法
      const approachEl = document.getElementById(`motive-approach-${cardId}`);
      if (approachEl) {
        approachEl.textContent = motive.approachMethod || '';
      }

      // 美容鍼施術での対応
      const beautyAcupunctureContextEl = document.getElementById(`motive-beautyAcupunctureContext-${cardId}`);
      if (beautyAcupunctureContextEl) {
        beautyAcupunctureContextEl.textContent = motive.beautyAcupunctureContext || '';
      }
    });
  }

  // 継続戦略
  if (motivation.retentionStrategy) {
    const visitCycleEl = document.getElementById('visit-cycle');
    if (visitCycleEl) {
      visitCycleEl.innerHTML = `<strong>推奨来店周期:</strong> ${motivation.retentionStrategy.visitCycle || ''}`;
    }

    const optimalTimingEl = document.getElementById('optimal-timing');
    if (optimalTimingEl) {
      optimalTimingEl.innerHTML = `<strong>最適なアプローチタイミング:</strong> ${motivation.retentionStrategy.optimalTiming || ''}`;
    }

    const keyPointsEl = document.getElementById('key-points');
    if (keyPointsEl && Array.isArray(motivation.retentionStrategy.keyPoints)) {
      keyPointsEl.innerHTML = `
        <strong>継続促進のポイント:</strong>
        <ul>
          ${motivation.retentionStrategy.keyPoints.map(point => `<li>${point}</li>`).join('')}
        </ul>
      `;
    }

    const beautyAcupunctureFocusEl = document.getElementById('beauty-acupuncture-focus');
    if (beautyAcupunctureFocusEl) {
      beautyAcupunctureFocusEl.innerHTML = `<strong>美容鍼施術特化戦略:</strong> ${motivation.retentionStrategy.beautyAcupunctureFocus || ''}`;
    }
  }
}

/**
 * リピート獲得スクリプトを表示
 * @param {Array} scripts - スクリプトデータ配列
 */
function populateRepeatAcquisitionScripts(scripts) {
  if (!Array.isArray(scripts)) return;

  scripts.forEach((script, index) => {
    const cardId = index + 1;
    const cardEl = document.getElementById(`repeat-script-card-${cardId}`);

    if (!cardEl) return;

    // カードを表示
    cardEl.style.display = 'block';

    // スクリプトの一意のIDを生成
    const scriptId = `repeat-script-${script.timing?.toLowerCase().replace(/\s+/g, '-')}`;
    cardEl.id = scriptId;

    // ローカルストレージから状態を復元
    const savedState = localStorage.getItem(scriptId);
    cardEl.dataset.completed = savedState === 'true' ? 'true' : 'false';
    if (savedState === 'true') {
      cardEl.classList.add('completed');
    }

    // タイミング
    const timingEl = document.getElementById(`repeat-script-timing-${cardId}`);
    if (timingEl) {
      timingEl.innerHTML = `<strong>タイミング:</strong> ${script.timing || ''}`;
    }

    // スクリプト内容
    const contentEl = document.getElementById(`repeat-script-content-${cardId}`);
    if (contentEl) {
      contentEl.innerHTML = `<strong>スクリプト:</strong><br>${script.script || ''}`;
    }

    // 期待される効果
    const effectEl = document.getElementById(`repeat-script-effect-${cardId}`);
    if (effectEl) {
      effectEl.innerHTML = `<strong>期待される効果:</strong><br>${script.expectedEffect || ''}`;
    }

    // フォローアップアクション
    const followUpEl = document.getElementById(`repeat-script-followup-${cardId}`);
    if (followUpEl) {
      followUpEl.innerHTML = `<strong>フォローアップアクション:</strong><br>${script.followUpAction || ''}`;
    }

    // 完了ボタンを追加
    const completionButton = document.createElement('button');
    completionButton.className = 'completion-button mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors';
    completionButton.id = `repeat-script-completion-${script.timing?.toLowerCase().replace(/\s+/g, '-')}`;
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

      const scriptCard = this.closest('.repeat-script-card');
      const isCompleted = scriptCard.dataset.completed === 'true';
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
            stepId: scriptId,
            completed: newCompletedState
          })
        });

        if (!response.ok) {
          throw new Error('API呼び出しに失敗しました');
        }

        scriptCard.dataset.completed = newCompletedState.toString();

        if (newCompletedState) {
          scriptCard.classList.add('completed');
          this.classList.add('completed', 'bg-green-100', 'text-green-700', 'border-green-300');
          this.classList.remove('bg-gray-100', 'text-gray-700', 'border-gray-300');
          this.innerHTML = '<i class="fas fa-check-circle"></i> 完了';
        } else {
          scriptCard.classList.remove('completed');
          this.classList.remove('completed', 'bg-green-100', 'text-green-700', 'border-green-300');
          this.classList.add('bg-gray-100', 'text-gray-700', 'border-gray-300');
          this.innerHTML = '<i class="fas fa-circle"></i> 未実行';
        }

        localStorage.setItem(scriptId, newCompletedState.toString());

      } catch (error) {
        console.error('Error updating completion status:', error);
        scriptCard.dataset.completed = isCompleted.toString();
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
            stepId: scriptId,
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

        localStorage.setItem(scriptId, newCompletedState.toString());

      } catch (error) {
        console.error('Error updating completion status:', error);
        this.dataset.completed = isCompleted.toString();
        showToast('実行完了状態の更新に失敗しました。', 'error');
      }
    });
  });
}

/**
 * 関係構築を表示
 * @param {Object} building - 関係構築データ
 */
function populateRelationshipBuilding(building) {
  if (!building) return;

  // コミュニケーションスタイル
  if (building.communicationStyle) {
    const styleEl = document.getElementById('communication-style');
    if (styleEl) {
      styleEl.innerHTML = `
        <h3 class="subsection-title">コミュニケーションスタイル</h3>
        <p>${building.communicationStyle}</p>
      `;
    }
  }

  // 信頼関係構築要因
  if (building.trustFactors && Array.isArray(building.trustFactors)) {
    const trustEl = document.getElementById('trust-factors');
    if (trustEl) {
      trustEl.innerHTML = `
        <h3 class="subsection-title">信頼関係構築要因</h3>
        <ul>
          ${building.trustFactors.map(factor => `<li>${factor}</li>`).join('')}
        </ul>
      `;
    }
  }

  // ロイヤリティプログラム
  if (building.loyaltyProgram) {
    const loyaltyEl = document.getElementById('loyalty-program');
    if (loyaltyEl) {
      let loyaltyContent = `
        <h3 class="subsection-title">ロイヤリティプログラム</h3>
        <div class="loyalty-content">
      `;

      if (building.loyaltyProgram.suitableType) {
        loyaltyContent += `<p><strong>適したタイプ:</strong> ${building.loyaltyProgram.suitableType}</p>`;
      }

      if (building.loyaltyProgram.incentives && Array.isArray(building.loyaltyProgram.incentives)) {
        loyaltyContent += `
          <h4>効果的なインセンティブ:</h4>
          <ul>
            ${building.loyaltyProgram.incentives.map(incentive => `<li>${incentive}</li>`).join('')}
          </ul>
        `;
      }

      if (building.loyaltyProgram.benefits && Array.isArray(building.loyaltyProgram.benefits)) {
        loyaltyContent += `
          <h4>特典内容:</h4>
          <ul>
            ${building.loyaltyProgram.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
          </ul>
        `;
      }

      loyaltyContent += '</div>';
      loyaltyEl.innerHTML = loyaltyContent;
    }
  }
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

    // リピート獲得スクリプトの完了状態を更新
    document.querySelectorAll('.repeat-script-card').forEach(card => {
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
    document.querySelectorAll('.repeat-script-card').forEach(card => {
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
