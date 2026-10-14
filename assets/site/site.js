(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 35px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  }
  const videos = document.querySelectorAll('.video-card video');
  // Touch devices use the native controls so a user's play or full-screen action is never interrupted.
  if (window.matchMedia('(pointer: coarse)').matches || !('IntersectionObserver' in window)) return;
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        if (!reducedMotion) video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.2 });
  videos.forEach(video => videoObserver.observe(video));
})();
