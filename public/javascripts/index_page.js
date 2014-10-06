tk.controller('Index', [ '$scope', '$http', '$rootScope', '$location',
	function($scope, $http, $rootScope, $location) {

	var page = 1,
		query = window.location.search,
		key = query.split('=')[0].slice(1);
	if (key == 'section') {
		var section = query.split('=')[1];
		console.log(section);
		$('.' + section).addClass('selected');
		$('.menu').addClass('slide-menu-visible');
	}

	$('.news').on('click', function() {
		$('.menu').toggleClass('slide-menu-visible');
	});

	$scope.feed_blocks = [];

	$scope.init = function() {
		$scope.getNews();
		$scope.getEvents();
		$scope.getArticle();
	}
	$scope.getNews = function(param) {
		if (param) {
			$scope.news_loader = true;
		}
		if (section) {
			var url = '/news/?section=' + section + '&page=' + page;
		} else {
			var url = '/news/?page=' + page;
		}
		$http.get(url)
			.success(function(data) {
				page++;
				$scope.news_loader = false;
				if ( data.length < 12) {
					$scope.no_more_news = true;
				} 
				$scope.feeds = data;
				$scope.feed_blocks = UTILS.blocks_former($scope.feeds, $scope.feed_blocks);
				console.log($scope.feed_blocks);
			})
			.error(function(data) {
				console.log(data);
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

	$scope.getArticle = function() {
		$scope.article_loading = true;
		var url = '/articles_list/?limit=1';
		$http.get(url)
			.success(function(data) {
				$scope.last_article = data[0];
				console.log($scope.last_article);
				setTimeout(function() {
					par = $('.article-info');
					child = $('.article-info > span');
					h = par.height();
					par.css({
						height: h,
						'line-height': h + 'px'
					})
					ih = child.height();
					child.height(ih); 
					desc_h = h-ih;
					child.addClass('abs').css({
						top : desc_h/2 + 'px'
					})
					$scope.article_loading = false;
					$scope.$apply();
				})
			})
			.error(function(data) {
				console.log(data);
			})
	}

}])
tk.directive('forceAnimationScope', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {
		element.data('$$ngAnimateKey', attributes.forceAnimationScope);
		console.log(attributes)
		}
	};
});

