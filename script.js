
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('#navToggle');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll('a')) : [];

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navAnchors.forEach((anchor) => {
      anchor.addEventListener('click', () => {
        if (window.innerWidth <= 960) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 960) {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const yearSpan = document.getElementById('current-year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear().toString();

  // Testimonials slider
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
        stopAutoplay(); currentIndex = 0;
        if (track) track.style.transform = 'translateX(0)';
      } else {
        updateSlider(); startAutoplay();
      }
    });

    updateSlider();
    startAutoplay();
  }

  // Product slider
  const prodTrack = document.querySelector('.prod-track');
  const prodCards = prodTrack ? Array.from(prodTrack.querySelectorAll('.prod-card')) : [];
  const btnPrev = document.querySelector('[data-prod="prev"]');
  const btnNext = document.querySelector('[data-prod="next"]');
  const dots = Array.from(document.querySelectorAll('.prod-dot'));
  let pIndex = 0;

  function updateProd() {
    if (!prodTrack || prodCards.length === 0) return;
    const slide = prodCards[0];
    const style = window.getComputedStyle(slide);
    const w = slide.offsetWidth;
    const gap = parseFloat(style.marginRight || '0') + 12;
    const offset = (w + gap) * pIndex;
    prodTrack.style.transform = `translateX(-${offset}px)`;
    dots.forEach((d, i) => d.setAttribute('aria-selected', String(i === pIndex)));
  }
  function gotoProd(i) {
    if (prodCards.length === 0) return;
    const last = prodCards.length - 1;
    if (i < 0) pIndex = last; else if (i > last) pIndex = 0; else pIndex = i;
    updateProd();
  }
  if (btnPrev && btnNext && prodCards.length) {
    btnPrev.addEventListener('click', () => gotoProd(pIndex - 1));
    btnNext.addEventListener('click', () => gotoProd(pIndex + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => gotoProd(i)));
    window.addEventListener('resize', updateProd);
    updateProd();
  }
});


/* ===== Generic image carousels (Pros & Particuliers) ===== */
(function(){
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((root) => {
    const track = root.querySelector('.carousel__track');
    const slides = track ? Array.from(track.querySelectorAll('.carousel__slide')) : [];
    const prev = root.querySelector('[data-dir="prev"]');
    const next = root.querySelector('[data-dir="next"]');
    const dots = root.querySelector('.carousel__dots');
    let index = 0;

    const update = () => {
      if (!track || !slides.length) return;
      const width = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${index * width}px)`;
      if (dots){
        [...dots.children].forEach((el, i) => el.setAttribute('aria-current', i===index ? 'true' : 'false'));
      }
    };

    const goto = (i) => {
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
})();


/* v16 carousel independence: safer width and scoping */
document.querySelectorAll('.carousel').forEach((root) => {
  const viewport = root.querySelector('.carousel__viewport');
  const track = root.querySelector('.carousel__track');
  const slides = track ? Array.from(track.querySelectorAll('.carousel__slide')) : [];
  const prev = root.querySelector('[data-dir="prev"]');
  const next = root.querySelector('[data-dir="next"]');
  const dots = root.querySelector('.carousel__dots');
  let index = 0;

  function slideWidth(){
    return viewport ? viewport.clientWidth : (slides[0]?.getBoundingClientRect().width || 0);
  }
  function update(){
    if (!track || !slides.length) return;
    track.style.transform = `translateX(-${index * slideWidth()}px)`;
    if (dots){
      [...dots.children].forEach((el,i)=> el.setAttribute('aria-current', i===index ? 'true':'false'));
    }
  }
  function goto(i){
    const last = slides.length - 1;
    if (i < 0) index = last;
    else if (i > last) index = 0;
    else index = i;
    update();
  }
  if (dots){
    dots.innerHTML = '';
    slides.forEach((_,i)=>{
      const b = document.createElement('button');
      b.setAttribute('aria-label', 'Aller à l’image '+(i+1));
      b.addEventListener('click', ()=> goto(i));
      dots.appendChild(b);
    });
  }
  prev && prev.addEventListener('click', ()=> goto(index-1));
  next && next.addEventListener('click', ()=> goto(index+1));
  window.addEventListener('resize', update);
  update();
});


/* v22: Facebook reviews (manual list, copy/paste from public page) */
const fbReviews = [
  { name: "Camille", text: "Des sablés magnifiques et délicieux ! Service impeccable, je recommande à 100%." },
  { name: "Thomas", text: "Personnalisation parfaite pour notre événement pro, invités conquis. Merci La Délicieuserie !" },
  { name: "Julie", text: "Un vrai coup de cœur. Équipe à l’écoute et biscuits sublimes." },
  { name: "Alexandre", text: "Livraison rapide, résultat au-delà de nos attentes. On repassera commande !" }
];

(function injectFacebookReviews(){
  const track = document.querySelector('.testimonials .slider__track');
  if (!track) return;
  track.innerHTML = '';
  fbReviews.forEach(({name, text}) => {
    const fig = document.createElement('figure');
    fig.className = 'testimonial';
    fig.innerHTML = `<blockquote>“${text}”</blockquote><figcaption>${name} – Avis Facebook</figcaption>`;
    track.appendChild(fig);
  });
})();


// v23.3-adjustMainPadding — ensure main content isn't hidden behind fixed navbar
(function(){
  function setPad(){
    var nav = document.querySelector('.site-header .navbar') || document.querySelector('.navbar');
    var main = document.querySelector('main#main, main');
    if (!nav || !main) return;
    var h = nav.getBoundingClientRect().height;
    main.style.paddingTop = (h + 10) + 'px';
  }
  window.addEventListener('load', setPad);
  window.addEventListener('resize', setPad);
  document.addEventListener('DOMContentLoaded', setPad);
})();
