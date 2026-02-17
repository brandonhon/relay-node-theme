// Copy button for code blocks
(function() {
  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach(function(codeBlock) {
    const pre = codeBlock.parentNode;

    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.type = 'button';

    button.addEventListener('click', function() {
      const text = codeBlock.textContent;

      navigator.clipboard.writeText(text).then(function() {
        button.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(function() {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      }).catch(function() {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        button.textContent = 'Copied!';
        button.classList.add('copied');

        setTimeout(function() {
          button.textContent = 'Copy';
          button.classList.remove('copied');
        }, 2000);
      });
    });

    pre.appendChild(button);
  });
})();
