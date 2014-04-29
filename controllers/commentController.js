var CommentController = new  CommentController(),
    User = require('../models/user.js'),
    Book = require('../models/book.js'),
    BookComment = require('../models/bookComment.js'),
    mongoose = require('mongoose');

function CommentController(){
    this.checkNotLogin = function checkNotLogin(req, res, next){
        if(!req.session.user){
            req.flash('error','您还未登录');
            return res.redirect('back');
        }
        next();
    };
    //提交书评
    this.postcomments = function(req, res){
        var newBookComment = new BookComment({
            userId : req.query.userId,
            bookId : req.query.bookId,
            comment : comment
        });
        newBookComment.save(function(err, bookComment){
            if(err){
                callback(err);
            }
            res.send({ok:1});
        });
    };
}
module.exports = CommentController;