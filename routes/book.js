
/*
 * GET users listing.
 */
var crypto = require('crypto'),//crypto 是node的一个核心模块，我们使用他生成散列值加密密码
    User = require('../models/book.js');

module.exports = function(app){
    
    //书籍页面
    app.get('/book/book',function(req, res){
        res.render('book/book',{
            title:'书籍页面'
        });
    });

    //上传书籍
    app.get('/book/upbook',checkNotLogin);
    app.get('/book/upbook',function(req, res){
        res.render('book/upbook',{
            title:'上传书籍'
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