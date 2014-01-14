//var mongodb = require('./db');

var mongoose = require('mongoose');

var bookSchema = mongoose.Schema;
var ObjectId = bookSchema.ObjectId;

var bookSchema = new bookSchema({
  publisher:String,
  name_zh: String,
  ISBN:String,
  author:String,
  tags:[]
},{
    collection:'books'
});

var bookModel = mongoose.model('Book', bookSchema);// all environments
function Book(book) {
    this.publisher = book.publisher;
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
        publisher:this.publisher,
		name_zh : this.name_zh,
		time : time,
        tags:this.tags
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
//读取文章及其相关信息
Book.get = function(name, callback){
	bookModel.find({publisher:name},function(err,book){
        if(err){
            return callback(err);
        }
        callback(null, book);
    });
};
module.exports = Book;