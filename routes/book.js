
/*
 * GET users listing.
 */
var crypto = require('crypto'),//crypto 是node的一个核心模块，我们使用他生成散列值加密密码
    Book = require('../models/book.js'),
    BookContent = require('../models/bookContent.js');

module.exports = function(app){
    
    app.get('/',function(req, res){
        Book.getList(req.session.user.name,function(err,book){
            if(err){
                res.flash();
                return callback(err);
            }
            res.render('index',{
                title:'主页',
                user:req.session.user,
                books:book,
                success:req.flash('success').toString(),
                success_out:req.flash('success_out').toString(),
                error:req.flash('error').toString()
            });
        });
    });

    //书籍页面
    app.get('/book/book', checkNotLogin);
    app.get('/book/book',function(req, res){        
        res.render('book/book',{
            title:'书籍页面',
            user:req.session.user,
            success:req.flash('success').toString()
        });   
    });

    //我的书籍页面
    app.get('/book/mybook', checkNotLogin);
    app.get('/book/mybook',function(req, res){
        Book.getList(req.session.user.name,function(err,book){
            if(err){
                res.flash();
                return callback(err);
            }
            res.render('book/mybook',{
                title:'书籍页面',
                user:req.session.user,
                book:book,
                success:req.flash('success').toString()
            });
        });       
    });

    //查看\修改书籍描述
    app.get('/book/upbookDescribe/:userName/:bookName',checkNotLogin);
    app.get('/book/upbookDescribe/:userName/:bookName',function(req, res){ 
        Book.getOne(req.params.userName, req.params.bookName, function(err,book){
            if(err){
                res.flash();
                return callback(err);
            }
            var book = book;
            console.log(book.name_zh);
            res.render('book/upbookDescribe',{
                title:'上传书籍描述',
                user:req.session.user,
                book:book
            });
        });       
    });
    
    //修改书籍描述
    app.post('/book/upbookDescribe/:userName/:bookName',checkNotLogin);
    app.post('/book/upbookDescribe/:userName/:bookName',function(req, res){       
        var name = {
            userName:req.params.userName,
            bookName:req.params.bookName
        };
        var books = {
            name_zh:req.body.name_zh,
            tags:req.body.tags
        }
        Book.edit(name,books,function(err, numeffect){
            if(err){
                return callback(err);
            }            
            req.flash('success','修改成功');
            res.redirect('/book/mybook');
        });
    });

    //上传书籍描述
    app.get('/book/upbookDescribe',checkNotLogin);
    app.get('/book/upbookDescribe',function(req, res){ 
        res.render('book/upbookDescribe',{
            title:'上传书籍描述',
            user:req.session.user
        });       
    });
    
    app.post('/book/upbookDescribe',checkNotLogin);
    app.post('/book/upbookDescribe',function(req, res){
        var newBook = new Book({
            publisher:res.req.session.user.name,
            name_zh:req.body.name_zh,
            tags:req.body.tags.split(",")
        });
        newBook.save(function(err, book){
            if(err){
                return callback(err);
            }
            req.flash('success','上传成功');//上传之前加一个验证，此用户下的书是否已经存在相同名字的书
            res.redirect('/book/mybook');
        });
    });

    //查看书籍内容
    app.get('/book/upbookContent/:userName/:bookName', checkNotLogin);
    app.get('/book/upbookContent/:userName/:bookName', function(req, res){
        BookContent.getOne(req.params.userName, req.params.bookName, function(err,bookContent){
            if(err){
                res.flash();
                return callback(err);
            }
            if(bookContent === null){
                res.render('book/upbookContent',{
                    title:req.params.bookName,
                    user:req.session.user,
                    error:'您还没有上传内容'
                });
            }
            else{
                res.render('book/upbookContent',{
                    title:req.params.bookName,
                    user:req.session.user,
                    bookContent:bookContent.content
                });
            }
        }); 
    });
    
    //上传书籍内容
    app.post('/book/upbookContent/:userName/:bookName',checkNotLogin);
    app.post('/book/upbookContent/:userName/:bookName',function(req, res){       
        var newBookContent = new BookContent({
            publisher:req.params.userName,
            name_zh:req.params.bookName,
            content:req.body.content
        });
        BookContent.edit(newBookContent,newBookContent, function(err, bookContent){
            if(err){
                return callback(err);
            }
            req.flash('success','上传成功');
            res.redirect('/book/mybook');
        });
    });
    
    ////修改书籍内容
    //app.post('/book/upbookContent/:userName/:bookName',checkNotLogin);
    //app.post('/book/upbookContent/:userName/:bookName',function(req, res){       
    //    var newBookContent = new BookContent({
    //        publisher:req.params.userName,
    //        name_zh:req.params.bookName,
    //        content:req.body.content
    //    });
    //    newBookContent.edit(function(err, bookContent){
    //        if(err){
    //            return callback(err);
    //        }
    //        req.flash('success','修改成功');
    //        res.redirect('/book/mybook');
    //    });
    //});路由冲突，暂时先缓一下

    //查看书籍
    app.get('/book/mybook/:name', checkNotLogin);
    app.get('/book/mybook/:name',function(req, res){
        BookContent.getOne(req.session.user.name, req.params.name, function(err, bookContent){
            if(err){
                return callback(err);
            }
            if(bookContent === null){
                res.render('book/bookContent',{
                    title:req.params.name,
                    user:req.session.user,
                    name:req.params.name,
                    error:'您还没有上传内容'
                });
            }
            else{
                res.render('book/bookContent',{
                    title:req.params.name,
                    user:req.session.user,
                    name:req.params.name,
                    bookContent:bookContent.content
                });
            }
        });
    });

    app.post('/book/:name',checkNotLogin);
    app.post('/book/:name',function(req, res){

    });

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