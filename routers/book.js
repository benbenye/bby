
/*
 * GET books listing.
 */
var Book = require('../controllers/bookController.js'),
    Check = require('../controllers/checkController.js'),
    express = require('express');

var book = express.Router();


    //新书速递,实体书 进入首页
    book.get('/api/index', Book.getpaperbook);
    book.get('/api/getuppaperBook', Check.checkNotLogin, Book.getuppaperBook);// 进入后台上传页面
    book.post('/api/uppaperBook', Check.checkNotLogin, Book.uppaperBook);// 提交paperbook内容
    book.get('/api/delete/:id', Check.checkNotLogin, Book.removepaperBook);// 删除一本paperbook
    book.get('/api/book/serial', Book.getindex);//最新连载

    // book.get('/api/book/mybook',  Check.checkNotLogin,Book.getmybook);我上传过的书
    
    //新建书籍描述
    book.get('/api/book/upbook', Check.checkNotLogin, Book.getupbook);
    book.post('/api/book/upbook', Check.checkNotLogin, Book.postupbook);

    // book.post('/api/book/upbookCover', Check.checkNotLogin, Book.postupbookCover);
    
    book.get('/api/book/upbookDescribe/:id', Check.checkNotLogin, Book.getupbookDecribeByid);//查看\修改书籍描述
    book.post('/api/book/upbookDescribe/:id', Check.checkNotLogin, Book.postupbookDecribeByid);//修改书籍描述
    book.post('/api/book/upbookCover/:id', Check.checkNotLogin, Book.postupbookCoverByid);//修改书籍封皮

    book.get('/api/book/bookDescribe/delete/:id',  Check.checkNotLogin, Book.getbookDescribeDeleteByid);//清空书籍描述

    book.get('/api/book/upbookContent/:id/:page',  Check.checkNotLogin, Book.getOnePagebyPage);//查看书籍单页内容
    book.post('/api/book/upbookContent/:id/:page',  Check.checkNotLogin, Book.postOnePage);//修改书籍单页内容
    book.get('/api/book/upbookContent/:id',  Check.checkNotLogin, Book.getupbookContentByid);//查看书籍内容
    book.post('/api/book/upbookContent/:id', Check.checkNotLogin, Book.postupbookContentById);//上传/修改书籍内容
    book.post('/api/book/additionContents/:id', Check.checkNotLogin, Book.postadditionContentsById);//追加书籍内容
    book.get('/api/book/bookContent/delete/:id',  Check.checkNotLogin, Book.getbookContentDeleteByid);//清空书籍内容
    book.get('/api/book/bookContent/:id', Book.getbookContentByid);//查看书籍内容(无需登录验证)

    
    book.get('/api/serial/:id', Book.getbookByid);//查看书籍描述(无需登录验证)
    book.get('/api/paperbook/:id', Book.getpaperbookByid);//查看paperbook(无需登录验证)

    // book.get('/api/images/books/:id', Book.getbookCoverByid);//请求图书封皮
module.exports = book;
