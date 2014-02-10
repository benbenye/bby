$(document).ready(function(){
    /**
    *上传新书
    */
    var objE = document.createElement("div");
    objE.innerHTML = '<p>1<a>2233</a></p><p>3</p><p>5</p><p>7</p><p>9</p><p>11</p><a>222</a>';
    $('.bookContent').empty();
    $('.bookContent').each(function(i){
        $(this).append(objE.childNodes[i]);
        console.log(i);
    }).removeClass('none');
//    for(var i = 0; i < objE.childElementCount; ++i){
//        var contentBox = $("<div class = 'bookContent'></div>");
//        contentBox.append(objE.childNodes[i]);
//alert(i);
//        $('h2').after(contentBox);
//    }
});