$(document).ready(function(){
    $('#wish').click(function(){
        var bookId = $('h2').last().attr('bookId');
        $.get('/user/wantread',{bookId:bookId},function(data){
            if(data.ok){
                $('<span>+1</span>').appendTo("#wish");
            }
        });
    });
});