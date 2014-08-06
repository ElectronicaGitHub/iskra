app.controller('Index', [ '$scope', '$http', function($scope, $http) {
	
	var page = 1;
	$scope.feed_blocks = [];

	$scope.init = function() {
		$scope.getNews();
	}

	$scope.getNews = function() {
		url = '/all';
		$http.get(url)
			.success(function(data) {
				$scope.feeds = data;
				console.log($scope.feeds)

				$scope.feed_blocks = UTILS.blocks_former($scope.feeds, $scope.feed_blocks);
			})
			.error(function(data) {
				console.log(data)
			})
	}

	var formatter = function() {

		var inner_container = $('.inner_container'),
			description = $('.description'),
			news_title = $(),
			initial_height=0;

		// function setWidthTitle(container) {
		// 	var c = ~~($(container).width()),
		// 		e = ~~($(container).find('.img .news_title').width()),
		// 		x = (c-e)/2;
		// 	return x;
		// }
		// $.each(inner_container, function() {
		// 	var b = $(this).find('.img .news_title');
		// 	b.css('margin-left', setWidthTitle(this));
		// 	setTimeout(function() {
		// 		b.addClass('transitioner');
		// 	})
		// })
		// inner_container.mouseenter(function() {
		// 	var inner_container_hover = $('.inner_container:hover'),
		// 		this_description = $(this).find(description),
		// 		p = this_description.find('p'),
		// 		a = ~~(inner_container_hover.find(description).find('p').height()),
		// 		b = inner_container_hover.find(".img .news_title");
		// 	initial_height=b.height();
		// 	if(inner_container_hover.parent().hasClass('s11') || inner_container_hover.parent().hasClass('s22')) {
		// 		b.css('height','-='+a);
		// 	}
		// 	if(inner_container_hover.parent().hasClass('s21')) {
		// 		b.css('width','70%');
		// 	}
		// 	while (p.height()>this_description.height()) {
		// 		p.css('font-size', '-=1px');
		// 	}
		// })
		// inner_container.mouseleave(function() {
		// 	var b = $(this).find(".img .news_title");
		// 	if(inner_container.parent().hasClass('s21')) {
		// 		b.css('width','100%');
		// 	}
		// 	b.height(initial_height);
		// 	b.css('margin-left', setWidthTitle(this));
		// })	

		function sizeDescriptionHover(elem) {
			var this_description = $(elem).find(description),
				p = this_description.find('p');

			while (p.height()>this_description.height()) {
				p.css('font-size', '-=1px');
			}
		}
	}
}])










