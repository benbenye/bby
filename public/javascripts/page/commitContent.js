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
                    alert('上传成功！');
                }
           }, "json");
    });
    /*
    *写书评
    */
    $('#comment-btn').click(function(){
        showdialog();     //显示添加评论的窗口可拖拽的对话框
    });
    $('#commit-btn').click(function(){sendContent();}); 

    $('#close').add('#fullBg').click(function(){
        closedialog();   //关闭评论窗口
    });
    /*
    *
    */
    function sendContent() {
        //验证内容
        var title = $('#comment .title').val()
            ,content = $('#comment .content').val()
            ,bookId = $('#bookId').val()
            ,userId = $('#userId').val();
        if(title != '' && content != ''){
            ajaxSendContent(bookId, userId, title, content);
        }else{
            alert('标题或者内容不能为空！');
        }
        
        //发送信息
        function ajaxSendContent(bookId, userId, title, content){
            var comment = {title:title,content:content};
            $.get('/book/comment',{'bookId' : bookId, 'userId' : userId, 'comment' : comment},function(data){
                if(data.ok == 1){
                    closedialog();
                }
            },'json');
        }
    }
    /*
    *显示对话框，填写书评，登陆窗口。。。
    */
    function showdialog(){
        $('body').append($('<div class="fullBg" id="fullBg"></div>'));
        $('#fullBg').append($('.comment').detach().show().addClass('showdialog'));
        $('.showdialog').click(function(){return false;});
    }

    function closedialog(){
        $('body').append($('.comment').detach().removeClass('showdialog').hide());
        $('#fullBg').remove(); 
    }

    /**
    *书评人页面展开书评人的书评内容
    */
    $('.reviewer li').hover(function(){
        $(this).find('.more').addClass('showmore').fadeIn();
    },function(){
        $(this).find('.more').removeClass('showmore').fadeOut();
    });

    $('.more').click(function(){
        var content = $(this).parent('p').attr('data-content');
        contentMore(content);
    });

    function contentMore(str){
        $('body').append($('<div class="fullBg" id="fullBg"></div>'));
        $('#fullBg').append($('<div class="moreBox showdialog"><div class="close" id="close">×</div>'+str+'</div>'));
        $('.showdialog').click(function(){return false;});
        $('#close').add('#fullBg').click(function(){closedialog();});
    }


});