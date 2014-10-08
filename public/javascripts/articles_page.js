tk.controller('ArticlesCtrl', [ '$scope', '$http', function($scope, $http) {

	$('.articles').addClass('selected');

	$scope.init = function() {
		$scope.getArticles();
	}

	$scope.getArticles = function(param) {
		if (param) {
			$scope.news_loader = true;
		}
		var url = '/articles_list';
		$http.get(url)
			.success(function(data) {
				// page++;
				$scope.news_loader = false;
				// if ( data.length < 12) {
				// 	$scope.no_more_news = true;
				// } 
				// $scope.feeds = data;
				// $scope.feed_blocks = UTILS.blocks_former($scope.feeds, $scope.feed_blocks);
				// console.log($scope.feed_blocks);
				$scope.articles = data;
				console.log($scope.articles);
				setTimeout(function() {
					var par = $('.article-info'),
						child = $('.article-info > span'),
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