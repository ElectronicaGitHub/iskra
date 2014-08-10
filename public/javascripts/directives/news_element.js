app.directive('news', function() {
	return {
		scope : {
			news : '=ngModel'
		},
		transclude : true,
		restrict : 'E',
		templateUrl : '/javascripts/templates/news_element.html',
		link : function(element, scope, attrs) {
		}
	}
})