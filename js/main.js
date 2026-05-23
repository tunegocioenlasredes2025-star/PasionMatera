/* Pasión Matera 7 — interactividad */
(function () {
  "use strict";

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const WA_SVG = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zM6.597 20.13c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 0 0 1.523 5.26l-.999 3.648 3.965-.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>';

  const catLabel = id => (CATEGORIES.find(c => c.id === id) || {}).label || id;
  const fmtPrice = n => "$" + n.toLocaleString("es-AR");
  const waUrl = msg => "https://wa.me/" + BRAND.phone + "?text=" + encodeURIComponent(msg);
  const productMsg = p => "Hola! Quiero consultar por el " + p.name + " (" + fmtPrice(p.price) + "). ¿Está disponible? 🧉";

  function openWhatsApp(msg) {
    window.open(waUrl(msg), "_blank", "noopener");
  }

  /* ---------- render de cards ---------- */
  function cardHTML(p) {
    const badge = p.badge ? '<span class="card-badge">' + p.badge + '</span>' : "";
    return (
      '<article class="card" data-id="' + p.id + '">' +
        '<div class="card-media">' +
          badge +
          '<span class="card-cat">' + catLabel(p.category) + '</span>' +
          '<img src="assets/products/' + p.id + '.webp" alt="' + p.name + '" loading="lazy" width="440" height="550" />' +
        '</div>' +
        '<div class="card-body">' +
          '<h3 class="card-title">' + p.name + '</h3>' +
          '<div class="card-foot">' +
            '<span class="card-price"><span class="amount">' + fmtPrice(p.price) + '</span><span class="cur">ARS</span></span>' +
            '<button class="card-btn" type="button" data-order="' + p.id + '" aria-label="Pedir ' + p.name + ' por WhatsApp">' +
              WA_SVG + '<span class="label-full">Pedir</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</article>'
    );
  }

  function renderInto(el, list) {
    el.innerHTML = list.map(cardHTML).join("");
    revealCards(el);
  }

  /* ---------- catálogo: filtros + búsqueda ---------- */
  const catalogGrid = $("#catalogGrid");
  const filtersEl   = $("#filters");
  const searchInput = $("#searchInput");
  const resultsCount = $("#resultsCount");
  const noResults   = $("#noResults");

  let activeCat = "todos";
  let query = "";

  function buildFilters() {
    filtersEl.innerHTML = CATEGORIES.map(c =>
      '<button class="filter-btn' + (c.id === "todos" ? " active" : "") + '" role="tab" data-cat="' + c.id + '">' + c.label + "</button>"
    ).join("");
  }

  function applyFilters() {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter(p => {
      const okCat = activeCat === "todos" || p.category === activeCat;
      const okQ = !q || p.name.toLowerCase().includes(q) || catLabel(p.category).toLowerCase().includes(q);
      return okCat && okQ;
    });
    renderInto(catalogGrid, list);
    noResults.hidden = list.length > 0;
    resultsCount.textContent = list.length
      ? "Mostrando " + list.length + (list.length === 1 ? " producto" : " productos")
      : "";
  }

  /* ---------- scroll reveal ---------- */
  let revealObserver;
  function setupReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(e => e.classList.add("in"));
      return;
    }
    revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach(e => revealObserver.observe(e));
  }

  function revealCards(container) {
    const cards = $$(".card", container);
    if (!("IntersectionObserver" in window)) { cards.forEach(c => c.classList.add("in")); return; }
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const i = cards.indexOf(en.target);
          en.target.style.transitionDelay = Math.min(i, 8) * 55 + "ms";
          en.target.classList.add("in");
          o.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    cards.forEach(c => obs.observe(c));
  }

  /* ---------- contadores ---------- */
  function animateCounters() {
    $$("[data-count]").forEach(el => {
      const target = parseInt(el.getAttribute("data-count"), 10);
      const dur = 1400;
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(target * eased);
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  /* ---------- header + nav ---------- */
  function setupHeader() {
    const header = $("#header");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const toggle = $("#navToggle");
    const nav = $("#nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$(".nav-link", nav).forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open"); toggle.classList.remove("open"); toggle.setAttribute("aria-expanded", "false");
    }));
  }

  /* ---------- listeners ---------- */
  function setupEvents() {
    // links/botones con mensaje fijo
    document.addEventListener("click", e => {
      const wa = e.target.closest("[data-wa]");
      if (wa) { e.preventDefault(); openWhatsApp(wa.getAttribute("data-wa")); return; }
      const order = e.target.closest("[data-order]");
      if (order) {
        e.preventDefault();
        const p = PRODUCTS.find(x => x.id === order.getAttribute("data-order"));
        if (p) openWhatsApp(productMsg(p));
      }
    });

    filtersEl.addEventListener("click", e => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      activeCat = btn.getAttribute("data-cat");
      $$(".filter-btn", filtersEl).forEach(b => b.classList.toggle("active", b === btn));
      applyFilters();
    });

    let tmr;
    searchInput.addEventListener("input", e => {
      query = e.target.value;
      clearTimeout(tmr);
      tmr = setTimeout(applyFilters, 120);
    });
  }

  /* ---------- counter trigger ---------- */
  function setupCounters() {
    const stats = $(".hero-stats");
    if (!stats) return;
    if (!("IntersectionObserver" in window)) { animateCounters(); return; }
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(en => { if (en.isIntersecting) { animateCounters(); o.disconnect(); } });
    }, { threshold: 0.4 });
    obs.observe(stats);
  }

  /* ---------- init ---------- */
  function init() {
    $("#year").textContent = new Date().getFullYear();
    renderInto($("#featuredGrid"), PRODUCTS.filter(p => p.featured));
    buildFilters();
    applyFilters();
    setupHeader();
    setupEvents();
    setupReveal();
    setupCounters();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
