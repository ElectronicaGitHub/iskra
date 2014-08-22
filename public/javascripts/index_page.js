tk.controller('Index', [ '$scope', '$http', '$rootScope', 
	function($scope, $http, $rootScope) {

	$rootScope.$watch('news_type', function(value) {
		$scope.news_type = value ? value : '';
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










