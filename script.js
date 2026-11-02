(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById("navbar");
  const toTop = document.getElementById("toTop");

  function onScroll() {
    const y = window.scrollY;
    if (navbar) navbar.classList.toggle("scrolled", y > 24);
    if (toTop) toTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMenu() {
    if (!navToggle || !navLinks) return;
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (e) {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Smooth scroll for anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  } else {
    const revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseInt(el.dataset.delay || "0", 10);
        el.style.transitionDelay = delay + "ms";
        el.classList.add("visible");
        obs.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- Animated counters (real, verifiable data only) ---------- */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.count || "0");
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll(".counter");
  if (counters.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      counters.forEach(function (el) {
        el.textContent = el.dataset.count + (el.dataset.suffix || "");
      });
    } else {
      const counterObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { counterObserver.observe(el); });
    }
  }

  /* ---------- FAQ accordion ---------- */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    const button = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    if (!button || !panel) return;

    button.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");

      faqItems.forEach(function (other) {
        if (other === item) return;
        other.classList.remove("open");
        const otherBtn = other.querySelector(".faq-q");
        const otherPanel = other.querySelector(".faq-a");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        if (otherPanel) otherPanel.style.maxHeight = "0px";
      });

      if (isOpen) {
        item.classList.remove("open");
        button.setAttribute("aria-expanded", "false");
        panel.style.maxHeight = "0px";
      } else {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  window.addEventListener("resize", function () {
    const openItem = document.querySelector(".faq-item.open .faq-a");
    if (openItem) openItem.style.maxHeight = openItem.scrollHeight + "px";
  });

  /* ---------- Active nav link via scroll spy ---------- */
  const sections = ["inicio", "como-funciona", "oportunidades", "faq"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  const navAnchors = document.querySelectorAll(".nav-link[href^='#']");

  function setActive(id) {
    navAnchors.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + id);
    });
  }

  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Back to top ---------- */
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? "auto" : "smooth" });
    });
  }

  /* ---------- Step card spotlight follow ---------- */
  document.querySelectorAll(".step-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
      card.style.setProperty("--my", (e.clientY - rect.top) + "px");
    });
  });

  /* ---------- Hero card subtle tilt ---------- */
  const heroCard = document.querySelector(".hero-card");
  const heroArea = document.querySelector(".hero-visual");
  if (heroCard && heroArea && !prefersReduced && window.matchMedia("(hover: hover)").matches) {
    heroArea.addEventListener("mousemove", function (e) {
      const rect = heroArea.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      heroCard.style.transform =
        "perspective(900px) rotateY(" + (px * 6).toFixed(2) + "deg) rotateX(" +
        (-py * 6).toFixed(2) + "deg)";
    });
    heroArea.addEventListener("mouseleave", function () {
      heroCard.style.transform = "";
    });
  }
})();
