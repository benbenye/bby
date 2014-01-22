$(document).ready(function(){
    $('#wish').click(function(){
        var bookId = $('h2').last().attr('bookId');
        $.get('/user/wantread',{bookId:bookId},function(data){
            if(data.ok === 1){
                $('<span>+1</span>').appendTo("#wish");
            }else if(data.ok === 'no'){
                alert('您已经添加过这本书了');
                }
        });
    });
});