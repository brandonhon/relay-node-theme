// Back to top button functionality
(function() {
  const button = document.querySelector('.back-to-top');
  if (!button) return;

  const scrollThreshold = 300;

  function toggleButton() {
    if (window.scrollY > scrollThreshold) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleButton, { passive: true });

  button.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Initial check
  toggleButton();
})();
