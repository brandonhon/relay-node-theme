(function() {
  'use strict';

  function SimpleChart(container) {
    this.container = container;
    this.canvas = container.querySelector('.chart-canvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.status = container.querySelector('.chart-status');
    this.endpoint = container.dataset.chartEndpoint;
    this.type = container.dataset.chartType || 'line';
    this.title = container.dataset.chartTitle || 'Data';

    this.colors = {
      primary: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ff6a1a',
      grid: '#2a2f36',
      text: '#7b848e',
      bg: '#0c0e11'
    };

    this.init();
  }

  SimpleChart.prototype.init = function() {
    var self = this;
    this.resize();
    window.addEventListener('resize', function() { self.resize(); });
    this.fetchAndRender();
  };

  SimpleChart.prototype.resize = function() {
    var rect = this.container.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = 200 * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = '200px';
    this.ctx.scale(dpr, dpr);
  };

  SimpleChart.prototype.fetchAndRender = function() {
    var self = this;

    if (!this.endpoint) {
      if (this.status) this.status.textContent = 'No endpoint';
      return;
    }

    if (this.status) this.status.textContent = 'Loading...';

    fetch(this.endpoint)
      .then(function(response) {
        if (!response.ok) throw new Error('Fetch failed');
        return response.json();
      })
      .then(function(data) {
        self.render(data);
        if (self.status) {
          self.status.textContent = 'Updated: ' + new Date().toLocaleTimeString();
        }
      })
      .catch(function(error) {
        console.error('Chart error:', error);
        if (self.status) self.status.textContent = 'Error';
      });
  };

  SimpleChart.prototype.render = function(data) {
    var ctx = this.ctx;
    var canvas = this.canvas;
    var dpr = window.devicePixelRatio || 1;
    var width = canvas.width / dpr;
    var height = canvas.height / dpr;
    var padding = 40;
    var chartWidth = width - padding * 2;
    var chartHeight = height - padding * 2;

    // Clear canvas
    ctx.fillStyle = this.colors.bg;
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = this.colors.grid;
    ctx.lineWidth = 1;
    for (var i = 0; i <= 5; i++) {
      var y = padding + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Get values
    var values = data.values || data;
    if (!Array.isArray(values) || values.length === 0) {
      ctx.fillStyle = this.colors.text;
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('No data available', width / 2, height / 2);
      return;
    }

    var max = Math.max.apply(null, values);
    var min = Math.min.apply(null, values);
    var range = max - min || 1;

    // Draw line
    ctx.strokeStyle = this.colors.primary;
    ctx.lineWidth = 2;
    ctx.beginPath();

    var self = this;
    values.forEach(function(val, idx) {
      var x = padding + (chartWidth / (values.length - 1)) * idx;
      var y = padding + chartHeight - ((val - min) / range) * chartHeight;

      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Glow effect
    ctx.save();
    ctx.shadowColor = this.colors.primary;
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.restore();

    // Draw data points
    ctx.fillStyle = this.colors.primary;
    values.forEach(function(val, idx) {
      var x = padding + (chartWidth / (values.length - 1)) * idx;
      var y = padding + chartHeight - ((val - min) / range) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw labels if provided
    if (data.labels && Array.isArray(data.labels)) {
      ctx.fillStyle = this.colors.text;
      ctx.font = '11px monospace';
      ctx.textAlign = 'center';

      data.labels.forEach(function(label, idx) {
        var x = padding + (chartWidth / (data.labels.length - 1)) * idx;
        ctx.fillText(label, x, height - 10);
      });
    }

    // Draw Y-axis values
    ctx.fillStyle = this.colors.text;
    ctx.font = '10px monospace';
    ctx.textAlign = 'right';

    for (var j = 0; j <= 5; j++) {
      var yVal = min + (range / 5) * (5 - j);
      var yPos = padding + (chartHeight / 5) * j;
      ctx.fillText(Math.round(yVal).toString(), padding - 8, yPos + 4);
    }
  };

  // Initialize all charts on page
  function initCharts() {
    var containers = document.querySelectorAll('.chart-container');
    containers.forEach(function(container) {
      new SimpleChart(container);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCharts);
  } else {
    initCharts();
  }
})();
