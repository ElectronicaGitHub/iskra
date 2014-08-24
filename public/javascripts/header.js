tk.controller('HeaderCtrl', ['$scope', '$rootScope', '$location', 'localStorageService',
	function($scope, $rootScope, $location, localStorageService) {

	//init page 
	$rootScope.news_type = $scope.news_type = localStorageService.get('tvoyKosmos_MODE');
	$rootScope.$watch('news_type', function(value) {
		console.log('news type header watcher');
		search_value = $location.path().slice(1) || null;
		if (value && search_value && value != search_value) {
			$location.path(search_value);
			$rootScope.news_type = $scope.news_type = search_value;
		} else {
			$location.path(value);
			$scope.news_type = value;	
		}
	})
	$scope.toggle_news_type = function() {
		$scope.news_type = $scope.news_type == 'normal' ? 'special' : 'normal';
		$rootScope.news_type  = $scope.news_type;
		localStorageService.set('tvoyKosmos_MODE', $scope.news_type);
		$location.path($scope.news_type);
	}
	$scope.goToRoot = function() {
		window.location.href = '/';
	}
}])