//var mongodb = require('./db');

var mongoose = require('mongoose');
if (mongoose.readyState === 0 || mongoose.readyState === undefined) {
    mongoose.connect('mongodb://localhost/bby', function(err){
        if(!err){
            console.log('connected to mongoDB');
        }else{
            throw err;
        }
    });
}

var userSchema = mongoose.Schema;
var ObjectId = userSchema.ObjectId;
//将唯一标识改为ID，之前是用name做唯一标识
var userSchema = new userSchema({
  // userId : {type:String,ref:'BookComment'},
  bookId : [{type:String,ref:'Book'}],//我上传的书
  name : String,//用户名，唯一标识
  password : String,
  email : String,
  sex : String,
  wish :[{
      id:ObjectId,
      schedule:0
      }]
},{
    collection:'users'
});

var userModel = mongoose.model('User', userSchema);// all environments
function User(user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
    this.sex = user.sex;
    this.wish = user.wish;
};//User 构造函数，对新创建的对象进行初始化 

//module.exports = User;

//存储用户信息
User.prototype.save = function(callback){

	//要存入数据库的用户文档
	var user = {
		name : this.name,
		password : this.password,
		email : this.email,
        wish : this.wish
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
    userModel.findOne({name:name})
    // .populate('userId')
    .populate('bookId')
    .exec(function(err, user){
        if(err){
            return callback(err);
        }
        console.log(user);
        callback(null, user);
    });
};
//修改用户个人信息
User.edit = function(name, perInfo, callback){
    userModel.update({name:name},{$set:{email:perInfo.email,sex:perInfo.sex}},function(err, perInfo){
        if(err){
            return callback(err);
        }
        callback(null, perInfo);
    });
};
//添加用户想看书的信息
User.pushwish = function(name, bookId, callback){
    userModel.update({name : name}, {$addToSet:{'wish':bookId}}, function(err, numeffect){
        if(err){
            return callback(err)
        }
        callback(null, numeffect);
    });
};

//取消用户想看书的信息
User.pullwish = function(name, bookId, callback){
    userModel.update({name : name}, {$pull:{'wish.id':bookId}}, function(err, numeffect){
        if(err){
            return callback(err)
        }
        callback(null, numeffect);
    });
};

//用户上传新书的时候追加新书ID
User.insertBookId = function(name, bookId, callback){
    userModel.update({name:name}, {$addToSet:{'bookId':bookId}},function(err, numeffect){
        if(err){
            return callback(err);
        }
        callback(null, numeffect);
    });
};
module.exports = User;