
/*
 * GET comment listing.
 */
var CommentController = require('../controllers/commentController.js'),
    CheckController = require('../controllers/checkController.js');

module.exports = function(app){
	//进入评书页面

	// app.get('/book/comment', CheckController.checkNotLogin);
	//app.get('/book/comment', CommentController.getcomments);

	//查寻书评
	
	//提交评书内容
	app.get('/book/comment', CheckController.checkNotLogin);
	app.get('/book/comment', CommentController.getcomments);

	//进入修改评书
	//保存修改过的书评
	//删除书评
};