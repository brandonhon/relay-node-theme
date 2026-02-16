(function() {
  'use strict';

  var STORAGE_KEY = 'relay-node-theme';
  var DEFAULT_THEME = 'orange';

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateActiveButton(theme);
  }

  function getTheme() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
  }

  function updateActiveButton(theme) {
    var buttons = document.querySelectorAll('[data-set-theme]');
    buttons.forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-set-theme') === theme);
    });
  }

  function init() {
    // Set initial theme
    var savedTheme = getTheme();
    setTheme(savedTheme);

    // Bind theme picker buttons
    var buttons = document.querySelectorAll('[data-set-theme]');
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        setTheme(this.getAttribute('data-set-theme'));
      });
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
