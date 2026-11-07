import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import {fileURLToPath} from 'node:url';
const root=new URL('.',import.meta.url).pathname;
const res=new URL('android/app/src/main/res/',import.meta.url);
const source=fileURLToPath(new URL('character-source.png',import.meta.url));
for(const [density,scale]of [['mdpi',1],['hdpi',1.5],['xhdpi',2],['xxhdpi',3],['xxxhdpi',4]]){
 const dir=new URL(`mipmap-${density}/`,res);await fs.mkdir(dir,{recursive:true});
 for(const name of ['ic_launcher','ic_launcher_round'])await sharp(source).resize(Math.round(48*scale),Math.round(48*scale),{fit:'contain',background:'#d7e2c9'}).png().toFile(fileURLToPath(new URL(name+'.png',dir)));
 const dimension=Math.round(108*scale);const subject=Math.round(66*scale);
 const character=await sharp(source).resize(subject,subject,{fit:'contain',background:'#d7e2c9'}).toBuffer();
 await sharp({create:{width:dimension,height:dimension,channels:4,background:'#d7e2c9'}}).composite([{input:character,left:Math.round((dimension-subject)/2),top:Math.round((dimension-subject)/2)}]).png().toFile(fileURLToPath(new URL('ic_launcher_foreground.png',dir)));
}
await fs.writeFile(new URL('values/ic_launcher_background.xml',res),'<resources><color name="ic_launcher_background">#d7e2c9</color></resources>');
await fs.writeFile(new URL('drawable/ic_stat_heart.xml',res),'<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="24dp" android:height="24dp" android:viewportWidth="24" android:viewportHeight="24"><path android:fillColor="#FFFFFFFF" android:pathData="M12,21L3,12C-4,4 7,-1 12,6C17,-1 28,4 21,12Z"/></vector>');
const styles=new URL('values/styles.xml',res);let style=await fs.readFile(styles,'utf8');style=style.replace('<item name="android:background">@drawable/splash</item>','<item name="windowSplashScreenAnimatedIcon">@mipmap/ic_launcher</item><item name="windowSplashScreenBackground">#f8f6ef</item><item name="postSplashScreenTheme">@style/AppTheme.NoActionBar</item>');await fs.writeFile(styles,style);
const gradle=new URL('android/app/build.gradle',import.meta.url);let text=await fs.readFile(gradle,'utf8');
text=text.replace(/    signingConfigs \{[\s\S]*?\n    buildTypes \{/, '    buildTypes {').replace('            signingConfig signingConfigs.release\n','');
text=text.replace('versionCode 1',"versionCode Integer.parseInt(System.getenv('BUILD_NUMBER') ?: '1')").replace('versionName "1.0"','versionName "1.0.0"');
await fs.writeFile(gradle,text);
console.log('Prepared Android character icons and splash screen. The standard test build uses temporary debug signing.');