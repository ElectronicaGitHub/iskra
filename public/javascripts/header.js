tk.controller('HeaderCtrl', ['$scope', '$rootScope', '$location', 'localStorageService',
	function($scope, $rootScope, $location, localStorageService) {

	//init page 
	$rootScope.news_type = $scope.news_type = localStorageService.get('tvoyKosmos_MODE');
	// $rootScope.news_type = $scope.news_type = localStorageService.get('tvoyKosmos_MODE') || 'normal';
	$rootScope.$watch('news_type', function(value) {
		console.log('news type header watcher')
		if (value) $location.path(value);
		$scope.news_type = value ? value : '';
	})
	$scope.toggle_news_type = function() {
		$scope.news_type = $scope.news_type == 'normal' ? 'special' : 'normal';
		$rootScope.news_type  = $scope.news_type;
		localStorageService.set('tvoyKosmos_MODE', $scope.news_type);
	}
	$scope.goToRoot = function() {
		window.location.href = '/';
	}
}])