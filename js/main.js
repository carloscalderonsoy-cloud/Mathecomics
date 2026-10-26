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

// Botón de compartir: usa Web Share API si existe, si no copia el enlace.
document.querySelectorAll('.share-btn').forEach((btn) => {
  const label = btn.querySelector('.share-btn__label');
  const originalText = label ? label.textContent : '';

  btn.addEventListener('click', async () => {
    const shareData = {
      title: btn.dataset.shareTitle || document.title,
      text: btn.dataset.shareText || '',
      url: btn.dataset.shareUrl || window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // El usuario canceló el share; no hacer nada.
      }
      return;
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        if (label) {
          label.textContent = '¡Enlace copiado!';
          setTimeout(() => { label.textContent = originalText; }, 2000);
        }
      } catch (err) {
        // Clipboard no disponible; no hacer nada.
      }
    }
  });
});
