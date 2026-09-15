<script>
(function () {
  function enterFullscreen() {
    var el = document.documentElement;
    var request = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (request) {
      try {
        var result = request.call(el);
        if (result && result.catch) result.catch(function () {});
      } catch (e) {}
    }
  }

  function addButton() {
    if (document.getElementById('iv-fullscreen')) return;
    var b = document.createElement('button');
    b.id = 'iv-fullscreen';
    b.type = 'button';
    b.textContent = '⛶ Pantalla completa';
    b.setAttribute('aria-label', 'Pantalla completa');
    b.style.cssText = 'position:fixed;top:12px;right:12px;z-index:2147483647;padding:11px 15px;border:0;border-radius:10px;background:rgba(0,0,0,.82);color:#fff;font:600 14px sans-serif;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.4)';
    b.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      enterFullscreen();
    };
    document.body.appendChild(b);
  }

  function init() {
    addButton();

    // Los navegadores bloquean el fullscreen sin gesto del usuario.
    // Lo solicitamos en el primer toque/click para que quede forzado
    // desde la primera interacción; el botón sigue siendo el respaldo.
    var once = function () {
      enterFullscreen();
      document.removeEventListener('pointerdown', once, true);
      document.removeEventListener('touchstart', once, true);
      document.removeEventListener('keydown', once, true);
    };
    document.addEventListener('pointerdown', once, true);
    document.addEventListener('touchstart', once, true);
    document.addEventListener('keydown', once, true);

    window.addEventListener('fullscreenchange', function () {
      var b = document.getElementById('iv-fullscreen');
      if (b) b.style.display = document.fullscreenElement ? 'none' : 'block';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>