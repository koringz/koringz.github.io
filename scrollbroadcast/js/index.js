var start_event, arr_class, init, Prev, Next, input_left, input_right, Container, Content, Grid, Next_grid, Img, style_img, i, j, default_img_width, all_img_length, current_img_length, half, Timer, current_scroll_Width, scroll_Width, speed;
Content = getElementNode('.content');
Grid = getElementNode('#grid');
Next_grid = getElementNode('.next_grid');
Img = Grid.getElementsByTagName('a');
input_left = getElementNode('.Left');
input_right = getElementNode('.Right');
default_img_width = Img[0].offsetWidth;
all_img_length = Img.length;
current_img_length = 0;
half = all_img_length / 2;
Timer = null;
Grid.innerHTML += Grid.innerHTML;

function auto() {
	scroll_right()
};

function scroll(grid, finally_distance) {
	if (Timer !== null && Timer !== undefined) {
		clearInterval(Timer)
	}
	Timer = setInterval(function() {
		var moving = grid.offsetLeft;
		scroll_Width = parseInt(moving);
		speed = (finally_distance - scroll_Width) / 6;
		speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);
		if (scroll_Width !== finally_distance) {
			var v = scroll_Width + speed;
			grid.style.left = scroll_Width + speed + 'px'
		} else {
			clearInterval(Timer);
			Timer = null
		}
	}, 38)
};

function ready() {
	current_scroll_Width = -default_img_width * current_img_length;
	scroll(Grid, current_scroll_Width)
};

function scroll_left() {
	if (current_img_length > 0) {
		current_img_length -= 1
	} else {
		current_img_length = half - 1;
		Grid.style.left = -default_img_width * half + 'px'
	}
	ready()
};

function scroll_right() {
	if (current_img_length < all_img_length - 1) {
		current_img_length += 1
	} else {
		current_img_length = half;
		Grid.style.left = -default_img_width * (half - 1) + 'px'
	}
	ready()
};
addLister(input_left, "click", scroll_left);
 addLister(input_right, "click", scroll_right);