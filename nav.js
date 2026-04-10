(function () {
  const versions = [
    { file: 'v1.html', label: 'V1', name: 'Marine & Orange' },
    { file: 'v2.html', label: 'V2', name: 'Blanc & Orange'  },
    { file: 'v3.html', label: 'V3', name: 'Gris & Rouge'    },
    { file: 'v4.html', label: 'V4', name: 'Local & Humain'  },
  ];

  const current = location.pathname.split('/').pop() || 'index.html';
  const idx     = versions.findIndex(v => v.file === current);
  const prev    = idx > 0                   ? versions[idx - 1] : null;
  const next    = idx < versions.length - 1 ? versions[idx + 1] : null;

  const css = `
    /* ── Barre desktop ── */
    #cgm-nav {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(10,10,10,0.88);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 60px;
      padding: 8px 14px;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      white-space: nowrap;
      user-select: none;
    }
    #cgm-nav a {
      color: rgba(255,255,255,0.55);
      text-decoration: none;
      transition: color .2s;
    }
    #cgm-nav a:hover { color: #fff; }
    .cgm-sep {
      color: rgba(255,255,255,0.18);
      font-size: 11px;
      margin: 0 2px;
    }
    .cgm-menu-btn {
      background: rgba(255,255,255,0.1);
      border-radius: 40px;
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .04em;
      color: rgba(255,255,255,0.7) !important;
      transition: background .2s !important;
    }
    .cgm-menu-btn:hover {
      background: rgba(255,255,255,0.2) !important;
      color: #fff !important;
    }
    .cgm-dots {
      display: flex;
      align-items: center;
      gap: 5px;
      margin: 0 4px;
    }
    .cgm-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: rgba(255,255,255,0.22);
      display: inline-block;
      transition: background .2s, transform .2s;
      cursor: pointer;
      text-decoration: none !important;
    }
    .cgm-dot:hover  { background: rgba(255,255,255,0.55) !important; transform: scale(1.3); }
    .cgm-dot.active { background: #fff !important; transform: scale(1.25); }
    .cgm-arrow {
      font-size: 14px;
      padding: 2px 4px;
      font-weight: 700;
    }
    .cgm-label {
      color: rgba(255,255,255,0.35);
      font-size: 11px;
      margin: 0 2px;
    }

    /* ── FAB mobile ── */
    #cgm-fab {
      display: none;
      position: fixed;
      bottom: 88px;
      right: 16px;
      z-index: 99999;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: rgba(10,10,10,0.9);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid rgba(255,255,255,0.15);
      box-shadow: 0 4px 20px rgba(0,0,0,0.45);
      cursor: pointer;
      align-items: center;
      justify-content: center;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 10px;
      font-weight: 700;
      color: #fff;
      letter-spacing: .04em;
      user-select: none;
      flex-direction: column;
      gap: 2px;
    }
    #cgm-fab:hover { background: rgba(30,30,30,0.95); }

    #cgm-fab-dots {
      display: flex;
      gap: 3px;
      align-items: center;
    }
    .cgm-fab-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(255,255,255,0.35);
    }
    .cgm-fab-dot.active { background: #fff; }

    /* Popup versions */
    #cgm-popup {
      display: none;
      position: fixed;
      bottom: 140px;
      right: 16px;
      z-index: 99999;
      background: rgba(10,10,10,0.94);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 14px;
      padding: 10px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.5);
      flex-direction: column;
      gap: 4px;
      min-width: 160px;
    }
    #cgm-popup.open { display: flex; }
    .cgm-popup-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 8px;
      text-decoration: none;
      color: rgba(255,255,255,0.6);
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 12px;
      font-weight: 500;
      transition: background .15s, color .15s;
    }
    .cgm-popup-item:hover { background: rgba(255,255,255,0.08); color: #fff; }
    .cgm-popup-item.active { color: #fff; font-weight: 700; }
    .cgm-popup-badge {
      font-size: 10px;
      font-weight: 700;
      background: rgba(255,255,255,0.12);
      border-radius: 20px;
      padding: 2px 7px;
      letter-spacing: .04em;
      flex-shrink: 0;
    }
    .cgm-popup-item.active .cgm-popup-badge { background: #fff; color: #111; }
    .cgm-popup-divider {
      height: 1px;
      background: rgba(255,255,255,0.08);
      margin: 4px 0;
    }
    .cgm-popup-menu {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 7px 10px;
      border-radius: 8px;
      text-decoration: none;
      color: rgba(255,255,255,0.5);
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: .04em;
      transition: background .15s, color .15s;
    }
    .cgm-popup-menu:hover { background: rgba(255,255,255,0.08); color: #fff; }

    @media (max-width: 768px) {
      #cgm-nav  { display: none; }
      #cgm-fab  { display: flex; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ── Desktop bar ── */
  const dotsHTML = versions.map((v, i) =>
    `<a href="${v.file}" class="cgm-dot${i === idx ? ' active' : ''}" title="${v.label} — ${v.name}"></a>`
  ).join('');
  const currentLabel = idx >= 0 ? `<span class="cgm-label">${versions[idx].label}</span>` : '';

  const nav = document.createElement('div');
  nav.id = 'cgm-nav';
  nav.innerHTML = `
    <a href="menu.html" class="cgm-menu-btn">☰ Menu</a>
    <span class="cgm-sep">|</span>
    ${prev ? `<a href="${prev.file}" class="cgm-arrow" title="${prev.label}">‹</a>` : '<span class="cgm-arrow" style="opacity:.2">‹</span>'}
    <div class="cgm-dots">${dotsHTML}</div>
    ${next ? `<a href="${next.file}" class="cgm-arrow" title="${next.label}">›</a>` : '<span class="cgm-arrow" style="opacity:.2">›</span>'}
    ${currentLabel}
  `;

  /* ── Mobile popup ── */
  const popupItems = versions.map((v, i) => `
    <a href="${v.file}" class="cgm-popup-item${i === idx ? ' active' : ''}">
      <span class="cgm-popup-badge">${v.label}</span>
      ${v.name}
    </a>
  `).join('');

  const popup = document.createElement('div');
  popup.id = 'cgm-popup';
  popup.innerHTML = `
    ${popupItems}
    <div class="cgm-popup-divider"></div>
    <a href="menu.html" class="cgm-popup-menu">☰ Voir toutes les versions</a>
  `;

  /* ── Mobile FAB ── */
  const fabDotsHTML = versions.map((v, i) =>
    `<span class="cgm-fab-dot${i === idx ? ' active' : ''}"></span>`
  ).join('');

  const fab = document.createElement('div');
  fab.id = 'cgm-fab';
  fab.innerHTML = `<div id="cgm-fab-dots">${fabDotsHTML}</div>`;
  fab.setAttribute('role', 'button');
  fab.setAttribute('aria-label', 'Changer de version');

  fab.addEventListener('click', function (e) {
    e.stopPropagation();
    popup.classList.toggle('open');
  });

  document.addEventListener('click', function () {
    popup.classList.remove('open');
  });

  popup.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  function mount() {
    document.body.appendChild(nav);
    document.body.appendChild(popup);
    document.body.appendChild(fab);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
