tk.controller('eventCtrl', ['$scope', '$http', 
	function ($scope, $http) {

	$scope.init =function() {
		$scope.getEvents();
	}

	$scope.event_ = window.event_;
	$scope.event_.date = moment($scope.event_.date).locale('ru').calendar().toLowerCase();

	$scope.getEvents = function() {
		var url = '/events/';
		$http.get(url)
			.success(function(data) {
				$scope.event_list = data;
				console.log($scope.event_list);
				setTimeout(function() {
				    $("#slider").owlCarousel({
				    	items : 2,
				    	itemsDesktop : [1199,2],
				    	lazyLoad : true,
				    	pagination : false,
				    	autoPlay : true,
				    	stopOnHover : true
				    });
				})
			})
			.error(function(data) {
				console.log(data);
			})
	}

}])