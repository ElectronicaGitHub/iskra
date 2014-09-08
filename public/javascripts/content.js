	tk.controller('contentCtrl', ['$scope', '$http', '$sce', '$rootScope', '$location',
		function($scope, $http, $sce, $rootScope, $location) {
		$scope.post = post;
		$scope.post.date = moment($scope.post.date).locale('ru').calendar().toLowerCase();
		console.log($scope.post);	

		getOptions = function() {
			options = {
                title:      $scope.news_type != 'special' ? $scope.post.title : $scope.post.title_special,
		    	url:        location.href, 
                image:      $scope.news_type != 'special' ? $scope.post.image : $scope.post.image_special, 
                count_url:  location.href, 
                text:       $scope.news_type != 'special' ? $scope.post.description : $scope.post.description_special,
                description : $scope.news_type != 'special' ? $scope.post.description : $scope.post.description_special
			};
			return options;
		}
		$(document).on('click', '.social_share', function(){
			var options = getOptions();
			options.social_type = $(this).attr('data-type');
		    Share.go(this, options);
		});

		$scope.getLinked = function() {
			if ($scope.post.linked_news.length) {
				console.log('get linked')
				var url = '/news/many' + '?posts=' + $scope.post.linked_news.join(',');
				$http.get(url)
					.success(function(data) {
						if (data) {
							data = data.filter(function(elem) {
								elem.date = moment(elem.date).locale('ru').calendar();
								if (elem._id.toString() != $scope.post._id.toString()) {
									return elem;
								}
							})
						}
						if (data.length <= 4) {
							$scope.linked = data;
						} else {
							$scope.linked = data.splice(0,4);
							$scope.linked_other = data;
						}
						console.log(data)
					})
					.error(function(data) {
						console.log(data)
					})
			}
		}
		$scope.getLast = function() {
			var url = '/news/' + '?limit=5';
			$http.get(url)
				.success(function(data) {
					data = data.filter(function(elem) {
						elem.date = moment(elem.date).locale('ru').calendar();
						if (elem._id.toString() != $scope.post._id.toString()) {
							return elem;
						}
					})
					$scope.last = data;
				})
				.error(function(data) {
					console.log(data)
				})
		}
		$scope.getPopular = function() {
			var url = '/popular/' + '?limit=8';
			$http.get(url)
				.success(function(data) {
					data = data.filter(function(elem) {
						elem.date = moment(elem.date).locale('ru').calendar();
						if (elem._id.toString() != $scope.post._id.toString()) {
							return elem;
						}
					})
					$scope.popular = data;
					console.log($scope.popular)
				})
				.error(function(data) {
					console.log(data)
				})
		}
		$scope.init = function() {
			$scope.getLast();
			$scope.getPopular();
			$scope.getLinked();
		}

		$scope.slideAndChangeMode = function(type) {
			$('body, html').animate({
				scrollTop : 0
			}, 300)
			$location.path(type);
			$rootScope.news_type = type;
			ga('send', 'event', 'click', 'change_mode', 'bottom', 1);
		}

		var special = [ 'Слишком сложно?', 
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
