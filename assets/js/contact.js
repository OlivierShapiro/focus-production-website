/* ══════════════════════════════════════════════════════
   FOCUS_PRODUCTION — contact.js
   Validation formulaire + soumission Web3Forms
   ══════════════════════════════════════════════════════ */

(function() {
  'use strict';

  var form = document.getElementById('contactForm');
  if (!form) return;

  /* ── Validation email ── */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ── Afficher/masquer erreur sur un champ ── */
  function setError(input, msg) {
    input.classList.add('error');
    var errEl = input.parentElement.querySelector('.form-error-msg');
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.add('visible');
    }
  }

  function clearError(input) {
    input.classList.remove('error');
    var errEl = input.parentElement.querySelector('.form-error-msg');
    if (errEl) errEl.classList.remove('visible');
  }

  /* ── Validation en temps réel ── */
  form.querySelectorAll('.form-input, .form-textarea').forEach(function(input) {
    input.addEventListener('blur', function() {
      if (input.required && !input.value.trim()) {
        setError(input, 'Ce champ est requis.');
      } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
        setError(input, 'Adresse email invalide.');
      } else {
        clearError(input);
      }
    });

    input.addEventListener('input', function() {
      if (input.classList.contains('error')) {
        clearError(input);
      }
    });
  });

  /* ── Soumission ── */
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var valid = true;

    /* Vérifier champs requis */
    form.querySelectorAll('[required]').forEach(function(input) {
      if (!input.value.trim()) {
        setError(input, 'Ce champ est requis.');
        valid = false;
      }
    });

    /* Vérifier format email */
    var emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value && !isValidEmail(emailInput.value)) {
      setError(emailInput, 'Adresse email invalide.');
      valid = false;
    }

    if (!valid) return;

    var btn = form.querySelector('.form-submit');
    var originalText = btn.textContent;
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.success) {
        form.style.display = 'none';
        var successEl = document.getElementById('formSuccess');
        if (successEl) successEl.classList.add('visible');
      } else {
        btn.textContent = originalText;
        btn.disabled = false;
        showFormError();
      }
    })
    .catch(function() {
      btn.textContent = originalText;
      btn.disabled = false;
      showFormError();
    });
  });

  function showFormError() {
    var errEl = document.getElementById('formError');
    if (errEl) errEl.style.display = 'block';
  }

})();
