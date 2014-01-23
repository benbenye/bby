
/*
 * GET users listing.
 */
var crypto = require('crypto'),//crypto 是node的一个核心模块，我们使用他生成散列值加密密码
    BookController = require('../controllers/bookController.js');

module.exports = function(app){
    
    //进入首页
    app.get('/', BookController.getindex);

    //书籍页面
    app.get('/book/book', checkNotLogin);
    app.get('/book/book',BookController.getbook);

    //我的书籍页面
    app.get('/book/mybook', checkNotLogin);
    app.get('/book/mybook',BookController.getmybook);
    
    //我想读的书
    app.get('/book/mywish', checkNotLogin);
    app.get('/book/mywish', BookController.getmywish);
    
    //新建书籍描述
    app.get('/book/upbook',checkNotLogin);
    app.get('/book/upbook', BookController.getupbook);
    
    app.post('/book/upbook',checkNotLogin);
    app.post('/book/upbook', BookController.postupbook);
    
    //查看我的书籍
    app.get('/book/mybook/:id', checkNotLogin);
    app.get('/book/mybook/:id', BookController.postmybookByid);
    
    //查看\修改书籍描述
    app.get('/book/upbookDescribe/:id',checkNotLogin);
    app.get('/book/upbookDescribe/:id', BookController.getupbookDecribeByid);
    
    //修改书籍描述
    app.post('/book/upbookDescribe/:id',checkNotLogin);
    app.post('/book/upbookDescribe/:id', BookController.postupbookDecribeByid);

    //清空书籍描述
    app.get('/book/bookDescribe/delete/:id', checkNotLogin);
    app.get('/book/bookDescribe/delete/:id', BookController.getbookDescribeDeleteByid);

    //查看书籍内容
    app.get('/book/upbookContent/:id', checkNotLogin);
    app.get('/book/upbookContent/:id', BookController.getupbookContentByid);
    
    //上传/修改书籍内容
    app.post('/book/upbookContent/:id',checkNotLogin);
    app.post('/book/upbookContent/:id', BookController.postupbookContentById);

    //清空书籍内容
    app.get('/book/bookContent/delete/:id', checkNotLogin);
    app.get('/book/bookContent/delete/:id', BookController.getbookContentDeleteByid);
     
    //查看书籍内容(无需登录验证)
    app.get('/book/bookContent/:id', BookController.getbookContentByid);
    
    //查看书籍(无需登录验证)
    app.get('/book/:id', BookController.getByid);

    //过滤器
    function checkNotLogin(req, res, next){
        if(!req.session.user){
            req.flash('error','您还未登录');
            return res.redirect('back');
        }
        next();
    }
   
    function checkLogin(req, res, next){
        if(req.session.user){
            req.flash('error','您已经登录了');
            return res.redirect('back');
            //res.redirect('back');
        }
        next();
    }
};