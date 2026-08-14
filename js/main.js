const CONFIG={
  whatsapp:'5527996726889',
  instagram:'https://www.instagram.com/makanavaa/',
  maps:'https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIPCAEQLhgTGK8BGMcBGIAEMgkIAhAAGBMYgAQyCQgDEAAYExiABDIJCAQQABgTGIAEMgkIBRAAGBMYgAQyCQgGEAAYExiABDIGCAcQRRg80gEIMjI3M2owajeoAgiwAgHxBa22-dy7ZqDz&um=1&ie=UTF-8&fb=1&gl=br&sa=X&geocode=KcMPAkEYF7gAMY9ksDKrCNaz&daddr=R.+Gast%C3%A3o+Roubach,+2-390+-+Praia+da+Costa,+Vila+Velha+-+ES,+29101-012',
  passeiosCompra:'',
  googleReviews:'https://www.google.com/search?q=makana+vaa+avalia%C3%A7%C3%A3o&sca_esv=5bc61aad9dddc238&sxsrf=APpeQnvfB5x7pHT1t7c4IkIrb7L3I-EO3w%3A1786401653584&ei=dVN6asCbI_n75OUP-IG5wAU&ved=0ahUKEwiAqvPfkJeWAxX5PbkGHfhADlgQ4dUDCBA&uact=5&oq=makana+vaa+avalia%C3%A7%C3%A3o&gs_lp=Egxnd3Mtd2l6LXNlcnAiFm1ha2FuYSB2YWEgYXZhbGlhw6fDo28yCBAAGIAEGKIEMgUQABjvBTIFEAAY7wUyBRAAGO8FMgUQABjvBUjpKVCaAlj9InABeACQAQCYAcYCoAGzFqoBBzAuMi41LjS4AQPIAQD4AQGYAgugAqMVwgIKEAAYRxjWBBiwA8ICBhAAGBYYHsICAhAmwgIFECEYoAHCAgQQIRgVmAMAiAYBkAYEkgcHMS4xLjYuM6AH6xWyBwcwLjEuNi4zuAeYFcIHBzItNS41LjHIB2mACAE&sclient=gws-wiz-serp#lrd=0xb8171841020fc3:0xb3d608ab32b0648f,1,,,,',
  waMsg:'Olá! Vim pelo site da Makana e gostaria de saber mais.',
  waAulas:'Olá! Vim pelo site da Makana e gostaria de saber mais sobre as aulas.',
  waCorporativo:'Olá! Vim pelo site da Makana e gostaria de solicitar uma proposta corporativa.'
};

function normalizeUrl(value){
  const v=(value||'').trim();
  if(!v) return '#';
  if(/^https?:\/\//i.test(v)) return v;
  return 'https://'+v.replace(/^\/+/,'');
}
function applyConfig(){
  const w=CONFIG.whatsapp.replace(/\D/g,'');
  const makeWa=(msg)=>w?`https://wa.me/${w}?text=${encodeURIComponent(msg||'')}`:'#';
  const waDefault=makeWa(CONFIG.waMsg);
  const waAulas=makeWa(CONFIG.waAulas||CONFIG.waMsg);
  const waCorp=makeWa(CONFIG.waCorporativo||CONFIG.waMsg);

  ['waFinal','waFooter','waLocal'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.href=waDefault;
  });
  ['waPlanoIlimitado','waPlano2x','waPlano1x','waAulasAjuda'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.href=waAulas;
  });
  const corp=document.getElementById('waCorporativo'); if(corp) corp.href=waCorp;

  const ig=document.getElementById('igFooter');
  if(ig) ig.href=normalizeUrl(CONFIG.instagram);

  ['gmFooter','mapsLocal'].forEach(id=>{
    const el=document.getElementById(id); if(el) el.href=normalizeUrl(CONFIG.maps);
  });

  const compra=document.getElementById('passeiosCompra');
  if(compra){
    const url=normalizeUrl(CONFIG.passeiosCompra);
    compra.href=url;
    compra.dataset.configured=(url!=='#')?'1':'0';
  }

  const grev=document.getElementById('googleReviewsLink');
  if(grev) grev.href=normalizeUrl(CONFIG.googleReviews);
}

document.addEventListener('click',function(e){
  const a=e.target.closest('#passeiosCompra');
  if(a && a.getAttribute('href')==='#'){
    e.preventDefault();
    alert('O link da página de compra dos passeios ainda não foi configurado.');
  }
});

applyConfig();

/* ==== UI/UX — menu mobile, sombra de rolagem, seção ativa e revelação por scroll ==== */
(function(){
  var nav=document.querySelector('.nav');
  var navToggle=document.getElementById('navToggle');
  var navLinks=document.getElementById('navLinks');

  if(navToggle&&navLinks){
    navToggle.addEventListener('click',function(){
      var open=navLinks.classList.toggle('open');
      navToggle.classList.toggle('open',open);
      navToggle.setAttribute('aria-expanded',open?'true':'false');
    });
    navLinks.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded','false');
      });
    });
  }

  if(nav){
    var progressBar=document.getElementById('scrollProgress');
    var onScroll=function(){
      nav.classList.toggle('scrolled', window.scrollY>10);
      if(progressBar){
        var doc=document.documentElement;
        var max=doc.scrollHeight-doc.clientHeight;
        var pct=max>0?Math.min(100,(window.scrollY/max)*100):0;
        progressBar.style.width=pct+'%';
      }
    };
    onScroll();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
  }

  if(navLinks&&'IntersectionObserver' in window){
    var navAnchors=Array.prototype.slice.call(navLinks.querySelectorAll('a[href^="#"]'));
    var spySections=navAnchors.map(function(a){return document.querySelector(a.getAttribute('href'));}).filter(Boolean);
    if(spySections.length){
      var spy=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          var link=navLinks.querySelector('a[href="#'+entry.target.id+'"]');
          if(!link) return;
          if(entry.isIntersecting) link.classList.add('active'); else link.classList.remove('active');
        });
      },{rootMargin:'-45% 0px -50% 0px'});
      spySections.forEach(function(section){ spy.observe(section); });
    }
  }

  var reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var gsapActive=typeof gsap!=='undefined';
  if(!reduceMotion && !gsapActive && 'IntersectionObserver' in window){
    var revealTargets=document.querySelectorAll('.exp-card,.pillar,.plan-card,.review-card,.passeio-main,.passeio-note,.google-proof,.review-photo-strip,.local-grid > div,.plan-help,.cta-band,.gallery-item');
    var reveal=new IntersectionObserver(function(entries){
      entries.forEach(function(entry,i){
        if(entry.isIntersecting){
          entry.target.style.transitionDelay=((i%4)*0.08)+'s';
          entry.target.classList.add('is-visible');
          reveal.unobserve(entry.target);
        }
      });
    },{threshold:0.15,rootMargin:'0px 0px -60px 0px'});
    revealTargets.forEach(function(el){ el.classList.add('reveal'); reveal.observe(el); });
  }
})();
