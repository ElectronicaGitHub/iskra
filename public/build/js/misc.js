$(document).ready(function(){$(".warp").click(function(){$("body, html").animate({scrollTop:0},100,"swing")}),$(document).on("scroll",function(){$(window).scrollTop()>=150?$(".mini-top").addClass("showed"):$(".mini-top").removeClass("showed")})});