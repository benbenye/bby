//var mongodb = require('./db');

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema;
var ObjectId = bookSchema.ObjectId;

var bookSchema = new bookSchema({
  name_zh: String,
  ISBN:String,
  author:String,
  tags:[]
},{
    collection:'books'
});

var bookModel = mongoose.model('Book', bookSchema);// all environments
function Book(book) {
	this.name_zh = book.name_zh;
	this.ISBN = book.ISBN;
	this.author = book.author;
    this.tags = book.tags;
};//Book 构造函数，对新创建的对象进行初始化 


////存储一篇文章及其相关信息
Book.prototype.save = function(callback) {
	var date = new Date();
	//存储各种时间格式，方便以后扩展
	var time = {
		date : date,
		year : date.getFullYear(),
		month : date.getFullYear() + '-' + (date.getMonth() + 1),
		day : date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
		minute : date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
	}
	//要存入数据库的文档
	var book = {
		name_zh : this.name_zh,
		time : time
		//ISBN : this.ISBN,
		//author : this.author,
        //tags:this.tags
	};
    var newBook = new bookModel(book);
	
    newBook.save(function(err, book){
        if(err){
            return callback(err);
        }
        callback(null, book);
    });
};
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
module.exports = Book;