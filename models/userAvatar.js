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
};//UserAvatar 构造函数，对新创建的对象进行初始化 


////存储一篇文章及其相关信息
UserAvatar.prototype.save = function(callback) {
	
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

//读取
UserAvatar.getOne = function(id, callback){
	userAvatarModel.findOne({_id:id},function(err,userAvatar){
        if(err){
            return callback(err);
        }
        callback(null, userAvatar);
    });
};

//修改头像
UserAvatar.edit = function(id, userAvatar, callback){
    userAvatarModel.update({_id:id},{$set:{avatar:userAvatar}},{upsert:true},function(err, numeffect){
        if(err){
            return callback(err);
        }
        callback(null, numeffect);
    });
};
module.exports = UserAvatar;