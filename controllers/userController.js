﻿var crypto = require('crypto'),//crypto 是node的一个核心模块，我们使用他生成散列值加密密码
    UserController = new  UserController(),
    User = require('../models/user.js');
    UserAvatar = require('../models/userAvatar.js');

function UserController(){
    this.getlogin = function(req, res){
        res.render('user/login',{
            title:'登录',
            error:req.flash('error').toString()
        });
    };

    this.getlogout = function (req, res) {
        req.session.user = null;
        req.flash('success_out', '登出成功!');
        res.redirect('/');//登出成功后跳转到主页
  };

    this.postlogin = function(req, res){
        
        var password = crypto.createHash('md5').update(req.body.password).digest('hex');
       
        User.get(req.body.name,function(err,user){
            if(err){
                return callback(err);
            }
            if(user == null){
                req.flash('error','用户名错误');
                return res.redirect('/user/login');
            } else if( user.password != password){
                req.flash('error','密码错误');
                return res.redirect('/user/login');
            }           
            req.session.user = user;
            req.flash('success','登录成功');
            res.redirect('/');
        });
    };

    this.getreg = function(req, res){
        res.render('user/reg',{
            title:'注册',
            success:req.flash('success').toString(),
            user:req.session.user
        });
    };

    this.postreg = function(req, res){
       var password = req.body.password,
           password_re = req.body.password_re;
       if(password != password_re){
           req.flash('error','两次密码不一致');
           return res.redirect('/user/reg');
       }
       //md5
       var md5 = crypto.createHash('md5'),
           password = md5.update(password).digest('hex');

       var newUser = new User({
           name:req.body.name,
           password:password,
           email:req.body.email
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
    };

    this.getperInfo = function(req, res){
        User.get(req.session.user.name,function(err, user){
            if(err){
                res.flash();//丰富一下
                return callback(err);
            }
            res.render('user/perInfo',{
                title:'个人中心',
                user:user,
                error:req.flash('error').toString()
            });
         });        
    };

    this.postperInfo = function(req, res){
        var newperInfo = new User({
            name:req.body.user_name,
            email:req.body.user_email,
            sex:req.body.user_sex
        });
        User.edit(req.session.user.name, newperInfo, function(err, numeffect){//修改逻辑有问题
            if(err){
                req.flash('error', 'qq'+ err.toString() + ',,' + err.message);
                return res.redirect('/user/perInfo');
            }
            res.send({ok:numeffect});
        });
    };

    this.getwantread = function(req, res){
        var newwish = new User({
            name : req.session.user.name,
            wish : req.query.bookId
            });
        User.addwish(newwish.name, newwish.wish, function(err, numeffect){
            if(err){
                return res.redirect('/');
                res.send({ok:0});
            }
            if(numeffect === 1){
                res.send({ok:1});//插入成功
            }
            });
    };

    this.getpullwantread = function(req, res){
        var pullwish = new User({
            name: req.session.user.name,
            wish:req.query.bookId
            });
        User.pullwish(pullwish.name, pullwish.wish, function(err, numeffect){
            if(err){
                return res.redirect('/');
                }
            if(numeffect === 1){
                res.send({ok:1});
                }
            });
        };
}
module.exports = UserController;