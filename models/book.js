//var mongodb = require('./db');

var mongoose = require('mongoose'),
    fs = require('fs');

var bookSchema = mongoose.Schema;
var ObjectId = bookSchema.ObjectId;

var bookSchema = new bookSchema({
  _id:ObjectId,
  publisher:String,//发布者
  name_zh: String,//中文书名
  ISBN:String,//ISBN
  author:String,//作者
  tags:[],//标签
  intro:String,//简介
  time:String,//发布时间
  want:Number,//想看人数
  reading:Number,//正在读的人数
  readed:Number,//读过的人数
  bookContent:{type:ObjectId,ref:'BookContent'},
  cover:{ data: Buffer, contentType: String }//封皮
},{
    collection:'books'
});

var bookModel = mongoose.model('Book', bookSchema);// all environments
function Book(book) {
    this.publisher = book.publisher;
    this.userId = book.userId;
	this.name_zh = book.name_zh;
	this.author = book.author;
    this.tags = book.tags;
    this.intro = book.intro;
    this.time = book.time;//添加一个用户ID
    this.cover = book.cover;
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
    var temp = new mongoose.Types.ObjectId();
	var book = {
        _id:temp,
        publisher:this.publisher,
        userId:this.userId,
		name_zh : this.name_zh,
		time : time,
        tags:this.tags,
        intro:this.intro,
        want:0,
        reading:0,
        readed:0,
        bookContent:temp,
        cover:this.cover
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
Book.getAllList = function(callback){
	bookModel.find()
    .populate('bookContent')
    .exec(function(err,book){
        if(err){
            return callback(err);
        }
        console.log(book);
        callback(null, book);//book数组
    });
};
//读取文章及其相关信息
Book.getList = function(name, callback){
	bookModel.find({publisher:name},function(err,book){
        if(err){
            return callback(err);
        }
        callback(null, book);//book数组
    });
};
//读取我想看的书
Book.getMywish= function(mywishBook, callback){
	bookModel.find({_id:{$in:mywishBook}},function(err,book){
        if(err){
            return callback(err);
        }
        callback(null, book);//book数组
    });
};
//读取文章及其相关信息
Book.getOne = function(id, callback){
	bookModel.findOne({_id:id})
    .populate('bookContent')
    .exec(function(err,book){
        if(err){
            return callback(err);
        }
        callback(null, book);
    });
};
// 修改图书封面
Book.editCover = function(id, cover, callback){
	bookModel.findOne({_id:id}, { $set : { cover : cover }}, function(err, numeffect){
        if(err){
            return callback(err);
        }
        callback(null, numeffect);
    });
};
//修改图书描述
Book.edit = function(id, book, callback){
    bookModel.update({_id:id},{$set:{name_zh:book.name_zh,tags:book.tags.split(','),intro:book.intro}},function(err, numeffect){
        if(err){
            return callback(err);
        }
        callback(null, numeffect);
    });
};
//清空书籍内容
Book.remove = function(id, callback){
    bookModel.findByIdAndRemove(id, function(err){
        if(err){
            return callback(err);
        }
        callback(null);
    });
};

module.exports = Book;