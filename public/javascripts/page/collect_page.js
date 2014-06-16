$(document).ready(function(){

    $('#wish').click(function(){
       pushFollow($('#bookTitle').attr('bookId'),'wish');
    });
    $('#readed').click(function(){
       pushFollow($('#bookTitle').attr('bookId'),'readed');
    });
    $('#reading').click(function(){
       pushFollow($('#bookTitle').attr('bookId'),'reading');
    });
    
    function pushFollow(bookId, thisObj){
        var _followName = thisObj,
            _route = '/user/'+_followName;
        $.get(_route,{bookId:bookId},function(data){
            if(data.ok === 1){
                var num = $('#'+_followName +' span').text();
                num = parseInt(num)+1;
                $('#'+_followName +' span').text(num);
                var str = $('#'+_followName).text();
                $('#'+_followName).hide().after('<span class="mr10 disable">'+str+'</span>').remove();
            }else if(data.ok === 0){
                alert(data.err.err);
                }
        });
    }


    $('.pullwish').click(function(){
        var bookId = $(this).attr('bookId'),
            bookLi = $(this).parent('li');
        $.get('/user/pullwantread',{bookId:bookId}, function(data){
            if(data.ok === 1){
                alert('取消成功');
                bookLi.detach();
            }else if(data.ok != 1){
                alert('sorry');
            }
        })
    });
});