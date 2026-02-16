(function() {
  'use strict';

  var searchIndex = null;
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var status = document.getElementById('search-status');

  if (!input || !results) return;

  function loadIndex() {
    if (status) status.textContent = 'Loading...';

    fetch('/search_index.en.json')
      .then(function(response) {
        if (!response.ok) throw new Error('Failed to load index');
        return response.json();
      })
      .then(function(data) {
        searchIndex = elasticlunr.Index.load(data);
        if (status) {
          status.textContent = 'Ready';
          setTimeout(function() { status.textContent = ''; }, 1000);
        }
      })
      .catch(function(err) {
        console.error('Search index error:', err);
        if (status) status.textContent = 'Error';
      });
  }

  function search(query) {
    if (!searchIndex || query.length < 2) {
      results.innerHTML = '';
      return;
    }

    var searchResults = searchIndex.search(query, {
      fields: {
        title: { boost: 2 },
        body: { boost: 1 }
      },
      expand: true
    });

    renderResults(searchResults);
  }

  function renderResults(items) {
    if (items.length === 0) {
      results.innerHTML = '<div class="no-results">No transmissions found</div>';
      return;
    }

    var html = items.slice(0, 20).map(function(item) {
      var doc = searchIndex.documentStore.getDoc(item.ref);
      return [
        '<div class="search-result">',
        '  <a href="' + escapeHtml(item.ref) + '" class="result-title">' + escapeHtml(doc.title) + '</a>',
        '  <p class="result-excerpt">' + escapeHtml(truncate(doc.body, 150)) + '</p>',
        '</div>'
      ].join('\n');
    }).join('');

    results.innerHTML = html;
  }

  function truncate(str, len) {
    if (!str) return '';
    str = str.replace(/\s+/g, ' ').trim();
    return str.length > len ? str.substring(0, len) + '...' : str;
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Debounce helper
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }

  // Initialize
  loadIndex();

  // Bind input with debounce
  input.addEventListener('input', debounce(function() {
    search(this.value);
  }, 200));

  // Focus input on page load
  input.focus();
})();
