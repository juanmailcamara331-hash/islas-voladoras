(function(){
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);else fn()}
  ready(function(){
    var form=document.querySelector('form[name="isl-molino-poll"]');
    if(!form)return;
    form.addEventListener('submit',function(){
      try{
        var fd=new FormData(form);
        var molino=fd.get('molino');
        var comentario=fd.get('comentario')||'';
        if(!molino)return;
        var payload=JSON.stringify({molino:String(molino),comentario:String(comentario)});
        if(navigator.sendBeacon){
          navigator.sendBeacon('/api/poll-state',new Blob([payload],{type:'application/json'}));
        }else{
          fetch('/api/poll-state',{method:'POST',headers:{'Content-Type':'application/json'},body:payload,keepalive:true}).catch(function(){});
        }
      }catch(e){}
    },true);
  });
})();
