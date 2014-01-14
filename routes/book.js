
/*
 * GET users listing.
 */
var crypto = require('crypto'),//crypto 是node的一个核心模块，我们使用他生成散列值加密密码
    Book = require('../models/book.js'),
    BookContent = require('../models/bookContent.js');

module.exports = function(app){
    
    //书籍页面
    app.get('/book/mybook', checkNotLogin);
    app.get('/book/mybook',function(req, res){
        Book.get(req.session.user.name,function(err,book){
            if(err){
                res.flash();
                return callback(err);
            }
            var book = book;
            res.render('book/mybook',{
                title:'书籍页面',
                user:req.session.user,
                book:book
            });
        });       
    });

    //上传书籍
    app.get('/book/upbook',checkNotLogin);
    app.get('/book/upbook',function(req, res){        
        res.render('book/upbook',{
            title:'上传书籍',
            user:req.session.user
        });        
    });

    app.post('/book/upbook',checkNotLogin);
    app.post('/book/upbook',function(req, res){
        var newBook = new Book({
            publisher:res.req.session.user.name,
            name_zh:req.body.name_zh,
            tags:req.body.tags.split("；")
        });
        var newBookContent = new BookContent({
            name:req.body.name_zh,
            content:req.body.content
        });
        newBook.save(function(err, book){
            if(err){
                return callback(err);
            }
            req.flash('success','上传成功');
            //res.redirect('/');
        });
        newBookContent.save(function(err, bookContent){
            if(err){
                return callback(err);
            }
            req.flash('','');
            res.redirect('/');
        });
    });

    //查看书籍
    app.get('/book/:name', checkNotLogin);
    app.get('/book/:name',function(req, res){
        BookContent.get(req.params.name,function(err, bookContent){
            if(err){
                return callback(err);
            }
            res.render('book/book',{
                title:req.params.name,
                user:req.session.user,
                name:req.params.name,
                bookContent:bookContent.content
            });
        });
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