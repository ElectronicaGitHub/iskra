tk.controller("eventCtrl",["$scope","$http",function(a,b){a.event_=window.event_,a.event_.date=moment(a.event_.date).locale("ru").calendar().toLowerCase(),getOptions=function(){return options={title:a.event_.title,url:location.href,image:a.event_.image_preview,count_url:location.href,text:a.event_.description,description:a.event_.description}},$(document).on("click",".social_share",function(){var a=getOptions();a.social_type=$(this).attr("data-type"),Share.go(this,a)}),a.init=function(){a.getEvents(),a.getNews(),a.getArticle()},a.getEvents=function(){var c="/events/?limit=4&excl_event="+a.event_._id;b.get(c).success(function(b){a.event_list=b}).error(function(a){})},a.getNews=function(){var c="/news/?limit=7";b.get(c).success(function(b){a.news=b}).error(function(a){})},a.getArticle=function(){a.article_loading=!0;var c="/articles/?limit=1";b.get(c).success(function(b){a.last_article=b[0],setTimeout(function(){par=$(".article-info"),child=$(".article-info > span"),h=par.height(),par.css({height:h,"line-height":h+"px"}),ih=child.height(),child.height(ih),desc_h=h-ih,child.addClass("abs").css({top:desc_h/2+"px"}),a.article_loading=!1,a.$apply()})}).error(function(a){})}}]);