app = angular.module('admin', ['ui.tinymce']);

app.controller('Admin', ['$scope', '$http', function($scope, $http) {

	$scope.page = 'list_page';
	// значение для превью новости
	$scope.new_type = 'normal';
	// значения для всех новостей админки
	$scope.news_type = 'normal';
	$scope.feed_blocks = [];
	$scope.tinymce_options = {
		theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
        toolbar2: "print preview media | forecolor backcolor emoticons | link image",
        image_advtab: true,
		height : '500px'
	};

	$scope.loadForPage = function(render_blocks) {
		$scope.setDefaultAndGet(render_blocks);
	};

	$scope.setDefaultAndGet = function(render_blocks) {
		$scope.feed_blocks = [];
		$scope.feeds = [];
		$scope.getNews(render_blocks);
	};


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
				console.log(data);
			})
	};

	$scope.postNews = function(news, first_save) {
		url = first_save ? '/admin' : '/admin/' + news._id;
		$http.post(url, news)
			.success(function(data) {
				console.log(data);
				if (data.result) {
					$scope.successful_save = true;
					setTimeout(function() {
						$scope.successful_save = false;
						$scope.$apply();
					}, 1500);
					$scope.page = 'list_page';
				}
			})
			.error(function(data) {
				console.log(data);
			})
	};

	$scope.loadToFormForUpdate = function(news) {
		$scope.page = 'create_page';
		$scope.news = news;
	};

	$scope.deleteNews = function(news_id, render_blocks) {
		url = '/admin/' + news_id;
		$http.delete(url)
			.success(function(data) {
				console.log(data);
				$scope.setDefaultAndGet(render_blocks);
			})
			.error(function(data) {
				console.log(data);
			})
	};

}])