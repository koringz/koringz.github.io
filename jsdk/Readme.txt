************************************
* JSDK: JavaScript Development Kit
************************************
Version: 0.6.2-RC-20120502
Author: Feng.Chun
Email: f15_nsm@hotmail.com
http://jsdk2.sourceforge.net 

JSDK help you to develop web applications or games faster and easier.
JSDK currently supported browsers are: Chrome 5.0+, Firefox 3.0+, IE 6.0+, Safari 3.0+, Opera 10+.
Note: The HTML5 features require the high version browser to support.

******************************
* Available License: LGPL v3
******************************
JSDK is available under LGPL v3. 
LGPL allows you to link or call LGPL library in your closed-source (commercial) application. 
More detail see LGPL Version 3. 

Below is a license list of third-party libraries in JSDK
----------------------------------------------------------
YUI 2 available under BSD.
SoundManager 2 available under BSD.
Blackbird available under MIT.

If you agree to these licenses, you can free use JSDK in your projects.

*************************
* Version Number Format
*************************
{majorVersion}.{minorVersion}.{updateVersion}-{stage}-{nightVersion} 

"stage" descript which stage of the version, followed by all stages:
AL: Private test for Alpha
BT: Public test for Beta
RC: Release Candidate 
GA: General Availability

********************************
* Change History
********************************	

0.6.2 release on May 02, 2012
--------------------------------
=====Functions Improved=====
1) The "onMouseTap" method of the "js.input.MouseProvider" class support "click" and "dblclick" event.

=====Library Updated=====
1) Update SM2 from "V2.97a.20110306" to "V2.97a.20120318".

=====APIs Changed(backward compatible)=====
1) The "play" method of the "js.media.SoundPlayer" class added a new optinal parameter named "args".

=====API Changed(non-backward compatible)=====
1) The "js.Lang" class changed name to "js.lang.System".
2) The "js.Version" class changed name to "js.core.Version".
3) The "js.Bom" class changed name to "js.core.Env".
4) The "js.Dom" class changed name to "js.core.Dom".
5) The "js.util.Event" class changed name to "js.core.Event".
6) The "js.util.CustomEvent" class changed name to "js.core.CustomEvent".
7) The "js.util.EventProvider" class changed name to "js.core.EventProvider".
8) The "on" method of the "js.media.SoundPlayer" class removed a parameter named "args". 
9) All "onMouseXXXClick" methods of the "js.input.MouseProvider" class changed name to "onMouseXXXTap".	

=====Bugs Fixed=====
1) Fixed an issue about IE6's background image be not cached. 	

	