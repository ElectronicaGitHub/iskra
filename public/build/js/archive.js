tk.controller("Archive",["$scope","$http",function(a,b){a.section="space",a.search_query="",a.sections=info.sections,a.sections.all="Все разделы",a.authors=info.authors,a.getNews=function(){a.load=!0,data={search_query:a.search_query,section:"all"==a.section?void 0:a.section},url="/linked_news?"+jQuery.param(data),b.get(url).success(function(b){b=b.map(function(a){return a.date=moment(a.date).locale("ru").calendar(),a}),a.feed=b,a.load=!1}).error(function(b){a.load=!1})}}]);