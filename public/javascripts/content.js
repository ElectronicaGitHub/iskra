	tk.controller('contentCtrl', ['$scope', '$http', '$sce', '$rootScope', '$location',
		function($scope, $http, $sce, $rootScope, $location) {
		$scope.news = post;
		
		$rootScope.$watch('news_type', function(value) {
			$scope.news_type = value ? value : '';
			document.title = $scope.news_type=='normal' ? 
								'Твой Космос | ' + $scope.news.title : 
								'Твой Космос | ' + $scope.news.title_special;
		})

		$scope.getContent = function(id) {
			var url = '/news/' + id;
			$http.get(url)
				.success(function(data) {
					$scope.post = data;
					$scope.post.content = $scope.trustContent($scope.post.content);
					$scope.post.content_special = $scope.trustContent($scope.post.content_special);
					$scope.post.date = moment($scope.post.date).locale('ru').calendar().toLowerCase();

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
			$scope.getContent($scope.news._id);
			$scope.getPopular();
		}
		$scope.trustContent = function(text) {
			text = $sce.trustAsHtml(text);
			return text;
		}

		$scope.slideAndChangeMode = function(type) {
			$('body, html').animate({
				scrollTop : 0
			}, 300)
			$location.path(type);
			$scope.news_type = $rootScope.news_type = type;
		}

		var special = [ 'Слишком сложно для тебя, умник?', 
						'Не справляешься с потоком разума?', 
						'Уныло и много букв?', 
						'Ты несколько особенный?', 
						'Тебя поглотили термины?'];
		var normal = [ 'Прочитал и не понял почему нету терминов?', 
					   'Слишком легко для тебя, Эйнштейн?', 
					   'Кажется слишком простым?', 
					   'Да, эта статья для особенных!', 
					   'Статью писал парень c высоким ICQ.'];
		$scope.generateAfterTextAdvice = function(type) {
			return type == 'special' ? normal[~~(Math.random() * normal.length)]
			 						: special[~~(Math.random() * special.length)]
		}
	}])
