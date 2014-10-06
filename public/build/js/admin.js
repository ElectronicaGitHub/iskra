tk.controller("Admin",["$scope","$http",function(a,b){a.init=function(){location.search?(q=location.search.split("=")[0].slice(1),"post_id"==q&&(post={_id:location.search.split("=")[1]},a.loadToFormForUpdate(post,"news")),"event_id"==q&&(event_={_id:location.search.split("=")[1]},a.loadToFormForUpdate(event_,"events")),"article_id"==q&&(article={_id:location.search.split("=")[1]},a.loadToFormForUpdate(article,"articles"))):a.page="news_list"},a.new_type="normal",a.authors=info.authors,a.news_sections=info.sections,a.search_linked={},a.news_type="normal",a.feed_blocks=[],a.tinymce_options={theme:"modern",plugins:["advlist autolink lists link image charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime media nonbreaking save table contextmenu directionality","emoticons template paste textcolor"],toolbar1:"insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",toolbar2:"print preview media | forecolor backcolor emoticons | link image",image_advtab:!0,height:"500px",style_formats:[{title:"Описание картинки",selector:"p",classes:"img_description"},{title:"Заголовок раздела",block:"h2"}]},a.loadForPage=function(b){a.setDefaultAndGet(b)},a.setDefaultAndGet=function(b){a.feed_blocks=[],a.feeds=[],a.getNews(b)},a.getNews=function(c){url="/news/",b.get(url).success(function(b){b=b.map(function(a){return a.date=moment(a.date).locale("ru").calendar(),a}),a.feeds=b,c&&(a.feed_blocks=UTILS.blocks_former(a.feeds,a.feed_blocks))}).error(function(a){})},a.getEvents=function(){url="/events_list?show_description=1",b.get(url).success(function(b){a.event_list=b}).error(function(a){})},a.getArticles=function(){url="/articles_list",b.get(url).success(function(b){a.article_list=b}).error(function(a){})},a.getLinkedPosts=function(){data={search_query:a.search_linked.search_query,section:a.search_linked.section},url="/linked_news?"+jQuery.param(data),b.get(url).success(function(b){a.linked_news=b}).error(function(a){})},a.postNews=function(c,d){a.post_loading=!0;var e=d?"/admin/news/":"/admin/news/"+c._id;c.linked_news&&(c.linked_news=c.linked_news.map(function(a){return a._id})),b.post(e,c).success(function(b){a.post_loading=!1,b.save&&(a.successful_save=!0,setTimeout(function(){a.successful_save=!1,a.$apply()},1500),a.page="news_list")}).error(function(b){a.post_loading=!1})},a.postEvents=function(c,d){a.post_loading=!0;var e=d?"/admin/events/":"/admin/events/"+c._id;b.post(e,c).success(function(b){a.post_loading=!1,b.save&&(a.successful_save=!0,setTimeout(function(){a.successful_save=!1,a.$apply()},1500),a.page="events_list")}).error(function(b){a.post_loading=!1})},a.postArticles=function(c,d){a.post_loading=!0;var e=d?"/admin/articles/":"/admin/articles/"+c._id;b.post(e,c).success(function(b){a.post_loading=!1,b.save&&(a.successful_save=!0,setTimeout(function(){a.successful_save=!1,a.$apply()},1500),a.page="articles_list")}).error(function(b){a.post_loading=!1})},a.loadToFormForUpdate=function(c,d){if("news"==d)var e="/news/"+c._id,f="create_news";if("events"==d)var e="/events/"+c._id,f="create_events";if("articles"==d)var e="/articles/"+c._id,f="create_articles";b.get(e).success(function(c){a.page=f,a[d]=c,"news"==d&&b.get("/news/many?posts="+a.news.linked_news.join(",")).success(function(b){a.news.linked_news=b}).error(function(a){})}).error(function(a){})},a.deleteThing=function(c,d){if("news"==d)var e="/admin/news/"+c,f=a.getNews;if("events"==d)var e="/admin/events/"+c,f=a.getEvents;if("articles"==d)var e="/admin/articles/"+c,f=a.getArticles;b.delete(e).success(function(a){f()}).error(function(a){})},a.selectPostForLink=function(b){if(a.news.linked_news&&0!=a.news.linked_news.length){for(i in a.news.linked_news)if(a.news.linked_news[i]._id==b._id)return void a.news.linked_news.splice(i,1);a.news.linked_news.push(b)}else a.news.linked_news=[],a.news.linked_news.push(b)}}]);