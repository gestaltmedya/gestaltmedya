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

  /* Ana sayfa: büyük başlık ekrandan çıkınca üstte küçük logo belirsin */
  var header = document.querySelector(".site-header.is-home");
  var heroTitle = document.querySelector(".hero-title");
  if (header && heroTitle && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      header.classList.toggle("is-scrolled", !en[0].isIntersecting);
    }, { rootMargin: "-70px 0px 0px 0px" }).observe(heroTitle);
  }

  /* Öne çıkan: penceredeki yazılar içinden en çok okunanı seç (GoatCounter) */
  var candEl = document.getElementById("featured-candidates");
  var feat = document.getElementById("featured");
  if (candEl && feat && !feat.hasAttribute("data-pinned")) {
    var gc = candEl.getAttribute("data-gc");
    var cands = [];
    try { cands = JSON.parse(candEl.textContent); } catch (e) {}
    if (gc && cands.length > 1 && window.fetch) {
      Promise.all(cands.map(function (c) {
        return fetch("https://" + gc + ".goatcounter.com/counter/" + encodeURIComponent(c.url) + ".json")
          .then(function (r) { return r.ok ? r.json() : { count: "0" }; })
          .then(function (j) { return parseInt(String(j.count).replace(/\D/g, ""), 10) || 0; })
          .catch(function () { return 0; });
      })).then(function (counts) {
        var best = 0; // eşitlikte en yeni kazanır (liste yeniden eskiye)
        counts.forEach(function (n, i) { if (n > counts[best]) best = i; });
        var c = cands[best];
        if (c.url === feat.getAttribute("href")) return;
        feat.setAttribute("href", c.url);
        if (c.renk) feat.style.setProperty("--k", c.renk); else feat.style.removeProperty("--k");
        ["kat", "title", "date", "min", "excerpt"].forEach(function (k) {
          var el = feat.querySelector('[data-f="' + k + '"]');
          if (el) el.textContent = c[k];
        });
        /* son yazılar: yeni öne çıkanı gizle, diğerlerini göster, fazlalığı sakla */
        var slots = Array.prototype.slice.call(document.querySelectorAll("#latest .card-slot"));
        var shown = 0, max = slots.length - 1;
        slots.forEach(function (sl) {
          var hide = sl.getAttribute("data-url") === c.url || shown >= max;
          sl.hidden = hide;
          if (!hide) { shown++; var cd = sl.querySelector(".card"); if (cd) cd.classList.add("is-in"); }
        });
      });
    }
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
      /* açılışta zaten ekranda olanlar beklemeden görünür (ilk ekran soluk kalmasın) */
      if (el.getBoundingClientRect().top < window.innerHeight - 40) return;
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
