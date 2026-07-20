/* ═══════════════════════════════════════════════════
   CABINET ALFRED GORY — Animations & Interactions
═══════════════════════════════════════════════════ */

(function(){
  'use strict';

  /* ── SCROLL REVEAL ── */
  var revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('revealed');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  function initReveal(){
    document.querySelectorAll('.reveal').forEach(function(el){
      revealObserver.observe(el);
    });
  }

  /* ── NAVBAR SCROLL ── */
  function initNavbar(){
    var nb = document.querySelector('.navbar');
    if(!nb) return;
    window.addEventListener('scroll', function(){
      nb.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ── MOBILE NAV ── */
  function initMobileNav(){
    var burger = document.querySelector('.nav-burger');
    var mobileNav = document.querySelector('.mobile-nav');
    var close = document.querySelector('.mobile-nav-close');
    if(!burger || !mobileNav) return;

    function open(){ mobileNav.classList.add('open'); document.body.style.overflow='hidden'; }
    function closeNav(){ mobileNav.classList.remove('open'); document.body.style.overflow=''; }

    burger.addEventListener('click', open);
    if(close) close.addEventListener('click', closeNav);
    mobileNav.querySelectorAll('.mobile-nav-link,.mobile-nav-cta').forEach(function(a){
      a.addEventListener('click', closeNav);
    });
    mobileNav.addEventListener('click', function(e){ if(e.target===mobileNav) closeNav(); });
  }

  /* ── BACK TO TOP ── */
  function initBackTop(){
    var btn = document.querySelector('.back-top');
    if(!btn) return;
    window.addEventListener('scroll', function(){
      btn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    btn.addEventListener('click', function(){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── COOKIE BANNER ── */
  function initCookie(){
    var banner = document.querySelector('.cookie');
    if(!banner) return;
    if(localStorage.getItem('ag-cookie')) return;
    setTimeout(function(){ banner.classList.add('visible'); }, 1200);
    var accept = banner.querySelector('.cookie-accept');
    var refuse = banner.querySelector('.cookie-refuse');
    function dismiss(){ banner.classList.remove('visible'); localStorage.setItem('ag-cookie','1'); }
    if(accept) accept.addEventListener('click', dismiss);
    if(refuse) refuse.addEventListener('click', dismiss);
  }

  /* ── FAQ ACCORDION ── */
  function initFaq(){
    document.querySelectorAll('.faq-item').forEach(function(item){
      var q = item.querySelector('.faq-question');
      if(!q) return;
      q.addEventListener('click', function(){
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function(o){ o.classList.remove('open'); });
        if(!isOpen) item.classList.add('open');
      });
    });
  }

  /* ── FORM TABS ── */
  function initFormTabs(){
    document.querySelectorAll('.form-tabs').forEach(function(tabs){
      var wrap = tabs.closest('[data-form-group]') || tabs.parentElement;
      var panels = wrap.querySelectorAll('[data-tab-panel]');
      tabs.querySelectorAll('.form-tab').forEach(function(tab, i){
        tab.addEventListener('click', function(){
          tabs.querySelectorAll('.form-tab').forEach(function(t){ t.classList.remove('active'); });
          tab.classList.add('active');
          panels.forEach(function(p){ p.style.display='none'; });
          if(panels[i]) panels[i].style.display='block';
        });
      });
    });
  }

  /* ── COUNTER ANIMATION ── */
  function animateCounter(el){
    var target = parseFloat(el.dataset.target) || 0;
    var suffix = el.dataset.suffix || '';
    var duration = 1200;
    var start = performance.now();
    function tick(now){
      var p = Math.min((now - start) / duration, 1);
      var val = Math.round(target * p * 10) / 10;
      el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(1)) + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var counterObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        animateCounter(e.target);
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });

  function initCounters(){
    document.querySelectorAll('[data-counter]').forEach(function(el){
      counterObserver.observe(el);
    });
  }

  /* ── NAV ACTIVE LINK ── */
  function initActiveLink(){
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(function(a){
      var href = (a.getAttribute('href') || '').split('/').pop();
      if(href === path) a.classList.add('active');
    });
  }

  /* ── FORM SUBMIT UX ── */
  function initForms(){
    document.querySelectorAll('form').forEach(function(form){
      form.addEventListener('submit', function(){
        var btn = form.querySelector('button[type="submit"], input[type="submit"]');
        if(btn && !btn.disabled){
          btn.disabled = true;
          var orig = btn.textContent;
          btn.textContent = 'Envoi en cours…';
          setTimeout(function(){ btn.disabled=false; btn.textContent=orig; }, 8000);
        }
      });
    });
  }

  /* ── SMOOTH ANCHOR LINKS ── */
  function initAnchors(){
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var id = a.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if(target){
          e.preventDefault();
          var offset = 80;
          var top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ── INIT ALL ── */
  document.addEventListener('DOMContentLoaded', function(){
    initReveal();
    initNavbar();
    initMobileNav();
    initBackTop();
    initCookie();
    initFaq();
    initFormTabs();
    initCounters();
    initActiveLink();
    initForms();
    initAnchors();
  });

})();
