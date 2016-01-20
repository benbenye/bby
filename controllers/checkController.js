var CheckController = new  CheckController();

function CheckController(){
	this.checkNotLogin = function checkNotLogin(req, res, next){
		if(!req.session.user){
			// return res.redirect('back');
			return res.json({
				error:{
					text:'您还未登录',
					field:'notLogin'
				}
			})
		}
		next();
	};

	this.checkLogin = function checkLogin(req, res, next){
		console.log(req.session.user)
		if(req.session.user){
			// return res.redirect('back');
			return res.json({
				error:{
					text:'您已经登录了',
					field:'isLogin'
				}
			})
		}
		next();
	};
}
module.exports = CheckController;