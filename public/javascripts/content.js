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
					
					$(document).on('click', '.social_share', function(){
					    Share.go(this, {
					    	url:        location.href,  // какую ссылку шарим
		                    count_url:  location.href,  // для какой ссылки крутим счётчик
		                    title:      $scope.post.title, // заголовок шаринга
		                    image:      $scope.post.image,             // картинка шаринга
		                    text:       $scope.post.description
						});
					});
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