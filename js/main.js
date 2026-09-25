// MatheComics — entrypoint de scripts del sitio.

const heroVideo = document.querySelector('.hero__video');
if (heroVideo && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroVideo.pause();
  heroVideo.removeAttribute('autoplay');
}

// Reveal-on-scroll: agrega .is-visible a los elementos .reveal cuando entran al viewport.
const revealEls = document.querySelectorAll('.reveal:not(.is-visible)');
if (revealEls.length) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
}
