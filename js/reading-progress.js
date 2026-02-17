// Reading progress bar
(function() {
  const progressBar = document.querySelector('.reading-progress-bar');
  if (!progressBar) return;

  const progressFill = progressBar.querySelector('.reading-progress-fill');
  const progressText = progressBar.querySelector('.reading-progress-text');
  if (!progressFill) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressFill.style.width = progress + '%';

    if (progressText) {
      progressText.textContent = Math.round(progress) + '%';
    }
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });

  // Initial update
  updateProgress();
})();
