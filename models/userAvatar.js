var mongoose = require('mongoose');

var userAvatarSchema = mongoose.Schema;
var ObjectId = userAvatarSchema.ObjectId();

var userAvatarSchema = new userAvatarSchema({
  avatar:{ data: Buffer, contentType: String }
},{
    collection:'userAvatar'
});

var userAvatarModel = mongoose.model('UserAvatar', userAvatarSchema);// all environments
function UserAvatar(userAvatar) {
    this.avatar = userAvatar.avatar;
};//Book 构造函数，对新创建的对象进行初始化 


////存储一篇文章及其相关信息
UserAvatar.prototype.save = function(callback) {
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
	var userAvatar = {
        avatar:this.avatar
	};
    var newUserAvatar = new userAvatarModel(userAvatar);
	
    newUserAvatar.save(function(err, userAvatar){
        if(err){
            return callback(err);
        }
        callback(null, userAvatar);
    });
};

//读取一篇文章封面
UserAvatar.getOne = function(id, callback){
	userAvatarModel.findOne({_id:id},function(err,userAvatar){
        if(err){
            return callback(err);
        }
        callback(null, UserAvatar);
    });
};

//修改一篇文章封面
UserAvatar.edit = function(id, userAvatar, callback){
    userAvatarModel.update({_id:id},{$set:{avatar:userAvatar}},{upsert:true},function(err, numeffect){
        if(err){
            return callback(err);
        }
        callback(null, numeffect);
    });
};
module.exports = UserAvatar;