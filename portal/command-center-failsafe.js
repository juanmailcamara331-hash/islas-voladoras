(function(){
  function installGuard(){
    try{
      var st=document.getElementById('isl-command-center-viewport-guard');
      if(!st){
        st=document.createElement('style');
        st.id='isl-command-center-viewport-guard';
        st.textContent='html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important;overscroll-behavior-x:none}.app{width:100%!important;max-width:100vw!important;overflow-x:hidden!important}.app>main,main{min-width:0!important;max-width:100%!important;overflow-x:hidden!important}.view{max-width:100%!important}img,video{max-width:100%}';
        document.head.appendChild(st);
      }
    }catch(e){}
  }
  function showHome(resetScroll){
    try{
      installGuard();
      var app=document.querySelector('.app');
      var main=document.querySelector('main');
      var home=document.getElementById('home');
      var views=document.querySelectorAll('.view');
      var buttons=document.querySelectorAll('.rail button[data-view]');
      if(app){app.style.display='grid';app.style.visibility='visible';app.style.opacity='1'}
      if(main){main.style.display='block';main.style.visibility='visible';main.style.opacity='1'}
      if(home){
        for(var i=0;i<views.length;i++)views[i].classList.remove('active');
        home.classList.add('active');
        for(var j=0;j<buttons.length;j++)buttons[j].classList.remove('active');
        var b=document.querySelector('.rail button[data-view="home"]');
        if(b)b.classList.add('active');
      }
      if(resetScroll){
        document.documentElement.scrollLeft=0;document.body.scrollLeft=0;
        window.scrollTo(0,0);
      }
    }catch(e){}
  }
  function boot(){installGuard();showHome(true)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
  window.addEventListener('load',function(){showHome(true)});
  var enter=document.getElementById('enterISL');
  if(enter)enter.addEventListener('click',function(){setTimeout(function(){showHome(true)},30)},true);
  document.addEventListener('click',function(e){if(e.target&&e.target.id==='enterISL')setTimeout(function(){showHome(true)},30)},true);
  window.addEventListener('pageshow',function(){setTimeout(function(){showHome(true)},20)});
})();
