tk.controller('eventCtrl', ['$scope', '$http', 
	function ($scope, $http) {

	$scope.event_ = window.event_;
	$scope.event_.date = moment($scope.event_.date).locale('ru').calendar().toLowerCase();

	getOptions = function() {
		options = {
            title:        $scope.event_.title,
	    	url:          location.href, 
            image:        $scope.event_.image_preview, 
            count_url:    location.href, 
            text:         $scope.event_.description,
            description : $scope.event_.description
		};
		return options;
	}
	$(document).on('click', '.social_share', function(){
		var options = getOptions();
		options.social_type = $(this).attr('data-type');
	    Share.go(this, options);
	});

	$scope.init =function() {
		$scope.getEvents();
		$scope.getNews();
		$scope.getArticle();
	}


	$scope.getEvents = function() {
		var url = '/events/?limit=4&excl_event=' + $scope.event_._id;
		$http.get(url)
			.success(function(data) {
				$scope.event_list = data;
			})
			.error(function(data) {
				console.log(data);
			})
	}
	$scope.getNews = function() {
		var url = '/news/?limit=7';
		$http.get(url)
			.success(function(data) {
				$scope.news = data;
				console.log($scope.news);
			})
			.error(function(data) {
				console.log(data);
			})
	}
	$scope.getArticle = function() {
		$scope.article_loading = true;
		var url = '/articles/?limit=1';
		$http.get(url)
			.success(function(data) {
				$scope.last_article = data[0];
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