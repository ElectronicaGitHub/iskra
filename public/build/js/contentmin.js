tk.controller("contentCtrl",["$scope","$http","$sce","$rootScope","$location",function(a,b,c,d,e){a.post=post,a.post.date=moment(a.post.date).locale("ru").calendar().toLowerCase(),getOptions=function(){return options={title:"special"!=a.news_type?a.post.title:a.post.title_special,url:location.href,image:"special"!=a.news_type?a.post.image:a.post.image_special,count_url:location.href,text:"special"!=a.news_type?a.post.description:a.post.description_special,description:"special"!=a.news_type?a.post.description:a.post.description_special}},$(document).on("click",".social_share",function(){var a=getOptions();a.social_type=$(this).attr("data-type"),Share.go(this,a)}),a.getLinked=function(){if(a.post.linked_news.length){var c="/news/many?posts="+a.post.linked_news.join(",");b.get(c).success(function(b){b&&(b=b.filter(function(b){return b.date=moment(b.date).locale("ru").calendar(),b._id.toString()!=a.post._id.toString()?b:void 0})),b.length<=4?a.linked=b:(a.linked=b.splice(0,4),a.linked_other=b)}).error(function(a){})}},a.getLast=function(){var c="/news/?limit=5";b.get(c).success(function(b){b=b.filter(function(b){return b.date=moment(b.date).locale("ru").calendar(),b._id.toString()!=a.post._id.toString()?b:void 0}),a.last=b}).error(function(a){})},a.getPopular=function(){var c="/popular/?limit=8";b.get(c).success(function(b){b=b.filter(function(b){return b.date=moment(b.date).locale("ru").calendar(),b._id.toString()!=a.post._id.toString()?b:void 0}),a.popular=b}).error(function(a){})},a.init=function(){a.getLast(),a.getPopular(),a.getLinked()},a.slideAndChangeMode=function(a){$("body, html").animate({scrollTop:0},300),e.path(a),d.news_type=a,ga("send","event","click","change_mode","bottom",1)};var f=["Слишком сложно для тебя, умник?","Не справляешься с потоком разума?","Уныло и много букв?","Ты несколько особенный?","Тебя поглотили термины?"],g=["Прочитал и не понял почему нету терминов?","Слишком легко для тебя, Эйнштейн?","Кажется слишком простым?","Да, эта статья для особенных!","Статью писал парень c высоким ICQ."];a.generateAfterTextAdvice=function(a){return"special"==a?g[~~(Math.random()*g.length)]:f[~~(Math.random()*f.length)]}}]);