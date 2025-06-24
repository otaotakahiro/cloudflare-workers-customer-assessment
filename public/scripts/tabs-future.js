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
