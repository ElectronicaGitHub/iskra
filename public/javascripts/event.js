tk.controller('eventCtrl', ['$scope', '$http', 
	function ($scope, $http) {

	$scope.init =function() {
		$scope.getEvents();
		$scope.getNews();
		$scope.getArticle();
	}

	$scope.event_ = window.event_;
	$scope.event_.date = moment($scope.event_.date).locale('ru').calendar().toLowerCase();

	$scope.getEvents = function() {
		var url = '/events/?limit=3';
		$http.get(url)
			.success(function(data) {
				$scope.event_list = data;
			})
			.error(function(data) {
				console.log(data);
			})
	}
	$scope.getNews = function() {
		var url = '/news/?limit=7';
		$http.get(url)
			.success(function(data) {
				$scope.news = data;
				console.log($scope.news);
			})
			.error(function(data) {
				console.log(data);
			})
	}
	$scope.getArticle = function() {
		var url = '/articles/?limit=1';
		$http.get(url)
			.success(function(data) {
				$scope.last_article = data[0];
			})
			.error(function(data) {
				console.log(data);
			})
	}
}])