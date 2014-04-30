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
    /*
    *写书评
    */
    $('#comment-btn').click(function(){
        //显示添加评论的窗口
        showdialog();

        //验证内容
        var title = $('#comment .title').val()
            ,content = $('#comment .content').val()
            ,bookId = $('#bookId').val()
            ,userId = $('#userId').val();
        if(title != '' && content != ''){
            console.log(title+','+content+','+bookId+','+userId);
            sendContent(bookId, userId, title, content);
        }else{
            alert('标题或者内容不能为空！');
        }
        
        //发送信息
        function sendContent(bookId, userId, title, content){
            var comment = {title:title,content:content};
            $.get('/book/comment',{'bookId' : bookId, 'userId' : userId, 'comment' : comment},function(data){
                if(data.ok == 1){
                    alert("提交成功");
                }
            },'json');
        }
    });
    /*
    *显示对话框，填写书评，登陆窗口。。。
    */
    function showdialog(){

    }

    //实现书评的添加修改删除，8点之前
});