$(document).ready(function(){
    $('#postbook').click(function(){
        var name_zh = $('#name_zh').val(),
            tags = $('#tags').val();
        $.post('/book/upbook',{name_zh : name_zh, tags : tags},function(data){
            if(data){
                alert('ok');
                $('#formDiscribe').hide();
                $('#formCover').show();
            }else{
                alert('lose');
                }
        });
    });
});