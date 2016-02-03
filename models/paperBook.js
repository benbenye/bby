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
  publisTime:{},//出版时间
  want:Number,//想看人数
  reading:Number,//正在读的人数
  readed:Number,//读过的人数
  pages:Number,//页数
  price:Number,//定价
  layout:String,//装帧
  cover:{ data: Buffer, contentType: String },//封皮
  imgSrc:String
},{
    collection:'paperbooks'
});

var paperbookModel = mongoose.model('PaperBook', paperbookSchema);// all environments
function PaperBook(paperBook) {
    this.publisher = paperBook.publisher;
    this.press = paperBook.press;//出版社
    this.name_zh = paperBook.name_zh;//书名
    this.ISBN = paperBook.ISBN;
    this.author = paperBook.author;//作者
    this.translator = paperBook.translator;//译者
    this.tags = paperBook.tags;//标签
    this.authorIntro = paperBook.authorIntro;//作者简介
    this.contIntro = paperBook.contIntro;//内容简介
    this.releaseTime = paperBook.releaseTime;//出版时间
    this.publisTime = {};//发布时间
    this.want = 0;//想读人数
    this.reading = 0;//在读人数
    this.readed = 0;//渡过人数
    this.pages = paperBook.pages;//页数
    this.price = paperBook.price;//定价
    this.layout = paperBook.layout;//装帧
    this.cover = paperBook.cover;//封皮
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
        publisher:this.publisher,
        press: this.press,
        name_zh: this.name_zh,
        ISBN: this.ISBN,
        author: this.author,
        translator: this.translator,
        tags: this.tags,
        authorIntro: this.authorIntro,
        contIntro: this.contIntro,
        releaseTime: this.releaseTime,
        publisTime: time,
        want: this.want,
        reading: this.reading,
        readed: this.readed,
        pages: this.pages,
        price: this.price,
        layout: this.layout,
        cover: this.cover
	};
    var newpaperBook = new paperbookModel(pagerBook);
    newpaperBook.save(function(err, paperBook){
        if(err){
            return callback(err);
        }
        callback(null, paperBook);
    });
};
//读取纸质书信息
PaperBook.getAllList = function(callback){
	paperbookModel.find()
    .limit(10)
    .exec(function(err,paperBook){
        if(err){
            return callback(err);
        }
        paperBook.forEach(function(o){
         o.imgSrc = o.cover.data.toString('base64');
       });
        callback(null, paperBook);//paperbook数组
    });
};


//读取纸质书详细信息
PaperBook.getOne = function(id, callback){
	paperbookModel.findOne({_id : id})
    .exec(function(err, paperBook){
        if(err){
            return callback(err);
        }
        callback(null, paperBook);
    });
};

//修改图书信息
PaperBook.edit = function(id, book, callback){
    paperbookModel.update({_id:id},{$set:{name_zh:book.name_zh,tags:book.tags.split(','),intro:book.intro}},function(err, numeffect){
        if(err){
            return callback(err);
        }
        callback(null, numeffect);
    });
};
//删除图书
PaperBook.remove = function(id, callback){
    paperbookModel.findByIdAndRemove(id, function(err){
        if(err){
            return callback(err);
        }
        callback(null);
    });
};

module.exports = PaperBook;