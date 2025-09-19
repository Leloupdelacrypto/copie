
// Filter (progressive enhancement)
const pills = document.querySelectorAll('.pill');
const cards = [...document.querySelectorAll('.gallery .card')];
pills.forEach(p => p.addEventListener('click', () => {
  pills.forEach(x => x.classList.remove('is-active'));
  p.classList.add('is-active');
  const tag = p.dataset.filter;
  cards.forEach(c => {
    if (tag === 'all' || (c.dataset.tags || '').includes(tag)) {
      c.style.display = '';
    } else {
      c.style.display = 'none';
    }
  });
}));

// Lightbox (fixes previous "zoom bloqué")
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightImg = lightbox.querySelector('.lightbox-img');
const closeBtn = lightbox.querySelector('.lightbox-close');
const images = [...gallery.querySelectorAll('img')];((img, i) => {
  img.addEventListener('click', () => openLightbox(i));
  img.style.cursor = 'zoom-in';
});

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
  });

// Close when clicking on the image
lightImg.addEventListener('click', closeLightbox);
