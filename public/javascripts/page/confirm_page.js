$(document).ready(function(){
    clickConfirm('.logout','确定退出');
    clickConfirm('.deleteAll','确定删除吗，这将会删掉整本书并且不能找回');
    clickConfirm('.deleteCon','确定清空吗，这将会清空整本书的内容并且不能找回');
    clickConfirm('.canclewish','确定取消');
    clickConfirm('.delete','删除这本书');
    function clickConfirm(query,tips){
        $(query).click(function(){
            return window.confirm(tips);
        });
    };
});