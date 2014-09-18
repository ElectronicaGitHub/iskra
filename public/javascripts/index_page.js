tk.controller('Index', [ '$scope', '$http', '$rootScope', '$location',
	function($scope, $http, $rootScope, $location) {

	var page = 1,
		query = window.location.search,
		key = query.split('=')[0].slice(1);
	if (key == 'section') {
		var section = query.split('=')[1];
		console.log(section);
		$('.' + section).addClass('selected')
	}

	$scope.feed_blocks = [];

	$scope.init = function() {
		$scope.getNews();
	}
	$scope.getNews = function(param) {
		if (param) {
			$scope.news_loader = true;
		}
		if (section) {
			url = '/news/?section=' + section + '&page=' + page;
		} else {
			url = '/news/?page=' + page;
		}
		$http.get(url)
			.success(function(data) {
				page++;
				$scope.news_loader = false;
				if ( data.length < 12) {
					$scope.no_more_news = true;
				} 
				$scope.feeds = data;
				$scope.feed_blocks = UTILS.blocks_former($scope.feeds, $scope.feed_blocks);
				console.log($scope.feed_blocks);
			})
			.error(function(data) {
				console.log(data);
			})
	}
}])
tk.directive('forceAnimationScope', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {
		element.data('$$ngAnimateKey', attributes.forceAnimationScope);
		console.log(attributes)
		}
	};
});

$(document).ready(function() {
    $("#slider").owlCarousel({
    	items : 2,
    	itemsDesktop : [1199,2]
    });
});










