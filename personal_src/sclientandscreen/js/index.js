/* koringz.github.io
 *
 * $author koringz
 * $date 2015-12-29
 * $version 0.1
 *
 */
function Box(e,t1,t2,rect){

	this.box = e;

	this.scrx = e.screenX;
	this.scry = e.screenY;
	// 包含浏览器边框的坐标

	this.clitx = e.clientX;
	this.clity = e.clientY;
	// 不包含浏览器的坐标，只显示客户端坐标

	t1.value = this.scrx + "," +this.scry;
	t2.value = this.clitx + "," +this.clity;

	rect.style.display = "block";
	rect.style.left = this.clitx + "px";
	rect.style.top = this.clity + "px";
}