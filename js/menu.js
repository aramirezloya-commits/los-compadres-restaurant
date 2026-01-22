document.addEventListener("DOMContentLoaded", () => {
  const menuImage = document.getElementById("menuImage");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const pageIndicator = document.getElementById("pageIndicator");
  const swipeHint = document.querySelector(".swipe-hint");

  const fullscreenView = document.getElementById("fullscreenView");
  const fullscreenImage = document.getElementById("fullscreenImage");
  const closeFullscreen = document.getElementById("closeFullscreen");
  const zoomHint = document.getElementById("zoomHint");


  const totalMenus = 10;
  let currentIndex = 1;

  // =====================
  // UPDATE IMAGE
  // =====================
  function updateImage() {
    const src = `assets/menu/menu${currentIndex}.jpg`;
    menuImage.src = src;

    if (fullscreenView.classList.contains("active")) {
      fullscreenImage.src = src;
    }

    if (pageIndicator) {
      pageIndicator.textContent = `${currentIndex} / ${totalMenus}`;
    }
  }

  // =====================
  // DESKTOP BUTTONS
  // =====================
  nextBtn?.addEventListener("click", () => {
    if (currentIndex < totalMenus) {
      currentIndex++;
      updateImage();
    }
  });

  prevBtn?.addEventListener("click", () => {
    if (currentIndex > 1) {
      currentIndex--;
      updateImage();
    }
  });

  // =====================
  // SWIPE NORMAL (MENU)
  // =====================
  let startX = 0;
  let endX = 0;

  menuImage.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  menuImage.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const distance = endX - startX;
    if (Math.abs(distance) < 50) return;

    if (distance < 0 && currentIndex < totalMenus) currentIndex++;
    if (distance > 0 && currentIndex > 1) currentIndex--;

    updateImage();
    swipeHint && (swipeHint.style.display = "none");
  }

  // =====================
  // OPEN FULLSCREEN
  // =====================
  menuImage.addEventListener("click", () => {
    fullscreenImage.src = menuImage.src;
    fullscreenView.classList.add("active");
  });


  // =====================
  // CLOSE FULLSCREEN
  // =====================
  closeFullscreen.addEventListener("click", () => {
    fullscreenView.classList.remove("active");
  });


  // =====================
  // SWIPE EN FULLSCREEN
  // =====================
  let fsStartX = 0;
  let fsEndX = 0;

  fullscreenImage.addEventListener("touchstart", (e) => {
    fsStartX = e.touches[0].clientX;
  }, { passive: true });

  fullscreenImage.addEventListener("touchend", (e) => {
    fsEndX = e.changedTouches[0].clientX;
    handleFullscreenSwipe();
  });

  function handleFullscreenSwipe() {
    const distance = fsEndX - fsStartX;
    if (Math.abs(distance) < 50) return;

    if (distance < 0 && currentIndex < totalMenus) currentIndex++;
    if (distance > 0 && currentIndex > 1) currentIndex--;

    updateImage();
  }

  // =====================
  // ZOOM HINT TIMING
  // =====================
  if (zoomHint) {
    // desaparecer solo después de 3 segundos
    setTimeout(() => {
      zoomHint.classList.add("hide");
    }, 2000);

    // si el usuario toca la imagen, se oculta de inmediato
    menuImage.addEventListener("click", () => {
      zoomHint.classList.add("hide");
    });
  }


  // =====================
  // INIT
  // =====================
  updateImage();
});
