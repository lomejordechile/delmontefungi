// ==========================================
// DELMONTE FUNGI - main.js
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Announcement Bar ----
  const announceBar = document.getElementById('announcement-bar');
  const closeBtn = document.getElementById('close-announcement');
  if (closeBtn && announceBar) {
    closeBtn.addEventListener('click', () => {
      announceBar.style.height = announceBar.offsetHeight + 'px';
      announceBar.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        announceBar.style.transition = 'height 0.35s ease, opacity 0.35s ease';
        announceBar.style.height = '0';
        announceBar.style.opacity = '0';
      });
      setTimeout(() => announceBar.remove(), 400);
    });
  }

  // ---- Sticky Header Scroll Effect ----
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 60);
    }
  }, { passive: true });

  // ---- Mobile Menu Toggle ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const spans = hamburger.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    // Close on mobile link click
    mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
  }

  // ---- Smooth Anchor Scrolling ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 68;
        window.scrollTo({ top: target.offsetTop - headerH - 10, behavior: 'smooth' });
      }
    });
  });

  // ---- Scroll Reveal Animation ----
  const revealTargets = document.querySelectorAll(
    '.product-card, .benefit-card, .testimonial-card, .process__step, .faq__item, .why-item, .stat'
  );
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealTargets.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.6s ease ${i * 0.07}s, transform 0.6s ease ${i * 0.07}s`;
      observer.observe(el);
    });
  }

  // ---- Contact Form ----
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      if (!name || !email) {
        showNotification('Por favor completa nombre y email.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showNotification('Por favor ingresa un email valido.', 'error');
        return;
      }
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      setTimeout(() => {
        showNotification('Mensaje enviado correctamente. Te contactaremos pronto!', 'success');
        form.reset();
        btn.textContent = 'Enviar mensaje';
        btn.disabled = false;
      }, 1500);
    });
  }

  // ---- Notification Helper ----
  function showNotification(msg, type) {
    const existing = document.querySelector('.notif');
    if (existing) existing.remove();
    const notif = document.createElement('div');
    notif.className = 'notif';
    notif.textContent = msg;
    Object.assign(notif.style, {
      position: 'fixed', bottom: '5.5rem', right: '1.75rem',
      background: type === 'success' ? '#065f46' : '#991b1b',
      color: '#fff', padding: '1rem 1.5rem', borderRadius: '12px',
      fontSize: '0.9rem', fontWeight: '600', zIndex: '1000',
      boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
      maxWidth: '320px', lineHeight: '1.5',
      animation: 'fadeInUp 0.3s ease both'
    });
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.style.transition = 'opacity 0.4s ease';
      notif.style.opacity = '0';
      setTimeout(() => notif.remove(), 400);
    }, 4000);
  }

  // ---- Product Card Buy Ripple Effect ----
  document.querySelectorAll('.btn--product').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      Object.assign(ripple.style, {
        position: 'absolute',
        width: '120px', height: '120px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.35)',
        transform: 'scale(0)',
        left: (e.clientX - rect.left - 60) + 'px',
        top: (e.clientY - rect.top - 60) + 'px',
        animation: 'ripple 0.6s ease-out forwards',
        pointerEvents: 'none'
      });
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // Add ripple keyframes dynamically
  const style = document.createElement('style');
  style.textContent = '@keyframes ripple { to { transform: scale(3); opacity: 0; } }';
  document.head.appendChild(style);

  // ---- Parallax Hero ----
  const heroBg = document.querySelector('.hero__bg-img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroBg.style.transform = `scale(1.05) translateY(${scrollY * 0.2}px)`;
    }, { passive: true });
  }

});