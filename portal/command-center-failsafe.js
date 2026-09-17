(function(){
  function installGuard(){
    try{
      var st=document.getElementById('isl-command-center-viewport-guard');
      if(!st){
        st=document.createElement('style');
        st.id='isl-command-center-viewport-guard';
        st.textContent='html{overflow-x:clip}body{overflow-x:hidden}';
        document.head.appendChild(st);
      }
    }catch(e){}
  }

  function recoverOnlyIfNeeded(resetScroll){
    try{
      installGuard();
      var active=document.querySelector('.view.active');
      var home=document.getElementById('home');
      if(!active&&home){
        home.classList.add('active');
        var b=document.querySelector('.rail button[data-view="home"]');
        if(b)b.classList.add('active');
      }
      if(resetScroll){
        document.documentElement.scrollLeft=0;
        document.body.scrollLeft=0;
        window.scrollTo(0,0);
      }
    }catch(e){}
  }

  try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}

  function boot(){recoverOnlyIfNeeded(true)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.addEventListener('load',function(){recoverOnlyIfNeeded(true)});

  document.addEventListener('click',function(e){
    if(e.target&&e.target.id==='enterISL'){
      setTimeout(function(){recoverOnlyIfNeeded(true)},30);
    }
  },true);
})();
