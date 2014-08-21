tk.controller('Index', [ '$scope', '$http', '$rootScope', 
	function($scope, $http, $rootScope) {

	$scope.news_type = 'normal';

	$rootScope.$watch('news_type', function(value) {
		if (value) {
			$scope.news_type = value;
		}
	})
	
	var page = 1;
	$scope.feed_blocks = [];

	$scope.init = function() {
		$scope.getNews();
	}

	$scope.getNews = function() {
		url = '/news/';
		$http.get(url)
			.success(function(data) {
				console.log(data)
				$scope.feeds = data;
				console.log($scope.feeds);

				$scope.feed_blocks = UTILS.blocks_former($scope.feeds, $scope.feed_blocks);
			})
			.error(function(data) {
				console.log(data);
			})
	}
}])










