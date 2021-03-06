tk.controller('Admin', ['$scope', '$http', function($scope, $http) {

	// init //
	$scope.init = function() {
		if (location.search) {
			q = location.search.split('=')[0].slice(1);
			if (q == 'post_id') {
				post = {
					_id : location.search.split('=')[1]
				}
				$scope.loadToFormForUpdate(post, 'news');
			}
			if (q == 'event_id') {
				event_ = {
					_id : location.search.split('=')[1]
				}
				$scope.loadToFormForUpdate(event_, 'events');
			}
			if (q == 'article_id') {
				article = {
					_id : location.search.split('=')[1]
				}
				$scope.loadToFormForUpdate(article, 'articles');
			}
		} else {
			$scope.page = 'news_list';
		}
	}

	// значение для превью новости
	$scope.new_type = 'normal';
	$scope.authors = info.authors;
	$scope.news_sections = info.sections;
	$scope.search_linked = {};

	// $scope.show_warning = true;

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
				data = data.map(function(el) {
					el.date = moment(el.date).locale('ru').calendar();
					return el;
				})
				$scope.feeds = data;
				if (render_blocks) {
					$scope.feed_blocks = UTILS.blocks_former($scope.feeds, $scope.feed_blocks);
				}
			})
			.error(function(data) {
				console.log(data);
			})
	};
	$scope.getEvents = function() {
		url = '/events_list?show_description=1';
		$http.get(url)
			.success(function(data) {
				$scope.event_list = data;
				console.log($scope.event_list);
			})
			.error(function(data) {
				console.log(data);
			})
	};
	$scope.getArticles = function() {
		url = '/articles_list';
		$http.get(url)
			.success(function(data) {
				$scope.article_list = data;
				console.log($scope.article_list);
			})
			.error(function(data) {
				console.log(data);
			});
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
		$scope.post_loading = true;
		var url = first_save ? '/admin/news/' : '/admin/news/' + news._id;
		if (news.linked_news) {
			news.linked_news = news.linked_news.map(function(e) {
				return e._id;
			});
		}
		$http.post(url, news)
			.success(function(data) {
				$scope.post_loading = false;
				console.log(data);
				if (data.save) {
					$scope.successful_save = true;
					setTimeout(function() {
						$scope.successful_save = false;
						$scope.$apply();
					}, 1500);
					$scope.page = 'news_list';
				}
			})
			.error(function(data) {
				$scope.post_loading = false;
				console.log(data);
			})
	};

	$scope.postEvents = function(events, first_save) {
		$scope.post_loading = true;
		var url = first_save ? '/admin/events/' : '/admin/events/' + events._id;

		$http.post(url, events)
			.success(function(data) {
				$scope.post_loading = false;
				console.log(data);
				if (data.save) {
					$scope.successful_save = true;
					setTimeout(function() {
						$scope.successful_save = false;
						$scope.$apply();
					}, 1500);
					$scope.page = 'events_list';
				}
			})
			.error(function(data) {
				$scope.post_loading = false;
				console.log(data);
			})
	};

	$scope.postArticles = function(articles, first_save) {
		$scope.post_loading = true;
		var url = first_save ? '/admin/articles/' : '/admin/articles/' + articles._id;

		$http.post(url, articles)
			.success(function(data) {
				$scope.post_loading = false;
				console.log(data);
				if (data.save) {
					$scope.successful_save = true;
					setTimeout(function() {
						$scope.successful_save = false;
						$scope.$apply();
					}, 1500);
					$scope.page = 'articles_list';
				}
			})
			.error(function(data) {
				$scope.post_loading = false;
				console.log(data);
			})
	};

	$scope.loadToFormForUpdate = function(obj, what_to_load) {
		if (what_to_load == 'news') {
			var url = '/news/' + obj._id; 
			var goToLink = 'create_news';
		} 
		if (what_to_load == 'events') {
			var url = '/events/' + obj._id; 
			var goToLink = 'create_events';
		}
		if (what_to_load == 'articles') {
			var url = '/articles/' + obj._id; 
			var goToLink = 'create_articles';
		}
		$http.get(url)
			.success(function(data) {
				console.log(data);
				// куда переходим для открытия
				$scope.page = goToLink;
				console.log($scope.page);
				// что необходимо редактировать
				$scope[what_to_load] = data;
				if (what_to_load == 'news') {
					$http.get('/news/many?posts=' + $scope.news.linked_news.join(','))
						.success(function(data) {
							console.log('linked', data);
							$scope.news.linked_news = data;
						})
						.error(function(data) {
							console.log(data);
						});
				}
			})
			.error(function(data) {
				console.log(data);
			})
	};

	$scope.deleteThing = function(id, what_to_load) {
		if (what_to_load == 'news') {
			var url = '/admin/news/' + id;
			var afterload = $scope.getNews;
		}
		if (what_to_load == 'events') {
			var url = '/admin/events/' + id;
			var afterload = $scope.getEvents;
		}
		if (what_to_load == 'articles') {
			var url = '/admin/articles/' + id;
			var afterload = $scope.getArticles;
		}
		$http.delete(url)
			.success(function(data) {
				console.log(data);
				afterload();
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