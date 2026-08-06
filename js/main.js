// MatheComics — entrypoint de scripts del sitio.

const heroVideo = document.querySelector('.hero__video');
if (heroVideo && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroVideo.pause();
  heroVideo.removeAttribute('autoplay');
}
