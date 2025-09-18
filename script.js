const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('primary-menu');
const yearSpan = document.getElementById('current-year');

if (yearSpan){ yearSpan.textContent = new Date().getFullYear().toString(); }

if (navToggle && navLinks){
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 960) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Testimonials slider
(function(){
  const track = document.querySelector('.slider__track');
  const slides = track ? Array.from(track.querySelectorAll('.testimonial')) : [];
  const prevBtn = document.querySelector('[data-direction="prev"]');
  const nextBtn = document.querySelector('[data-direction="next"]');
  let currentIndex = 0;
  let autoplayId;

  const isDesktop = () => window.innerWidth > 960;

  const updateSlider = () => {
    if (!track || slides.length === 0) return;
    const slide = slides[0];
    const slideStyle = window.getComputedStyle(slide);
    const slideWidth = slide.offsetWidth;
    const gap = parseFloat(slideStyle.marginRight || '0');
    const offset = (slideWidth + gap) * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;
  };

  const goToSlide = (index) => {
    if (slides.length === 0) return;
    const lastIndex = slides.length - 1;
    if (index < 0) currentIndex = lastIndex;
    else if (index > lastIndex) currentIndex = 0;
    else currentIndex = index;
    updateSlider();
  };

  const startAutoplay = () => {
    if (!isDesktop() || slides.length <= 1) { stopAutoplay(); return; }
    stopAutoplay();
    autoplayId = window.setInterval(() => goToSlide(currentIndex + 1), 6000);
  };

  const stopAutoplay = () => {
    if (autoplayId) { window.clearInterval(autoplayId); autoplayId = undefined; }
  };

  if (prevBtn && nextBtn && slides.length > 1) {
    prevBtn.addEventListener('click', () => { if (!isDesktop()) return; goToSlide(currentIndex - 1); });
    nextBtn.addEventListener('click', () => { if (!isDesktop()) return; goToSlide(currentIndex + 1); });

    if (track) {
      track.addEventListener('mouseenter', stopAutoplay);
      track.addEventListener('mouseleave', startAutoplay);
    }
    prevBtn.addEventListener('mouseenter', stopAutoplay);
    nextBtn.addEventListener('mouseenter', stopAutoplay);
    prevBtn.addEventListener('mouseleave', startAutoplay);
    nextBtn.addEventListener('mouseleave', startAutoplay);

    window.addEventListener('resize', () => {
      if (!isDesktop()) {
        stopAutoplay();
        currentIndex = 0;
        if (track) track.style.transform = 'translateX(0)';
      } else {
        updateSlider();
        startAutoplay();
      }
    });
    updateSlider();
    startAutoplay();
  }
})();
