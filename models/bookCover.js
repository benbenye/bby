var mongoose = require('mongoose');

var bookCoverSchema = mongoose.Schema;
var ObjectId = bookCoverSchema.ObjectId();

var bookCoverSchema = new bookCoverSchema({
  cover:{ data: Buffer, contentType: String }
},{
    collection:'bookCover'
});

var bookCoverModel = mongoose.model('BookCover', bookCoverSchema);// all environments
function BookCover(bookCover) {
    this.cover = bookCover.cover;
};//Book 构造函数，对新创建的对象进行初始化 


////存储一篇文章及其相关信息
BookCover.prototype.save = function(callback) {
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
	var bookCover = {
        cover:this.cover
	};
    var newBookCover = new bookCoverModel(bookCover);
	
    newBookCover.save(function(err, bookCover){
        if(err){
            return callback(err);
        }
        callback(null, bookCover);
    });
};

//读取一篇文章封面
BookCover.getOne = function(id, callback){
	bookCoverModel.findOne({_id:id},function(err,bookCover){
        if(err){
            return callback(err);
        }
        callback(null, bookCover);
    });
};

//修改一篇文章封面
BookCover.edit = function(id, bookCover, callback){
    bookCoverModel.update({_id:id},{$set:{cover:bookCover}},{upsert:true},function(err, numeffect){
        if(err){
            return callback(err);
        }
        callback(null, numeffect);
    });
};
module.exports = BookCover;