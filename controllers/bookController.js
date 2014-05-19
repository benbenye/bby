var BookController = new  BookController(),
    crypto = require('crypto'),//crypto 是node的一个核心模块，我们使用他生成散列值加密密码    
    User = require('../models/user.js'),
    Book = require('../models/book.js'),
    BookContent = require('../models/bookContent.js'),
    BookCover = require('../models/bookCover.js'),
    BookComment = require('../models/bookComment.js'),
    mongoose = require('mongoose');

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
                error:req.flash('error').toString(),
            });
        });
    };
    
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

    this.getupbook = function(req, res){ 
        res.render('book/upbook',{
            title:'上传书籍描述',
            user:req.session.user
        });       
    };

    this.postupbook = function (req, res) {
        var newBook = new Book({
            publisher:res.req.session.user.name,
            name_zh:req.body.name_zh,
            tags:req.body.tags.split(","),
            intro:req.body.intro
        });
        newBook.save(function(err, book){
            if(err){
                return console.log(err.message);
            }
            //将新书的ID存到上传用户的数据表中
            User.insertBookId(newBook.publisher, book._id, function(err, userBookId){
                if(err){
                    return console.log(err.message);
                }
                req.flash('success','上传成功');
                res.send(book);
            });            
        });
    };

    this.postupbookCover = function (req, res) {
        var fs = require('fs'),
            cover = {data: fs.readFileSync(req.files.cover.path),
                    contentType: req.files.cover.type},
            id = req.body.bookId;
        BookCover.edit(id, cover, function (err, cover) {
            if (err) {
                return callback(err);
            }
            req.flash('success', '上传成功');
            res.redirect('/book/mybook');
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
            tags:req.body.tags,
            intro:req.body.intro
        }
        Book.edit(req.params.id,book,function(err, numeffect, raw){
            if(err){
                return callback(err);
            }            
            req.flash('success', '修改成功');
            res.send({ok:numeffect});
        });
    };
    
    this.postupbookCoverByid = function(req, res){
        var fs = require('fs'),
            cover = {data: fs.readFileSync(req.files.cover.path),
                    contentType: req.files.cover.type},
            id = req.body.id;
        BookCover.edit(id, cover, function (err, cover) {
            if (err) {
                return callback(err);
            }
            req.flash('success', '修改成功');
            res.send({ok:1});
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
                    bookContent:bookContent.contents
                });
            }
        }); 
    };
    //上传新书内容
    this.postupbookContentById = function(req, res){
        //BookContent.edit(req.body.id, req.body.content, function(err, page, bookContent, raw){
        //    if(err){
        //        return callback(err);
        //    }
        // callback 处理不正确
        // return callback(err) 
        //    req.flash('success','上传成功');
        //    res.redirect('/book/mybook');
        //});
        var pages = req.body.content.split('_ueditor_page_break_tag_'),
            contents = [];
        for(var i = 0, l = pages.length; i < l; i++){
            contents[i] = {
                page : i + 1,
                content : pages[i]
            }
        }
        var newBookContent = new BookContent({
            _id:req.body.id,
            contents:contents,
            time:0
            });
        newBookContent.save(function(err, bookContent){
            if(err){
                console.log(err);
                return err;
            }
            req.flash('success','上传成功');
            res.redirect('/book/mybook');
        });
    };

    this.postadditionContentsById = function(req, res){
        var pages = req.body.content.split('_ueditor_page_break_tag_'),
            contents = [],
            pageNum = parseInt(req.body.pageNum);//已经上传的页数
        for(var i = 0, j = pageNum, l = pages.length; i < l; i++,j++){
            console.log(j);
            contents[i] = {
                page : j + 1,
                content : pages[i]
            }
        }
        console.log(contents);
        BookContent.additionContents(req.body.id, contents, function(err){
            if(err)
                console.log(err);
            req.flash('success','追加成功');
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

    this.getbookByid = function(req, res){
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
    this.getbookCoverByid = function (req, res) {
        BookCover.getOne(req.params.id, function (err, cover) {
            if(cover === null){
                res.send({state:0});
            }else{
                res.set("Content-Type", "image/"+cover.cover.contentType);
                res.send(cover.cover.data);
            }
        });
    };

    this.getOnePagebyPage = function (req, res) {
        var page = req.params.page,
            id = req.params.id;
        console.log(page);
        BookContent.getOnePage(id, page, function(err, pageContent){
            if(pageContent == null){
                res.send({state:0});
            }else{
                res.render('book/editPage',{
                    id:id,
                    page:page,
                    content:pageContent.contents[page-1].content
                });  
            }
        });
    }
    //提交一页的修改内容
    this.postOnePage = function (req, res) {
        var page = req.params.page,
            id = req.params.id,
            content = req.body.pageContent;
        BookContent.editPage(id, page, content, function(err, pageContent){
            if(pageContent == null){
                res.send({state:0});
            }else{
                res.render('book/bookContent',{
                    title:'书籍内容',
                    user:req.session.user
                });  
            }
        });
    }
}
module.exports = BookController;