document.addEventListener("DOMContentLoaded", () => {

  const translations = {
    en: {
      home: "Home",
      menu: "Menu",
      order: "Order",
      find: "Find Us",

      hero_title: "Authentic Mexican Food",
      hero_subtitle: "Traditional flavors made fresh every day in Texas",
      view_menu: "View Menu",

      order_title: "Order Your Favorite Mexican Food",
      order_text: "Traditional flavors made fresh every day. Call us and we’ll have your order ready.",
      order_cta: "Call to Order",

      directions_title: "HOW TO GET HERE?",
      directions_text: "Visit us at our Corpus Christi location. Click the map to open directions in Google Maps.",
      directions_cta: "Open in Google Maps",

      hours_title: "Hours",
      phone_title: "Phone",

      hours_week: "Mon – Sat: 6AM – 9PM",
      hours_sun: "Sunday: 6AM – 3PM",

      "order-btn": "Place Order"
    },
    es: {
      home: "Inicio",
      menu: "Menú",
      order: "Ordenar",
      find: "Cómo llegar",

      hero_title: "Comida Mexicana Autentica",
      hero_subtitle: "Sabores tradicionales preparados frescos todos los dias en Texas",
      view_menu: "Ver Menu",

      order_title: "Ordena tu comida mexicana favorita",
      order_text: "Sabores tradicionales preparados frescos todos los dias. Llamanos y tendremos tu orden lista.",
      order_cta: "Llamar para ordenar",

      directions_title: "¿COMO LLEGAR?",
      directions_text: "Visitanos en nuestra ubicacion en Corpus Christi. Haz clic en el mapa para abrir las direcciones en Google Maps.",
      directions_cta: "Abrir en Google Maps",

      hours_title: "Horario",
      phone_title: "Telefono",

      hours_week: "Lun – Sab: 6AM – 9PM",
      hours_sun: "Domingo: 6AM – 3PM",

      "order-btn": "Hacer Pedido"
    }
  };


  

  const langBtn = document.getElementById("langToggle");
  let currentLang = localStorage.getItem("lang") || "en";

  function applyLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    langBtn.textContent = lang.toUpperCase();
    localStorage.setItem("lang", lang);
  }

  // aplicar idioma inicial
  applyLanguage(currentLang);

  // toggle ES / EN
  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "es" : "en";
    applyLanguage(currentLang);
  });

});
