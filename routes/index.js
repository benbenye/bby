
/*
 * GET home page.
 */
var crypto = require('crypto'),//crypto 是node的一个核心模块，我们使用他生成散列值加密密码
    User = require('../models/user.js');

module.exports = function(app){
    app.get('/',function(req, res){
        res.render('index',{
            title:'主页',
            success:req.flash('success').toString(),
            user:req.session.user
        });
    });
    //登录页面
    app.get('/user/login', function(req, res){
        res.render('user/login',{
            title:'登录'
        });
    });
    app.post('/user/login',function(req, res){
        
        var md5 = crypto.createHash('md5'),
            password = req.body.password,
            password = md5.update(password).digest('hex');
       
        User.get(req.body.name,function(err,user){
            if(err){
                return callback(err);
            }
            req.session.user;
            req.flash('success_log','登录成功');
            res.redirect('/');
        });
    });
    //注册页面
    app.get('/user/reg',checkLogin);
    app.get('/user/reg',function(req, res){
        res.render('user/reg',{
            title:'注册',
            success:req.flash('success').toString(),
            user:req.session.user
        });
    }); 

    app.post('/user/reg',checkLogin);
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
    //过滤器
    function checkNotLogin(req, res, next){
        if(!req.session.user){
            res.flash('error','您还未登录');
            res.redirect('back');
        }
        next();
    }

    function checkLogin(req, res, next){
        if(req.session.user){
            res.flash('error','您已经登录了');
            res.redirect('back');
        }
        next();
    }
};