(function(){
  function recover(){
    try{
      var app=document.querySelector('.app');
      var main=document.querySelector('main');
      var active=document.querySelector('.view.active');
      var home=document.getElementById('home');
      if(app){
        app.style.removeProperty('opacity');
        app.style.removeProperty('visibility');
        if(getComputedStyle(app).display==='none') app.style.display='grid';
      }
      if(main){
        main.style.removeProperty('opacity');
        main.style.removeProperty('visibility');
        if(getComputedStyle(main).display==='none') main.style.display='block';
      }
      if(!active&&home){
        home.classList.add('active');
        var b=document.querySelector('.rail button[data-view="home"]');
        if(b)b.classList.add('active');
      }
    }catch(e){}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',recover); else recover();
  window.addEventListener('load',recover);
  setTimeout(recover,250);
  setTimeout(recover,1200);
  setTimeout(recover,2600);
})();
