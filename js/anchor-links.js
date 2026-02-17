// Anchor links on headings - click to copy permalink
(function() {
  const headings = document.querySelectorAll('.content h1[id], .content h2[id], .content h3[id], .content h4[id], .content h5[id], .content h6[id]');

  headings.forEach(function(heading) {
    const link = document.createElement('a');
    link.href = '#' + heading.id;
    link.className = 'anchor-link';
    link.setAttribute('aria-label', 'Link to this section');
    link.innerHTML = '<span class="anchor-icon">#</span>';

    link.addEventListener('click', function(e) {
      e.preventDefault();
      const url = window.location.origin + window.location.pathname + '#' + heading.id;

      navigator.clipboard.writeText(url).then(function() {
        link.classList.add('copied');
        setTimeout(function() {
          link.classList.remove('copied');
        }, 2000);
      });

      // Also update URL hash
      history.pushState(null, null, '#' + heading.id);
    });

    heading.appendChild(link);
  });
})();
