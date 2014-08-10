app.controller('Admin', ['$scope', '$http', function($scope, $http) {
	console.log('hello admin')

	$scope.page = 'list_page';
	$scope.dish_options = ['Завтрак', 'Обед', 'Полдник', 'Ужин']
	$scope.feed_blocks = [];

	$scope.loadForPage = function(render_blocks) {
		$scope.setDefaultAndGet(render_blocks)
	}

	$scope.setDefaultAndGet = function(render_blocks) {
		$scope.feed_blocks = [];
		$scope.feeds = [];
		$scope.getNews(render_blocks);
	}


	$scope.getNews = function(render_blocks) {
		url = '/news/';
		$http.get(url)
			.success(function(data) {
				$scope.feeds = data;

				if (render_blocks) {
					$scope.feed_blocks = UTILS.blocks_former($scope.feeds, $scope.feed_blocks);
				}

			})
			.error(function(data) {
				console.log(data)
			})
	}

	$scope.postNews = function(news, first_save) {
		url = first_save ? '/admin' : '/admin/' + news._id;
		news.tags = news.tags
			.split(',')
			.map(function(a,b) {
				return $.trim(a);
			});
		$http.post(url, news)
			.success(function(data) {
				console.log(data)
			})
			.error(function(data) {
				console.log(data)
			})
	}

	$scope.loadToFormForUpdate = function(news) {
		$scope.page = 'create_page';
		$scope.news = news;
	}

	$scope.deleteNews = function(news_id, render_blocks) {
		url = '/admin/' + news_id;
		$http.delete(url)
			.success(function(data) {
				console.log(data);
				$scope.setDefaultAndGet(render_blocks);
			})
			.error(function(data) {
				console.log(data)
			})
	}

}])