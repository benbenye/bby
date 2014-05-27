
/*
 * GET users listing.
 */
var UserController = require('../controllers/userController.js'),
    CheckController = require('../controllers/checkController.js');

module.exports = function(app){

    //登录页面
    app.get('/user/login', CheckController.checkLogin);
    app.get('/user/login', UserController.getlogin);
    
    app.post('/user/login', CheckController.checkLogin);
    app.post('/user/login', UserController.postlogin);

    //注册页面
    app.get('/user/reg', CheckController.checkLogin);
    app.get('/user/reg', UserController.getreg); 

    app.post('/user/reg', CheckController.checkLogin);
    app.post('/user/reg', UserController.postreg);
    
    //退出
    app.get('/user/logout',  CheckController.checkNotLogin);
    app.get('/user/logout', UserController.getlogout);

    //个人中心
    app.get('/user/perInfo', CheckController.checkNotLogin);
    app.get('/user/perInfo', UserController.getperInfo);

    app.post('/user/perInfo', CheckController.checkNotLogin);
    app.post('/user/perInfo', UserController.postperInfo);

    app.post('/user/userAvatar', CheckController.checkNotLogin);
    app.post('/user/userAvatar', UserController.postuserAvatar);

    //添加想看图书
    app.get('/user/wish', CheckController.checkNotLogin);
    app.get('/user/wish', UserController.getwish);

    //添加看过图书
    app.get('/user/readed', CheckController.checkNotLogin);
    app.get('/user/readed', UserController.getread);

    //添加在看图书
    app.get('/user/reading', CheckController.checkNotLogin);
    app.get('/user/reading', UserController.getreading);

    //删除想看图书
    app.get('/user/pullwish', CheckController.checkNotLogin);
    app.get('/user/pullwish', UserController.getpullwish);
    
    //我想读的书
    app.get('/user/mywish', CheckController.checkNotLogin);
    app.get('/user/mywish', UserController.getmywish);

    //读取用户头像
    /*app.get('/images/avatar/:id', CheckController.checkNotLogin);
    app.get('/images/avatar/:id', UserController.getUserAvatarByid);*/

    //用户个人页面
    app.get('/user/:name', CheckController.checkNotLogin);
    app.get('/user/:name', UserController.getUserInfor);
};  