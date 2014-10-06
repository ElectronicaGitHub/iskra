	tk.controller('contentCtrl', ['$scope', '$http', '$sce', '$rootScope', '$location',
		function($scope, $http, $sce, $rootScope, $location) {
		$scope.article = article;
		$scope.article.date = moment($scope.article.date).locale('ru').calendar().toLowerCase();
		console.log($scope.article);	

		getOptions = function() {
			options = {
                title:      $scope.article.title,
		    	url:        location.href, 
                image:      $scope.article.image, 
                count_url:  location.href, 
                text:       $scope.article.description,
                description : $scope.article.description
			};
			return options;
		}
		$(document).on('click', '.social_share', function(){
			var options = getOptions();
			options.social_type = $(this).attr('data-type');
		    Share.go(this, options);
		});

		$scope.getLast = function() {
			var url = '/news/' + '?limit=5';
			$http.get(url)
				.success(function(data) {
					data = data.filter(function(elem) {
						elem.date = moment(elem.date).locale('ru').calendar();
						return elem;
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
						return elem;
					})
					$scope.popular = data;
					console.log($scope.popular)
				})
				.error(function(data) {
					console.log(data)
				})
		}

		$scope.getEvents = function() {
			var url = '/events_list/';
			$http.get(url)
				.success(function(data) {
					$scope.event_list = data;
					console.log($scope.event_list);
					setTimeout(function() {
					    $("#slider").owlCarousel({
					    	items : 2,
					    	itemsDesktop : [1199,2],
					    	itemsDesktopSmall : [979,2],
							itemsTablet : [768,2],
					    	lazyLoad : true,
					    	pagination : false,
					    	autoPlay : true
					    });
					})
				})
				.error(function(data) {
					console.log(data);
				})
		}

		$scope.init = function() {
			$scope.getLast();
			$scope.getPopular();
			$scope.getEvents();
		}
	}])
