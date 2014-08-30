$(document).ready(function() {
	$('.warp').click(function() {
		$('body, html').animate({
			scrollTop : 0
		}, 100, 'swing')
	})
})