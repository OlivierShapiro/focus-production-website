/* ══════════════════════════════════════════════════════
   FOCUS_PRODUCTION — animations.js
   Reveal au scroll, split text hero, stagger
   ══════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ── Active la classe js-ready pour activer les reveals ── */
  document.body.classList.add('js-ready');

  /* ── Reveal au scroll (IntersectionObserver) ── */
  var threshold = window.innerHeight - 60;

  function checkReveals() {
    threshold = window.innerHeight - 60;

    document.querySelectorAll('.reveal:not(.visible)').forEach(function(el) {
      if (el.getBoundingClientRect().top < threshold) {
        el.classList.add('visible');
      }
    });

    document.querySelectorAll('.service-item:not(.visible)').forEach(function(el) {
      if (el.getBoundingClientRect().top < threshold) {
        el.classList.add('visible');
      }
    });

    document.querySelectorAll('.process-step:not(.visible)').forEach(function(el) {
      if (el.getBoundingClientRect().top < threshold) {
        el.classList.add('visible');
      }
    });

    document.querySelectorAll('.testi-card:not(.visible)').forEach(function(el) {
      if (el.getBoundingClientRect().top < threshold) {
        el.classList.add('visible');
      }
    });

    document.querySelectorAll('.proj-card:not(.visible):not(.filtered-out)').forEach(function(el) {
      if (el.getBoundingClientRect().top < threshold) {
        el.classList.add('visible');
      }
    });
  }

  /* Run on load and scroll */
  checkReveals();
  window.addEventListener('scroll', checkReveals, { passive: true });

  /* ── Split text — hero (une seule occurrence) ── */
  function splitAndAnimate(el, baseDelay) {
    if (!el) return;
    var text = el.textContent;
    el.innerHTML = '';
    text.split('').forEach(function(char, i) {
      var span = document.createElement('span');
      span.textContent = char === ' ' ? ' ' : char;
      span.style.cssText =
        'display:inline-block;opacity:0;transform:translateY(18px);' +
        'transition:opacity 0.4s ' + (baseDelay + i * 0.04) + 's,' +
        'transform 0.4s ' + (baseDelay + i * 0.04) + 's';
      el.appendChild(span);
    });
    setTimeout(function() {
      el.querySelectorAll('span').forEach(function(s) {
        s.style.opacity = '1';
        s.style.transform = 'translateY(0)';
      });
    }, 50);
  }

  /* Délai court pour laisser la police charger */
  setTimeout(function() {
    splitAndAnimate(document.getElementById('heroLine1'), 0.5);
    splitAndAnimate(document.getElementById('heroLine2'), 0.9);
  }, 100);

})();
