
/*
 * GET home page.
 */
var crypto = require('crypto'),//crypto 是node的一个核心模块，我们使用他生成散列值加密密码
    User = require('../models/user.js');

module.exports = function(app){
    app.get('/',function(req, res){
        res.render('index',{
            title:'主页'
        });
    });
    app.get('/me',function(req,res){
        res.render('hello');
    });
    app.get('/user/reg',function(req, res){
        res.render('/user/reg',{
            title:'注册'
        });
    });
    app.post('/user/reg',function(req, res){
       var name = req.body.name,
           password = req.body.password,
           password_re = req.body.password_re,
           email = req.body.email;
       if(password != password_re){
           req.flash('error','两次密码不一致');
           return res.redirect('/user/reg');
       }
       //md5
       var md5 = crypto.createHash('md5'),
           password = md5.update(password).digest('hex');
       var newUser = new User({
           name:name,
           password:password,
           email:email
       });
       //check the user is exist?
        User.get(newUser.name,function(err,user){
            if(user){
                req.flash('error','用户已经存在');
                return res.redirect('/user/reg');
            }
            newUser.save(function(err,user){
                if(err){
                    req.flash('error',err);
                    return res.redirect('/user/reg');
                }
                req.session.user = user;
                req.flash('success','注册成功');
                res.redirect('/');
            });
        });
    });
};