(function(){
  if(typeof gsap==='undefined') return;
  if(typeof ScrollTrigger!=='undefined') gsap.registerPlugin(ScrollTrigger);

  var reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduceMotion) return;

  /* ---- Hero entrance ---- */
  gsap.timeline({defaults:{ease:'power3.out',clearProps:'all'}})
    .from('.hero-photo-copy .location',{opacity:0,y:16,duration:.7})
    .from('.hero-photo-copy .hero-eyebrow',{opacity:0,y:16,duration:.7},'-=.5')
    .from('.hero-photo-copy h1',{opacity:0,y:34,duration:1},'-=.45')
    .from('.hero-photo-copy .hero-lead',{opacity:0,y:20,duration:.8},'-=.6')
    .from('.hero-photo-copy .hero-actions .btn',{opacity:0,y:16,duration:.6,stagger:.12},'-=.45')
    .from('.hero-proof > div',{opacity:0,y:16,duration:.6,stagger:.08},'-=.3');

  gsap.from('.nav',{y:-18,opacity:0,duration:.7,ease:'power2.out',delay:.15,clearProps:'all'});

  if(typeof ScrollTrigger!=='undefined'){
    /* ---- Section labels / headings ---- */
    gsap.utils.toArray('.section .eyebrow, .section-index, .section > .wrap > h2, .section .lead').forEach(function(el){
      gsap.from(el,{
        opacity:0,y:22,duration:.8,ease:'power2.out',clearProps:'all',
        scrollTrigger:{trigger:el,start:'top 88%'}
      });
    });

    /* ---- Grids: cascading reveal ---- */
    gsap.utils.toArray('.exp-grid,.pillars,.steps,.plans-grid,.reviews-grid,.passeio-bridge,.gallery-grid').forEach(function(grid){
      gsap.from(grid.children,{
        opacity:0,y:36,duration:.75,ease:'power3.out',stagger:.12,clearProps:'all',
        scrollTrigger:{trigger:grid,start:'top 85%'}
      });
    });

    /* ---- Experience cards: photo ken-burns as each card enters ---- */
    gsap.utils.toArray('.exp-card .exp-card-media img').forEach(function(img){
      gsap.fromTo(img,{scale:1.18},{
        scale:1,duration:1.4,ease:'power2.out',clearProps:'transform',
        scrollTrigger:{trigger:img.closest('.exp-card'),start:'top 85%'}
      });
    });

    /* ---- Standalone blocks ---- */
    gsap.utils.toArray('.google-proof,.review-photo-strip,.plan-help,.cta-band,.local-grid > div').forEach(function(el){
      gsap.from(el,{
        opacity:0,y:28,duration:.8,ease:'power3.out',clearProps:'all',
        scrollTrigger:{trigger:el,start:'top 88%'}
      });
    });
  }
})();
