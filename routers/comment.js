
/*
 * GET comment listing.
 */
var Comment = require('../controllers/commentController.js'),
		express = require('express'),
    Check = require('../controllers/checkController.js');
var comment = express.Router();

	//进入评书页面

	comment.get('/api/user/reviewer', Comment.getreviewer);

	//查寻书评
	
	//提交评书内容
	comment.get('/api/book/comment', Check.checkNotLogin, Comment.getcomments);

	//进入修改评书
	//保存修改过的书评
	//删除书评
module.exports = comment;