/* GESTALT MEDYA — küçük etkileşimler (kütüphane yok) */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobil menü */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Ana sayfadaki yazan-silen satır */
  var typed = document.querySelector(".typed");
  if (typed) {
    var lines = (typed.getAttribute("data-lines") || "").split("|");
    if (reduce) {
      typed.textContent = lines[0];
    } else {
      var li = 0, ci = 0, deleting = false;
      (function tick() {
        var line = lines[li];
        typed.textContent = line.slice(0, ci);
        var delay = deleting ? 28 : 55;
        if (!deleting && ci === line.length) { deleting = true; delay = 2200; }
        else if (deleting && ci === 0) { deleting = false; li = (li + 1) % lines.length; delay = 400; }
        ci += deleting ? -1 : 1;
        if (ci < 0) ci = 0;
        setTimeout(tick, delay);
      })();
    }
  }

  /* Kaydırınca beliren öğeler */
  var revealEls = document.querySelectorAll(".card, .featured, .pillar, .section-title");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el, i) {
      el.classList.add("reveal");
      el.style.transitionDelay = (i % 3) * 80 + "ms";
      io.observe(el);
    });
  }

  /* Okuma ilerleme çubuğu */
  var bar = document.querySelector(".read-progress span");
  if (bar) {
    var update = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* Bağlantıyı kopyala */
  var copyBtn = document.querySelector(".copy-link");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var url = copyBtn.getAttribute("data-url");
      var done = function () {
        var old = copyBtn.textContent;
        copyBtn.textContent = "Kopyalandı ✓";
        setTimeout(function () { copyBtn.textContent = old; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () {});
    });
  }

  /* Blog: arama + etiket filtresi */
  var list = document.getElementById("post-list");
  if (list) {
    var input = document.getElementById("post-search");
    var noRes = document.getElementById("no-results");
    var cards = Array.prototype.slice.call(list.querySelectorAll(".card"));
    var tagBtns = Array.prototype.slice.call(document.querySelectorAll(".tag-filter .tag"));
    var activeTag = "";

    var tr = function (s) { return (s || "").toLocaleLowerCase("tr-TR"); };
    var apply = function () {
      var q = tr(input ? input.value.trim() : "");
      var shown = 0;
      cards.forEach(function (c) {
        var okQ = !q || tr(c.getAttribute("data-search")).indexOf(q) !== -1;
        var okT = !activeTag || (" " + c.getAttribute("data-tags") + " ").indexOf(" " + activeTag + " ") !== -1;
        var ok = okQ && okT;
        c.hidden = !ok;
        if (ok) { shown++; c.classList.add("is-in"); }
      });
      if (noRes) noRes.hidden = shown !== 0;
    };

    if (input) input.addEventListener("input", apply);
    tagBtns.forEach(function (b) {
      b.addEventListener("click", function () {
        tagBtns.forEach(function (x) { x.classList.remove("is-active"); });
        b.classList.add("is-active");
        activeTag = b.getAttribute("data-tag");
        apply();
      });
    });
  }
})();
