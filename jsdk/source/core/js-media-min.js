/*!
 * @project JSDK JavaScript Development Kit
 * @copyright Copyright(c) 2004-2012, Dragonfly.org. All rights reserved.
 * @license LGPLv3
 * 
 * @version 0.1
 * @author feng.chun
 * @date 2011-04-21
 * @date 2011-04-25
 * 
 * @requires /library/sm2/soundmanager2.js
 */
js.lang.System.namespace("js.media");js.core.Event.on(window,"load",function(){js.lang.Loader.loadLib({js:"/library/sm2/soundmanager2.js"},function(){var a=soundManager;a.url=js.lang.Loader.SOURCE_ROOT_DIR+"/library/sm2/";a.flashVersion=9;a.useHighPerformance=true;a.beginDelayedInit();js.media.SoundPlayer=function(){return{setValue:function(c,b){a[c]=b;},getValue:function(b){return a[b];},canPlayMIME:function(b){return a.canPlayMIME(b);},canPlayURL:function(b){return a.canPlayURL(b);},isOK:function(){return a.ok();},reboot:function(){a.reboot();},destroySounds:function(c){if(c){a.destroySound(c);}else{var b=getSoundIDs();if(b&&b.length>0){b.forEach(function(d){a.destroySound(d);});}}},getSounds:function(b){if(b){return a.getSoundById(b);}return a.sounds;},getSoundIDs:function(){return a.soundIDs;},createSounds:function(b){if(js.lang.System.isArray(b)){b.forEach(function(c){a.createSound(c);});}else{a.createSound(b);}},load:function(c,b){a.load(c,b);},unload:function(b){a.unload(b);},play:function(c,b){a.play(c,b);},stop:function(b){if(b){a.stop(b);}else{a.stopAll();}},pause:function(b){if(b){a.pause(b);}else{a.pauseAll();}},resume:function(b){if(b){a.resume(b);}else{a.resumeAll();}},togglePause:function(b){a.togglePause(b);},mute:function(b){a.mute(b);},unmute:function(b){a.unmute(b);},toggleMute:function(b){a.toggleMute(b);},setPan:function(c,b){a.setPan(c,b);},setPosition:function(c,b){a.setPosition(c,b);},setVolume:function(c,b){a.setVolume(c,b);},on:function(d,c,b){a["on"+d](c,b||this);}};}();});});