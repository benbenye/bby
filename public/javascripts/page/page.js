$(document).ready(function(){
    /**
    *上传新书
    */
  /*  $('#postbook').click(function(){
        var name_zh = $('#name_zh').val(),
            tags = $('#tags').val(),
            intro = $('#intro').val();
        $.post('/book/upbook', { 'name_zh': name_zh, 'tags' : tags, 'intro' : intro},
            function(data){
                if(data){
                    $('#formDiscribe').before('<div>' + name_zh + '</div>');
                    $('#formDiscribe').hide();
                    $('#formCover').show();
                    $('#bookId').val(data._id);
                    alert('ok');
                }
           }, "json");
    });*/
    /**
    *修改书籍描述
    */
    $('#postDescribe').click(function(){
        var name_zh = $('#name_zh').val(),
            tags = $('#tags').val(),
            intro = $('#intro').val(),
            id = $('#name_zh').attr('sign');
        $.post('/book/upbookDescribe/' + id, { 'name_zh': name_zh, 'tags' : tags, 'intro' : intro},
            function(data){
                if(data.ok){
                    $('#formDiscribe').before('<div>' + name_zh + '</div>');
                    $('#formDiscribe').hide();
                }
           }, "json");
    });
    /**
    *修改个人信息
    */
    $('#postperInfo').click(function(){
        var user_name = $('.user-name').val(),
            user_email = $('.user-email').val(),
            user_sex = $('.user-sex:checked').val();
        $.post('/user/perInfo', { 'user_name': user_name, 'user_email' : user_email, 'user_sex' : user_sex},
            function(data){
                if(data.ok === 1){
                    $('.perInfo').before('<div>修改成功</div>');
                }
           }, "json");
    });
    /**
    *修改个人头像
    */
    $('#postuserAvatar').click(function(){
        var fileObj = document.getElementById("userAvatar").files[0]; // js 获取文件对象
        var FileController = "/user/userAvatar";                      // 接收上传文件的后台地址 

        // FormData 对象
        var userId = $('#userId').attr('name');
        var form = new FormData();
        form.append("id", userId);                                   // 可以增加表单数据
        form.append("userAvatar", fileObj);                          // 文件对象

        // XMLHttpRequest 对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.onload = function () {
            $('.postuserAvatar').before('<div>修改成功</div>');
            $('.avatarImg').detach();
            $('#percentage').before("<img class='coverImg' src='data:"+JSON.parse(xhr.responseText).contentType+";base64,"+JSON.parse(xhr.responseText).data.toString('base64') +"' width='160' height='160'>");
        };
        $('#progressBar').show();
        xhr.upload.addEventListener("progress", progressFunction, false);
        xhr.send(form);
    });
    /**
    *修改书籍封皮
    */
    $('#postCover').click(function(){
        var fileObj = document.getElementById("cover").files[0]; // js 获取文件对象
        var id = $('#name_zh').attr('sign');
        var FileController = "/book/upbookCover/" + id;                      // 接收上传文件的后台地址 

        // FormData 对象
        var form = new FormData();
        form.append("id", id);                                   // 可以增加表单数据
        form.append("cover", fileObj);                          // 文件对象

        // XMLHttpRequest 对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.onload = function () {
            $('#formCover').before('<div>修改成功</div>');
            $('.coverImg').detach();
            $('#formCover').prepend("<img class='coverImg' src='data:"+JSON.parse(xhr.responseText).contentType+";base64,"+JSON.parse(xhr.responseText).data.toString('base64') +"' width='110' height='146'>");
        };
        xhr.send(form);
    }); 
    function progressFunction(evt) {
        var progressBar = document.getElementById("progressBar");
        var percentageDiv = document.getElementById("percentage");
        if (evt.lengthComputable) {
            progressBar.max = evt.total;
            progressBar.value = evt.loaded;
            percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
        }
    }
});