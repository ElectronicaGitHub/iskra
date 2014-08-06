app.controller('Index', [ '$scope', '$http', function($scope, $http) {
	
	var page = 1;
	var block_size = 4;
	var sizes = [1,2,4];
	var local_block = null;
	var local_block_number = 0;
	var init_number = 0;
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

				fill_blocks();
			})
			.error(function(data) {
				console.log(data)
			})
	}

	// for (var i=0; i<20; i++) {
	// 	$scope.feeds.push({
	// 		title : 'title number ' + i,
	// 		size : sizes[~~(Math.random() * sizes.length)]
	// 	})
	// }
	var fill_blocks = function() {
		console.log('fillblocks init');
		init_number ++;
		for (var i in $scope.feeds) {
			if (!local_block) {
				local_block = {
					id : ~~(Math.random() * 9999),
					feed_elements : []
				}
			}
			if (local_block_number < block_size) {
				if ($scope.feeds[i].size <= (block_size-local_block_number)) {
					local_block.feed_elements.push($scope.feeds[i]);
					local_block_number += $scope.feeds[i].size;
					$scope.feeds.splice(i,1);
					i--;
				}
			} else {
				sort_way = Math.random() > .5;
				local_block.feed_elements.sort(function(a,b) {
					return sort_way ? a.size-b.size : b.size-a.size
				})
				$scope.feed_blocks.push(local_block);
				local_block = null;
				local_block_number = 0;
			}
		}
		if ($scope.feeds.length != 0 && init_number < 10) {
			fill_blocks();
		}
		console.log('feeds', $scope.feeds);
		console.log('blocks', $scope.feed_blocks);
		setTimeout(function() {
			formatter();
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










