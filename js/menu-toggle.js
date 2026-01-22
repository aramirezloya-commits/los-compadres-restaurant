document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuToggle');
  const menu = document.getElementById('overlayMenu');

  if (!menuBtn || !menu) return;

  const links = menu.querySelectorAll('[data-link]');

  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  const closeBtn = document.querySelector('.menu-close');

    if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        menu.classList.remove('open');
        document.body.classList.remove('menu-open');
    });
    }
});

lucide.createIcons();

