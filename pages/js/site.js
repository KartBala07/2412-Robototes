/* Team 2412 Robototes — shared site behavior (adapted from limesite) */
(function(){
  /* === THEME TOGGLE === */
  var root=document.documentElement;
  root.setAttribute('data-theme',localStorage.getItem('theme')||'dark');
  var tBtn=document.getElementById('themeToggle');
  if(tBtn){tBtn.addEventListener('click',function(){
    var n=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',n);localStorage.setItem('theme',n);
  });}

  /* === CURSOR === */
  var dot=document.getElementById('cdot'),ring=document.getElementById('cring');
  if(dot&&ring&&window.matchMedia('(hover:hover)').matches){
    document.body.style.cursor='none';
    var mx=0,my=0,rx=0,ry=0;
    document.addEventListener('mousemove',function(e){
      mx=e.clientX;my=e.clientY;
      dot.style.left=mx+'px';dot.style.top=my+'px';
    });
    (function aR(){
      rx+=(mx-rx)*.11;ry+=(my-ry)*.11;
      ring.style.left=rx+'px';ring.style.top=ry+'px';
      requestAnimationFrame(aR);
    })();
    document.querySelectorAll('a,button,.resource-card,.action-btn,.info-card,.nav-cta').forEach(function(el){
      el.addEventListener('mouseenter',function(){dot.style.width='18px';dot.style.height='18px';ring.style.width='50px';ring.style.height='50px';});
      el.addEventListener('mouseleave',function(){dot.style.width='10px';dot.style.height='10px';ring.style.width='34px';ring.style.height='34px';});
    });
  }

  /* === LOADER === */
  var ld=document.getElementById('loader');
  if(ld){
    var seen=false;
    try{seen=sessionStorage.getItem('rt_loader_seen')==='1';}catch(e){}
    if(seen){ld.parentNode.removeChild(ld);}
    else{setTimeout(function(){
      ld.classList.add('out');
      try{sessionStorage.setItem('rt_loader_seen','1');}catch(e){}
    },1750);}
  }

  /* === SCROLL REVEAL === */
  var ro=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('on');ro.unobserve(e.target);}
    });
  },{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){ro.observe(el);});

  /* === COUNTERS === */
  var co=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting)return;
      var el=e.target,target=parseInt(el.dataset.t,10),n=0,step=target/112;
      var t=setInterval(function(){
        n=Math.min(n+step,target);
        el.textContent=Math.floor(n);
        if(n>=target)clearInterval(t);
      },16);
      co.unobserve(el);
    });
  },{threshold:.5});
  document.querySelectorAll('.cnt').forEach(function(el){co.observe(el);});

  /* === MOBILE NAV === */
  var nt=document.getElementById('navToggle'),nm=document.querySelector('.nav-menu');
  if(nt&&nm){
    nt.addEventListener('click',function(){nt.classList.toggle('open');nm.classList.toggle('open');});
    nm.querySelectorAll('.nav-item').forEach(function(item){
      var lk=item.querySelector('.nav-link');
      if(lk&&item.querySelector('.dropdown-panel')){
        var sv=lk.querySelector('svg');
        if(sv){sv.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();item.classList.toggle('open');});}
      }
    });
  }

  /* === SEARCH === */
  var PAGES=[
    {"t":"Home","u":"index.html","c":"Main","k":"robototes frc team 2412 bellevue washington sammamish robotics home"},
    {"t":"Team 2412","u":"about/team_2412.html","c":"About","k":"about team history mission founded 2007 students mentors sammamish high school"},
    {"t":"FIRST","u":"about/first.html","c":"About","k":"first robotics competition frc build season pacific northwest district gracious professionalism"},
    {"t":"Robototes Bots","u":"robots/robototes_bots.html","c":"Robots","k":"robots history phoenix crane heron machines seasons rebuilt crescendo charged up"},
    {"t":"Sponsors","u":"sponsors.html","c":"Main","k":"sponsors sponsorship partners boeing gene haas electroimpact donate boosters"},
    {"t":"Outreach","u":"outreach/overview.html","c":"Outreach","k":"outreach community service demos tutoring mathcomp cleanups ramen robotics"},
    {"t":"Advocacy","u":"resources/advocacy.html","c":"Resources","k":"advocacy rsaa shop space cte credit stem funding conference"},
    {"t":"Documents","u":"resources/documents.html","c":"Resources","k":"documents resources links blog booster github handbook"},
    {"t":"Contact Us","u":"contact.html","c":"Main","k":"contact email address reach us captain outreach business logistics"}
  ];
  window.SITE_PAGES=PAGES;
  var BASE=(document.body.getAttribute('data-root')||'');
  function href(p){return BASE+p.u;}
  function match(q){
    var terms=q.toLowerCase().split(/\s+/).filter(Boolean);
    function subseq(s,qq){var si=0,qi=0;s=s.toLowerCase();qq=qq.toLowerCase();while(si<s.length&&qi<qq.length){if(s[si]===qq[qi])qi++;si++;}return qi===qq.length;}
    return PAGES.filter(function(p){
      var s=(p.t+' '+p.u+' '+p.c+' '+(p.k||'')).toLowerCase();
      return terms.some(function(t){return s.indexOf(t)>-1;})||subseq(p.t,q);
    });
  }
  var btn=document.getElementById('navSearchBtn'),
      drop=document.getElementById('navSearchDrop'),
      inp=document.getElementById('navSearchInput'),
      form=document.getElementById('navSearchForm');
  if(btn&&drop&&inp){
    var ai=-1;
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      var open=drop.classList.toggle('open');
      btn.classList.toggle('active',open);
      if(open)setTimeout(function(){inp.focus();},40);
    });
    document.addEventListener('click',function(e){
      if(!drop.contains(e.target)&&e.target!==btn){drop.classList.remove('open');btn.classList.remove('active');}
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape'){drop.classList.remove('open');btn.classList.remove('active');}
    });
    function showSuggs(matches){
      var suggs=document.getElementById('navSearchSuggs');
      suggs.innerHTML='';ai=-1;
      matches.slice(0,6).forEach(function(p){
        var a=document.createElement('a');
        a.className='nav-sugg-item';a.href=href(p);
        a.innerHTML='<span class="nav-sugg-name">'+p.t+'</span><span class="nav-sugg-cat">'+p.c+'</span>';
        suggs.appendChild(a);
      });
    }
    inp.addEventListener('input',function(){
      var q=inp.value.trim();
      if(!q){document.getElementById('navSearchSuggs').innerHTML='';ai=-1;return;}
      showSuggs(match(q));
    });
    inp.addEventListener('keydown',function(e){
      var els=document.querySelectorAll('#navSearchSuggs .nav-sugg-item');
      if(!els.length)return;
      if(e.key==='ArrowDown'){e.preventDefault();ai=Math.min(ai+1,els.length-1);}
      else if(e.key==='ArrowUp'){e.preventDefault();ai=Math.max(ai-1,-1);}
      else return;
      els.forEach(function(el,i){el.classList.toggle('ss-active',i===ai);});
    });
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var els=document.querySelectorAll('#navSearchSuggs .nav-sugg-item');
      if(ai>=0&&els[ai]){window.location.href=els[ai].href;return;}
      var q=inp.value.trim();if(!q)return;
      var m=match(q)[0];
      if(m)window.location.href=href(m);
      drop.classList.remove('open');btn.classList.remove('active');
    });
  }

  /* === FOOTER SEARCH === */
  var fi=document.getElementById('footerSearchInput');
  if(fi){
    var suggs=document.createElement('div');
    suggs.style.cssText='position:fixed;background:var(--bg-card);border:1px solid var(--border);border-radius:8px;box-shadow:0 20px 40px rgba(0,0,0,.35);z-index:9000;display:none;flex-direction:column;overflow:hidden;max-height:260px;overflow-y:auto;min-width:260px;';
    document.body.appendChild(suggs);
    function positionSuggs(){var r=fi.getBoundingClientRect();suggs.style.left=r.left+'px';suggs.style.width=r.width+'px';suggs.style.bottom=(window.innerHeight-r.top+4)+'px';}
    function showFooterSuggs(){
      var q=fi.value.trim();
      suggs.innerHTML='';
      if(!q){suggs.style.display='none';return;}
      var res=match(q).slice(0,6);
      if(!res.length){suggs.style.display='none';return;}
      res.forEach(function(p){
        var a=document.createElement('a');
        a.href=href(p);
        a.style.cssText='display:flex;justify-content:space-between;align-items:center;padding:.5rem .85rem;text-decoration:none;color:var(--text-main);font-size:.84rem;border-top:1px solid var(--border);gap:.5rem;transition:background .12s,color .12s;';
        a.innerHTML='<span style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+p.t+'</span><span style="font-family:JetBrains Mono,monospace;font-size:.6rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;flex-shrink:0;">'+p.c+'</span>';
        a.addEventListener('mouseenter',function(){this.style.background='var(--bg-dark)';this.style.color='var(--accent)';});
        a.addEventListener('mouseleave',function(){this.style.background='';this.style.color='var(--text-main)';});
        suggs.appendChild(a);
      });
      positionSuggs();
      suggs.style.display='flex';
    }
    fi.addEventListener('input',showFooterSuggs);
    fi.addEventListener('keydown',function(e){if(e.key==='Enter'){var first=suggs.querySelector('a');if(first)window.location.href=first.href;}});
    document.addEventListener('click',function(e){if(!fi.contains(e.target)&&!suggs.contains(e.target))suggs.style.display='none';});
    fi.addEventListener('focus',function(){if(fi.value.trim())showFooterSuggs();});
    window.addEventListener('resize',function(){if(suggs.style.display!=='none')positionSuggs();});
  }

  /* === HOME: CIRCUIT CANVAS === */
  var cvs=document.getElementById('hcvs');
  if(cvs){
    var ctx=cvs.getContext('2d');
    var W,H,nodes=[];
    function resize(){W=cvs.width=cvs.offsetWidth;H=cvs.height=cvs.offsetHeight;}
    resize();
    window.addEventListener('resize',function(){resize();init();},{passive:true});
    function init(){
      nodes=[];
      var N=Math.min(Math.floor(W*H/13000),90);
      for(var i=0;i<N;i++){
        nodes.push({
          x:Math.random()*W,y:Math.random()*H,
          vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,
          r:Math.random()*1.8+.6,
          a:Math.random()*.45+.1,
          p:Math.random()*Math.PI*2
        });
      }
    }
    init();
    var frameCount=0;
    (function draw(){
      ctx.clearRect(0,0,W,H);
      frameCount++;
      for(var i=0;i<nodes.length;i++){
        var n=nodes[i];
        n.p+=.018;n.x+=n.vx;n.y+=n.vy;
        if(n.x<0||n.x>W)n.vx*=-1;
        if(n.y<0||n.y>H)n.vy*=-1;
        for(var j=i+1;j<nodes.length;j++){
          var m=nodes[j];
          var dx=n.x-m.x,dy=n.y-m.y;
          var d=dx*dx+dy*dy;
          if(d<22500){
            var dist=Math.sqrt(d);
            var a=(1-dist/150)*.13;
            ctx.beginPath();
            ctx.moveTo(n.x,n.y);
            if(frameCount%7===0&&dist>50){ctx.lineTo(m.x,n.y);ctx.lineTo(m.x,m.y);}
            else{ctx.lineTo(m.x,m.y);}
            ctx.strokeStyle='rgba(238,47,56,'+a+')';
            ctx.lineWidth=.55;
            ctx.stroke();
          }
        }
        var alpha=n.a*(.6+.4*Math.sin(n.p));
        ctx.beginPath();
        ctx.arc(n.x,n.y,n.r,0,Math.PI*2);
        ctx.fillStyle='rgba(238,47,56,'+alpha+')';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    })();

    /* hero parallax (home only) */
    var hContent=document.querySelector('.h-content');
    if(hContent){
      window.addEventListener('scroll',function(){
        var s=scrollY;
        if(s<window.innerHeight){
          hContent.style.transform='translateY('+(s*.28)+'px)';
          cvs.style.transform='translateY('+(s*.14)+'px)';
        }
      },{passive:true});
    }
  }
})();
