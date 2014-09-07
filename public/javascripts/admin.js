tk.controller('Admin', ['$scope', '$http', function($scope, $http) {

	// init //
	$scope.init = function() {
		if (location.search) {
			if (location.search.split('=')[0].slice(1) == 'post_id') {
				post = {
					_id : location.search.split('=')[1]
				}
				$scope.loadToFormForUpdate(post);
			}
		} else {
			$scope.page = 'list_page';
		}
	}

	// значение для превью новости
	$scope.new_type = 'normal';
	$scope.search_linked = {};

	$scope.news_sections = {
		space : 'Космос', 
		physics : 'Физика', 
		tech : 'Технологии'
	};
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
		height : '500px',
		style_formats : [
			{ title : 'Описание картинки', selector : 'p', classes : 'img_description'},
			{ title : 'Заголовок раздела', block : 'h2'}
		]
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
	$scope.getLinkedPosts = function() {
		data = {
			search_query : $scope.search_linked.search_query,
			section : $scope.search_linked.section
		};
		url = '/linked_news?' + jQuery.param(data);
		$http.get(url)
			.success(function(data) {
				console.log(data);
				$scope.linked_news = data;
			})
			.error(function(data) {
				console.log(data);
			})
	}

	$scope.postNews = function(news, first_save) {
		url = first_save ? '/admin' : '/admin/' + news._id;
		if (news.linked_news) {
			news.linked_news = news.linked_news.map(function(e) {
				return e._id;
			});
		}
		$http.post(url, news)
			.success(function(data) {
				console.log(data);
				if (data.save) {
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
		$http.get('/news/' + news._id)
			.success(function(data) {
				console.log(data);
				$scope.page = 'create_page';
				$scope.news = data;
				$http.get('/news/many?posts=' + $scope.news.linked_news.join(','))
					.success(function(data) {
						console.log('linked', data);
						$scope.news.linked_news = data;
					})
					.error(function(data) {
						console.log(data);
					});
			})
			.error(function(data) {
				console.log(data);
			})
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

	$scope.selectPostForLink = function(post) {
		if (!$scope.news.linked_news || $scope.news.linked_news.length == 0) {
			$scope.news.linked_news = [];
			$scope.news.linked_news.push(post);
		} else {
			for (i in $scope.news.linked_news) {
				if ($scope.news.linked_news[i]._id == post._id) {
					$scope.news.linked_news.splice(i,1);
					return
				}
			}
			$scope.news.linked_news.push(post);
		}
	}

}])