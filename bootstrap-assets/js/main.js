document.addEventListener('DOMContentLoaded', () => {

  const themeBtn = document.getElementById('themeBtn');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('bs-theme') || 'light';

  const updateThemeUI = (isDark) => {
    html.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');
    if (themeBtn) themeBtn.textContent = isDark ? 'Tema Claro' : 'Tema Escuro';
  };

  updateThemeUI(savedTheme === 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-bs-theme');
      const isDark = currentTheme === 'light';

      updateThemeUI(isDark);
      localStorage.setItem('bs-theme', isDark ? 'dark' : 'light');
    });
  }

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  const skillSection = document.getElementById('habilidades');

  if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.custom-progress-bar').forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    skillObserver.observe(skillSection);
  }

});