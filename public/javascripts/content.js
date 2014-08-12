content = angular.module('content', ['ngSanitize'])
	.controller('contentCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
		$scope.news_id = id;
		$scope.getContent = function(id) {
			url = '/news/' + id;
			$http.get(url)
				.success(function(data) {
					console.log(data);
					$scope.post = data;
					$scope.post.content = $scope.trustContent($scope.post.content);
					$scope.post.date = moment($scope.post.date).locale('ru').calendar();
				})
				.error(function(data) {
					console.log(data)
				})
		}

		$scope.init = function() {
			$scope.getContent($scope.news_id);
		}
		$scope.trustContent = function(text) {
			text = $sce.trustAsHtml(text);
			return text;
		}
	}])