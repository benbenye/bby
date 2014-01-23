
/*
 * GET users listing.
 */
var crypto = require('crypto'),//crypto 是node的一个核心模块，我们使用他生成散列值加密密码
    BookController = require('../controllers/bookController.js'),
    CheckController = require('../controllers/checkController.js');

module.exports = function(app){
    
    //进入首页
    app.get('/', BookController.getindex);

    //书籍页面
    app.get('/book/book', CheckController.checkNotLogin);
    app.get('/book/book',BookController.getbook);

    //我的书籍页面
    app.get('/book/mybook',  CheckController.checkNotLogin);
    app.get('/book/mybook',BookController.getmybook);
    
    //我想读的书
    app.get('/book/mywish',  CheckController.checkNotLogin);
    app.get('/book/mywish', BookController.getmywish);
    
    //新建书籍描述
    app.get('/book/upbook', CheckController.checkNotLogin);
    app.get('/book/upbook', BookController.getupbook);
    
    app.post('/book/upbook', CheckController.checkNotLogin);
    app.post('/book/upbook', BookController.postupbook);
    
    //查看我的书籍
    app.get('/book/mybook/:id',  CheckController.checkNotLogin);
    app.get('/book/mybook/:id', BookController.getmybookByid);
    
    //查看\修改书籍描述
    app.get('/book/upbookDescribe/:id', CheckController.checkNotLogin);
    app.get('/book/upbookDescribe/:id', BookController.getupbookDecribeByid);
    
    //修改书籍描述
    app.post('/book/upbookDescribe/:id', CheckController.checkNotLogin);
    app.post('/book/upbookDescribe/:id', BookController.postupbookDecribeByid);

    //清空书籍描述
    app.get('/book/bookDescribe/delete/:id',  CheckController.checkNotLogin);
    app.get('/book/bookDescribe/delete/:id', BookController.getbookDescribeDeleteByid);

    //查看书籍内容
    app.get('/book/upbookContent/:id',  CheckController.checkNotLogin);
    app.get('/book/upbookContent/:id', BookController.getupbookContentByid);
    
    //上传/修改书籍内容
    app.post('/book/upbookContent/:id', CheckController.checkNotLogin);
    app.post('/book/upbookContent/:id', BookController.postupbookContentById);

    //清空书籍内容
    app.get('/book/bookContent/delete/:id',  CheckController.checkNotLogin);
    app.get('/book/bookContent/delete/:id', BookController.getbookContentDeleteByid);
     
    //查看书籍内容(无需登录验证)
    app.get('/book/bookContent/:id', BookController.getbookContentByid);
    
    //查看书籍(无需登录验证)
    app.get('/book/:id', BookController.getByid);
};