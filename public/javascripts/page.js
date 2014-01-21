$(document).ready(function(){
    $('.logout').click(function(){
        var ok = window.confirm('确定退出？');
        if(!ok){
            return false;
        }
    });
    $('.deleteAll').click(function(){
        var ok = window.confirm('确定删除吗，这将会删掉整本书并且不能找回！');
        if(!ok){
            return false;
        }
    });
    $('.deleteCon').click(function(){
        var ok = window.confirm('确定清空吗，这将会清空整本书的内容并且不能找回！');
        if(!ok){
            return false;
        }
    });
});