
/*
 * GET comment listing.
 */
var CommentController = require('../controllers/commentController.js'),
		express = require('express'),
    CheckController = require('../controllers/checkController.js');
var comment = express.Router();

	//进入评书页面

	// comment.get('/user/reviewer', CheckController.checkNotLogin);
	comment.get('/user/reviewer', CommentController.getreviewer);

	//查寻书评
	
	//提交评书内容
	comment.get('/book/comment', CheckController.checkNotLogin);
	comment.get('/book/comment', CommentController.getcomments);

	//进入修改评书
	//保存修改过的书评
	//删除书评
module.exports = comment;