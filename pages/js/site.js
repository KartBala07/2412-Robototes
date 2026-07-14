/* Team 2412 Robototes — shared site behavior (v2) */
(function(){
  /* theme */
  var root=document.documentElement;
  root.setAttribute('data-theme',localStorage.getItem('theme')||'dark');
  var tBtn=document.getElementById('modeBtn');
  if(tBtn){tBtn.addEventListener('click',function(){
    var n=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',n);localStorage.setItem('theme',n);
  });}

  /* mobile nav */
  var bg=document.getElementById('burger'),links=document.getElementById('tbLinks');
  if(bg&&links){bg.addEventListener('click',function(){
    var open=links.classList.toggle('open');
    bg.textContent=open?'[x]':'[=]';
  });}

  /* reveal on scroll */
  var ro=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');ro.unobserve(e.target);}});
  },{threshold:.1});
  document.querySelectorAll('.rv').forEach(function(el){ro.observe(el);});

  /* counters */
  var co=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      var el=e.target,t=parseInt(el.dataset.t,10),n=0,s=Math.max(t/90,.5);
      var iv=setInterval(function(){
        n=Math.min(n+s,t);el.textContent=Math.floor(n)+(el.dataset.suf||'');
        if(n>=t)clearInterval(iv);
      },16);
      co.unobserve(el);
    });
  },{threshold:.5});
  document.querySelectorAll('[data-t]').forEach(function(el){co.observe(el);});
})();
