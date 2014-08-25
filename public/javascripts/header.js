tk.controller('HeaderCtrl', 
	['$scope', '$rootScope', '$location', 'localStorageService',
	function($scope, $rootScope, $location, localStorageService) {

	//init page 
	value = localStorageService.get('tvoyKosmos_MODE');
	
	search_value = $location.path() ? $location.path().slice(1) : null;
	if (value) {
		if (search_value && search_value != value) {
			$location.path(search_value);
			$rootScope.news_type = search_value;
		} else {
			$location.path(value);
			$rootScope.news_type = value;
		} 
	} else if (!value && search_value) {
		$rootScope.news_type = search_value;
		$location.path(search_value);
	}
	$scope.toggle_news_type = function() {
		$rootScope.news_type = $rootScope.news_type == 'normal' ? 'special' : 'normal';
		localStorageService.set('tvoyKosmos_MODE', $rootScope.news_type);
		$location.path($rootScope.news_type);
	}
	$scope.goToRoot = function() {
		window.location.href = '/';
	}
}])