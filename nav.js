(function () {
  const versions = [
    { file: 'v1.html', label: 'V1', name: 'Marine & Orange' },
    { file: 'v2.html', label: 'V2', name: 'Blanc & Orange'  },
    { file: 'v3.html', label: 'V3', name: 'Gris & Rouge'    },
    { file: 'v4.html', label: 'V4', name: 'Local & Humain'  },
  ];

  const current = location.pathname.split('/').pop() || 'index.html';
  const idx     = versions.findIndex(v => v.file === current);
  const prev    = idx > 0            ? versions[idx - 1] : null;
  const next    = idx < versions.length - 1 ? versions[idx + 1] : null;

  const css = `
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
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const dotsHTML = versions.map((v, i) =>
    `<a href="${v.file}" class="cgm-dot${i === idx ? ' active' : ''}" title="${v.label} — ${v.name}"></a>`
  ).join('');

  const currentLabel = idx >= 0 ? `<span class="cgm-label">${versions[idx].label}</span>` : '';

  const nav = document.createElement('div');
  nav.id = 'cgm-nav';
  nav.innerHTML = `
    <a href="menu.html" class="cgm-menu-btn">☰ Menu</a>
    <span class="cgm-sep">|</span>
    ${prev ? `<a href="${prev.file}" class="cgm-arrow" title="${prev.label} — ${prev.name}">‹</a>` : '<span class="cgm-arrow" style="opacity:.2">‹</span>'}
    <div class="cgm-dots">${dotsHTML}</div>
    ${next ? `<a href="${next.file}" class="cgm-arrow" title="${next.label} — ${next.name}">›</a>` : '<span class="cgm-arrow" style="opacity:.2">›</span>'}
    ${currentLabel}
  `;

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(nav);
  });

  if (document.readyState !== 'loading') {
    document.body.appendChild(nav);
  }
})();
