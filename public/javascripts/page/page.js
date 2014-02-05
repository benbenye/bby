$(document).ready(function(){
    $('#postbook').click(function(){
        var name_zh = $('#name_zh').val(),
            tags = $('#tags').val();
        $.post('/book/upbook', { 'name_zh': name_zh, 'tags' : tags},
            function(data){
                if(data){
                    $('#formDiscribe').before('<div>' + name_zh + '</div>');
                    $('#formDiscribe').hide();
                    $('#formCover').show();
                    $('#bookId').val(data._id);
                    alert('ok');
                }
           }, "json");
    });
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
    $('#postuserAvatar').click(function(){
        UpladFile();  
    });
    function UpladFile() {
        var fileObj = document.getElementById("userAvatar").files[0]; // js 获取文件对象
        var FileController = "/user/userAvatar";                    // 接收上传文件的后台地址 

        // FormData 对象
        var userId = $('#userId').attr('name');
        var form = new FormData();
        form.append("id", userId);                        // 可以增加表单数据
        form.append("userAvatar", fileObj);          // 文件对象

        // XMLHttpRequest 对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.onload = function () {
            // alert("上传完成!");
        };
        xhr.upload.addEventListener("progress", progressFunction, false);
        xhr.send(form);
            

    }
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