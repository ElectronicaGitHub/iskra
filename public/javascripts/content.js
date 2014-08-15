content = angular.module('content', ['ngSanitize'])
	.controller('contentCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
		

		$scope.news_id = id;
		$scope.getContent = function(id) {
			url = '/news/' + id;
			$http.get(url)
				.success(function(data) {
					console.log(data);
					$scope.post = data;
					$scope.post.content = $scope.trustContent($scope.post.content);
					$scope.post.date = moment($scope.post.date).locale('ru').calendar();
					
					var options = {
				    	url:        location.href,  // какую ссылку шарим
	                    count_url:  location.href,  // для какой ссылки крутим счётчик
	                    title:      $scope.post.title, // заголовок шаринга
	                    image:      $scope.post.image,             // картинка шаринга
	                    text:       $scope.post.description
					}
					$(document).on('click', '.social_share', function(){
						options.social_type = $(this).attr('data-type');
					    Share.go(this, options);
					});
					insertMeta(options);
				})
				.error(function(data) {
					console.log(data)
				})
		}

		$scope.init = function() {
			$scope.getContent($scope.news_id);
		}
		$scope.trustContent = function(text) {
			text = $sce.trustAsHtml(text);
			return text;
		}
	}])

function insertMeta(options) {
	$.extend(options, {
		type: 'article',
        site_name: 'Твой Космос',
        description: options.title
	})
	props = [ 'title', 
			  'type', 
			  'url', 
			  'image', 
			  'description', 
			  'site_name'
	]
	for (i in props) {
		meta = document.createElement('META');
		$(meta)
			.attr('property', 'og:' + props[i])
			.attr('content', options[props[i]])
		document.head.appendChild(meta);
	}
	default_meta = ['title', 'description'];

	meta = document.createElement('META');
	$(meta)
		.attr('name', 'title')
		.attr('content', options['title'])
	document.head.appendChild(meta);

	meta = document.createElement('META');
	$(meta)
		.attr('name', 'description')
		.attr('content', options['text'])
	document.head.appendChild(meta);

}


