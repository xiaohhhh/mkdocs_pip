

$(document).ready(function(){
$(".subnavli").click(function(){
    var url = $(this).next().children().attr("href");
    window.location.href=url;
});

$(".current").parents().css("display","block");
$(".current").parents().siblings().css("display","block");

});

