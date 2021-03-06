var CommentController = new  CommentController(),
    GetPerInfo = require('../common/getPerInfo.js'), 
    User = require('../models/user.js'),
    Book = require('../models/book.js'),
    BookComment = require('../models/bookComment.js'),
    UserAvatar = require('../models/userAvatar.js'),
    mongoose = require('mongoose');

function CommentController(){
    //提交书评
    this.getcomments = function(req, res){
        var newBookComment = new BookComment({
            userId : req.query.userId,
            bookId : req.query.bookId,
            comment : req.query.comment
        });
        newBookComment.save(function(err, bookComment){
            if(err){
                return console.log(err.message);
            }
            res.send({ok:1});
        });
    };

    //书评人页面
    this.getreviewer = function (req, res){
        BookComment.getAllList(function(err, bc){
            if(err){
                return console.log(err.message);
            }
            if(req.session.user == null){
                res.render('user/reviewer',{
                    title:'书评人',
                    bookComment:bc,
                    success:req.flash('success').toString(),
                    success_out:req.flash('success_out').toString(),
                    error:req.flash('error').toString()
                });
            }else{
                GetPerInfo(req.session.user.name, function (user) {
                    res.render('user/reviewer',{
                        title:'书评人',
                        bookComment:bc,
                        user:user,
                        success:req.flash('success').toString(),
                        success_out:req.flash('success_out').toString(),
                        error:req.flash('error').toString()
                    });
                });
            }
        });
    };
}
module.exports = CommentController;