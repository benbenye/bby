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
        
    });
});