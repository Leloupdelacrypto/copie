document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll('a')) : [];

  if (navToggle && navLinks){
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navAnchors.forEach(a => a.addEventListener('click', () => {
      if (window.innerWidth <= 960) navLinks.classList.remove('open');
    }));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) navLinks.classList.remove('open');
    });
  }

  // Dynamic year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear().toString();

  // ===== Testimonials slider =====
  const track = document.querySelector('.slider__track');
  const slides = track ? Array.from(track.querySelectorAll('.testimonial')) : [];
  const prevBtn = document.querySelector('[data-direction="prev"]');
  const nextBtn = document.querySelector('[data-direction="next"]');
  const dotsContainer = document.querySelector('.slider__dots');
  let currentIndex = 0;
  let autoplayId;

  function updateSlider(){
    if (!track || slides.length === 0) return;
    const slide = slides[0];
    const slideWidth = slide.offsetWidth + 16; // margin-right approx
    const offset = slideWidth * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  function goToSlide(index){
    if (slides.length === 0) return;
    const lastIndex = slides.length - 1;
    if (index < 0) currentIndex = lastIndex;
    else if (index > lastIndex) currentIndex = 0;
    else currentIndex = index;
    updateSlider();
  }

  function startAutoplay(){
    stopAutoplay();
    autoplayId = window.setInterval(() => goToSlide(currentIndex + 1), 6000);
  }
  function stopAutoplay(){
    if (autoplayId){ clearInterval(autoplayId); autoplayId = undefined; }
  }

  if (prevBtn && nextBtn && slides.length > 0){
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    if (track){
      track.addEventListener('mouseenter', stopAutoplay);
      track.addEventListener('mouseleave', startAutoplay);
    }
    prevBtn.addEventListener('mouseenter', stopAutoplay);
    nextBtn.addEventListener('mouseenter', stopAutoplay);
    prevBtn.addEventListener('mouseleave', startAutoplay);
    nextBtn.addEventListener('mouseleave', startAutoplay);
  }

  // Build dots
  function buildDots(){
    if (!dotsContainer || !slides.length) return;
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.className = 'slider__dot';
      b.setAttribute('aria-label', 'Aller au témoignage ' + (i+1));
      b.addEventListener('click', () => { currentIndex = i; updateSlider(); });
      dotsContainer.appendChild(b);
    });
  }
  function updateDots(){
    if (!dotsContainer) return;
    [...dotsContainer.children].forEach((el, i) => {
      el.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
    });
  }

  buildDots();
  updateSlider();
  startAutoplay();
  window.addEventListener('resize', updateSlider);

  // ===== Generic image carousels (pros & particuliers) =====
  document.querySelectorAll('.carousel').forEach(root => {
    const cTrack = root.querySelector('.carousel__track');
    const slides = cTrack ? Array.from(cTrack.querySelectorAll('.carousel__slide')) : [];
    const prev = root.querySelector('[data-dir="prev"]');
    const next = root.querySelector('[data-dir="next"]');
    const dots = root.querySelector('.carousel__dots');
    let index = 0;

    const update = () => {
      if (!cTrack || !slides.length) return;
      const width = slides[0].getBoundingClientRect().width;
      cTrack.style.transform = `translateX(-${index * width}px)`;
      if (dots){
        [...dots.children].forEach((el, i) => el.setAttribute('aria-current', i===index ? 'true' : 'false'));
      }
    };
    const goto = i => {
      const last = slides.length - 1;
      if (i < 0) index = last;
      else if (i > last) index = 0;
      else index = i;
      update();
    };

    if (dots){
      dots.innerHTML = '';
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.setAttribute('aria-label', 'Aller à l’image ' + (i+1));
        b.addEventListener('click', () => goto(i));
        dots.appendChild(b);
      });
    }

    prev && prev.addEventListener('click', () => goto(index - 1));
    next && next.addEventListener('click', () => goto(index + 1));
    window.addEventListener('resize', update);
    update();
  });
});
