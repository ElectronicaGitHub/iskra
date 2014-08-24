	tk.controller('contentCtrl', ['$scope', '$http', '$sce', '$rootScope',
		function($scope, $http, $sce, $rootScope) {
		
		$rootScope.$watch('news_type', function(value) {
			$scope.news_type = value ? value : '';
			document.title = $scope.news_type=='normal' ? 
								'Твой Космос | ' + $scope.post.title : 
								'Твой Космос | ' + $scope.post.title_special;
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

					var options, options_search;
					
					getOptions = function() {
						options = {
		                    title:      $scope.news_type == 'normal' ? $scope.post.title : $scope.post.title_special,
					    	url:        location.href, 
		                    image:      $scope.news_type == 'normal' ? $scope.post.image : $scope.post.image_special, 
		                    count_url:  location.href, 
		                    text:       $scope.news_type == 'normal' ? $scope.post.description : $scope.post.description_special,
		                    description : $scope.news_type == 'normal' ? $scope.post.description : $scope.post.description_special
						};
						return options;
					}

					getOptionsSearch = function() {
						var options = getOptions();
						options_search = {
							title: options['title'],
							description: options['text'],
							keywords: options['text'] ? options['text'].split(' ').join(', ') : ''
						}
						return options_search;
						
					}

					$(document).on('click', '.social_share', function(){
						var options = getOptions();
						options.social_type = $(this).attr('data-type');
					    Share.go(this, options);
					});
					UTILS.insertMeta(getOptions(), getOptionsSearch(), $scope.news_type=='normal' ? $scope.post.title : $scope.post.title_special);
				})
				.error(function(data) {
					console.log(data);
				})
		}
		$scope.getPopular = function() {
			var url = '/news/' + '?limit=8';
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
