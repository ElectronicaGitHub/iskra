	tk.controller('contentCtrl', ['$scope', '$http', '$sce', '$rootScope',

		function($scope, $http, $sce, $rootScope) {
		
		$scope.news_type = 'normal';
		$rootScope.$watch('news_type', function(value) {
			$scope.news_type = value;
		})

		$scope.news_id = id;
		$scope.getContent = function(id) {
			var url = '/news/' + id;
			$http.get(url)
				.success(function(data) {
					console.log(data);
					$scope.post = data;
					$scope.post.content = $scope.trustContent($scope.post.content);
					$scope.post.content_special = $scope.trustContent($scope.post.content_special);
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
					UTILS.insertMeta(options, options_search, $scope.post.title);
				})
				.error(function(data) {
					console.log(data);
				})
		}
		$scope.getPopular = function() {
			var url = '/news/';
			$http.get(url)
				.success(function(data) {
					console.log(data);
					data.map(function(elem) {
						elem.date = moment(elem.date).locale('ru').calendar();
						return elem;
					})
					$scope.popular = data;
				})
				.error(function(data) {
					console.log(data)
				})
		}

		$scope.init = function() {
			$scope.getContent($scope.news_id);
			$scope.getPopular();
		}
		$scope.trustContent = function(text) {
			text = $sce.trustAsHtml(text);
			return text;
		}
	}])
