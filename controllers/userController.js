var crypto = require('crypto'),//crypto 是node的一个核心模块，我们使用他生成散列值加密密码
    GetPerInfo = require('../common/getPerInfo.js'),  
    UserController = new  UserController(),
    User = require('../models/user.js'),
    UserAvatar = require('../models/userAvatar.js'),
    Book = require('../models/book.js');

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
       console.log(newUser.name);
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
        GetPerInfo(req.session.user.name, function (user) {
            res.render('user/perInfo',{
                title:'个人中心',
                user:user,
                success:req.flash('success').toString(),
                success_out:req.flash('success_out').toString(),
                error:req.flash('error').toString(),
            });
        });
    };

    //然后根据ID获取用户头像
/*    this.getUserAvatarByid = function (req, res) {
        UserAvatar.getOne(req.params.id, function (err, avatar) {
            if(avatar === null){
                res.send({state:0});
            }else{
                res.set("Content-Type", "image/"+avatar.avatar.contentType);
                res.send(avatar.avatar.data);
            }
        });
    };
*/
    this.postperInfo = function(req, res){
        var newperInfo = new User({
            name:req.body.user_name,
            email:req.body.user_email,
            sex:req.body.user_sex
        });
        User.edit(req.session.user.name, newperInfo, function(err, numeffect){
            //修改逻辑有问题
            //不能提供用户名的修改
            if(err){
                req.flash('error', 'qq'+ err.toString() + ',,' + err.message);
                return res.redirect('/user/perInfo');
            }
            res.send({ok:numeffect});
        });
    };

    this.postuserAvatar = function (req, res) {
        var fs = require('fs'),
            userAvatar = {data: fs.readFileSync(req.files.userAvatar.path),
                    contentType: req.files.userAvatar.type};
        /*var newUserAvatar = new UserAvatar({
            avatar:userAvatar
        });*/
        User.editAvatar(req.session.user.name, userAvatar, function (err, numeffect) {
                if (err) {
                    req.flash('err', err.message);
                }
                req.flash('success', '上传成功');
                res.send(userAvatar);
            });
    };

    //添加想看
    this.getwish = function(req, res){
        var newwish = {
            name : req.session.user.name,
            wish : req.query.bookId
            };
        User.pushwish(newwish.name, newwish.wish, function(err, numeffect){
            if(err){
        console.log(numeffect);
                res.send({ok:0,err:err});
            }
            if(numeffect === 1){
        console.log(numeffect);
                res.send({ok:1});//插入成功
            }
            });
    };

    //添加看过
    this.getread = function(req, res){
        var newreaded = {
            name : req.session.user.name,
            readed : req.query.bookId
            };
        User.pushreaded(newreaded.name, newreaded.readed, function(err, numeffect){
            if(err){
                res.send({ok:0,err:err});
            }
            if(numeffect === 1){
                res.send({ok:1});//插入成功
            }
            });
    };

    //添加在看
    this.getreading = function(req, res){
        var newreading = {
            name : req.session.user.name,
            reading : req.query.bookId
            };
        User.pushreading(newreading.name, newreading.reading, function(err, numeffect){
            if(err){
                res.send({ok:0,err:err});
            }
            if(numeffect === 1){
                res.send({ok:1});//插入成功
            }
            });
    };

    this.getpullwish = function(req, res){
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
    
/*    this.getmywish = function(req, res){
        User.get(req.session.user.name,function(err, user){
            if(err){
                return console.log(err.message);
            }
            Book.getMywish(user.wish,function(err, mywishBook){                
                res.render('book/mywish',{
                    title:'我想看的书',
                    user:req.session.user,
                    mywishBook : mywishBook
                    });
                });
            });
        };
*/
    //个人页面
    this.getUserInfor = function(req, res){
        // User.get(),需要一个新的jade视图显示个人页面
        User.get(req.params.name,function(err, userInfor){
            if(err){
                return console.log(err.message);
            }
            if(req.session.user == null){
                res.render('user/userInfor',{
                    title:userInfor.name+'的个人页面',
                    userInfor:userInfor,
                    success:req.flash('success').toString(),
                    success_out:req.flash('success_out').toString(),
                    error:req.flash('error').toString(),
                });
            }else{
                GetPerInfo(req.session.user.name, function (user) {
                    res.render('user/userInfor',{
                        title:userInfor.name+'的个人页面',
                        user:user,
                        userInfor:userInfor,
                        success:req.flash('success').toString(),
                        success_out:req.flash('success_out').toString(),
                        error:req.flash('error').toString(),
                    });
                });
            }
        });
    };
}
module.exports = UserController;