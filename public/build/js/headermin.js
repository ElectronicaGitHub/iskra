tk.controller("HeaderCtrl",["$scope","$rootScope","$location","localStorageService",function(a,b,c,d){value=d.get("tvoyKosmos_MODE"),search_value=c.path()?c.path().slice(1):null,value?search_value&&search_value!=value?(c.path(search_value),b.news_type=search_value):(c.path(value),b.news_type=value):!value&&search_value&&(b.news_type=search_value,c.path(search_value)),a.toggle_news_type=function(){b.news_type="normal"==b.news_type?"special":"normal",d.set("tvoyKosmos_MODE",b.news_type),c.path(b.news_type),ga("send","event","click","change_mode","top",1)},a.goToRoot=function(){window.location.href="/"}}]);