
/*
 * GET users listing.
 */
var User = require('../controllers/userController.js'),
    express = require('express'),
    Check = require('../controllers/checkController.js');
var user = express.Router();

    //登录页面
    user.get('/api/user/login', Check.checkLogin, User.getlogin);
    user.post('/api/user/login', Check.checkLogin, User.postlogin);

    //注册页面
    user.get('/api/user/reg', Check.checkLogin, User.getreg);
    user.post('/api/user/reg', Check.checkLogin, User.postreg);
    
    //退出
    user.get('/api/user/logout', Check.checkNotLogin, User.getlogout);

    //个人中心
    user.get('/api/user/perInfo', Check.checkNotLogin, User.getperInfo);

    user.post('/api/user/perInfo', Check.checkNotLogin, User.postperInfo);

    user.post('/api/user/userAvatar', Check.checkNotLogin, User.postuserAvatar);

    //添加想看图书
    user.get('/api/user/wish', Check.checkNotLogin, User.getwish);

    //添加看过图书
    user.get('/api/user/readed', Check.checkNotLogin, User.getread);

    //添加在看图书
    user.get('/api/user/reading', Check.checkNotLogin, User.getreading);

    //删除想看图书
    user.get('/api/user/pullwish', Check.checkNotLogin, User.getpullwish);
    
    //我想读的书
    // user.get('/api/user/mywish', Check.checkNotLogin, User.getmywish);

    //读取用户头像
    // user.get('/api/images/avatar/:id', Check.checkNotLogin, User.getUserAvatarByid);

    //用户个人页面
    user.get('/api/user/:name', Check.checkNotLogin, User.getUserInfor);

    // game
    user.get('/api/game/movie',User.getGameMovie);
module.exports = user;