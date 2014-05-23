var CommentController = new  CommentController(),
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
                return consloe.log(err.message);
            }
            console.log(bc);
            res.render('user/reviewer',{
                title:'书评人',
                user:req.session.user,
                error:req.flash('error').toString(),
                bookComment:bc
            });
        });
    };
}
module.exports = CommentController;