tk.controller('EventsCtrl', ['$scope', '$http', function ($scope, $http) {
	
	$('.events').addClass('selected');

	$scope.init = function() {
		$scope.getEvents();
	}

	$scope.getEvents = function() {
		var url = '/events_list/?limit=10';
		$http.get(url)
			.success(function(data) {
				$scope.event_list = data;
				console.log($scope.event_list);
			})
			.error(function(data) {
				console.log(data);
			})
	}

}])