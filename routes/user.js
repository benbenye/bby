
/*
 * GET users listing.
 */
var crypto = require('crypto'),//crypto ��node��һ������ģ�飬����ʹ��������ɢ��ֵ��������
    User = require('../models/user.js');

module.exports = function(app){

    app.get('/',function(req, res){
        res.render('index',{
            title:'��ҳ',
            user:req.session.user,
            success:req.flash('success').toString(),
            success_reg:req.flash('success_reg').toString(),
            success_log:req.flash('success_log').toString(),
            success_perInfo:req.flash('success_perInfo').toString(),
            error:req.flash('error').toString()
        });
    });

    //��¼ҳ��
    app.get('/user/login',checkLogin);
    app.get('/user/login', function(req, res){
        res.render('user/login',{
            title:'��¼',
            error:req.flash('error').toString()
        });
    });
    
    app.get('/user/login',checkLogin);
    app.post('/user/login',function(req, res){
        
        var password = crypto.createHash('md5').update(req.body.password).digest('hex');
       
        User.get(req.body.name,function(err,user){
            if(err){
                return callback(err);
            }
            if(user == null){
                req.flash('error','�û�������');
                return res.redirect('/user/login');
            } else if( user.password != password){
                req.flash('error','�������');
                return res.redirect('/user/login');
            }           
            req.session.user = user;
            req.flash('success_log','��¼�ɹ�');
            res.redirect('/');
        });
    });

    //ע��ҳ��
    app.get('/user/reg',checkLogin);
    app.get('/user/reg',function(req, res){
        res.render('user/reg',{
            title:'ע��',
            success:req.flash('success_reg').toString(),
            user:req.session.user
        });
    }); 

    app.post('/user/reg',checkLogin);
    app.post('/user/reg',function(req, res){
       var password = req.body.password,
           password_re = req.body.password_re;
       if(password != password_re){
           req.flash('error','�������벻һ��');
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
                req.flash('error','�û��Ѿ�����');
                return res.redirect('/user/reg');
            }
            newUser.save(function(err,user){
                if(err){
                    req.flash('error',err);
                    return res.redirect('/user/reg');
                }
                req.session.user = user;
                req.flash('success_reg','ע��ɹ�');
                res.redirect('/');
            });
        });
    });
    
    //�˳�
    app.get('/user/logout', checkNotLogin);
    app.get('/user/logout', function (req, res) {
    req.session.user = null;
    req.flash('success', '�ǳ��ɹ�!');
    res.redirect('/');//�ǳ��ɹ�����ת����ҳ
  });

    //��������
    app.get('/user/perInfo',checkNotLogin);
    app.get('/user/perInfo',function(req, res){
        User.get(req.session.user.name,function(err, user){
            if(err){
                res.flash();
                return callback(err);
            }
            res.render('user/perInfo',{
                title:'��������',
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
        User.edit(newperInfo.name, newperInfo, function(err, perInfo){
            if(err){
                req.flash('error', 'qq'+ err.toString() + ',,' + err.message);
                return res.redirect('/user/perInfo');
            }
            req.session.user = newperInfo;
            req.flash('succes', '�޸ĳɹ�');
            res.redirect('/');

        });
    });

    //�鼮ҳ��
    app.get('/books/books',function(req, res){
        res.render('books/books',{
            title:'�鼮ҳ��'
        });
    });

    //�ϴ��鼮
    app.get('/books/upbooks',checkNotLogin);
    app.get('/books/upbooks',function(req, res){
        res.render('books/upbooks',{
            title:'�ϴ��鼮'
        });
    });

    //������
    function checkNotLogin(req, res, next){
        if(!req.session.user){
            req.flash('error','����δ��¼');
            return res.redirect('back');
        }
        next();
    }
    function checkLogin(req, res, next){
        if(req.session.user){
            req.flash('error','���Ѿ���¼��');
            return res.redirect('back');
            //res.redirect('back');
        }
        next();
    }
};