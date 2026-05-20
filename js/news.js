/* ==========================================================
   そらHP - news.js
   NEWS_DATA を読み込んで一覧表示＆モーダル拡大
   ========================================================== */
(function(){
  const listEl   = document.getElementById('news-list');
  const latestEl = document.getElementById('news-latest');
  if (!listEl && !latestEl) return;

  if (typeof NEWS_DATA === 'undefined') {
    console.warn('NEWS_DATA が見つかりません。news-data.js が読み込まれているか確認してください。');
    return;
  }

  // 新しい順にソート
  const items = [...NEWS_DATA].sort((a, b) => (a.date < b.date ? 1 : -1));

  const tagLabel = { news: 'お知らせ', blog: 'ブログ', event: '行事' };

  // NEWバッジ判定（14日以内）
  const NEW_DAYS = 14;
  const now = new Date();
  const isNew = (date) => (now - new Date(date)) / (1000 * 60 * 60 * 24) <= NEW_DAYS;

  const fmtDate = (d) => d.replace(/-/g, '.');

  // カード描画
  const renderCard = (it, idx) => `
    <article class="news-card" data-news-index="${idx}">
      ${it.image ? `<div class="news-thumb"><img src="${it.image}" alt=""></div>` : ''}
      <div class="news-meta">
        <time datetime="${it.date}">${fmtDate(it.date)}</time>
        <span class="news-tag news-tag-${it.tag||'news'}">${tagLabel[it.tag]||'お知らせ'}</span>
        ${isNew(it.date) ? '<span class="news-badge-new">NEW</span>' : ''}
      </div>
      <h3 class="news-title">${it.title}</h3>
      ${it.excerpt ? `<p class="news-excerpt">${it.excerpt}</p>` : ''}
      <button class="news-more" type="button">詳しく見る</button>
    </article>
  `;

  if (listEl)   listEl.innerHTML   = items.map(renderCard).join('');
  if (latestEl) latestEl.innerHTML = items.slice(0, 3).map(renderCard).join('');

  // ===== モーダル開閉 =====
  const modal = document.getElementById('news-modal');
  if (!modal) return;
  const content  = modal.querySelector('.news-modal-content');
  const closeBtn = modal.querySelector('.news-modal-close');

  function openModal(idx) {
    const it = items[idx];
    if (!it) return;
    content.innerHTML = `
      <h2>${it.title}</h2>
      <time>${fmtDate(it.date)}</time>
      ${it.image ? `<img src="${it.image}" alt="" class="news-full-image">` : ''}
      ${it.body || `<p>${it.excerpt || ''}</p>`}
    `;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // カードクリックで開く（一覧・最新両方OK）
  document.body.addEventListener('click', (e) => {
    const card = e.target.closest('.news-card');
    if (!card) return;
    const idx = card.dataset.newsIndex;
    if (idx !== undefined) openModal(Number(idx));
  });
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
})();