(function () {
  function enterFullscreen() {
    var el = document.documentElement;
    var request = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen;
    if (request) {
      try { request.call(el); } catch (e) {}
    }
  }
  function addButton() {
    if (document.getElementById('iv-fullscreen')) return;
    var b = document.createElement('button');
    b.id = 'iv-fullscreen';
    b.type = 'button';
    b.textContent = '⛶ Pantalla completa';
    b.style.cssText = 'position:fixed;top:12px;right:12px;z-index:2147483647;padding:10px 14px;border:0;border-radius:10px;background:rgba(0,0,0,.78);color:#fff;font:600 14px sans-serif;cursor:pointer;box-shadow:0 2px 10px rgba(0,0,0,.35)';
    b.onclick = function () { enterFullscreen(); b.style.display = 'none'; };
    document.body.appendChild(b);
  }
  function firstGesture() {
    enterFullscreen();
    var b = document.getElementById('iv-fullscreen');
    if (b) b.style.display = 'none';
    window.removeEventListener('pointerdown', firstGesture, true);
    window.removeEventListener('touchstart', firstGesture, true);
  }
  function init() {
    addButton();
    window.addEventListener('pointerdown', firstGesture, true);
    window.addEventListener('touchstart', firstGesture, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
