const totalPages = 10;
const images = [];

// =====================
// PRECARGA DE IMÁGENES
// =====================
for (let i = 1; i <= totalPages; i++) {
  const img = new Image();
  img.src = `assets/menu/menu${i}.jpg`;
  images.push(img.src);
}

let current = 0;

const menuImage = document.getElementById('menuImage');
const counter = document.getElementById('counter');
const menuViewer = document.querySelector('.menu-viewer');
const backBtn = document.querySelector('.menu-back');

// INIT
menuImage.src = images[0];
counter.textContent = `1 / ${images.length}`;

// =====================
// NAVEGACIÓN PC
// =====================
document.getElementById('next').addEventListener('click', nextPage);
document.getElementById('prev').addEventListener('click', prevPage);

function nextPage() {
  current = (current + 1) % images.length;
  updateMenu();
}

function prevPage() {
  current = (current - 1 + images.length) % images.length;
  updateMenu();
}

function updateMenu() {
  menuImage.src = images[current];
  counter.textContent = `${current + 1} / ${images.length}`;
}

// =====================
// SWIPE MÓVIL
// =====================
let startX = 0;

menuViewer.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
}, { passive: true });

menuViewer.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  const threshold = 50;

  if (startX - endX > threshold) nextPage();
  if (endX - startX > threshold) prevPage();
});

// =====================
// FULLSCREEN
// =====================
document.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
});

// =====================
// BACK BUTTON
// =====================
backBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (document.fullscreenElement) {
    document.exitFullscreen().then(() => {
      window.location.href = 'index.html';
    });
  } else {
    window.location.href = 'index.html';
  }
});
