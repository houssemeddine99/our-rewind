'use strict';

const memories = [
  {id:2,caption:'A little sunshine, a lot of us.',category:'sunshine',alt:'Yuki and Mimi by the sea, with a sunhat and sunglasses'},
  {id:101,caption:'My favorite place to be.',category:'everyday',alt:'Yuki and Mimi leaning close for a selfie'},
  {id:59,caption:'All dressed up. Still us.',category:'dressed',alt:'Yuki and Mimi dressed up and holding a cake'},
  {id:77,caption:'Very serious people. Clearly.',category:'playful',alt:'A playful selfie with a pink heart filter'},
  {id:29,caption:'You make the view better.',category:'sunshine',alt:'Yuki and Mimi outdoors under a blue sky'},
  {id:115,caption:'The just-us kind of happy.',category:'everyday',alt:'Mimi resting her head on Yuki’s shoulder'},
  {id:89,caption:'A whole golden-hour girl.',category:'sunshine',alt:'Mimi in a black dress in the warm sunset light'},
  {id:120,caption:'Okay, we clean up pretty well.',category:'dressed',alt:'Yuki and Mimi dressed up together outdoors'},
  {id:4,caption:'Sunshine looks good on us.',category:'sunshine',alt:'A sunny beach selfie with sunglasses'},
  {id:8,caption:'Ordinary day. Favorite company.',category:'everyday',alt:'Yuki and Mimi in dark jackets taking a selfie'},
  {id:13,caption:'A tiny mirror memory.',category:'everyday',alt:'Yuki and Mimi posing together in a mirror'},
  {id:19,caption:'The passenger-seat edition.',category:'everyday',alt:'Yuki and Mimi wearing sunglasses in a car'},
  {id:24,caption:'Our very unserious universe.',category:'playful',alt:'A playful edited picture of Yuki and Mimi with I love you text'},
  {id:27,caption:'This little corner of the world.',category:'everyday',alt:'Yuki and Mimi leaning close together indoors'},
  {id:45,caption:'Happy looks a lot like this.',category:'everyday',alt:'A smiling selfie together inside a car'},
  {id:55,caption:'Couldn’t help looking at you.',category:'dressed',alt:'Yuki looking at Mimi while they are dressed in white and pink'},
  {id:60,caption:'A little sweetness.',category:'playful',alt:'Yuki and Mimi sharing a playful moment with a cake'},
  {id:64,caption:'A little blurry. Still a keeper.',category:'playful',alt:'A candid, slightly blurred photo of Yuki and Mimi together'},
  {id:65,caption:'The sun found us.',category:'sunshine',alt:'Yuki and Mimi taking a warm sunlit selfie'},
  {id:69,caption:'An excellent use of a filter.',category:'playful',alt:'A playful blurred selfie with decorative sunglasses filters'},
  {id:79,caption:'No explanation necessary.',category:'playful',alt:'Yuki and Mimi taking a silly selfie with a curly-hair filter'},
  {id:83,caption:'My kind of everyday.',category:'everyday',alt:'Yuki and Mimi together in a relaxed close-up selfie'},
  {id:94,caption:'You, me, a little dressed up.',category:'dressed',alt:'Yuki in a blue suit with Mimi beside him'},
  {id:97,caption:'Another mirror. Same favorite.',category:'everyday',alt:'An affectionate mirror selfie of Yuki and Mimi'},
  {id:110,caption:'A little color. A little chaos.',category:'playful',alt:'Yuki and Mimi with colorful lights across their faces'},
  {id:112,caption:'Would keep this moment forever.',category:'everyday',alt:'Yuki and Mimi smiling together outdoors'},
  {id:119,caption:'Still my favorite plus-one.',category:'dressed',alt:'Yuki and Mimi dressed up for a selfie together'},
];
const films = [
  {id:8,title:'The little everyday things',alt:'Yuki and Mimi together in a close-up video'},
  {id:11,title:'A little pocket of sunshine',alt:'Yuki and Mimi outdoors on a sunny day'},
  {id:13,title:'You make the view better',alt:'A sunny outdoor moment together'},
  {id:15,title:'Same us, another little moment',alt:'Yuki and Mimi in a playful selfie video'},
  {id:17,title:'The passenger-seat cut',alt:'Yuki and Mimi wearing sunglasses in a car'},
  {id:24,title:'Keep this one on replay',alt:'Yuki and Mimi in an evening video together'},
  {id:26,title:'My favorite plus-one',alt:'Yuki and Mimi dressed up together'},
];

const photoPath = id => `assets/photos/memory-${String(id).padStart(3,'0')}.jpg`;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
// Calendar days, calculated in UTC from the visitor's local calendar date.
// This avoids daylight-saving jumps and keeps the counter changing at local midnight.
function updateDays(){
  const today = new Date();
  const days = Math.floor((Date.UTC(today.getFullYear(),today.getMonth(),today.getDate())-Date.UTC(2023,6,22))/86400000);
  document.querySelector('#days-together').textContent = Math.max(0,days).toLocaleString('en-US');
}
updateDays();
setInterval(updateDays,60000);

let filter = 'all';
let expanded = false;
let shown = [];
let currentPhoto = 0;
const grid = document.querySelector('#photo-grid');
const more = document.querySelector('#gallery-more');
const dialog = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');

function renderPhotos(){
  const matching = filter === 'all' ? memories : memories.filter(photo=>photo.category===filter);
  shown = expanded || filter !== 'all' ? matching : matching.slice(0,8);
  const fragment = document.createDocumentFragment();
  shown.forEach((photo,index)=>{
    const card = document.createElement('button');
    card.className = 'memory-card';
    card.setAttribute('aria-label',`View photo: ${photo.alt}`);
    const img = new Image();
    img.src = photoPath(photo.id);img.alt=photo.alt;img.loading='lazy';img.decoding='async';img.width=400;img.height=500;
    const caption = document.createElement('span');
    caption.className='photo-caption';caption.textContent=photo.caption;
    card.append(img,caption);
    card.addEventListener('click',()=>{currentPhoto=index;updateLightbox();dialog.showModal();});
    fragment.append(card);
  });
  grid.replaceChildren(fragment);
  more.hidden=filter!=='all';
  more.setAttribute('aria-expanded',String(expanded));
  more.innerHTML=expanded?'A little less, for now <span aria-hidden="true">−</span>':'More of our little world <span aria-hidden="true">+</span>';
}
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  filter=button.dataset.filter;
  document.querySelectorAll('.filter').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
  renderPhotos();
}));
more.addEventListener('click',()=>{expanded=!expanded;renderPhotos();if(!expanded)document.querySelector('.filter-bar').scrollIntoView({behavior:reducedMotion?'instant':'smooth',block:'start'});});
function updateLightbox(){
  const photo=shown[currentPhoto];
  lightboxImage.src=photoPath(photo.id);lightboxImage.alt=photo.alt;
  document.querySelector('#lightbox-caption').textContent=photo.caption;
  document.querySelector('#lightbox-count').textContent=`${currentPhoto+1} / ${shown.length}`;
}
function stepPhoto(direction){currentPhoto=(currentPhoto+direction+shown.length)%shown.length;updateLightbox();}
document.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
document.querySelector('.lightbox-prev').addEventListener('click',()=>stepPhoto(-1));
document.querySelector('.lightbox-next').addEventListener('click',()=>stepPhoto(1));
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
dialog.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();stepPhoto(1);}if(event.key==='ArrowLeft'){event.preventDefault();stepPhoto(-1);}});
let touchStart=null;
lightboxImage.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].clientX;},{passive:true});
lightboxImage.addEventListener('touchend',event=>{if(touchStart===null)return;const distance=touchStart-event.changedTouches[0].clientX;if(Math.abs(distance)>50)stepPhoto(distance>0?1:-1);touchStart=null;},{passive:true});
renderPhotos();

const shelf=document.querySelector('#video-shelf');
films.forEach((film,index)=>{
  const card=document.createElement('article');card.className='video-card';
  const video=document.createElement('video');
  video.controls=true;video.playsInline=true;video.preload='none';video.poster=`assets/videos/poster-${film.id}.jpg`;video.setAttribute('aria-label',film.alt);
  const source=document.createElement('source');source.src=`assets/videos/clip-${film.id}.mp4`;source.type='video/mp4';
  const fallback=document.createElement('a');fallback.href=source.src;fallback.textContent='Open this clip';
  video.append(source,fallback);
  const title=document.createElement('p');title.textContent=film.title;
  const label=document.createElement('small');label.textContent=`Y + M / ${String(index+2).padStart(3,'0')}`;
  card.append(video,title,label);shelf.append(card);
});
document.querySelectorAll('video').forEach(video=>{
  video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();}));
  video.addEventListener('error',()=>{
    if(video.parentElement.querySelector('.video-error'))return;
    const message=document.createElement('p');message.className='video-error';
    const link=document.createElement('a');link.href=video.querySelector('source').getAttribute('src');link.textContent='Open the clip directly ↗';
    message.append('This clip couldn’t load. ',link);video.after(message);
  });
});

let confettiTimer;
function celebrate(){
  if(reducedMotion)return;
  clearTimeout(confettiTimer);
  const layer=document.querySelector('#confetti');layer.replaceChildren();
  const colors=['#d6b2cd','#e2c07c','#c1d39e','#a783ae','#e9b5bd'];
  for(let i=0;i<65;i++){
    const piece=document.createElement('i');piece.className='confetti-piece';
    piece.style.cssText=`--x:${Math.random()*100}%;--c:${colors[i%colors.length]};--t:${2.6+Math.random()*2}s;--delay:${Math.random()*.5}s;--drift:${(Math.random()-.5)*260}px;transform:rotate(${Math.random()*360}deg)`;
    layer.append(piece);
  }
  confettiTimer=setTimeout(()=>layer.replaceChildren(),5200);
}
document.querySelectorAll('.choose-button').forEach(button=>button.addEventListener('click',()=>{
  document.querySelector('#choose-answer').textContent='Every time. Every version. Always you, Mimi. ♡';celebrate();
}));
document.querySelector('#open-letter').addEventListener('click',event=>{
  const button=event.currentTarget;const letter=document.querySelector('#love-letter');const opening=button.getAttribute('aria-expanded')!=='true';
  button.setAttribute('aria-expanded',String(opening));letter.hidden=!opening;
  document.querySelector('#envelope-hint').textContent=opening?'a little piece of my heart, for you.':'tap to open your letter ↑';
  if(opening){celebrate();setTimeout(()=>letter.scrollIntoView({behavior:reducedMotion?'instant':'smooth',block:'start'}),reducedMotion?0:350);}
});
let progressPending=false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;document.querySelector('.reading-progress').style.width=`${max>0?scrollY/max*100:0}%`;progressPending=false;}
addEventListener('scroll',()=>{if(!progressPending){progressPending=true;requestAnimationFrame(updateProgress);}},{passive:true});
addEventListener('resize',updateProgress);
updateProgress();
// Native scroll storytelling. Reduced-motion visitors get the complete static story.
if('IntersectionObserver' in window&&!reducedMotion){
  const root=document.documentElement;
  const rewind=document.querySelector('#rewind');
  const hero=document.querySelector('#home');
  const clamp=value=>Math.max(0,Math.min(1,value));
  let motionFrame=0;
  let heroVisible=true;
  let rewindVisible=false;
  const motionObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.target===hero)heroVisible=entry.isIntersecting;if(entry.target===rewind)rewindVisible=entry.isIntersecting;});
    queueMotion();
  });
  function paintMotion(){
    motionFrame=0;
    if(heroVisible){const box=hero.getBoundingClientRect();hero.style.setProperty('--hero-progress',clamp(-box.top/box.height).toFixed(4));}
    if(rewindVisible){
      const box=rewind.getBoundingClientRect();
      const travel=box.height-innerHeight;
      // On a short landscape screen the stage is static and all content remains visible.
      const sticky=getComputedStyle(rewind.querySelector('.rewind-stage')).position==='sticky';
      const progress=sticky?clamp(-box.top/Math.max(1,travel)):1;
      rewind.style.setProperty('--story-progress',progress.toFixed(4));
      rewind.style.setProperty('--promise-opacity',clamp((progress-.14)/.32).toFixed(4));
    }
  }
  function queueMotion(){if(!motionFrame)motionFrame=requestAnimationFrame(paintMotion);}

  // Animate words individually without replacing headings or their accessible names.
  const headings=document.querySelectorAll('.memory-heading h2,.cinema-heading h2,.awards>h2,.letter-section>h2');
  const wordObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    entry.target.querySelectorAll('.word-rise').forEach((word,index)=>word.animate(
      [{transform:'translateY(115%) rotate(4deg)',opacity:0},{transform:'translateY(0) rotate(0)',opacity:1}],
      {duration:850,delay:index*65,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'}
    ));
    wordObserver.unobserve(entry.target);
  }),{threshold:.3});
  headings.forEach(heading=>{
    const walker=document.createTreeWalker(heading,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{
      const fragment=document.createDocumentFragment();
      node.textContent.split(/(\s+)/).filter(Boolean).forEach(part=>{
        if(/^\s+$/.test(part)){fragment.append(document.createTextNode(part));return;}
        const clip=document.createElement('span');clip.className='word-clip';
        const word=document.createElement('span');word.className='word-rise';word.textContent=part;clip.append(word);fragment.append(clip);
      });
      node.replaceWith(fragment);
    });
    wordObserver.observe(heading);
  });

  const cardObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const card=entry.target;
    const index=[...card.parentElement.children].indexOf(card);
    const isPhoto=card.classList.contains('memory-card');
    const rotation=isPhoto?(index%4===0?-2:index%4===2?2:0):0;
    card.animate([
      {opacity:0,transform:`translate3d(${index%2===0?-35:35}px,65px,0) rotate(${rotation+(index%2===0?-6:6)}deg) scale(.92)`},
      {opacity:1,transform:`translate3d(0,0,0) rotate(${rotation}deg) scale(1)`}
    ],{duration:800,delay:(index%4)*75,easing:'cubic-bezier(.16,1,.3,1)',fill:'backwards'});
    cardObserver.unobserve(card);
  }),{threshold:.12});
  const observeCards=()=>grid.querySelectorAll('.memory-card').forEach(card=>cardObserver.observe(card));
  observeCards();
  new MutationObserver(observeCards).observe(grid,{childList:true});
  document.querySelectorAll('.award,.video-card,.ending').forEach(el=>cardObserver.observe(el));

  let counterPlayed=false;
  const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting||counterPlayed)return;
    counterPlayed=true;
    const counter=document.querySelector('#days-together');
    const target=Number(counter.textContent.replace(/,/g,''));
    if(!Number.isFinite(target))return;
    const start=performance.now();
    function count(now){
      const progress=clamp((now-start)/1500);
      counter.textContent=Math.round(target*(1-Math.pow(1-progress,4))).toLocaleString('en-US');
      if(progress<1)requestAnimationFrame(count);
    }
    requestAnimationFrame(count);countObserver.disconnect();
  }),{threshold:.7});

  const chapters=[['home','You + me'],['rewind','The rewind'],['memories','Camera roll'],['films','Little films'],['awards','Your awards'],['letter','For Mimi']];
  document.querySelector('.awards').id='awards';
  const rail=document.createElement('nav');rail.className='chapter-rail';rail.setAttribute('aria-label','Our story chapters');
  chapters.forEach(([id,title],index)=>{
    const link=document.createElement('a');link.href=`#${id}`;link.className='chapter-dot';link.setAttribute('aria-label',`${index+1}. ${title}`);
    const label=document.createElement('span');label.textContent=title;link.append(label);rail.append(link);
  });
  document.body.append(rail);
  const chapterObserver=new IntersectionObserver(()=>{
    const active=chapters.filter(([id])=>document.getElementById(id).getBoundingClientRect().top<innerHeight*.55).at(-1)||chapters[0];
    rail.querySelectorAll('a').forEach(link=>{if(link.hash===`#${active[0]}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
  },{rootMargin:'-30% 0px -40% 0px',threshold:0});

  root.classList.add('motion-ready');
  motionObserver.observe(hero);motionObserver.observe(rewind);
  countObserver.observe(document.querySelector('.giant-days'));
  chapters.forEach(([id])=>chapterObserver.observe(document.getElementById(id)));
  addEventListener('scroll',queueMotion,{passive:true});
  addEventListener('resize',queueMotion);
  new ResizeObserver(queueMotion).observe(document.querySelector('main'));
  queueMotion();
}
