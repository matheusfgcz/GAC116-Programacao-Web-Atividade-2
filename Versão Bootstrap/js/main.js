document.addEventListener('DOMContentLoaded', () => {

  const themeBtn = document.getElementById('themeBtn');
  const html = document.documentElement;
  const saved = localStorage.getItem('theme') || 'light';

  html.setAttribute('data-theme', saved);
  themeBtn.textContent = saved === 'dark' ? '☀️' : '🌙';

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', next);
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
