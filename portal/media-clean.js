(function(){
  var style=document.createElement('style');
  style.id='isl-media-clean-ui';
  style.textContent=`
    #lightbox{padding:0!important;background:#02070b!important;overflow:hidden!important}
    #lightbox figure{position:absolute!important;inset:0!important;width:100%!important;height:100dvh!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important}
    #lbMedia{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important}
    #lbMedia img,#lbMedia video{display:block!important;width:auto!important;height:auto!important;max-width:100%!important;max-height:100%!important;object-fit:contain!important;margin:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:#02070b!important}
    #lbCaption{display:none!important;visibility:hidden!important;height:0!important;min-height:0!important;margin:0!important;padding:0!important;overflow:hidden!important}
    #lbClose{position:fixed!important;z-index:2147483646!important;width:34px!important;height:34px!important;min-width:34px!important;min-height:34px!important;margin:0!important;padding:0!important;border:1px solid rgba(255,255,255,.25)!important;border-radius:999px!important;background:rgba(3,10,14,.48)!important;color:#fff!important;font:400 24px/32px system-ui,sans-serif!important;display:grid!important;place-items:center!important;box-shadow:0 4px 18px rgba(0,0,0,.32)!important;backdrop-filter:blur(7px)!important;-webkit-backdrop-filter:blur(7px)!important;opacity:.78!important;touch-action:manipulation!important}
    #lbClose:active{opacity:1!important;background:rgba(3,10,14,.78)!important}
    @media(orientation:portrait){#lbClose{top:max(8px,env(safe-area-inset-top))!important;right:max(8px,env(safe-area-inset-right))!important;left:auto!important;bottom:auto!important}}
    @media(orientation:landscape){#lbClose{top:max(8px,env(safe-area-inset-top))!important;left:max(8px,env(safe-area-inset-left))!important;right:auto!important;bottom:auto!important}}
    #lightbox.show~#islFsToggle,#lightbox.show #islFsToggle{opacity:.38!important}
  `;
  document.head.appendChild(style);
  var cap=document.getElementById('lbCaption');if(cap){cap.textContent='';cap.setAttribute('aria-hidden','true')}
  var close=document.getElementById('lbClose');if(close){close.setAttribute('aria-label','Cerrar');close.title='Cerrar'}
})();
