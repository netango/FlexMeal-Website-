// ── Hero Carousel ──
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let autoplayTimer;

function goToSlide(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function startAutoplay() {
  autoplayTimer = setInterval(() => goToSlide(current + 1), 4000);
}

function resetAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}

// Dot navigation
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
    resetAutoplay();
  });
});

// Swipe support
const track = document.querySelector('.carousel-track');
let startX = 0;
let isDragging = false;

track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
}, { passive: true });

track.addEventListener('touchend', (e) => {
  if (!isDragging) return;
  isDragging = false;
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    goToSlide(diff > 0 ? current + 1 : current - 1);
    resetAutoplay();
  }
});

// Mouse drag support
track.addEventListener('mousedown', (e) => {
  startX = e.clientX;
  isDragging = true;
  track.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  track.style.cursor = '';
  const diff = startX - e.clientX;
  if (Math.abs(diff) > 50) {
    goToSlide(diff > 0 ? current + 1 : current - 1);
    resetAutoplay();
  }
});

// Pause autoplay on hover
track.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
track.addEventListener('mouseleave', () => startAutoplay());

startAutoplay();

// ── Tabs ──
const tabs = document.querySelectorAll('.tab');
const customerSteps = document.querySelector('.customer-steps');
const chefSteps = document.querySelector('.chef-steps');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    if (tab.dataset.tab === 'customer') {
      customerSteps.classList.add('active');
      chefSteps.classList.remove('active');
    } else {
      chefSteps.classList.add('active');
      customerSteps.classList.remove('active');
    }
  });
});

// ── Smooth scroll for nav links ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
