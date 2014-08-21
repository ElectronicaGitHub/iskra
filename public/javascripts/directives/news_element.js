tk.directive('news', function() {
	return {
		scope : {
			news : '=ngModel',
			type : '=type'
		},
		transclude : true,
		restrict : 'E',
		templateUrl : '/javascripts/templates/news_element.html',
		link : function(element, scope, attrs) {
		}
	}
})