//var mongodb = require('./db');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bby', function(err){
if(!err){
    console.log('connected to mongoDB');
}else{
    throw err;
}
});
var userSchema = mongoose.Schema;
var ObjectId = userSchema.ObjectId;

var userSchema = new userSchema({
  name: String,
  password:String,
  email:String,
  sex:String
},{
    collection:'users'
});

var userModel = mongoose.model('User', userSchema);// all environments
function User(user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
    this.sex = user.sex;
};//User 构造函数，对新创建的对象进行初始化 

//module.exports = User;

//存储用户信息
User.prototype.save = function(callback){

	//要存入数据库的用户文档
	var user = {
		name : this.name,
		password : this.password,
		email : this.email
	};

    var newUser = new userModel(user);
    newUser.save(function(err, user){
        if(err){
            return callback(err);
        }
        callback(null, user);
    });
};

//读取用户信息
User.get = function(name,callback){
    userModel.findOne({name:name},function(err, user){
        if(err){
            return callback(err);
        }
        callback(null, user);
    });
};
//修改信息
User.edit = function(name, perInfo, callback){
    userModel.update({name:name},{email:perInfo.email,sex:perInfo.sex},function(err, perInfo){
        if(err){
            return callback(err);
        }
        console.log(perInfo.sex);
        callback(null, perInfo);
    });
};
module.exports = User;