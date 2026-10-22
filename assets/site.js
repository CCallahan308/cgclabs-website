/* CGC Labs site: mobile drawer, nav scroll state, metric count-up. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Nav solid after 80px scroll */
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 80); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Mobile drawer */
  var hamburger = document.querySelector(".hamburger");
  var drawer = document.querySelector(".drawer");
  var scrim = document.querySelector(".scrim");
  var closeBtn = document.querySelector(".drawer-close");
  var desktop = window.matchMedia("(min-width: 900px)");
  var drawerOpen = false;
  var backgroundState = [];
  var previousOverflow = "";

  function drawerControls() {
    return drawer.querySelectorAll("a[href], button:not([disabled])");
  }

  function focusFirstControl() {
    var first = drawerControls()[0];
    if (first) first.focus();
  }

  function setDrawer(open, restoreFocus) {
    if (!drawer || open === drawerOpen || (open && desktop.matches)) return;
    drawerOpen = open;
    if (open) {
      previousOverflow = document.body.style.overflow;
      backgroundState = Array.from(document.body.children)
        .filter(function (element) { return element !== drawer && element !== scrim; })
        .map(function (element) {
          var state = { element: element, inert: element.inert };
          element.inert = true;
          return state;
        });
    } else {
      backgroundState.forEach(function (state) { state.element.inert = state.inert; });
      backgroundState = [];
    }
    drawer.inert = !open;
    drawer.setAttribute("aria-hidden", String(!open));
    if (open) drawer.setAttribute("aria-modal", "true");
    else drawer.removeAttribute("aria-modal");
    drawer.classList.toggle("open", open);
    if (scrim) scrim.classList.toggle("open", open);
    if (hamburger) hamburger.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : previousOverflow;
    if (open) focusFirstControl();
    else if (restoreFocus !== false && hamburger && !desktop.matches) hamburger.focus();
  }
  if (hamburger) hamburger.addEventListener("click", function () { setDrawer(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setDrawer(false); });
  if (scrim) scrim.addEventListener("click", function () { setDrawer(false); });
  document.addEventListener("keydown", function (e) {
    if (!drawerOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      setDrawer(false);
    } else if (e.key === "Tab") {
      var controls = drawerControls();
      var first = controls[0];
      var last = controls[controls.length - 1];
      if (!first) { e.preventDefault(); return; }
      if (e.shiftKey && (document.activeElement === first || !drawer.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !drawer.contains(document.activeElement))) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  document.addEventListener("focusin", function (e) {
    if (drawerOpen && !drawer.contains(e.target)) focusFirstControl();
  });
  desktop.addEventListener("change", function (e) {
    if (e.matches && drawerOpen) {
      setDrawer(false, false);
      var target = document.querySelector('.nav-links a[aria-current="page"]') || document.querySelector(".nav .logo");
      if (target) target.focus();
    }
  });
  if (drawer) {
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setDrawer(false); });
    });
  }

  /* Footer year */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  /* Metric count-up: DOM holds the final value; display animates once, on first view. */
  var metrics = document.querySelectorAll("[data-count-to]");
  metrics.forEach(function (el) {
    var finalText = el.textContent;
    var target = parseFloat(el.getAttribute("data-count-to"));
    var prefix = el.getAttribute("data-count-prefix") || "";
    var suffix = el.getAttribute("data-count-suffix") || "";
    if (reduceMotion || isNaN(target)) return;

    var started = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || started) return;
        started = true;
        var t0 = null;
        var duration = 800;
        var step = function (ts) {
          if (t0 === null) t0 = ts;
          var p = Math.min((ts - t0) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var value = target * eased;
          el.textContent = prefix + Math.round(value) + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = finalText;
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    io.observe(el);
  });
})();
