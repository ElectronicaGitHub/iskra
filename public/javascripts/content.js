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
					
					var options = {
	                    title:      $scope.post.title,
				    	url:        location.href, 
	                    image:      $scope.post.image, 
	                    count_url:  location.href, 
	                    text:       $scope.post.description,
	                    description : $scope.post.description
					};

					var options_search = {
						title: options['title'],
						description: options['text'],
						keywords: options['text'].split(' ').join(', ')
					}

					$(document).on('click', '.social_share', function(){
						options.social_type = $(this).attr('data-type');
					    Share.go(this, options);
					});
					UTILS.insertMeta(options, options_search);
				})
				.error(function(data) {
					console.log(data);
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
