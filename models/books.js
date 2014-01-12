//var mongodb = require('./db');

var mongoose = require('mongoose');
if (mongoose.readyState === 0) {
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


////存储一篇文章及其相关信息
//Post.prototype.save = function(callback) {
//	var date = new Date();
//	//存储各种时间格式，方便以后扩展
//	var time = {
//		date : date,
//		year : date.getFullYear(),
//		month : date.getFullYear() + '-' + (date.getMonth() + 1),
//		day : date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
//		minute : date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
//	}
//	//要存入数据库的文档
//	var post = {

//		name : this.name,
//		time : time,
//		title : this.title,
//		post : this.post
//	};
//	//打开数据库
//	mongodb.open(function (err, db) {
//		if(err){
//			return callback(err);
//		}
//		//读取posts集合
//		db.collection('posts',function(err,collection){
//			if(err){
//				mongodb.close();
//				return callback(err);
//			}
//			//将文档插入到posts集合
//			collection.insert(post,{
//				safe : true
//			},function(err){
//				mongodb.close();
//				if(err){
//					return callback(err);
//				}
//				callback(null);
//			});
//		});
//	});
//};
////读取文章及其相关信息
//Post.get = function(name, callback){
//	//打开数据库
//	mongodb.open(function(err,db){
//		if(err){
//			return callback(err);
//		}
//		//读取 posts 集合
//		db.collection('posts',function(err, collection){
//			if(err){
//				mongodb.close();
//				return callback(err);
//			}
//			var query = {};
//			if(name){
//				query.name = name;
//			}
//			//根据query 对象查询文章
//			collection.find(query).sort({
//				time : -1
//			}).toArray(function(err,docs){
//				mongodb.close();
//				if(err){
//					return callback(err);
//				}
//				callback(null, docs);//成功！以数组形式返回查询结果
//			});
//		});
//	});
//};