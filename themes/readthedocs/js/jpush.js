$(document).ready(function(){

/*
$(".subnavli").click(function(){
    alert($(this).siblings().css("display"));
    alert(!$(this).siblings().css("display")=="none");
    if(!$(this).css("display")=="block")
    {
    var url = $(this).next().children().attr("href");
    alert(url);
    window.location.href=url;
    $("li .current").parent().css("display","block");
    $("li .current").parent().siblings().css("display","block");
    $("li .current").parent().children().children("div").children("a").children("img").attr("src","/img/icon/down.png");
    }
    else
    {
    $("li .current").parent().children().children("div").children("a").children("img").attr("src","/img/icon/right.png");
    $("li .current").parent().siblings().css("display","none");
    }
}
);

$(".subnavli").toggle(
    function(){
    var url = $(this).next().children().attr("href");
    window.location.href=url;
    },
    function(){
    var url = $(this).parent().parent().parent().children().first().children().children().children().children().attr("href");
    window.location.href=url;
    }
);

*/
$(".subnavli").click(function(){
    var url = $(this).next().children().attr("href");
    window.location.href=url;
});


$("li .current").parent().css("display","block");
$("li .current").parent().siblings().css("display","block");
$("li .current").parent().children().children("div").children("a").children("img").attr("src","/img/icon/down.png");


$(".subnavul li").mouseover(function(){
	$(this).css("background-color","#eeeeee");
	$("li .current").css("background-color","#1d75bb");
});
$(".subnavul li").mouseout(function(){
    $(this).css("background-color","#f8f8f8");
    $("li .current").css("background-color","#1d75bb");
    });
});

