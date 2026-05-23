/* ══════════════════════════════════════════════════════
   FOCUS_PRODUCTION — main.js
   Init, cursor, nav, scroll, UI components
   ══════════════════════════════════════════════════════ */

(function() {
  'use strict';

  /* ══════════════════════════════════════════
     CURSEUR PERSONNALISÉ
     ══════════════════════════════════════════ */
  var cursor = document.getElementById('cursor');
  var ring   = document.getElementById('cursor-ring');
  var mx = -100, my = -100, rx = -100, ry = -100;

  if (cursor && ring) {
    document.addEventListener('mousemove', function(e) {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animateRing() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    })();

    document.querySelectorAll('a, button, .proj-card, .service-item, .faq-question').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        cursor.style.width  = '8px';
        cursor.style.height = '8px';
        ring.style.width  = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(200,169,110,0.8)';
      });
      el.addEventListener('mouseleave', function() {
        cursor.style.width  = '4px';
        cursor.style.height = '4px';
        ring.style.width  = '24px';
        ring.style.height = '24px';
        ring.style.borderColor = 'rgba(242,237,230,0.4)';
      });
    });
  }

  /* ══════════════════════════════════════════
     BARRE DE PROGRESSION SCROLL
     ══════════════════════════════════════════ */
  var progressBar = document.getElementById('scroll-progress');

  function updateProgress() {
    if (!progressBar) return;
    var scrollTop  = window.scrollY;
    var docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ══════════════════════════════════════════
     NAV — scroll & active
     ══════════════════════════════════════════ */
  var navbar = document.getElementById('navbar');

  function updateNav() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }

  var navSections = ['portfolio', 'services', 'about', 'testimonials', 'process', 'faq', 'contact'];

  function updateActiveNav() {
    var current = '';
    var threshold = window.innerHeight * 0.45;
    navSections.forEach(function(id) {
      var el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < threshold) current = id;
    });
    document.querySelectorAll('.nav-links a').forEach(function(a) {
      a.classList.remove('nav-active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('nav-active');
    });
  }

  /* ══════════════════════════════════════════
     MENU MOBILE
     ══════════════════════════════════════════ */
  window.toggleMenu = function() {
    var burger = document.getElementById('burger');
    var menu   = document.getElementById('mobileMenu');
    if (!burger || !menu) return;
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  };

  /* ══════════════════════════════════════════
     SMOOTH SCROLL
     ══════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════════════
     PARALLAX VIDEO HERO
     ══════════════════════════════════════════ */
  var parallaxBg = document.getElementById('parallaxBg');
  var ticking = false;

  if (parallaxBg) {
    /* Force autoplay mobile */
    parallaxBg.muted = true;
    var playPromise = parallaxBg.play();
    if (playPromise !== undefined) {
      playPromise.catch(function() {
        document.addEventListener('touchstart', function() { parallaxBg.play(); }, { once: true });
        document.addEventListener('click',      function() { parallaxBg.play(); }, { once: true });
      });
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          parallaxBg.style.transform = 'translateY(' + (window.scrollY * 0.3) + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ══════════════════════════════════════════
     HERO TEXTE ROTATIF
     ══════════════════════════════════════════ */
  var rotatingWords = ['Brand Film', 'Publicité', 'Sport'];
  var rotatingIndex = 0;
  var rotatingEl = document.getElementById('rotatingText');

  if (rotatingEl) {
    setInterval(function() {
      rotatingEl.style.opacity   = '0';
      rotatingEl.style.transform = 'translateY(-8px)';
      setTimeout(function() {
        rotatingIndex = (rotatingIndex + 1) % rotatingWords.length;
        rotatingEl.textContent  = rotatingWords[rotatingIndex];
        rotatingEl.style.transform = 'translateY(8px)';
        setTimeout(function() {
          rotatingEl.style.opacity   = '1';
          rotatingEl.style.transform = 'translateY(0)';
        }, 40);
      }, 350);
    }, 2200);
  }

  /* ══════════════════════════════════════════
     COMPTEURS ANIMÉS
     ══════════════════════════════════════════ */
  var countersDone = false;

  function animateCounter(el) {
    var target  = parseInt(el.dataset.target);
    var suffix  = el.dataset.suffix || '';
    var step    = target / (1800 / 16);
    var current = 0;
    var timer = setInterval(function() {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, 16);
  }

  function checkCounters() {
    if (countersDone) return;
    var stats = document.querySelector('.hero-stats');
    if (stats && stats.getBoundingClientRect().top < window.innerHeight) {
      document.querySelectorAll('.counter').forEach(animateCounter);
      countersDone = true;
    }
  }

  /* ══════════════════════════════════════════
     CLIENTS TICKER
     ══════════════════════════════════════════ */
  (function() {
    var track = document.querySelector('.clients-track');
    if (!track) return;

    var items = track.querySelectorAll('.client-item');
    items.forEach(function(item) {
      track.appendChild(item.cloneNode(true));
    });

    var pos    = 0;
    var speed  = 0.5;
    var paused = false;

    var wrap = track.parentElement;
    if (wrap) {
      wrap.addEventListener('mouseenter', function() { paused = true; });
      wrap.addEventListener('mouseleave', function() { paused = false; });
    }

    function animateTicker() {
      if (!paused) {
        pos -= speed;
        var half = track.scrollWidth / 2;
        if (Math.abs(pos) >= half) pos = 0;
        track.style.transform = 'translateX(' + pos + 'px)';
      }
      requestAnimationFrame(animateTicker);
    }
    animateTicker();
  })();

  /* ══════════════════════════════════════════
     FILTRES PORTFOLIO
     ══════════════════════════════════════════ */
  window.filterProjects = function(cat, btn) {
    document.querySelectorAll('.filter-tab').forEach(function(t) {
      t.classList.remove('active');
    });
    btn.classList.add('active');

    var grid = document.querySelector('.portfolio-grid');
    if (!grid) return;

    grid.classList.toggle('filtered-mode', cat !== 'all');

    document.querySelectorAll('.proj-card').forEach(function(card) {
      var isGlobalExcluded = card.dataset.global === 'false';
      var match = (cat === 'all' && !isGlobalExcluded) || card.dataset.cat === cat;
      if (match) {
        card.classList.remove('filtered-out');
      } else {
        card.classList.add('filtered-out');
      }
    });

  };

  /* Init filtres au chargement */
  (function() {
    var firstTab = document.querySelector('.filter-tab');
    if (firstTab) window.filterProjects('all', firstTab);
  })();

  /* ══════════════════════════════════════════
     FAQ ACCORDION
     ══════════════════════════════════════════ */
  window.toggleFaq = function(el) {
    var item = el.parentElement;
    var open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(function(i) {
      i.classList.remove('open');
    });
    if (!open) item.classList.add('open');
  };

  /* ══════════════════════════════════════════
     BACK TO TOP
     ══════════════════════════════════════════ */
  var btt = document.getElementById('back-to-top');

  /* ══════════════════════════════════════════
     THEME TOGGLE
     ══════════════════════════════════════════ */
  window.toggleTheme = function() {
    var isLight = document.body.classList.toggle('light-mode');
    var tt = document.getElementById('theme-toggle');
    if (tt) tt.textContent = isLight ? '☾' : '☀';
    localStorage.setItem('fp-theme', isLight ? 'light' : 'dark');
  };

  if (localStorage.getItem('fp-theme') === 'light') {
    document.body.classList.add('light-mode');
    var tt = document.getElementById('theme-toggle');
    if (tt) tt.textContent = '☾';
  }

  /* ══════════════════════════════════════════
     COOKIE NOTICE
     ══════════════════════════════════════════ */
  window.acceptCookies = function() {
    localStorage.setItem('fp-cookies', 'accepted');
    var cn = document.getElementById('cookie-notice');
    if (cn) cn.classList.remove('visible');
  };

  window.declineCookies = function() {
    localStorage.setItem('fp-cookies', 'declined');
    var cn = document.getElementById('cookie-notice');
    if (cn) cn.classList.remove('visible');
  };

  if (!localStorage.getItem('fp-cookies')) {
    setTimeout(function() {
      var cn = document.getElementById('cookie-notice');
      if (cn) cn.classList.add('visible');
    }, 1800);
  }

  /* ══════════════════════════════════════════
     ABOUT PAGE OVERLAY
     ══════════════════════════════════════════ */
  window.openAboutPage = function() {
    var ap = document.getElementById('about-page');
    if (ap) {
      ap.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeAboutPage = function() {
    var ap = document.getElementById('about-page');
    if (ap) {
      ap.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  var aboutPageEl = document.getElementById('about-page');
  if (aboutPageEl) {
    aboutPageEl.addEventListener('click', function(e) {
      if (e.target === this) window.closeAboutPage();
    });
  }

  /* ══════════════════════════════════════════
     TAP RIPPLE MOBILE
     ══════════════════════════════════════════ */
  document.addEventListener('touchstart', function(e) {
    var touch = e.touches[0];
    var ripple = document.createElement('div');
    ripple.style.cssText =
      'position:fixed;width:40px;height:40px;border-radius:50%;' +
      'border:1.5px solid rgba(200,169,110,0.6);pointer-events:none;z-index:9997;' +
      'left:' + (touch.clientX - 20) + 'px;top:' + (touch.clientY - 20) + 'px;' +
      'animation:tapRipple 0.5s ease-out forwards;';
    document.body.appendChild(ripple);
    setTimeout(function() { ripple.remove(); }, 500);
  }, { passive: true });

  /* ══════════════════════════════════════════
     ESCAPE KEY
     ══════════════════════════════════════════ */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (typeof window.closeModal     === 'function') window.closeModal();
      if (typeof window.closeVimeo     === 'function') window.closeVimeo();
      if (typeof window.closeAboutPage === 'function') window.closeAboutPage();
    }
  });

  /* ══════════════════════════════════════════
     STATUT DISPONIBILITÉ + BANNIÈRE
     (fetch unique depuis status.json)
     ══════════════════════════════════════════ */
  fetch('/status.json?t=' + Date.now())
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var badge = document.getElementById('availBadge');
      var dot   = document.getElementById('availDot');
      var txt   = document.getElementById('availText');

      if (badge && dot && txt) {
        if (data.available) {
          badge.classList.remove('unavailable');
          txt.textContent = 'Disponible';
        } else {
          badge.classList.add('unavailable');
          dot.style.background = '#e05c5c';
          dot.style.boxShadow  = '0 0 6px #e05c5c';
          dot.style.animation  = 'none';
          txt.textContent      = 'Indisponible';
        }
      }

      /* Bannière */
      if (data.banner && data.banner.active && data.banner.text) {
        var bannerEl = document.getElementById('site-banner');
        var msgEl    = document.getElementById('banner-msg');
        if (bannerEl && msgEl) {
          msgEl.textContent = data.banner.text;
          bannerEl.classList.add('visible');
        }
      }
    })
    .catch(function() {});

  var bannerClose = document.getElementById('banner-close');
  if (bannerClose) {
    bannerClose.addEventListener('click', function() {
      var el = document.getElementById('site-banner');
      if (el) el.classList.remove('visible');
    });
  }

  /* ══════════════════════════════════════════
     SCROLL — gestionnaire global (RAF groupé)
     ══════════════════════════════════════════ */
  var scrollScheduled = false;

  function onScroll() {
    if (!scrollScheduled) {
      scrollScheduled = true;
      requestAnimationFrame(function() {
        updateProgress();
        updateNav();
        updateActiveNav();
        checkCounters();
        if (btt) btt.classList.toggle('visible', window.scrollY > 600);
        scrollScheduled = false;
      });
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* Init immédiate */
  updateProgress();
  updateNav();
  checkCounters();

})();

/* ══════════════════════════════════════════
   MODAL PROJETS
   ══════════════════════════════════════════ */
(function() {
  'use strict';

  var projectsData = [
    {
      id: 'the-dancer',
      vimeo: '1159587581',
      cat: 'Cinématique · Danse',
      title: 'The Dancer — Anya',
      desc: 'Un showreel réalisé avec Anya, danseuse professionnelle. L\'objectif était de capturer l\'expressivité des mouvements de la danseuse, de ses émotions.\nQu\'est-ce qu\'elle veut raconter à travers sa dance ?\nDans une lumière naturelle à contre jour, ainsi qu\'une Key-light de côté pour éclairer le sujet et renforcer un contraste de lumière qui amplifie la pression que l\'on ressent en la voyant danser. Une musique de NF qui rajoute des frissons, et un étalonnage bleu froid à l\'aide de DaVinci Resolve pour renforcer l\'atmosphère émotionnelle.\n\nMerci à Anya d\'avoir eu la volonté de travailler avec moi !',
      tags: ['Brand Film', 'Cinématique', 'Danse'],
      info: [
        ['Type',  'Film cinématique'],
        ['Rôle',  'Réalisation, montage, color grading'],
        ['Outil', 'DaVinci Resolve'],
        ['Lieu',  'Suisse Romande']
      ],
      type: 'vimeo'
    },
    {
      id: 'entre-videastes',
      vimeo: '1152969970',
      cat: 'Cinématique · Collaboration',
      title: 'Entre Vidéastes',
      desc: 'Une sortie avec @elouan_films sur Bulle. Deux vidéastes, une ville, une journée à se balader et shooter tout ce qu\'on trouvait beau. Pas de brief, pas de client — juste l\'envie d\'explorer et de trouver de beaux plans ensemble. C\'est exactement ce genre de projets qui nous fait avancer.',
      tags: ['Non classé', 'Cinématique', 'Collab'],
      info: [
        ['Type',   'Projet personnel'],
        ['Collab', '@elouan_films'],
        ['Lieu',   'Bulle, Fribourg'],
        ['Format', 'Court-métrage']
      ],
      type: 'vimeo'
    },
    {
      id: 'problem-time',
      youtube: 'QBG_90-UPm4',
      cat: 'Cinématique · Test caméra',
      title: 'The Problem is You Think You Have Time',
      desc: 'Test et exploration des capacités de la nouvelle Zihyun G200. Un projet de recherche visuelle qui sert aussi de démonstration des possibilités créatives que je peux me permettre grâce à cette lumière.',
      tags: ['Non classé', 'Cinématique', 'Test caméra'],
      info: [
        ['Type',     'Test caméra / Court'],
        ['Matériel', 'Zihyun G200'],
        ['Rôle',     'Réalisation, montage'],
        ['Format',   'Short film']
      ],
      type: 'youtube'
    },
    {
      id: 'mpfootperf',
      youtube: 'OF1te3PmTEY',
      cat: 'Brand Film · Football',
      title: 'MPfootperf.',
      desc: 'Un projet réalisé en collaboration avec MPfootperf. et 1700Fribourg. On s\'est retrouvé sur le terrain pour capturer ce que c\'est vraiment, l\'entraînement, l\'intensité, la relation entre le coach et ses joueurs. Tourné à Fribourg, étalonnage sur DaVinci Resolve. Merci à eux pour la confiance !',
      tags: ['Brand Film', 'Football', 'Cinématique'],
      info: [
        ['Type',          'Vidéo sportive'],
        ['Rôle',          'Réalisation, color grading, montage'],
        ['Outils',        'DaVinci Resolve · Canon EOS M50 Mark II · Canon 15-85mm · DJI RS3 Mini'],
        ['Lieu',          'Fribourg'],
        ['Client',        'MPfootperf.'],
        ['Collaboration', '1700Frib']
      ],
      type: 'youtube'
    },
    {
      id: 'webacces',
      youtube: 'Dr0IawbuiX8',
      cat: 'Film Corporate · Ferme',
      title: 'WebAcces — La Lorraine',
      desc: 'Retour du tournage corporate pour WebAcces à la ferme La Lorraine. Ce fut une grosse expérience. Merci de leur accueil et de nous avoir fait confiance ! Le droniste Arnaud Charrière (@arnaud_drone) était également présent pour m\'aider dans ce projet, pour le tournage. Merci à lui.',
      tags: ['Film Corporate', 'Extérieur', 'WebAcces'],
      info: [
        ['Type',     'Extérieur, ferme'],
        ['Matériel', 'Canon EOS M50 Mark II'],
        ['Rôle',     'Réalisation, tournage, montage'],
        ['Format',   'Short film Corporate'],
        ['Client',   'WebAcces'],
        ['Drone',    'Arnaud Charrière (@arnaud_drone)']
      ],
      type: 'youtube'
    },
    {
      id: 'bts-importance',
      youtube: 'qBH4YB5BSik',
      cat: 'Snack Content',
      title: 'L\'importance des BTS',
      desc: 'Une vidéo sur l\'importance des coulisses, sur tout ce qu\'on devrait montrer plus. Filmer le vrai, pas seulement le résultat.',
      tags: ['Snack Content', 'BTS', 'Vertical'],
      info: [
        ['Type',     'Snack Content · BTS'],
        ['Matériel', 'Canon EOS M50 Mark II · Insta360 X5'],
        ['Rôle',     'BTS, color grading'],
        ['Format',   'Vertical 9:16']
      ],
      type: 'youtube'
    },
    {
      id: 'ne-pas-finir',
      youtube: 'vDVSHTjxen8',
      cat: 'Snack Content · Éducatif',
      title: 'Ne pas finir un projet vidéo',
      desc: 'Est-ce que ça vous est déjà arrivé de ne pas terminer un de vos projets ? Dans cette vidéo je décris tous les problèmes liés au syndrome de l\'imposteur et la démotivation et je donne des conseils pour les éviter.',
      tags: ['Snack Content', 'Éducatif', 'Vertical'],
      info: [
        ['Type',     'Snack Content · Éducatif'],
        ['Matériel', 'Canon EOS M50 Mark II · Insta360 X5 · C-stand'],
        ['Rôle',     'Contenu éducatif'],
        ['Format',   'Vertical 9:16']
      ],
      type: 'youtube'
    }
  ];

  var currentIndex = 0;

  function openProject(projectId) {
    var idx = projectsData.findIndex(function(p) { return p.id === projectId; });
    if (idx === -1) return;
    currentIndex = idx;
    renderModal(idx);
    document.getElementById('proj-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function renderModal(idx) {
    var p = projectsData[idx];
    if (!p) return;

    var vidEl = document.getElementById('modal-video');
    if (vidEl) {
      if (p.type === 'vimeo') {
        vidEl.innerHTML =
          '<iframe src="https://player.vimeo.com/video/' + p.vimeo +
          '?autoplay=1&color=c8a96e&title=0&byline=0&portrait=0" ' +
          'allow="autoplay;fullscreen;encrypted-media" allowfullscreen></iframe>';
      } else {
        vidEl.innerHTML =
          '<iframe src="https://www.youtube-nocookie.com/embed/' + p.youtube +
          '?autoplay=1&rel=0" allow="autoplay;fullscreen;encrypted-media" allowfullscreen></iframe>';
      }
    }

    var catEl = document.getElementById('modal-cat');
    if (catEl) catEl.textContent = p.cat;

    var titleEl = document.getElementById('modal-title');
    if (titleEl) titleEl.textContent = p.title;

    var descEl = document.getElementById('modal-desc');
    if (descEl) descEl.textContent = p.desc;

    var metaEl = document.getElementById('modal-meta');
    if (metaEl) {
      metaEl.innerHTML = p.tags.map(function(t, i) {
        var cls = i === 0 ? 'gold' : i === 1 ? 'teal' : '';
        return '<span class="modal-meta-tag ' + cls + '">' + t + '</span>';
      }).join('');
    }

    var infoEl = document.getElementById('modal-info');
    if (infoEl) {
      infoEl.innerHTML = p.info.map(function(item) {
        return '<div class="modal-info-item">' +
          '<span class="modal-info-key">' + item[0] + '</span>' +
          '<span class="modal-info-val">' + item[1] + '</span>' +
          '</div>';
      }).join('');
    }

    var prev = document.getElementById('modal-prev');
    var next = document.getElementById('modal-next');
    if (prev) { prev.disabled = idx === 0; prev.style.opacity = idx === 0 ? '0.3' : '1'; }
    if (next) {
      next.disabled = idx === projectsData.length - 1;
      next.style.opacity = idx === projectsData.length - 1 ? '0.3' : '1';
    }

    var modal = document.getElementById('proj-modal');
    if (modal) modal.scrollTo(0, 0);
  }

  window.navigateModal = function(dir) {
    var newIdx = currentIndex + dir;
    if (newIdx < 0 || newIdx >= projectsData.length) return;
    currentIndex = newIdx;
    renderModal(newIdx);
  };

  window.closeModal = function() {
    var modal = document.getElementById('proj-modal');
    if (modal) modal.classList.remove('active');
    var vid = document.getElementById('modal-video');
    if (vid) vid.innerHTML = '';
    document.body.style.overflow = '';
  };

  var modalEl = document.getElementById('proj-modal');
  if (modalEl) {
    modalEl.addEventListener('click', function(e) {
      if (e.target === this) window.closeModal();
    });
  }

  /* Clicks sur cartes Vimeo */
  document.querySelectorAll('.vimeo-card').forEach(function(card) {
    card.addEventListener('click', function() {
      var vimeoId = card.dataset.vimeo;
      var map = {
        '1159587581': 'the-dancer',
        '1152969970': 'entre-videastes'
      };
      if (map[vimeoId]) openProject(map[vimeoId]);
    });
  });

  /* Clicks sur cartes YouTube */
  document.querySelectorAll('[data-youtube]').forEach(function(card) {
    card.addEventListener('click', function() {
      var ytId = card.dataset.youtube;
      var map = {
        'OF1te3PmTEY': 'mpfootperf',
        'QBG_90-UPm4': 'problem-time',
        'Dr0IawbuiX8': 'webacces',
        'qBH4YB5BSik': 'bts-importance',
        'vDVSHTjxen8': 'ne-pas-finir'
      };
      if (map[ytId]) openProject(map[ytId]);
    });
  });

  /* Vimeo lightbox standalone */
  window.closeVimeo = function() {
    var overlay = document.getElementById('vimeo-overlay');
    var iframe  = document.getElementById('vimeo-iframe');
    if (overlay) overlay.classList.remove('active');
    if (iframe)  iframe.src = '';
    document.body.style.overflow = '';
  };

  var vimeoOverlay = document.getElementById('vimeo-overlay');
  if (vimeoOverlay) {
    vimeoOverlay.addEventListener('click', function(e) {
      if (e.target === this) window.closeVimeo();
    });
  }

})();
