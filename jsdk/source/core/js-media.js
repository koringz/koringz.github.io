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
js.lang.System.namespace('js.media');

js.core.Event.on(window, 'load',
function(){
//BUGFIX: Safely lazy-load sm2 on window loaded for FF, Chrome
//See: http://www.schillmania.com/projects/soundmanager2/demo/template/deferred-example.html
js.lang.Loader.loadLib(
{js:'/library/sm2/soundmanager2.js'}
,function(){
var sm = soundManager;
sm.url = js.lang.Loader.SOURCE_ROOT_DIR + '/library/sm2/';//auto setting the dir of the .swf
sm.flashVersion = 9;//more better support for some mp3 formats than flash8
sm.useHighPerformance = true;
sm.beginDelayedInit();

/**
 * @class js.media.SoundPlayer
 * @static 
 */
js.media.SoundPlayer = function(){	
	return {		
		/**
		 * Set the property with the value.
		 * 
		 * @method setValue
		 * @param {String} k
		 * @param {Object} v
		 */
		setValue: function(k, v){
			sm[k] = v;
		},
		/**
		 * Return the value of the property.
		 * 
		 * @method getValue
		 * @param {String} k
		 * @return {Object} value
		 */
		getValue: function(k){
			return sm[k];
		},
		/**
		 * Returns a boolean indicating whether SoundPlayer can play the given MIME type：
		 * audio/mpeg, audio/mp3, audio/m4a, audio/aac
		 * 
		 * @method canPlayMIME
		 * @param {String} mime
		 * @return {Boolean}
		 */
		canPlayMIME: function(mime){
			return sm.canPlayMIME(mime);
		},
		/**
		 * Returns a boolean indicating whether SoundPlayer can play the given URL.
		 * 
		 * @method canPlayURL
		 * @param {String} url
		 * @return {Boolean}
		 */
		canPlayURL: function(url){
			return sm.canPlayURL(url);
		},
		/**
		 * Returns a boolean indicating whether SoundPlayer has attempted to and succeeded in initialising. 
		 * 
		 * @method isOK
		 * @return {Boolean}
		 */
		isOK: function(){
			return sm.ok();
		},
		/**
		 * Destroys any created Sound objects, unloads the flash movie (removing it from the DOM) 
		 * and restarts the SM2 init process, retaining all currently-set properties. 
		 * 
		 * @method reboot
		 */
		reboot: function(){
			sm.reboot();
		},
		/**
		 * Stops, unloads and destroys a sound or all sounds.
		 * 
		 * @method destroySounds
		 * @param {String} id
		 */
		destroySounds: function(id){
			if (id) {
				sm.destroySound(id);
			}else{
				var ids = getSoundIDs();
				if(ids && ids.length > 0){
					ids.forEach(function(id){
						sm.destroySound(id);
					});
				}
			}
		},
		/**
		 * Returns a sound by id or all sounds.
		 * 
		 * @method getSounds
		 * @param {String} id
		 * @return {Object|Array<Object>}
		 */
		getSounds: function(id){
			if(id) return sm.getSoundById(id);
			return sm.sounds;
		},
		/**
		 * Returns array of all sounds's ID.
		 * 
		 * @method getSoundIDs
		 * @return {String[]}
		 */
		getSoundIDs: function(){
			return sm.soundIDs;
		},
		/**
		 * Creates a new sound or a array of sounds.
		 * 
		 * @method createSounds
		 * @param {Object|Object[]} sounds
		 */		
		createSounds: function(sounds){
			if(js.lang.System.isArray(sounds)){
				sounds.forEach(function(sound){
					sm.createSound(sound);				
				});
			}else{
				sm.createSound(sounds);
			}
		},
		/**
		 * Starts loading the sound by ID via HTTP, with options if specified. 
		 * 
		 * @method load
		 * @param {String} id
		 * @param {Object} options
		 */	
		load: function(id, options){
			sm.load(id, options);
		},
		/**
		 * Stops loading the sound by ID.
		 * 
		 * @method unload
		 * @param {String} id
		 */
		unload: function(id){
			sm.unload(id);
		},
		/**
		 * Plays the sound by ID.
		 * 
		 * @method play
		 * @param {String} id
		 * @param {Object} args:optional
		 */
		play: function(id, args){
			sm.play(id, args);
		},
		/**
		 * Stops the sound by ID or all sounds.
		 * 
		 * @method stop
		 * @param {String} id:optional
		 */
		stop: function(id){
			if (id) {
				sm.stop(id)
			}else{
				sm.stopAll();
			}
		},
		/**
		 * Pauses the sound by ID or all sounds.
		 * 
		 * @method pause
		 * @param {String} id:optional
		 */
		pause: function(id){
			if (id) {
				sm.pause(id)
			}else{
				sm.pauseAll();
			}
		},
		/**
		 * Resumes the sound by ID or all sounds.
		 * 
		 * @method resume
		 * @param {String} id:optional
		 */
		resume: function(id){
			if (id) {
				sm.resume(id)
			}else{
				sm.resumeAll();
			}
		},
		/**
		 * Toggles Pause/Resume the sound by ID.
		 * 
		 * @method togglePause
		 * @param {String} id
		 */
		togglePause: function(id){
			sm.togglePause(id);
		},
		/**
		 * Mutes the sound by ID.
		 * 
		 * @method mute
		 * @param {String} id
		 */		
		mute: function(id){
			sm.mute(id);
		},
		/**
		 * Unmutes the sound by ID.
		 * 
		 * @method unmute
		 * @param {String} id
		 */	
		unmute: function(id){
			sm.unmute(id);
		},
		/**
		 * Toggles Mute/Unmute the sound by ID.
		 * 
		 * @method toggleMute
		 * @param {String} id
		 */
		toggleMute: function(id){
			sm.toggleMute(id);
		},
		/**
		 * Sets the stereo pan (left/right bias) of the sound specified by ID. 
		 * Accepted values: -100 to 100 (L/R, 0 = center.) Affects pan property. 
		 * 
		 * @method setPan
		 * @param {String} id
		 * @param {Int} volume
		 */
		setPan: function(id, volume){
			sm.setPan(id, volume);
		},
		/**
		 * Seeeks to a given position within a sound, specified by miliseconds (1000 msec = 1 second).
		 * Affects position property. 
		 * 
		 * @method setPosition
		 * @param {String} id
		 * @param {Int} msecOffset
		 */
		setPosition: function(id, msecOffset){
			sm.setPosition(id, msecOffset);
		},
		/**
		 * Sets the volume of the sound specified by ID. 
		 * Accepted values: 0-100. Affects volume property. 
		 * 
		 * @method setVolume
		 * @param {String} id
		 * @param {Int} volume
		 */
		setVolume: function(id, volume){
			sm.setVolume(id, volume);
		},
		/**
		 * Event have 'error','load','ready','timeout'.
		 * 
		 * @method on
		 * @param {String} e values: load|error|ready|timeout
		 * @param {Function} fn 
		 * @param {Object} scope:optional 
		 */
		on: function(e, fn, scope){
			sm['on'+e](fn, scope||this);			
		}
	}
}()	
	
})

});
