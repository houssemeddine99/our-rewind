'use strict';
const $=selector=>document.querySelector(selector);
const library={
 miss:[
  {title:'Come sit here for a moment.',body:'A little moving memory of us, until we’re next to each other again.\n\nTake your time. You can replay it as many times as you like.',video:4},
  {title:'A few seconds of us.',body:'Distance doesn’t make you any less my favorite person. Here’s a little piece of our camera roll to keep you company.',video:8},
  {title:'Wish you were right here.',body:'If I could tuck a whole hug into this screen, I would. Until then, here’s us, being us.',video:13},
  {title:'Your favorite plus-one.',body:'One small reminder that there’s a Yuki who is very happy to be in your story.',video:26},
 ],
 comfort:[
  {title:'You don’t have to earn a soft moment.',body:'Mimi, you don’t need to turn today into a good day before you’re allowed to rest.\n\nUnclench your shoulders. Take a sip of water. Let this minute be a little gentler than the last one. You’re loved on the messy days too.'},
  {title:'One small thing at a time.',body:'You don’t have to solve your whole life tonight. Just the next tiny thing: something to eat, a shower, a little rest.\n\nAnd if you feel like talking, you can tell me about your day. I want to know the difficult parts too.'},
  {title:'This day isn’t all of you.',body:'A hard day doesn’t get to decide who you are. Neither does a mistake, an unfinished task, or a moment when everything feels like too much.\n\nBe a little kind to my favorite person, okay?'},
  {title:'You can put it down for a minute.',body:'Whatever today asked of you, you’re allowed to take a breath.\n\nYou don’t have to be cheerful for me. You don’t have to find the perfect words. We can start with “today was a lot.”'},
  {title:'A tiny permission slip.',body:'You have permission to do less tonight. To wear something comfortable. To leave one thing for tomorrow.\n\nBeing loved isn’t a reward for getting everything right. You already are.'},
 ],
 smile:[
  {title:'Two very serious adults.',body:'Exhibit A: whatever this is.\n\nI love that our camera roll contains both beautiful memories and evidence that we should never be left alone with filters.',photo:79},
  {title:'No thoughts. Just us.',body:'Some couples have a perfectly curated aesthetic. We also have… this.\n\nHonestly? Would keep it in every universe.',photo:24},
  {title:'The filter understood the assignment.',body:'It saw two people being cute and said: needs more hearts.\n\nA reasonable professional decision.',photo:77},
  {title:'Our extremely glamorous life.',body:'A little color. A little chaos. Two people who apparently needed another picture together.\n\nNo notes. Five stars.',photo:110},
  {title:'Okay, just one more.',body:'The official relationship policy: if the photo is blurry, it’s artistic. If it’s silly, it’s a keeper. If you’re in it, I like it.',photo:64},
 ],
 love:[
  {title:'Because it’s you beside me.',body:'Looking through all our photos, the part I keep coming back to isn’t the place or what we were wearing.\n\nIt’s that you’re there with me. That’s the part I want more of.',photo:115},
  {title:'Your smile belongs in my favorite things.',body:'There are plenty of things I could fill a camera roll with. Somehow, I keep wanting another photo of you.\n\nI think that says a lot.',photo:65},
  {title:'I love our different little versions.',body:'All dressed up. In sunglasses. In a ridiculous filter. Just hanging out.\n\nI don’t need one perfect version of us. I love that we get to have all these different ones.',photo:120},
  {title:'Because the little moments count.',body:'We don’t need a big occasion for me to be happy we’re together.\n\nSometimes it’s just a photo, your face next to mine, and the thought: yes. More of this, please.',photo:101},
  {title:'Because this is still my favorite story.',body:'It started on 22 July 2023. Since then, we’ve collected so many little pieces of us.\n\nI love looking back at them. I love even more that there are still pieces we haven’t lived yet.',photo:2},
  {title:'You’re worth the little things.',body:'The time spent picking a photo. The extra sentence in a note. A tiny app with your name in it.\n\nI like finding ways to remind you that I’m glad you exist.'},
 ],
 date:[
  {title:'The tiny picnic date.',body:'Bring one snack each, find somewhere comfortable, and put our phones away for twenty minutes.\n\nBonus mission: take one picture at the end. Just one. Allegedly.'},
  {title:'The camera-roll date.',body:'Pick five photos each. Tell each other what you remember about that moment.\n\nThen take a new one to add to the collection.'},
  {title:'A sunset, something sweet, us.',body:'Choose a spot to watch the sky change. Bring a drink or a little treat.\n\nNo big plan. Just a small pocket of time together.'},
  {title:'The very official taste test.',body:'Pick three inexpensive snacks we haven’t tried. Rate them on taste, packaging, and “would Mimi steal the last bite?”\n\nInvent a dramatic award for the winner.'},
  {title:'The at-home mini cinema.',body:'One film. Something comfortable. One snack choice each.\n\nThe only serious decision: who picks the next film?'},
  {title:'A playlist walk.',body:'Choose three songs each, take a little walk, and tell each other why you picked them.\n\nMake a tiny soundtrack for this chapter of us.'},
 ],
};
library.album=[{"title":"A whole little ocean of us.","body":"One more little piece of our story. I’m glad we kept this one. ♡","photo":121},{"title":"Sunshine, water, my favorite person.","body":"One more little piece of our story. I’m glad we kept this one. ♡","photo":122},{"title":"The kind of hug I’d replay.","body":"One more little piece of our story. I’m glad we kept this one. ♡","photo":123},{"title":"Your smile is the whole point.","body":"One more little piece of our story. I’m glad we kept this one. ♡","photo":124},{"title":"Saltwater and my favorite company.","body":"One more little piece of our story. I’m glad we kept this one. ♡","photo":125},{"title":"Our very unserious side, again.","body":"One more little piece of our story. I’m glad we kept this one. ♡","photo":126},{"title":"A little underwater magic.","body":"One more little piece of our story. I’m glad we kept this one. ♡","photo":127},{"title":"You make every view better.","body":"One more little piece of our story. I’m glad we kept this one. ♡","photo":128},{"title":"Just being close to you.","body":"One more little piece of our story. I’m glad we kept this one. ♡","photo":129},{"title":"Another mirror, another favorite.","body":"One more little piece of our story. I’m glad we kept this one. ♡","photo":130},{"title":"A little more of us, in motion.","body":"Some memories deserve a play button. Here’s one more for our little collection.","video":27}];
library.miss.push({title:'One more little moment.',body:'A new memory for the days you want a little more of us. ♡',video:27});
const labels={album:'OUR LITTLE MEMORY ALBUM',miss:'WHEN YOU MISS ME',comfort:'A SOFTER LITTLE MOMENT',smile:'OUR VERY UNSERIOUS SIDE',love:'A FEW REASONS, FROM YUKI',date:'A LITTLE PLAN FOR US'};
const symbols={album:'♡',miss:'♡',comfort:'☁',smile:'☺',love:'✳',date:'↗'};
const key='pocket-yuki-keepsakes-v1';
const validId=id=>typeof id==='string'&&/^(miss|comfort|smile|love|date|album)-\d+$/.test(id)&&Boolean(library[id.split('-')[0]]?.[Number(id.split('-')[1])]);
let saved=[];
let storageAvailable=true;
try{const value=JSON.parse(localStorage.getItem(key)||'[]');if(Array.isArray(value))saved=[...new Set(value.filter(validId))];}catch{storageAvailable=false;}
function storageNotice(){if(!storageAvailable)$('#storage-status').textContent='Your browser couldn’t save to this device. Keepsakes will stay for this visit only.';}
storageNotice();
const positions={};
let current=null;
let currentKind=null;
let dailyMode=false;
const dialog=$('#note-dialog');
function getNote(id){const [kind,index]=id.split('-');return {kind,note:library[kind][Number(index)]};}
function paintNote(){
 const {kind,note}=getNote(current);
 $('#note-title').textContent=note.title;$('#note-body').textContent=note.body;
 $('#note-category').textContent=dailyMode?'TODAY’S JUST-BECAUSE NOTE':labels[kind];
 $('#note-symbol').textContent=note.photo||note.video?'':symbols[kind];
 const media=$('#note-media');media.querySelector('video')?.pause();media.replaceChildren();
 if(note.photo){const img=new Image();img.src=`../assets/photos/memory-${String(note.photo).padStart(3,'0')}.jpg`;img.alt=note.title;media.append(img);}
 if(note.video){const video=document.createElement('video');video.controls=true;video.playsInline=true;video.preload='none';video.poster=`../assets/videos/poster-${note.video}.jpg`;video.setAttribute('aria-label','A little video memory of Yuki and Mimi');const source=document.createElement('source');source.src=`../assets/videos/clip-${note.video}.mp4`;source.type='video/mp4';video.append(source);const link=document.createElement('a');link.href=source.src;link.textContent='Open this video memory';video.append(link);video.addEventListener('error',()=>{$('#note-feedback').textContent='This video needs a connection. Try again when you’re online.';});media.append(video);}
 $('#save-note').textContent=saved.includes(current)?'Kept close ✓':kind==='date'?'Keep this date idea ♡':'Keep this close ♡';
 $('#save-note').setAttribute('aria-pressed',String(saved.includes(current)));
 $('#another-note').hidden=dailyMode;
 $('#note-feedback').textContent='';
}
function openId(id,isDaily=false){if(!validId(id))return;current=id;currentKind=id.split('-')[0];dailyMode=isDaily;paintNote();if(!dialog.open)dialog.showModal();dialog.scrollTop=0;}
function next(kind){const count=library[kind].length;positions[kind]=positions[kind]===undefined?Math.floor(Math.random()*count):(positions[kind]+1)%count;openId(`${kind}-${positions[kind]}`);}
document.querySelectorAll('[data-kind]').forEach(button=>button.addEventListener('click',()=>next(button.dataset.kind)));
$('#another-note').addEventListener('click',()=>next(currentKind));
$('#close-note').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>$('#note-media video')?.pause());
dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
const dailyIds=Object.keys(library).filter(kind=>kind==='love'||kind==='comfort').flatMap(kind=>library[kind].map((_,index)=>`${kind}-${index}`));
$('#daily-open').addEventListener('click',()=>{const date=new Date();const day=Math.floor(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())/86400000);openId(dailyIds[day%dailyIds.length],true);});
function persist(){try{localStorage.setItem(key,JSON.stringify(saved));storageAvailable=true;}catch{storageAvailable=false;}storageNotice();renderSaved();}
function hearts(){
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const layer=$('#heart-rain');layer.replaceChildren();
 for(let i=0;i<14;i++){const heart=document.createElement('span');heart.className='heart-particle';heart.textContent='♡';heart.style.cssText=`--x:${(Math.random()-.5)*430}px;--y:${-80-Math.random()*250}px;--r:${(Math.random()-.5)*100}deg;--c:${['#ad7288','#799375','#bb9f6f'][i%3]}`;layer.append(heart);}
 setTimeout(()=>layer.replaceChildren(),1400);
}
$('#save-note').addEventListener('click',()=>{
 if(saved.includes(current)){saved=saved.filter(id=>id!==current);persist();paintNote();$('#note-feedback').textContent='Removed from your keepsakes.';return;}
 saved.unshift(current);persist();paintNote();hearts();$('#note-feedback').textContent=storageAvailable?(currentKind==='date'?'Date idea saved here. Share it with Yuki when you’re ready.':'Kept close, right here on this device. ♡'):'Kept for this visit. Your browser couldn’t save it permanently.';
});
function renderSaved(){
 const list=$('#saved-list');list.replaceChildren();$('#saved-count').textContent=`${saved.length} saved`;$('#nav-count').textContent=saved.length?String(saved.length):'';
 if(!saved.length){list.className='empty-saved';const icon=document.createElement('span');icon.textContent='♡';const title=document.createElement('p');title.textContent='A little space for your favorite words.';const hint=document.createElement('small');hint.textContent='Open a note and tap “Keep this close.”';list.append(icon,title,hint);return;}
 list.className='saved-grid';
 saved.forEach(id=>{const {kind,note}=getNote(id);const card=document.createElement('article');card.className='saved-card';const open=document.createElement('button');open.className='saved-open';open.setAttribute('aria-label',`Open saved note: ${note.title}`);const label=document.createElement('p');label.className='eyebrow';label.textContent=labels[kind];const title=document.createElement('h3');title.textContent=note.title;const text=document.createElement('p');text.textContent=note.body.slice(0,100)+'…';open.append(label,title,text);open.addEventListener('click',()=>openId(id));const remove=document.createElement('button');remove.className='saved-remove';remove.textContent='Let this one go ×';remove.setAttribute('aria-label',`Remove saved note: ${note.title}`);remove.addEventListener('click',()=>{saved=saved.filter(item=>item!==id);persist();});card.append(open,remove);list.append(card);});
}
renderSaved();
addEventListener('storage',event=>{if(event.key!==key)return;try{const value=JSON.parse(event.newValue||'[]');saved=Array.isArray(value)?[...new Set(value.filter(validId))]:[];renderSaved();if(dialog.open)paintNote();}catch{/* Keep the current valid collection. */}});
let installPrompt=null;
addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;});
const installDialog=$('#install-dialog');
$('#install').addEventListener('click',async()=>{if(installPrompt){const prompt=installPrompt;installPrompt=null;await prompt.prompt();}else installDialog.showModal();});
$('#close-install').addEventListener('click',()=>installDialog.close());$('#install-done').addEventListener('click',()=>installDialog.close());
installDialog.addEventListener('click',event=>{if(event.target===installDialog)installDialog.close();});
addEventListener('appinstalled',()=>{$('#install').textContent='Kept close ✓';});
if('serviceWorker' in navigator){addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').then(()=>navigator.serviceWorker.ready).then(()=>{document.documentElement.dataset.offlineReady='true';if(storageAvailable)$('#storage-status').textContent='Your little notes are ready for offline visits. ♡';}).catch(()=>{if(storageAvailable)$('#storage-status').textContent='Offline setup wasn’t available. You can still use the app while connected.';}));}
const navLinks=document.querySelectorAll('.bottom-nav a[href^="#"]');
if('IntersectionObserver' in window){new IntersectionObserver(entries=>entries.forEach(entry=>{navLinks.forEach(link=>{if(link.hash===(entry.isIntersecting?'#saved':'#home'))link.setAttribute('aria-current','page');else link.removeAttribute('aria-current');});}),{threshold:.2}).observe($('#saved'));}
navLinks.forEach(link=>link.addEventListener('click',()=>navLinks.forEach(other=>{if(link===other)other.setAttribute('aria-current','page');else other.removeAttribute('aria-current');})));

// Contact details live on this device, never in the published app source.
const contactKey='pocket-yuki-contact-v1';
const normalizePhone=value=>{
 const clean=String(value).trim().replace(/^00/,'+').replace(/[\s().-]/g,'');
 if(!/^\+[1-9]\d{6,14}$/.test(clean))return null;
 if(clean.startsWith('+216')&&clean.length!==12)return null;
 return clean.slice(1);
};
let yukiPhone='';
try{const stored=localStorage.getItem(contactKey);if(stored&&normalizePhone('+'+stored))yukiPhone=stored;}catch{}
let pendingSignal=null;
const signalText={miss:'Yuki, I miss you. ♡ — Mimi',hug:'Yuki, I could really use a hug. ♡ — Mimi',call:'Yuki, call me when you can. ♡ — Mimi'};
const contactDialog=$('#contact-dialog');
function contactLabel(){$('#signal-settings').textContent=yukiPhone?'Change Yuki’s number':'Set Yuki’s number';}
function openContact(){ $('#yuki-number').value=yukiPhone?'+'+yukiPhone:'';$('#contact-error').textContent='';contactDialog.showModal();}
function signal(kind){
 if(!yukiPhone){pendingSignal=kind;openContact();return;}
 const url=`https://wa.me/${yukiPhone}?text=${encodeURIComponent(signalText[kind])}`;
 // Native Android opens an external browser/WhatsApp; the website opens a new tab.
 const link=document.createElement('a');link.href=url;link.target=window.Capacitor?.isNativePlatform?.()?'_self':'_blank';link.rel='noopener noreferrer';document.body.append(link);link.click();link.remove();
 $('#signal-status').textContent='Your message is ready to open in WhatsApp. Review it there, then tap Send when you’re ready.';
}
document.querySelectorAll('[data-signal]').forEach(button=>button.addEventListener('click',()=>signal(button.dataset.signal)));
$('#signal-settings').addEventListener('click',()=>{pendingSignal=null;openContact();});
$('#close-contact').addEventListener('click',()=>{pendingSignal=null;contactDialog.close();});
contactDialog.addEventListener('click',event=>{if(event.target===contactDialog){pendingSignal=null;contactDialog.close();}});
$('#contact-form').addEventListener('submit',event=>{
 event.preventDefault();const normalized=normalizePhone($('#yuki-number').value);
 if(!normalized){$('#contact-error').textContent='Use + and the country code, then the number. Tunisian numbers have 8 digits after +216.';return;}
 yukiPhone=normalized;let persisted=true;try{localStorage.setItem(contactKey,yukiPhone);}catch{persisted=false;}
 contactLabel();contactDialog.close();$('#signal-status').textContent=persisted?'Yuki’s number is saved on this device. Choose a signal whenever you like.':'The number is ready for this visit. This browser couldn’t save it permanently.';
 const chosen=pendingSignal;pendingSignal=null;if(chosen)signal(chosen);
});
$('#forget-contact').addEventListener('click',()=>{
 try{localStorage.removeItem(contactKey);}catch{$('#contact-error').textContent='The saved number couldn’t be removed. Please try again.';return;}
 yukiPhone='';pendingSignal=null;contactLabel();contactDialog.close();$('#signal-status').textContent='Yuki’s number has been removed from this device.';
});
contactDialog.addEventListener('close',()=>{pendingSignal=null;});
// Optional private setup link. Its fragment is consumed locally and removed from the URL.
const contactFragment=location.hash.match(/^#contact=(.+)$/);
if(contactFragment){try{const phone=normalizePhone('+'+decodeURIComponent(contactFragment[1]).replace(/^\+/,''));if(phone){yukiPhone=phone;try{localStorage.setItem(contactKey,phone);}catch{}history.replaceState(null,'',location.pathname+location.search);$('#signal-status').textContent='Your Yuki contact is ready. ♡';}}catch{}}
contactLabel();
