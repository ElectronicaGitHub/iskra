app.controller('Admin', ['$scope', '$http', function($scope, $http) {
	console.log('hello admin')

	$scope.page = 'list_page';
	$scope.feed_blocks = [];

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

	$scope.saveNews = function(news) {
		url = '/admin'
		$http.post(url, news)
			.success(function(data) {
				console.log(data)
			})
			.error(function(data) {
				console.log(data)
			})
	}

}])