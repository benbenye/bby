﻿
/*
 * GET books listing.
 */
var BookController = require('../controllers/bookController.js'),
    CheckController = require('../controllers/checkController.js');

module.exports = function(app){

    //新书速递,实体书 进入首页
    app.get('/', CheckController.checkNotLogin);
    app.get('/', BookController.getpaperbook);

    app.get('/getuppaperBook', BookController.getuppaperBook);
    app.get('/uppaperBook', BookController.uppaperBook);

    //最新连载
    app.get('/book/serial', BookController.getindex);

    /*
    *我上传过的书
    */
    app.get('/book/mybook',  CheckController.checkNotLogin);
    app.get('/book/mybook',BookController.getmybook);
    
    //新建书籍描述
    app.get('/book/upbook', CheckController.checkNotLogin);
    app.get('/book/upbook', BookController.getupbook);
    
    app.post('/book/upbook', CheckController.checkNotLogin);
    app.post('/book/upbook', BookController.postupbook);

    app.post('/book/upbookCover', CheckController.checkNotLogin);
    app.post('/book/upbookCover', BookController.postupbookCover);

    //查看\修改书籍描述
    app.get('/book/upbookDescribe/:id', CheckController.checkNotLogin);
    app.get('/book/upbookDescribe/:id', BookController.getupbookDecribeByid);
    
    //修改书籍描述
    app.post('/book/upbookDescribe/:id', CheckController.checkNotLogin);
    app.post('/book/upbookDescribe/:id', BookController.postupbookDecribeByid);
    
    //修改书籍封皮
    app.post('/book/upbookCover/:id', CheckController.checkNotLogin);
    app.post('/book/upbookCover/:id', BookController.postupbookCoverByid);

    //清空书籍描述
    app.get('/book/bookDescribe/delete/:id',  CheckController.checkNotLogin);
    app.get('/book/bookDescribe/delete/:id', BookController.getbookDescribeDeleteByid);

    //查看书籍单页内容
    app.get('/book/upbookContent/:id/:page',  CheckController.checkNotLogin);
    app.get('/book/upbookContent/:id/:page', BookController.getOnePagebyPage);

    //修改书籍单页内容
    app.post('/book/upbookContent/:id/:page',  CheckController.checkNotLogin);
    app.post('/book/upbookContent/:id/:page', BookController.postOnePage);

    //查看书籍内容
    app.get('/book/upbookContent/:id',  CheckController.checkNotLogin);
    app.get('/book/upbookContent/:id', BookController.getupbookContentByid);
    
    //上传/修改书籍内容
    app.post('/book/upbookContent/:id', CheckController.checkNotLogin);
    app.post('/book/upbookContent/:id', BookController.postupbookContentById);
    
    //追加书籍内容
    app.post('/book/additionContents/:id', CheckController.checkNotLogin);
    app.post('/book/additionContents/:id', BookController.postadditionContentsById);

    //清空书籍内容
    app.get('/book/bookContent/delete/:id',  CheckController.checkNotLogin);
    app.get('/book/bookContent/delete/:id', BookController.getbookContentDeleteByid);
     
    //查看书籍内容(无需登录验证)
    app.get('/book/bookContent/:id', CheckController.checkNotLogin);
    app.get('/book/bookContent/:id', BookController.getbookContentByid);
    
    //查看书籍描述(无需登录验证)
    app.get('/book/:id', CheckController.checkNotLogin);
    app.get('/book/:id', BookController.getbookByid);

    //请求图书封皮
    app.get('/images/books/:id', BookController.getbookCoverByid);
};