var CommentController = new  CommentController(),
    User = require('../models/user.js'),
    Book = require('../models/book.js'),
    BookComment = require('../models/bookComment.js'),
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
                callback(err);
            }
            res.send({ok:1});
        });
    };
}
module.exports = CommentController;