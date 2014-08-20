app = angular.module('index', [])

app.controller('Index', [ '$scope', '$http', function($scope, $http) {
	
	var page = 1;
	$scope.feed_blocks = [];

	$scope.init = function() {
		$scope.getNews();
	}

	$scope.getNews = function() {
		url = '/news/';
		$http.get(url)
			.success(function(data) {
				$scope.feeds = data;
				console.log($scope.feeds);

				$scope.feed_blocks = UTILS.blocks_former($scope.feeds, $scope.feed_blocks);
			})
			.error(function(data) {
				console.log(data);
			})
	}
}])










