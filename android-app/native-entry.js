import {App} from '@capacitor/app';
import {LocalNotifications} from '@capacitor/local-notifications';
const ready=async()=>{
 const old=document.querySelector('#install');const button=old.cloneNode(true);old.replaceWith(button);
 button.setAttribute('aria-label','Toggle a daily Pocket Yuki reminder');
 const status=document.querySelector('#storage-status');
 status.textContent='Your notes, photos and video hugs live right here, even offline. ♡';
 async function refresh(){const pending=await LocalNotifications.getPending();button.textContent=pending.notifications.some(n=>n.id===220723)?'Daily hello on ✓':'A daily little hello ♡';}
 button.addEventListener('click',async()=>{
  try{
   const pending=await LocalNotifications.getPending();
   if(pending.notifications.some(n=>n.id===220723)){await LocalNotifications.cancel({notifications:[{id:220723}]});status.textContent='Daily reminders are off. Your little notes are still here. ♡';await refresh();return;}
   let permission=await LocalNotifications.checkPermissions();if(permission.display!=='granted')permission=await LocalNotifications.requestPermissions();
   if(permission.display!=='granted'){status.textContent='Notifications weren’t allowed. You can still visit whenever you like.';return;}
   await LocalNotifications.createChannel({id:'little-hello',name:'A little hello from Pocket Yuki',importance:3,description:'Your optional daily reminder to open a little note.'});
   await LocalNotifications.schedule({notifications:[{id:220723,title:'A little Yuki, just for you ♡',body:'Hi Mimi. Your little pocket of love is here whenever you need it.',channelId:'little-hello',schedule:{on:{hour:19,minute:0}},smallIcon:'ic_stat_heart'}]});
   status.textContent='A gentle daily hello around 7 pm, on your phone’s time. Tap again to turn it off.';await refresh();
  }catch{status.textContent='The reminder couldn’t be set. You can try again, and your notes are still here.';}
 });
 try{await refresh();}catch{/* The app remains usable without reminders. */}
 App.addListener('backButton',async()=>{const dialog=document.querySelector('dialog[open]');if(dialog){dialog.close();return;}if(location.hash){location.hash='';return;}await App.minimizeApp();});
 LocalNotifications.addListener('localNotificationActionPerformed',()=>document.querySelector('#daily-open').click());
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
