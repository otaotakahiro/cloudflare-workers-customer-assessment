/**
 * プラスオンタブ用の表示処理（最適化版）
 * 静的HTML + 内容挿入方式
 */

/**
 * プラスオンタブのデータを表示
 * @param {Object} plus - プラスオンデータ
 */
export function populatePlusTab(plus) {
  if (!plus) return;

  console.log('Populating plus tab with data:', plus);

  // 価値観システム
  populateValueSystem(plus.valueSystem);

  // アップセル戦略
  populateUpsellStrategies(plus.upsellStrategies);
}

/**
 * 価値観システムを表示
 * @param {Object} system - 価値観システムデータ
 */
function populateValueSystem(system) {
  if (!system) return;

  // 投資価値観
  if (Array.isArray(system.investmentValues)) {
    system.investmentValues.forEach((value, index) => {
      const cardId = index + 1;
      const cardEl = document.getElementById(`value-card-${cardId}`);

      if (!cardEl) return;

      // カードを表示
      cardEl.style.display = 'block';

      // タイプ
      const typeEl = document.getElementById(`value-type-${cardId}`);
      if (typeEl) {
        typeEl.textContent = value.type || '';
      }

      // 優先度
      const priorityEl = document.getElementById(`value-priority-${cardId}`);
      if (priorityEl) {
        priorityEl.textContent = `優先度: ${value.priority || ''}`;
      }

      // 説明
      const descEl = document.getElementById(`value-description-${cardId}`);
      if (descEl) {
        descEl.textContent = value.description || '';
      }

      // アップセルアプローチ
      const approachEl = document.getElementById(`value-approach-${cardId}`);
      if (approachEl) {
        approachEl.textContent = value.upsellApproach || '';
      }
    });
  }

  // 決定要因
  if (Array.isArray(system.decisionFactors)) {
    const factorsListEl = document.getElementById('factors-list');
    if (factorsListEl) {
      factorsListEl.innerHTML = '';

      system.decisionFactors.forEach(factor => {
        const item = document.createElement('li');
        item.className = 'factor-item';
        item.textContent = factor;
        factorsListEl.appendChild(item);
      });
    }
  }
}

/**
 * アップセル戦略を表示
 * @param {Object} strategies - アップセル戦略データ
 */
function populateUpsellStrategies(strategies) {
  if (!strategies) return;

  // 段階的アプローチ
  populateStepwiseApproach(strategies.stepwiseApproach);

  // プレミアムサービス提案
  populatePremiumServices(strategies.premiumServiceProposal);

  // 特別オファー
  populateSpecialOffers(strategies.specialOffers);
}

/**
 * 段階的アプローチを表示
 * @param {Array} steps - ステップデータ配列
 */
function populateStepwiseApproach(steps) {
  if (!Array.isArray(steps)) return;

  steps.forEach((step, index) => {
    const cardId = index + 1;
    const cardEl = document.getElementById(`step-card-${cardId}`);

    if (!cardEl) return;

    // カードを表示
    cardEl.style.display = 'block';

    // ステップの一意のIDを生成
    const stepId = `step-${step.step.toLowerCase().replace(/\s+/g, '-')}`;
    cardEl.id = stepId;

    // ローカルストレージから状態を復元
    const savedState = localStorage.getItem(stepId);
    cardEl.dataset.completed = savedState === 'true' ? 'true' : 'false';
    if (savedState === 'true') {
      cardEl.classList.add('completed');
    }

    // ステップタイトル
    const titleEl = document.getElementById(`step-title-${cardId}`);
    if (titleEl) {
      titleEl.textContent = step.step || '';
    }

    // 完了ボタン
    const completionButton = document.getElementById(`step-completion-${cardId}`);
    if (completionButton) {
      completionButton.innerHTML = savedState === 'true'
        ? '<i class="fas fa-check-circle"></i> 完了'
        : '<i class="fas fa-circle"></i> 未実行';
      completionButton.id = `step-completion-${step.step.toLowerCase().replace(/\s+/g, '-')}`;

      if (savedState === 'true') {
        completionButton.classList.add('completed');
      }

      // 完了ボタンのクリックイベント
      completionButton.addEventListener('click', async function(e) {
        e.stopPropagation(); // カードのクリックイベントを防ぐ

        const stepCard = this.closest('.step-card');
        const isCompleted = stepCard.dataset.completed === 'true';
        const newCompletedState = !isCompleted;

        try {
          // APIを呼び出して完了状態を更新
          const response = await fetch('/api/results/update-completion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              pageId: window.currentPageId,
              resultId: window.profileData.resultId,
              stepId: stepId,
              completed: newCompletedState
            })
          });

          if (!response.ok) {
            throw new Error('API呼び出しに失敗しました');
          }

          // 成功したらUIを更新
          stepCard.dataset.completed = newCompletedState.toString();

          if (newCompletedState) {
            stepCard.classList.add('completed');
            this.classList.add('completed');
            this.innerHTML = '<i class="fas fa-check-circle"></i> 完了';
          } else {
            stepCard.classList.remove('completed');
            this.classList.remove('completed');
            this.innerHTML = '<i class="fas fa-circle"></i> 未実行';
          }

          // ローカルストレージにも保存（オフライン時のフォールバック用）
          localStorage.setItem(stepId, newCompletedState.toString());

        } catch (error) {
          console.error('Error updating completion status:', error);
          // エラー時は元の状態に戻す
          stepCard.dataset.completed = isCompleted.toString();
          showToast('実行完了状態の更新に失敗しました。', 'error');
        }
      });
    }

    // 方法
    const methodEl = document.getElementById(`step-method-${cardId}`);
    if (methodEl) {
      methodEl.textContent = step.method || '';
    }

    // スクリプト
    const scriptEl = document.getElementById(`step-script-${cardId}`);
    if (scriptEl) {
      scriptEl.textContent = step.script || '';
    }

    // タイムライン
    const timelineEl = document.getElementById(`step-timeline-${cardId}`);
    if (timelineEl) {
      timelineEl.textContent = step.timeline || '';
    }

    // カード全体のクリックイベント
    cardEl.addEventListener('click', async function(e) {
      // ボタン自体のクリックは無視（イベントの伝播を停止）
      if (e.target === completionButton || completionButton.contains(e.target)) {
        return;
      }

      const isCompleted = this.dataset.completed === 'true';
      const newCompletedState = !isCompleted;

      try {
        // APIを呼び出して完了状態を更新
        const response = await fetch('/api/results/update-completion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageId: window.currentPageId,
            resultId: window.profileData.resultId,
            stepId: stepId,
            completed: newCompletedState
          })
        });

        if (!response.ok) {
          throw new Error('API呼び出しに失敗しました');
        }

        // 成功したらUIを更新
        this.dataset.completed = newCompletedState.toString();

        if (newCompletedState) {
          this.classList.add('completed');
          completionButton.classList.add('completed');
          completionButton.innerHTML = '<i class="fas fa-check-circle"></i> 完了';
        } else {
          this.classList.remove('completed');
          completionButton.classList.remove('completed');
          completionButton.innerHTML = '<i class="fas fa-circle"></i> 未実行';
        }

        // ローカルストレージにも保存（オフライン時のフォールバック用）
        localStorage.setItem(stepId, newCompletedState.toString());

      } catch (error) {
        console.error('Error updating completion status:', error);
        // エラー時は元の状態に戻す
        this.dataset.completed = isCompleted.toString();
        showToast('実行完了状態の更新に失敗しました。', 'error');
      }
    });
  });
}

/**
 * プレミアムサービス提案を表示
 * @param {Object} premiumServices - プレミアムサービスデータ
 */
function populatePremiumServices(premiumServices) {
  if (!premiumServices || !Array.isArray(premiumServices.recommendedServices)) return;

  premiumServices.recommendedServices.forEach((service, index) => {
    const cardId = index + 1;
    const cardEl = document.getElementById(`premium-service-card-${cardId}`);

    if (!cardEl) return;

    // カードを表示
    cardEl.style.display = 'block';

    // サービスの一意のIDを生成
    const serviceId = `premium-service-${service.service?.toLowerCase().replace(/\s+/g, '-')}`;
    cardEl.id = serviceId;

    // ローカルストレージから状態を復元
    const savedState = localStorage.getItem(serviceId);
    cardEl.dataset.completed = savedState === 'true' ? 'true' : 'false';
    if (savedState === 'true') {
      cardEl.classList.add('completed');
    }

    // サービス名
    const nameEl = document.getElementById(`premium-service-name-${cardId}`);
    if (nameEl) {
      nameEl.textContent = service.service || '';
    }

    // 理由
    const reasonEl = document.getElementById(`premium-service-reason-${cardId}`);
    if (reasonEl) {
      reasonEl.textContent = service.reason || '';
    }

    // スクリプト
    const scriptEl = document.getElementById(`premium-service-script-${cardId}`);
    if (scriptEl) {
      scriptEl.textContent = service.proposalScript || '';
    }

    // 反論処理
    const objectionEl = document.getElementById(`premium-service-objection-${cardId}`);
    if (objectionEl) {
      objectionEl.textContent = service.objectionHandling || '';
    }

    // 完了ボタンを追加
    const completionButton = document.createElement('button');
    completionButton.className = 'completion-button mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors';
    completionButton.id = `premium-service-completion-${service.service?.toLowerCase().replace(/\s+/g, '-')}`;
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

      const serviceCard = this.closest('.premium-service-card');
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

/**
 * 特別オファーを表示
 * @param {Object} specialOffers - 特別オファーデータ
 */
function populateSpecialOffers(specialOffers) {
  if (!specialOffers || !Array.isArray(specialOffers.effectiveOffers)) return;

  specialOffers.effectiveOffers.forEach((offer, index) => {
    const cardId = index + 1;
    const cardEl = document.getElementById(`offer-card-${cardId}`);

    if (!cardEl) return;

    // カードを表示
    cardEl.style.display = 'block';

    // オファーの一意のIDを生成
    const offerId = `special-offer-${offer.type?.toLowerCase().replace(/\s+/g, '-')}`;
    cardEl.id = offerId;

    // ローカルストレージから状態を復元
    const savedState = localStorage.getItem(offerId);
    cardEl.dataset.completed = savedState === 'true' ? 'true' : 'false';
    if (savedState === 'true') {
      cardEl.classList.add('completed');
    }

    // タイプ
    const typeEl = document.getElementById(`offer-type-${cardId}`);
    if (typeEl) {
      typeEl.textContent = offer.type || '';
    }

    // 説明
    const descEl = document.getElementById(`offer-description-${cardId}`);
    if (descEl) {
      descEl.textContent = offer.description || '';
    }

    // スクリプト
    const scriptEl = document.getElementById(`offer-script-${cardId}`);
    if (scriptEl) {
      scriptEl.textContent = offer.presentationScript || '';
    }

    // 緊急性
    const urgencyEl = document.getElementById(`offer-urgency-${cardId}`);
    if (urgencyEl) {
      urgencyEl.textContent = offer.urgencyFactor || '';
    }

    // 完了ボタンを追加
    const completionButton = document.createElement('button');
    completionButton.className = 'completion-button mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors';
    completionButton.id = `offer-completion-${offer.type?.toLowerCase().replace(/\s+/g, '-')}`;
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

      const offerCard = this.closest('.offer-card');
      const isCompleted = offerCard.dataset.completed === 'true';
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
            stepId: offerId,
            completed: newCompletedState
          })
        });

        if (!response.ok) {
          throw new Error('API呼び出しに失敗しました');
        }

        offerCard.dataset.completed = newCompletedState.toString();

        if (newCompletedState) {
          offerCard.classList.add('completed');
          this.classList.add('completed', 'bg-green-100', 'text-green-700', 'border-green-300');
          this.classList.remove('bg-gray-100', 'text-gray-700', 'border-gray-300');
          this.innerHTML = '<i class="fas fa-check-circle"></i> 完了';
        } else {
          offerCard.classList.remove('completed');
          this.classList.remove('completed', 'bg-green-100', 'text-green-700', 'border-green-300');
          this.classList.add('bg-gray-100', 'text-gray-700', 'border-gray-300');
          this.innerHTML = '<i class="fas fa-circle"></i> 未実行';
        }

        localStorage.setItem(offerId, newCompletedState.toString());

      } catch (error) {
        console.error('Error updating completion status:', error);
        offerCard.dataset.completed = isCompleted.toString();
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
            stepId: offerId,
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

        localStorage.setItem(offerId, newCompletedState.toString());

      } catch (error) {
        console.error('Error updating completion status:', error);
        this.dataset.completed = isCompleted.toString();
        showToast('実行完了状態の更新に失敗しました。', 'error');
      }
    });
  });
}

/**
 * お客様としての接し方セクションを表示
 * @param {Object} asCustomer - お客様としての接し方データ
 */
function populateAsCustomerSection(asCustomer) {
  if (!asCustomer) {
    console.warn('お客様としての接し方データがありません');
    return;
  }

  // コンテナIDを確認
  const container = document.getElementById('as-customer-container');
  if (!container) {
    console.error('お客様としての接し方コンテナが見つかりません: as-customer-container');
    // 代替のコンテナを探す
    const alternativeContainer = document.getElementById('as-boss-container');
    if (alternativeContainer) {
      console.log('代替コンテナ(as-boss-container)を使用します');
      alternativeContainer.id = 'as-customer-container';
      populateAsCustomerSection(asCustomer);
      return;
    }
    return;
  }

  console.log('お客様としての接し方コンテナを取得しました。コンテンツをクリアします');

  // コンテナをクリア
  container.innerHTML = '';

  // 美容傾向
  if (asCustomer.beautyTendencies && asCustomer.beautyTendencies.length) {
    const tendenciesContainer = document.createElement('div');
    tendenciesContainer.className = 'mb-6';

    tendenciesContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 flex items-center">
        <i class="fas fa-magic text-purple-500 mr-2"></i>美容傾向
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${asCustomer.beautyTendencies.map(item => `
          <div class="border rounded-lg p-4">
            <h4 class="font-bold mb-2">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(tendenciesContainer);
  }

  // おすすめスクリプト
  if (asCustomer.recommendedScripts && asCustomer.recommendedScripts.length) {
    const scriptsContainer = document.createElement('div');
    scriptsContainer.className = 'mb-6';

    scriptsContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 flex items-center">
        <i class="fas fa-comment-dots text-blue-500 mr-2"></i>おすすめスクリプト
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${asCustomer.recommendedScripts.map(item => `
          <div class="border rounded-lg p-4">
            <h4 class="font-bold mb-2">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(scriptsContainer);
  }

  // 段階的提案
  if (asCustomer.stepByStepProposal) {
    const proposalContainer = document.createElement('div');
    proposalContainer.className = 'mb-6';

    // プロセス
    if (asCustomer.stepByStepProposal.process && asCustomer.stepByStepProposal.process.length) {
      const processSection = document.createElement('div');
      processSection.className = 'mb-6';

      processSection.innerHTML = `
        <h3 class="text-xl font-bold mb-4 flex items-center">
          <i class="fas fa-tasks text-green-500 mr-2"></i>段階的提案プロセス
        </h3>
        <div class="grid grid-cols-1 gap-4">
          ${asCustomer.stepByStepProposal.process.map((item, index) => `
            <div class="border rounded-lg p-4">
              <h4 class="font-bold mb-2">ステップ${index + 1}: ${item.step}</h4>
              <p class="text-sm">${item.description}</p>
            </div>
          `).join('')}
        </div>
      `;

      proposalContainer.appendChild(processSection);
    }

    // 高額商品ガイド
    if (asCustomer.stepByStepProposal.highEndProductGuide &&
        asCustomer.stepByStepProposal.highEndProductGuide.products) {
      const productsSection = document.createElement('div');
      productsSection.className = 'mb-6';

      productsSection.innerHTML = `
        <h3 class="text-xl font-bold mb-4 flex items-center">
          <i class="fas fa-crown text-yellow-500 mr-2"></i>高額商品ガイド
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${asCustomer.stepByStepProposal.highEndProductGuide.products.map(item => `
            <div class="border rounded-lg p-4">
              <h4 class="font-bold mb-2">${item.name}</h4>
              <p class="text-sm">${item.description}</p>
            </div>
          `).join('')}
        </div>
      `;

      proposalContainer.appendChild(productsSection);
    }

    // 特別オファー効果
    if (asCustomer.stepByStepProposal.specialOfferEffect &&
        asCustomer.stepByStepProposal.specialOfferEffect.offers) {
      const offersSection = document.createElement('div');
      offersSection.className = 'mb-6';

      offersSection.innerHTML = `
        <h3 class="text-xl font-bold mb-4 flex items-center">
          <i class="fas fa-gift text-red-500 mr-2"></i>特別オファー効果
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${asCustomer.stepByStepProposal.specialOfferEffect.offers.map(item => `
            <div class="border rounded-lg p-4">
              <h4 class="font-bold mb-2">${item.name}</h4>
              <p class="text-sm">${item.description}</p>
            </div>
          `).join('')}
        </div>
      `;

      proposalContainer.appendChild(offersSection);
    }

    container.appendChild(proposalContainer);
  }

  console.log('お客様としての接し方セクションの表示を完了しました');
}

/**
 * 部下としての接し方セクションを表示
 * @param {Object} asSubordinate - 部下としての接し方データ
 */
function populateAsSubordinateSection(asSubordinate) {
  if (!asSubordinate) {
    console.warn('部下としての接し方データがありません');
    return;
  }

  const container = document.getElementById('as-subordinate-container');
  if (!container) {
    console.error('部下としての接し方コンテナが見つかりません: as-subordinate-container');
    return;
  }

  console.log('部下としての接し方コンテナを取得しました。コンテンツをクリアします');

  // コンテナをクリア
  container.innerHTML = '';

  // 効果的なアプローチ
  if (asSubordinate.effectiveApproach && asSubordinate.effectiveApproach.length) {
    const approachContainer = document.createElement('div');
    approachContainer.className = 'mb-6';

    approachContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 flex items-center">
        <i class="fas fa-hands-helping text-green-500 mr-2"></i>効果的なアプローチ
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${asSubordinate.effectiveApproach.map(item => `
          <div class="border rounded-lg p-4">
            <h4 class="font-bold mb-2">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(approachContainer);
  }

  // 注意サイン
  if (asSubordinate.warningSignals && asSubordinate.warningSignals.length) {
    const warningContainer = document.createElement('div');
    warningContainer.className = 'mb-6';

    warningContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 flex items-center">
        <i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>注意サイン
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${asSubordinate.warningSignals.map(item => `
          <div class="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
            <h4 class="font-bold mb-2 text-yellow-700">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(warningContainer);
  }

  console.log('部下としての接し方セクションの表示を完了しました');
}

/**
 * リーダーとしてのアプローチセクションを表示
 * @param {Object} asLeader - リーダーとしてのアプローチデータ
 */
function populateAsLeaderSection(asLeader) {
  if (!asLeader) {
    console.warn('リーダーとしてのアプローチデータがありません');
    return;
  }

  const container = document.getElementById('as-leader-container');
  if (!container) {
    console.error('リーダーとしてのアプローチコンテナが見つかりません: as-leader-container');
    return;
  }

  console.log('リーダーとしてのアプローチコンテナを取得しました。コンテンツをクリアします');

  // コンテナをクリア
  container.innerHTML = '';

  // 目標設定
  if (asLeader.goalDirections && asLeader.goalDirections.length) {
    const goalContainer = document.createElement('div');
    goalContainer.className = 'mb-6';

    goalContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 flex items-center">
        <i class="fas fa-bullseye text-red-500 mr-2"></i>効果的な目標設定
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${asLeader.goalDirections.map(item => `
          <div class="border rounded-lg p-4">
            <h4 class="font-bold mb-2">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(goalContainer);
  }

  // チーム編成
  if (asLeader.teamComposition && asLeader.teamComposition.length) {
    const teamContainer = document.createElement('div');
    teamContainer.className = 'mb-6';

    teamContainer.innerHTML = `
      <h3 class="text-xl font-bold mb-4 flex items-center">
        <i class="fas fa-users text-blue-500 mr-2"></i>理想的なチーム編成
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${asLeader.teamComposition.map(item => `
          <div class="border rounded-lg p-4">
            <h4 class="font-bold mb-2">${item.title}</h4>
            <p class="text-sm">${item.description}</p>
          </div>
        `).join('')}
      </div>
    `;

    container.appendChild(teamContainer);
  }

  console.log('リーダーとしてのアプローチセクションの表示を完了しました');
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

    // プレミアムサービスの完了状態を更新
    document.querySelectorAll('.premium-service-card').forEach(card => {
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

    // 特別オファーの完了状態を更新
    document.querySelectorAll('.offer-card').forEach(card => {
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
    document.querySelectorAll('.step-card, .premium-service-card, .offer-card').forEach(card => {
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


