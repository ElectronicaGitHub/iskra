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
	$scope.getNews = function() {
		if (section) {
			url = '/news/?' + key + '=' + section;
		} else {
			url ='/news/';
		}
		$http.get(url)
			.success(function(data) {
				$scope.feeds = data;
				$scope.feed_blocks = UTILS.blocks_former($scope.feeds, $scope.feed_blocks);
			})
			.error(function(data) {
				console.log(data);
			})
	}
}])










