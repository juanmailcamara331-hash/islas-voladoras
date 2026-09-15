(function () {
  window.addEventListener('error', function (event) {
    var box = document.getElementById('iv-debug');
    if (!box) return;
    box.style.display = 'block';
    box.textContent += '\nERROR: ' + (event.message || event.error || 'Error desconocido');
  });
  window.addEventListener('unhandledrejection', function (event) {
    var box = document.getElementById('iv-debug');
    if (!box) return;
    box.style.display = 'block';
    box.textContent += '\nPROMESA: ' + (event.reason || 'Rechazo desconocido');
  });
  document.addEventListener('DOMContentLoaded', function () {
    var box = document.createElement('pre');
    box.id = 'iv-debug';
    box.style.cssText = 'display:none;position:fixed;left:8px;right:8px;bottom:8px;z-index:2147483647;max-height:45vh;overflow:auto;padding:12px;background:rgba(0,0,0,.9);color:#ffdddd;font:12px monospace;white-space:pre-wrap;border:1px solid #f66;border-radius:8px';
    box.textContent = 'Islas Voladoras: error de arranque Web detectado';
    document.body.appendChild(box);
  });
})();
