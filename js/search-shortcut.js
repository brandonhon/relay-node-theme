// Search keyboard shortcut - Ctrl+K or / to focus search
(function() {
  document.addEventListener('keydown', function(e) {
    // Ignore if user is typing in an input/textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      // Allow Escape to blur
      if (e.key === 'Escape') {
        e.target.blur();
      }
      return;
    }

    // Ctrl+K or Cmd+K or /
    if ((e.key === 'k' && (e.ctrlKey || e.metaKey)) || e.key === '/') {
      e.preventDefault();

      const searchInput = document.querySelector('.search-input, #search-input, input[type="search"]');
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      } else {
        // Navigate to search page if not on it
        window.location.href = '/search/';
      }
    }
  });

  // Add hint to search input placeholder
  const searchInput = document.querySelector('.search-input, #search-input, input[type="search"]');
  if (searchInput && !searchInput.dataset.shortcutHint) {
    const originalPlaceholder = searchInput.placeholder || 'Search...';
    searchInput.placeholder = originalPlaceholder + ' (Press / or Ctrl+K)';
    searchInput.dataset.shortcutHint = 'true';
  }
})();
