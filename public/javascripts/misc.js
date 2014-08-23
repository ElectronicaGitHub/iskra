$(document).ready(function() {
	colors = ['#2F5A99','#2A8C66','#B94788','#CE5251'];
	random_color = colors[~~(Math.random() * colors.length)];
	$('.image, .news_type').css('background-color', random_color);
	$('body > .container').css('border-top', '4px solid ' + random_color);
	$('body > .container').css('border-bottom', '4px solid ' + random_color);

	$('.warp').click(function() {
		$('body, html').animate({
			scrollTop : 0
		}, 100, 'swing')
	})
})