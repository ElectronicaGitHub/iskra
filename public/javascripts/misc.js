$(document).ready(function() {
	$('.warp').click(function() {
		$('body, html').animate({
			scrollTop : 0
		}, 100, 'swing')
	})

	$(document).on('scroll', function() {
		if ($(window).scrollTop() >= 150) {
			$('.mini-top').addClass('showed');
			$('.top').addClass('showed');
		} else {
			$('.mini-top').removeClass('showed');
			$('.top').removeClass('showed');
		}
	})
})