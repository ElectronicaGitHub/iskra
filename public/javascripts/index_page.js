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
		function sizeDescriptionHover(elem) {
			var this_description = $(elem).find(description),
				p = this_description.find('p');

			while (p.height()>this_description.height() || p.width()>this_description.width()) {
				p.css('font-size', '-=1px');
			}
		}
	}
}])










