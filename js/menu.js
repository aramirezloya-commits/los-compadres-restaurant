document.addEventListener("DOMContentLoaded", () => {
  const menuImage = document.getElementById("menuImage");
  const viewer = document.querySelector(".viewer");
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
  let didSwipe = false;

  // =====================
  // PRELOAD IMAGES
  // =====================
  for (let i = 1; i <= totalMenus; i++) {
    const img = new Image();
    img.src = `assets/menu/menu${i}.jpg`;
  }

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
  // SWIPE NORMAL (1 DEDO)
  // =====================
  let startX = 0;
  let endX = 0;

  viewer.addEventListener("touchstart", (e) => {
    if (e.touches.length > 1) return; // 👈 IGNORA PINCH
    startX = e.touches[0].clientX;
  }, { passive: true });

  viewer.addEventListener("touchend", (e) => {
    if (e.changedTouches.length > 1) return; // 👈 IGNORA PINCH
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const distance = endX - startX;
    const threshold = window.innerWidth * 0.15;
    if (Math.abs(distance) < threshold) return;

    didSwipe = true;

    if (distance < 0 && currentIndex < totalMenus) currentIndex++;
    if (distance > 0 && currentIndex > 1) currentIndex--;

    updateImage();
    swipeHint && (swipeHint.style.display = "none");

    setTimeout(() => didSwipe = false, 200);
  }

  // =====================
  // OPEN FULLSCREEN (TAP)
  // =====================
  menuImage.addEventListener("click", () => {
    if (didSwipe) return;
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
  // SWIPE FULLSCREEN (1 DEDO)
  // =====================
  let fsStartX = 0;
  let fsEndX = 0;

  fullscreenImage.addEventListener("touchstart", (e) => {
    if (e.touches.length > 1) return; // 👈 IGNORA PINCH
    fsStartX = e.touches[0].clientX;
  }, { passive: true });

  fullscreenImage.addEventListener("touchend", (e) => {
    if (e.changedTouches.length > 1) return; // 👈 IGNORA PINCH
    fsEndX = e.changedTouches[0].clientX;
    handleFullscreenSwipe();
  });

  function handleFullscreenSwipe() {
    const distance = fsEndX - fsStartX;
    const threshold = window.innerWidth * 0.15;
    if (Math.abs(distance) < threshold) return;

    if (distance < 0 && currentIndex < totalMenus) currentIndex++;
    if (distance > 0 && currentIndex > 1) currentIndex--;

    updateImage();
  }

  // =====================
  // ZOOM HINT
  // =====================
  if (zoomHint) {
    setTimeout(() => {
      zoomHint.classList.add("hide");
    }, 2000);

    menuImage.addEventListener("click", () => {
      zoomHint.classList.add("hide");
    });
  }

  // =====================
  // INIT
  // =====================
  updateImage();
});
