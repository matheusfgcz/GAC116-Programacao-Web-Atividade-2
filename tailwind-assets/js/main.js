document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('themeBtn');
  const themeBtnMobile = document.getElementById('themeBtnMobile');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme') || 'light';

  if (saved === 'dark') {
    html.classList.add('dark');
    html.classList.remove('light');
  }

  const updateBtnLabels = (isDark) => {
    if (themeBtn) themeBtn.textContent = isDark ? 'Tema Claro' : 'Tema Escuro';
    if (themeBtnMobile) themeBtnMobile.textContent = isDark ? 'Tema Claro' : 'Tema Escuro';
  };

  updateBtnLabels(saved === 'dark');

  const toggleTheme = () => {
    const isDark = html.classList.contains('dark');
    html.classList.toggle('dark', !isDark);
    html.classList.toggle('light', isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    updateBtnLabels(!isDark);
  };

  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  if (themeBtnMobile) themeBtnMobile.addEventListener('click', toggleTheme);

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  const skillSection = document.getElementById('habilidades');
  if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-fill').forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    skillObserver.observe(skillSection);
  }
});