var BookController = new  BookController(),
    crypto = require('crypto'),//crypto 是node的一个核心模块，我们使用他生成散列值加密密码    
    User = require('../models/user.js'),
    Book = require('../models/book.js'),
    BookContent = require('../models/bookContent.js');

function BookController(){
    this.getindex = function(req, res){
        Book.getAllList(function(err,book){
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
    }
    
    this.getbook = function(req, res){        
        res.render('book/book',{
            title:'书籍页面',
            user:req.session.user,
            success:req.flash('success').toString()
        });
    };
    
    this.getmybook = function(req, res){
        Book.getList(req.session.user.name,function(err,book){
            if(err){
                res.flash();
                return callback(err);
            }
            res.render('book/mybook',{
                title:'书籍页面',
                user:req.session.user,
                book:book,
                error:req.flash('error').toString()
            });
        });       
    };
    
    this.getmywish = function(req, res){
        User.get(req.session.user.name,function(err, user){
            if(err){
                return callback(err);
            }
            Book.getMywish(user.wish,function(err, mywishBook){                
                res.render('book/mywish',{
                    title:'我想看的书',
                    user:req.session.user,
                    mywishBook : mywishBook
                    });
                });
            });
        };

    this.getupbook = function(req, res){ 
        res.render('book/upbook',{
            title:'上传书籍描述',
            user:req.session.user
        });       
    };

    this.postupbook = function(req, res){
        var fs = require('fs');
        var newBook = new Book({
            publisher:res.req.session.user.name,
            name_zh:req.body.name_zh,
            cover: {data: fs.readFileSync(req.files.cover.path),
                contentType : req.files.cover.type},
            tags:req.body.tags.split(",")
        });
        newBook.save(function(err, book){
            if(err){
                return callback(err);
            }
            req.flash('success','上传成功');
            res.redirect('/book/mybook');
        });
    };

    this.getmybookByid = function(req, res){
        Book.getOne(req.params.id, function(err,book){
            if(err){
                res.flash();
                return callback(err);
            }
            res.render('book/bookDescribe',{
                title:'书籍页面',
                user:req.session.user,
                book:book,
                success:req.flash('success').toString()
            });
        });       
    };

    this.getupbookDecribeByid = function(req, res){ 
        Book.getOne(req.params.id, function(err,book){
            if(err){
                res.flash();
                return callback(err);
            }
            res.render('book/upbookDescribe',{
                title:'上传书籍描述',
                user:req.session.user,
                book:book
            });
        });       
    };

    this.postupbookDecribeByid = function(req, res){       
        var book = {
            name_zh:req.body.name_zh,
            tags:req.body.tags
        }
        Book.edit(req.params.id,book,function(err, numeffect, raw){
            if(err){
                return callback(err);
            }            
            req.flash('success', '修改成功');
            res.redirect('/book/mybook');
        });
    };

    this.getbookDescribeDeleteByid = function(req, res){
        Book.remove(req.params.id,function(err){
            if(err){
                return callback(err);
            }
        });
        BookContent.remove(req.params.id,function(err){
            if(err){
                return callback(err);
            }
            req.flash('success','删除成功');
            res.redirect('/book/mybook');
        });
    };

    this.getupbookContentByid = function(req, res){
        BookContent.getOne(req.params.id, function(err,bookContent){
            if(err){
                res.flash();
                return callback(err);
            }
            if(bookContent === null){
                res.render('book/upbookContent',{
                    id:req.params.id,
                    user:req.session.user,
                    error:'您还没有上传内容'
                });
            }
            else{
                res.render('book/upbookContent',{
                    id:req.params.id,
                    user:req.session.user,
                    bookContent:bookContent.content
                });
            }
        }); 
    };

    this.postupbookContentById = function(req, res){  
        console.log(req.params.id);     
        BookContent.edit(req.params.id, req.body.content, function(err, bookContent, raw){
            if(err){
                return callback(err);
            }
            req.flash('success','上传成功');
            res.redirect('/book/mybook');
        });
    };

    this.getbookContentDeleteByid = function(req, res){
        BookContent.remove(req.params.id,function(err){
            if(err){
                return callback(err);
            }
            req.flash('success','内容成功清除');
            res.redirect('/book/mybook');
        });
    };
    
    this.getbookContentByid = function(req, res){
        BookContent.getOne(req.params.id,function(err,bookContent){
            if(err){
                res.flash();
                return callback(err);
            }
            res.render('book/bookContent',{
                title:'书籍内容',
                bookContent:bookContent,
                user:req.session.user,
                error:req.flash('error').toString()
            });
        });       
    };

    this.getByid = function(req, res){
        Book.getOne(req.params.id,function(err,book){
            if(err){
                res.flash();
                return callback(err);
            }
            res.render('book/bookDescribe',{
                title:'书籍页面',
                book:book,
                user:req.session.user
            });
        });       
    };

    this.getbookimageByid = function(req, res){
        Book.getOne(req.params.id, function(image){
            res.render('book/mybook');
        });
    };
}
module.exports = BookController;