
/*
 * GET users listing.
 */
var UserController = require('../controllers/userController.js'),
    express = require('express'),
    CheckController = require('../controllers/checkController.js');
var user = express.Router();

    //登录页面
    user.get('/user/login', CheckController.checkLogin);
    user.get('/user/login', UserController.getlogin);
    
    user.post('/user/login', CheckController.checkLogin);
    user.post('/user/login', UserController.postlogin);

    //注册页面
    user.get('/user/reg', CheckController.checkLogin);
    user.get('/user/reg', UserController.getreg); 

    user.post('/user/reg', CheckController.checkLogin);
    user.post('/user/reg', UserController.postreg);
    
    //退出
    user.get('/user/logout',  CheckController.checkNotLogin);
    user.get('/user/logout', UserController.getlogout);

    //个人中心
    user.get('/user/perInfo', CheckController.checkNotLogin);
    user.get('/user/perInfo', UserController.getperInfo);

    user.post('/user/perInfo', CheckController.checkNotLogin);
    user.post('/user/perInfo', UserController.postperInfo);

    user.post('/user/userAvatar', CheckController.checkNotLogin);
    user.post('/user/userAvatar', UserController.postuserAvatar);

    //添加想看图书
    user.get('/user/wish', CheckController.checkNotLogin);
    user.get('/user/wish', UserController.getwish);

    //添加看过图书
    user.get('/user/readed', CheckController.checkNotLogin);
    user.get('/user/readed', UserController.getread);

    //添加在看图书
    user.get('/user/reading', CheckController.checkNotLogin);
    user.get('/user/reading', UserController.getreading);

    //删除想看图书
    user.get('/user/pullwish', CheckController.checkNotLogin);
    user.get('/user/pullwish', UserController.getpullwish);
    
    //我想读的书
/*    user.get('/user/mywish', CheckController.checkNotLogin);
    user.get('/user/mywish', UserController.getmywish);*/

    //读取用户头像
    /*user.get('/images/avatar/:id', CheckController.checkNotLogin);
    user.get('/images/avatar/:id', UserController.getUserAvatarByid);*/

    //用户个人页面
    // user.get('/user/:name', CheckController.checkNotLogin);
    user.get('/user/:name', UserController.getUserInfor);

    // game
    user.get('/game/movie',UserController.getGameMovie);
module.exports = user;