
/*
 * GET books listing.
 */
var BookController = require('../controllers/bookController.js'),
    CheckController = require('../controllers/checkController.js'),
    express = require('express');

var book = express.Router();


    //新书速递,实体书 进入首页
    book.get('/', BookController.getpaperbook);

    // 进入后台上传页面
    book.get('/getuppaperBook', CheckController.checkNotLogin);
    book.get('/getuppaperBook', BookController.getuppaperBook);
    // 提交paperbook内容
    book.post('/uppaperBook', CheckController.checkNotLogin);
    book.post('/uppaperBook', BookController.uppaperBook);
    // 删除一本paperbook
    book.get('/delete/:id', CheckController.checkNotLogin);
    book.get('/delete/:id', BookController.removepaperBook);

    //最新连载
    book.get('/book/serial', BookController.getindex);

    /*
    *我上传过的书
    */
    // book.get('/book/mybook',  CheckController.checkNotLogin);
    // book.get('/book/mybook',BookController.getmybook);
    
    //新建书籍描述
    book.get('/book/upbook', CheckController.checkNotLogin);
    book.get('/book/upbook', BookController.getupbook);
    
    book.post('/book/upbook', CheckController.checkNotLogin);
    book.post('/book/upbook', BookController.postupbook);

    // book.post('/book/upbookCover', CheckController.checkNotLogin);
    // book.post('/book/upbookCover', BookController.postupbookCover);

    //查看\修改书籍描述
    book.get('/book/upbookDescribe/:id', CheckController.checkNotLogin);
    book.get('/book/upbookDescribe/:id', BookController.getupbookDecribeByid);
    
    //修改书籍描述
    book.post('/book/upbookDescribe/:id', CheckController.checkNotLogin);
    book.post('/book/upbookDescribe/:id', BookController.postupbookDecribeByid);
    
    //修改书籍封皮
    book.post('/book/upbookCover/:id', CheckController.checkNotLogin);
    book.post('/book/upbookCover/:id', BookController.postupbookCoverByid);

    //清空书籍描述
    book.get('/book/bookDescribe/delete/:id',  CheckController.checkNotLogin);
    book.get('/book/bookDescribe/delete/:id', BookController.getbookDescribeDeleteByid);

    //查看书籍单页内容
    book.get('/book/upbookContent/:id/:page',  CheckController.checkNotLogin);
    book.get('/book/upbookContent/:id/:page', BookController.getOnePagebyPage);

    //修改书籍单页内容
    book.post('/book/upbookContent/:id/:page',  CheckController.checkNotLogin);
    book.post('/book/upbookContent/:id/:page', BookController.postOnePage);

    //查看书籍内容
    book.get('/book/upbookContent/:id',  CheckController.checkNotLogin);
    book.get('/book/upbookContent/:id', BookController.getupbookContentByid);
    
    //上传/修改书籍内容
    book.post('/book/upbookContent/:id', CheckController.checkNotLogin);
    book.post('/book/upbookContent/:id', BookController.postupbookContentById);
    
    //追加书籍内容
    book.post('/book/additionContents/:id', CheckController.checkNotLogin);
    book.post('/book/additionContents/:id', BookController.postadditionContentsById);

    //清空书籍内容
    book.get('/book/bookContent/delete/:id',  CheckController.checkNotLogin);
    book.get('/book/bookContent/delete/:id', BookController.getbookContentDeleteByid);
     
    //查看书籍内容(无需登录验证)
    // book.get('/book/bookContent/:id', CheckController.checkNotLogin);
    book.get('/book/bookContent/:id', BookController.getbookContentByid);
    
    //查看书籍描述(无需登录验证)
    // book.get('/serial/:id', CheckController.checkNotLogin);
    book.get('/serial/:id', BookController.getbookByid);

    //查看paperbook(无需登录验证)
    // book.get('/paperbook/:id', CheckController.checkNotLogin);
    book.get('/paperbook/:id', BookController.getpaperbookByid);

    //请求图书封皮
    // book.get('/images/books/:id', BookController.getbookCoverByid);
module.exports = book;
