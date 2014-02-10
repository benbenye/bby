$(document).ready(function(){
    /**
    *上传书籍内容
    */
    $('#commitContent').click(function(){
        var content =editor.getContent(),
            id = $(this).attr('name');
        $.post('/book/upbookContent/' + id, { 'id': id, 'content' : content},
            function(data){
                if(data){
                    alert('ok');
                }
           }, "json");
    });
});