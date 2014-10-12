tk.controller('HeaderCtrl', 
	['$scope', '$rootScope', '$location', 'localStorageService',
	function($scope, $rootScope, $location, localStorageService) {

	$('.news').on('click', function() {
		$('.menu').toggleClass('slide-menu-visible');
	});	

	//init page 
	value = $rootScope.gotInLs = localStorageService.get('tvoyKosmos_MODE');
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
		if ($rootScope.news_type == 'normal' || $rootScope.news_type == null) {
			$rootScope.news_type = 'special';
		} else if ($rootScope.news_type == 'special') {
		 	$rootScope.news_type = 'normal';	
		};
		if (!$rootScope.gotInLs) {
			$rootScope.gotInLs = true;
		}
		localStorageService.set('tvoyKosmos_MODE', $rootScope.news_type);
		$location.path($rootScope.news_type);
		ga('send', 'event', 'click', 'change_mode', 'top', 1);
	}
	$scope.goToRoot = function() {
		window.location.href = '/';
	}
}])