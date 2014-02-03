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
});