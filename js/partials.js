/* ==========================================================
   そらHP - partials.js
   全ページ共通の「サイドナビ（PC左固定）」「SPオーバーレイメニュー」を注入する。
   ※ フッターはこのスクリプトでは一切触りません。各HTMLの <footer>...</footer>
     を直接編集してください。
   ========================================================== */
(function(){
  /* ---------- サイドナビ（PC・左固定アコーディオン） ---------- */
  const NAV_HTML = `
    <div class="side-nav-inner">
      <a href="index.html" class="side-brand">
        <img src="img/sora-logo.png" alt="そら ロゴ">
        <span>放課後等デイサービス<br><b>そら</b></span>
      </a>
      <nav aria-label="グローバルナビ">
        <details class="side-group" open>
          <summary>サイト内</summary>
          <ul>
            <li><a href="index.html">ホーム</a></li>
            <li><a href="about.html">「そら」について</a></li>
            <li><a href="day.html">1日の流れ</a></li>
            <li><a href="events.html">行事</a></li>
            <li><a href="news.html">お知らせ / ブログ</a></li>
            <li><a href="faq.html">よくあるご質問</a></li>
            <li><a href="access.html">アクセス / お問い合わせ</a></li>
          </ul>
        </details>
        <details class="side-group">
          <summary>SNS</summary>
          <ul>
            <li><a href="https://www.instagram.com/lacina.shijukufs/" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://x.com/shijuku_lacina" target="_blank" rel="noopener">X</a></li>
            <li><a href="https://www.facebook.com/shijuku.lacina" target="_blank" rel="noopener">Facebook</a></li>
            <li><a href="https://www.tiktok.com/@lacina.shijukufs?lang=ja-JP" target="_blank" rel="noopener">TikTok</a></li>
          </ul>
        </details>
        <details class="side-group">
          <summary>関連リンク</summary>
          <ul>
            <li><a href="https://lacina.shijuku-fs.org/" target="_blank" rel="noopener">ラシーナ公式HP</a></li>
          </ul>
        </details>
      </nav>
    </div>
  `;

  /* ---------- SPオーバーレイメニュー（ハンバーガー展開時） ---------- */
  const OVERLAY_HTML = `
    <span class="material-symbols-outlined" id="close" role="button" aria-label="メニューを閉じる" tabindex="0">close</span>
    <nav aria-label="グローバルナビ（SP）">
      <ul>
        <li><a href="index.html">ホーム</a></li>
        <li><a href="about.html">「そら」について</a></li>
        <li><a href="day.html">1日の流れ</a></li>
        <li><a href="events.html">行事</a></li>
        <li><a href="news.html">お知らせ / ブログ</a></li>
        <li><a href="faq.html">よくあるご質問</a></li>
        <li><a href="access.html">アクセス / お問い合わせ</a></li>
        <li><a href="https://www.instagram.com/lacina.shijukufs/" target="_blank" rel="noopener">Instagram</a></li>
        <li><a href="https://x.com/shijuku_lacina" target="_blank" rel="noopener">X</a></li>
        <li><a href="https://www.facebook.com/shijuku.lacina" target="_blank" rel="noopener">Facebook</a></li>
        <li><a href="https://www.tiktok.com/@lacina.shijukufs?lang=ja-JP" target="_blank" rel="noopener">TikTok</a></li>
        <li><a href="https://lacina.shijuku-fs.org/" target="_blank" rel="noopener">ラシーナ公式HP</a></li>
      </ul>
    </nav>
  `;

  /* ---------- 注入（中身が空のときだけ流し込む。手書きを尊重） ---------- */
  const sideNav = document.querySelector('.side-nav');
  if (sideNav && sideNav.innerHTML.trim() === '') {
    sideNav.innerHTML = NAV_HTML;
  }

  const overlay = document.querySelector('.overlay');
  if (overlay && overlay.innerHTML.trim() === '') {
    overlay.innerHTML = OVERLAY_HTML;
  }

  /* ---------- フッターは触らない（手書きを維持） ---------- */
  // ここで footer を書き換えると住所などが消えてしまうため、何もしません。

  /* ---------- 現在ページのリンクをハイライト ---------- */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.side-group a, .overlay a, .footer-nav a').forEach(a => {
    if (a.getAttribute('href') === here) a.classList.add('is-current');
  });
})();
