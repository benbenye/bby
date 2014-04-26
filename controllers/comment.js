var CommentController = new  CommentController(),
    User = require('../models/user.js'),
    Book = require('../models/book.js'),
    mongoose = require('mongoose');

function CommentController(){
    this.checkNotLogin = function checkNotLogin(req, res, next){
        if(!req.session.user){
            req.flash('error','您还未登录');
            return res.redirect('back');
        }
        next();
    };

    this.checkLogin = function checkLogin(req, res, next){
        if(req.session.user){
            req.flash('error','您已经登录了');
            return res.redirect('back');
            //res.redirect('back');
        }
        next();
    };
}
module.exports = CommentController;