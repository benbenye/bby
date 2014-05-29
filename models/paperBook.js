//var mongodb = require('./db');

var mongoose = require('mongoose'),
    fs = require('fs');

var paperbookSchema = mongoose.Schema;
var ObjectId = paperbookSchema.ObjectId;

var paperbookSchema = new paperbookSchema({
  publisher:String,//发布者 ref?
  press:String,//出版社
  name_zh: String,//中文书名
  ISBN:String,//ISBN
  author:String,//作者
  translator:String,//译者
  tags:[],//标签
  authorIntro:String,//作者简介
  contIntro:String,//内容简介
  releaseTime:String,//发布时间
  publisTime:String,//出版时间
  want:Number,//想看人数
  reading:Number,//正在读的人数
  readed:Number,//读过的人数
  pages:Number,//页数
  price:Number,//定价
  layout:String,//装帧
  cover:{ data: Buffer, contentType: String }//封皮
},{
    collection:'paperbooks'
});

var paperbookModel = mongoose.model('PaperBook', paperbookSchema);// all environments
function PaperBook(paperBook) {
    this.publisher = paperBook.publisher;
    this.press = paperBook.press;
	this.name_zh = paperBook.name_zh;
    this.ISBN = paperBook.ISBN;
	this.author = paperBook.author;
    this.translator = paperBook.translator;
    this.tags = paperBook.tags;
    this.authorIntro = paperBook.authorIntro;
    this.contIntro = paperBook.contIntro;
    this.releaseTime = paperBook.releaseTime;
    this.publisTime = paperBook.publisTime;
    this.want = paperBook.want;
    this.reading = paperBook.reading;
    this.readed = paperBook.readed;
    this.pages = paperBook.pages;
    this.price = paperBook.price;
    this.layout = paperBook.layout;
};//paperBook 构造函数，对新创建的对象进行初始化 


////存储一篇文章及其相关信息
PaperBook.prototype.save = function(callback) {
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
	var pagerBook = {
        ,publisher:this.publisher
        ,userId:this.userId
		,name_zh : this.name_zh
		,time : time
        ,tags:this.tags
        ,intro:this.intro
        ,want:0
        ,reading:0
        ,readed:0
        ,bookContent:temp
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