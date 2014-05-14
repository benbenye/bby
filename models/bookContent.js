//var mongodb = require('./db');

var mongoose = require('mongoose');

var bookContentSchema = mongoose.Schema;
var ObjectId = bookContentSchema.ObjectId();

var bookContentSchema = new bookContentSchema({
    _id:mongoose.Schema.ObjectId,
    _time:String,
    contents:[{
        page:Number,
        content:String
     }]
},{
    collection:'bookContents'
});

var bookContentModel = mongoose.model('BookContent', bookContentSchema);// all environments
function BookContent(bookContent) {
    //this.publisher = bookContent.publisher
    //this.name_zh = bookContent.name_zh;
    this.contents = bookContent.contents;
    this._id = bookContent._id;
    this._time = bookContent.time;
};//Book 构造函数，对新创建的对象进行初始化 


////存储一篇文章及其相关信息
BookContent.prototype.save = function(callback) {
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
	var bookContent = {
              _id : this._id
        ,contents : this.contents
		    ,_time : time
	};
    var newBookContent = new bookContentModel(bookContent);
	
    newBookContent.save(function(err, bookContents){
        if(err){
            return callback(err);
        }
        callback(null, bookContents);
    });
};

//追加内容
BookContent.additionContents = function(id, contents, callback){
    bookContentModel.update({_id:id},{$addToSet:{contents:{$each:contents}}},function(err, numeffect){
        if(err){
            return callback(err);
        }
        callback(null, numeffect);
    });
};

//读取一篇文章内容
BookContent.getOne = function(id, callback){
	bookContentModel.findOne({_id:id.toString()},function(err,bookContent){
        if(err){
            return callback(err);
        }
        callback(null, bookContent);
    });
};

//读取一页文章内容
BookContent.getOnePage = function(id, page, callback){
    bookContentModel.findOne({_id:id.toString(),'contents.page':page},function(err,pageContent){
        if(err){
            return callback(err);
        }
        callback(null, pageContent);
    });
};

//修改一页文章的内容
BookContent.editPage = function(id, page, pageContent, callback){
    bookContentModel.update({_id:id, 'contents.page':page},{$set:{'contents.$.content':pageContent}},{upsert:true},function(err, numeffect, raw){
        if(err){
            return callback(err);
        }
        console.log(numeffect);
        callback(null, numeffect,raw);
    });
};

//清空书籍内容
BookContent.remove = function(id, callback){
    bookContentModel.findByIdAndRemove(id, function(err){
        if(err){
            return callback(err);
        }
        callback(null);
    });
};

module.exports = BookContent;