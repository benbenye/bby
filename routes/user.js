
/*
 * GET users listing.
 */
var crypto = require('crypto'),//crypto 是node的一个核心模块，我们使用他生成散列值加密密码
    User = require('../models/user.js');

module.exports = function(app){


    //登录页面
    app.get('/user/login',checkLogin);
    app.get('/user/login', function(req, res){
        res.render('user/login',{
            title:'登录',
            error:req.flash('error').toString()
        });
    });
    
    app.post('/user/login',checkLogin);
    app.post('/user/login',function(req, res){
        
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
    });
    
    //退出
    app.get('/user/logout', checkNotLogin);
    app.get('/user/logout', function (req, res) {
        req.session.user = null;
        req.flash('success_out', '登出成功!');
        res.redirect('/');//登出成功后跳转到主页
  });

    //个人中心
    app.get('/user/perInfo',checkNotLogin);
    app.get('/user/perInfo',function(req, res){
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
    });

    app.post('/user/perInfo',checkNotLogin);
    app.post('/user/perInfo',function(req, res){
        var newperInfo = new User({
            name:req.body.name,
            email:req.body.email,
            sex:req.body.sex
        });
        User.edit(req.session.name, newperInfo, function(err, perInfo){//修改逻辑有问题
            if(err){
                req.flash('error', 'qq'+ err.toString() + ',,' + err.message);
                return res.redirect('/user/perInfo');
            }
            //req.session.user = perInfo;
            req.flash('success', '修改成功');
            res.redirect('/');

        });
    });

    //
    app.get('/user/wantread', checkNotLogin);
    app.get('/user/wantread', function(req, res){
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
    });

    //pull
    app.get('/user/pullwantread', checkNotLogin);
    app.get('/user/pullwantread', function(req, res){
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