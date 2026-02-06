document.addEventListener("DOMContentLoaded", () => {

  /* Lazy loading de imágenes */
  document
    .querySelectorAll(".menu-gallery img")
    .forEach(img => img.loading = "lazy");

  /* Tabs de menú (Restaurante / Bar) */
  const tabs = document.querySelectorAll('.menu-tab');
  const contents = document.querySelectorAll('.menu-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {

      /* Quitar estados activos */
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      /* Activar tab */
      tab.classList.add('active');

      const target = tab.dataset.menu;
      const content = document.getElementById(`menu-${target}`);

      if (content) {
        content.classList.add('active');

        /* Scroll suave hacia el menú */
        content.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
