var User = require('../models/user.js');

function GetPerInfo (name, cb) {
	User.get(name, function(err, user){
	    //获取个人信息
	    if(err){
	        return console.log(err.message);
	    }
	    console.log(user);
	    //图片二进制转换
	    
		if(user.avatar.data == undefined) { 
            user.avatar.dataNull = null;
        }else{
           user.avatar.dataStr =  user.avatar.data.toString('base64');
        }
	    //return user;
	    cb(user);
	});
}
module.exports = GetPerInfo;