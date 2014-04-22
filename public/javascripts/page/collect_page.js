$(document).ready(function(){
    $('#wish').click(function(){
        var bookId = $('h2').last().attr('bookId'),
            wish = $(this);
        $.get('/user/wantread',{bookId:bookId},function(data){
            if(data.ok === 1){
                wish.siblings().detach();
                $('<span>+1</span>').appendTo("#wish");
                wish.after();
                wish.detach();
                //喜欢过的变换样式，并且不可再点
            }else if(data.ok === 0){
                alert('您已经添加过这本书了'+data.err.err);
                }
        });
    });
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