var mongoose = require('mongoose');

var bookCommentSchema = mongoose.Schema;
var ObjectId = bookCommentSchema.ObjectId();

var bookCommentSchema = new bookCommentSchema({
  userId:String,
  bookId:String,
  comment:[{
    title:String,
    content:String
    }]
},{
    collection:'bookComment'
});

var bookCommentModel = mongoose.model('BookComment', bookCommentSchema);// all environments
function BookComment(bookComment) {
    this.userId = bookComment.userId;
    this.bookId = bookComment.bookId;
    this.comment = bookComment.comment;
};//Book 构造函数，对新创建的对象进行初始化 


////存储一篇文章及其相关信息
BookComment.prototype.save = function(callback) {
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
	var bookComment = {
        userId:this.userId,
        bookId:this.bookId,
        comment:this.comment
	};
    var newbookComment = new bookCommentModel(bookComment);
	
    newbookComment.save(function(err, bookComment){
        if(err){
            return callback(err);
        }
        callback(null, bookComment);
    });
};
//目前书评都是一级书评

//读取一篇文章下所有的用户书评
BookComment.getComment = function(bookId, callback){
	bookCommentModel.find({bookId:bookId},function(err,bookComment){
        if(err){
            return callback(err);
        }
        callback(null, bookComment);
    });
};

//修改一篇文章某个用户的书评
BookComment.edit = function(id, bookComment, callback){
    bookCommentModel.update({_id:id},{$set:{comment:bookComment}},{upsert:true},function(err, numeffect){
        if(err){
            return callback(err);
        }
        callback(null, numeffect);
    });
};
module.exports = BookComment;