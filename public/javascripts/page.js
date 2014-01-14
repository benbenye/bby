$(document).ready(function(){
    $('.logout').click(function(){
        var ok = window.confirm('确定退出？');
        if(!ok){
            return false;
        }
    });
});