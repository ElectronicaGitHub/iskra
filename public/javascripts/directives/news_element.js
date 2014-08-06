app.directive('news', function() {
	return {
		scope : {
			news : '=ngModel'
		},
		restrict : 'E',
		templateUrl : '/javascripts/templates/news_element.html',
		link : function(element, scope, attrs) {
		}
	}
})