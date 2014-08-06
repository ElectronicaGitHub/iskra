app.controller('Index', [ '$scope', '$http', function($scope, $http) {
	var block_size = 4;
	$scope.feed_blocks = [];
	$scope.feeds = [];
	sizes = [1,2,4];
	for (var i=0; i<20; i++) {
		$scope.feeds.push({
			title : 'title number ' + i,
			size : sizes[~~(Math.random() * sizes.length)]
		})
	}
	local_block = null;
	local_block_number = 0;
	init_number = 0;
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
	}
	fill_blocks();
	console.log('feeds', $scope.feeds);
	console.log('blocks', $scope.feed_blocks);
}])

$(document).ready(function() {
	var inner_container = $('.inner_container'),
		description = $('.description'),
		initial_height=0;

	function setWidthTitle(container) {
		var c = ~~($(container).width()),
			e = ~~($(container).find('.img').find('.news_title').width()),
			x = (c-e)/2;
		return x;
	}
	jQuery.each(inner_container, function() {
		var b = $(this).find('.img').find('.news_title');
		b.css('margin-left','+=' + setWidthTitle(this));
	})
	inner_container.mouseenter(function() {
		var inner_container_hover = $('.inner_container:hover'),
			this_description = $(this).find(description),
			p = this_description.find('p'),
			a = ~~(inner_container_hover.find(description).find('p').height()),
			b = inner_container_hover.find(".img").find(".news_title"),
			c = ~~(inner_container_hover.width()),
			d = ~~(inner_container_hover.find(description).width()),
			e = ~~(inner_container_hover.find('.img').find('.news_title').width()),
			x = (c-d-e)/2;
		initial_height=b.height();
		if(inner_container_hover.parent().hasClass('s11') || inner_container_hover.parent().hasClass('s22')) {
			b.css('height','-='+a);
		}
		if(inner_container_hover.parent().hasClass('s21')) {
			b.css('width','70%');
		}
		while (p.height()>this_description.height()) {
			p.css('font-size', '-=1px');
		}
	})
	inner_container.mouseleave(function() {
		var b = $(this).find(".img").find(".news_title");
		if(inner_container.parent().hasClass('s21')) {
			b.css('width','100%');
		}
		b.height(initial_height);
		b.css('margin-left', setWidthTitle(this));
	})	



	// inner_container.hover(function() {
	// 	// sizeTitleHover(this);
	// 	moveTitleHover(this);
	// 	sizeDescriptionHover(this);
	// });
	
	function sizeDescriptionHover(elem) {
		var this_description = $(elem).find(description),
			p = this_description.find('p');

		while (p.height()>this_description.height()) {
			p.css('font-size', '-=1px');
		}
	}

	// // function sizeTitleHover(elem) {
	// // 	var p = $(elem).find(description).find('p'),
	// // 		container = $(elem).find('.img').find('.news_title'),
	// // 		title_p = container.find('p');
		

	// // }
	// function moveTitleHover(elem) {
	// 	var a = ~~($(elem).find(description).find("p").height()),
	// 		b = $(elem).find(".img").find(".news_title");
	// 		console.log(a, b.height())
			
	// 		b.css({
	// 			'height':'-=a',
	// 			'translation':'.4s'
	// 		});
	// }

})