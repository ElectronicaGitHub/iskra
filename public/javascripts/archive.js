tk.controller('Archive', ['$scope', '$http', function ($scope, $http) {
	
	$scope.section = 'space';
	$scope.search_query = '';

	$scope.sections = info.sections;
	$scope.sections['all'] = 'Все разделы';
	$scope.authors = info.authors;

	$scope.getNews = function() {
		$scope.load = true;
		data = {
			search_query : $scope.search_query,
			section : $scope.section == 'all' ? undefined : $scope.section
		};
		url = '/linked_news?' + jQuery.param(data);
		$http.get(url)
			.success(function(data) {
				console.log(data);
				data = data.map(function(el) {
					el.date = moment(el.date).locale('ru').calendar();
					return el;
				})
				$scope.feed = data;
				$scope.load = false;
			})
			.error(function(data) {
				console.log(data);
				$scope.load = false;
			})
	}
}])