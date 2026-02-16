(function() {
  'use strict';

  var config = window.STREAMING_CONFIG || {};
  var grid = document.getElementById('streaming-grid');
  var status = document.getElementById('streaming-status');
  var errorDiv = document.getElementById('streaming-error');

  if (!grid) return;

  if (!config.endpoint) {
    if (status) {
      status.innerHTML = '<p class="warning">Streaming endpoint not configured</p>';
    }
    return;
  }

  function fetchStreams() {
    fetch(config.endpoint)
      .then(function(response) {
        if (!response.ok) throw new Error('Network response failed');
        return response.json();
      })
      .then(function(data) {
        renderStreams(data.streams || data);
        if (errorDiv) errorDiv.style.display = 'none';
      })
      .catch(function(error) {
        console.error('Streaming fetch error:', error);
        if (errorDiv) errorDiv.style.display = 'block';
        if (status) status.style.display = 'none';
      });
  }

  function renderStreams(streams) {
    if (!streams || streams.length === 0) {
      grid.innerHTML = '<div class="no-streams">No active streams detected</div>';
      if (status) {
        status.innerHTML = '<span class="status-offline">OFFLINE</span>';
      }
      return;
    }

    if (status) {
      status.innerHTML = '<span class="status-online">ONLINE</span> - ' + streams.length + ' active stream(s)';
    }

    grid.innerHTML = streams.map(function(stream) {
      var html = [
        '<div class="stream-card ' + (stream.status || 'active') + '">',
        '  <div class="stream-header">',
        '    <span class="stream-name">' + escapeHtml(stream.name) + '</span>',
        '    <span class="stream-viewers">' + (stream.viewers || 0) + ' viewers</span>',
        '  </div>',
        '  <div class="stream-info">',
        '    <p class="stream-title">' + escapeHtml(stream.title || 'Untitled') + '</p>',
        '    <p class="stream-runtime">Runtime: ' + formatDuration(stream.runtime || 0) + '</p>',
        '  </div>'
      ];

      if (stream.connect_command) {
        html.push('  <div class="terminal stream-connect">' + escapeHtml(stream.connect_command) + '</div>');
      }

      html.push('</div>');
      return html.join('\n');
    }).join('');
  }

  function escapeHtml(str) {
    if (!str) return '';
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatDuration(seconds) {
    var h = Math.floor(seconds / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    return h + 'h ' + m + 'm';
  }

  // Initial fetch
  fetchStreams();

  // Periodic refresh
  if (config.refreshInterval > 0) {
    setInterval(fetchStreams, config.refreshInterval);
  }

  // Retry button
  var retryBtn = document.getElementById('retry-connection');
  if (retryBtn) {
    retryBtn.addEventListener('click', fetchStreams);
  }
})();
