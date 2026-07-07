/* my-wallet — icon sprite injector.
   Refined 1.75px outline set. Usage: <svg class="ico"><use href="#i-home"/></svg>
   Call mwIcons() once on load (auto-runs). */
(function () {
  const I = {
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',
    list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><circle cx="3.5" cy="6" r="1.2"/><circle cx="3.5" cy="12" r="1.2"/><circle cx="3.5" cy="18" r="1.2"/>',
    chart:
      '<path d="M4 20V4"/><path d="M4 20h16"/><path d="M8 16v-4"/><path d="M13 16V8"/><path d="M18 16v-7"/>',
    pie: '<path d="M12 3a9 9 0 1 0 9 9h-9z"/><path d="M12 3v9l7.8-4.5A9 9 0 0 0 12 3z"/>',
    wallet:
      '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a2 2 0 0 1 2 2v0H5.5"/><path d="M3 7.5V18a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3"/><path d="M21 11h-4a2 2 0 0 0 0 4h4z"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-3.5 4.5-5 8-5s6.5 1.5 8 5"/>',
    settings:
      '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M22 12h-3M5 12H2M19 19l-2-2M7 7 5 5M19 5l-2 2M7 17l-2 2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    calendar:
      '<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    arrowUp: '<path d="M12 19V5"/><path d="m6 11 6-6 6 6"/>',
    arrowDown: '<path d="M12 5v14"/><path d="m6 13 6 6 6-6"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    chevronRight: '<path d="m9 5 7 7-7 7"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronLeft: '<path d="m15 5-7 7 7 7"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff:
      '<path d="M3 3l18 18"/><path d="M10.6 6.2A10 10 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.3 3.9M6.3 6.4A17 17 0 0 0 2 12s3.5 6 10 6a10 10 0 0 0 3.3-.5"/><path d="M9.5 9.5a3 3 0 0 0 4.2 4.2"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
    edit: '<path d="M14 5l5 5M4 20l1-4L16 5l3 3L8 19z"/>',
    trash: '<path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13h10l1-13"/>',
    tag: '<path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9z"/><circle cx="8" cy="8" r="1.4"/>',
    food: '<path d="M5 3v8M8 3v8M5 11h3M6.5 11v10M16 3c-1.5 1-2.5 3-2.5 6 0 2 1 3 2.5 3s2.5-1 2.5-3c0-3-1-5-2.5-6zM16 12v9"/>',
    car: '<path d="M5 16h14M4 16l1.5-6A2 2 0 0 1 7.4 8.5h9.2A2 2 0 0 1 18.5 10L20 16M4 16v3M20 16v3"/><circle cx="7.5" cy="16" r="1.4"/><circle cx="16.5" cy="16" r="1.4"/>',
    house: '<path d="M4 11 12 4l8 7M6 10v10h12V10"/>',
    cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/><path d="M2 3h2.5l2 12h11l2-8H6"/>',
    health: '<path d="M3 12h4l2-5 3 11 3-8 2 2h4"/>',
    film: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M3 15h18M8 4v16M16 4v16"/>',
    receipt:
      '<path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21z"/><path d="M9 8h6M9 12h6"/>',
    piggy:
      '<path d="M3 12a6 6 0 0 1 6-6h4a6 6 0 0 1 6 5l2 1v3l-2 .5A6 6 0 0 1 16 19v2h-3v-1.5h-2V21H8v-2.2A6 6 0 0 1 3 13z"/><circle cx="8" cy="11" r="1"/><path d="M11 6V4h3"/>',
    card: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 10h18M7 15h4"/>',
    bank: '<path d="M3 9 12 4l9 5M4 9v9M20 9v9M8 9v9M16 9v9M3 21h18"/>',
    cash: '<rect x="2" y="6" width="20" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9.5v5M18 9.5v5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M22 12h-2M4 12H2M19 5l-1.5 1.5M6.5 17.5 5 19M19 19l-1.5-1.5M6.5 6.5 5 5"/>',
    moon: '<path d="M21 13A8.5 8.5 0 0 1 11 3a7 7 0 1 0 10 10z"/>',
    bell: '<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
    note: '<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M8 8h8M8 12h8M8 16h5"/>',
    repeat: '<path d="M4 9a5 5 0 0 1 5-5h8M20 8l-3-4M20 15a5 5 0 0 1-5 5H7M4 16l3 4"/>',
    target:
      '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="0.8"/>',
    logout: '<path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M16 16l4-4-4-4M20 12H9"/>',
    google:
      '<path d="M21 12.2c0-.7-.06-1.2-.18-1.8H12v3.4h5.1c-.1.9-.66 2.2-1.9 3.1l-.02.1 2.76 2.1.2.02C19.9 17.5 21 15.1 21 12.2z"/><path d="M12 21c2.5 0 4.6-.8 6.1-2.2l-2.9-2.2c-.8.5-1.8.9-3.2.9-2.4 0-4.5-1.6-5.2-3.8l-.1.01-2.9 2.2-.04.1A9 9 0 0 0 12 21z"/><path d="M6.8 13.7a5.5 5.5 0 0 1 0-3.5L6.76 10 3.83 7.8l-.1.04A9 9 0 0 0 3 12c0 1.45.35 2.82.96 4.04z"/><path d="M12 6.6c1.7 0 2.85.74 3.5 1.36l2.56-2.5A8.8 8.8 0 0 0 12 3a9 9 0 0 0-8.07 4.84L6.8 10.2C7.5 8.05 9.6 6.6 12 6.6z"/>',
  };

  function build() {
    if (document.getElementById("mw-icon-sprite")) return;
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.id = "mw-icon-sprite";
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    let inner = "";
    for (const [name, body] of Object.entries(I)) {
      inner += `<symbol id="i-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${body}</symbol>`;
    }
    svg.innerHTML = inner;
    document.body.insertBefore(svg, document.body.firstChild);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
  window.mwIcons = build;
  window.MW_ICON_NAMES = Object.keys(I);
})();
