var CheckController = new  CheckController();

function CheckController(){
	this.checkNotLogin = function checkNotLogin(req, res, next){
		if(!req.session.user){
			req.flash('error','您还未登录');
			// return res.redirect('back');
			return res.json({
				err:{
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
			req.flash('error','您已经登录了');
			// return res.redirect('back');
			//res.redirect('back');
			return res.json({
				err:{
					text:'您已经登录了',
					field:'isLogin'
				}
			})
		}
		next();
	};
}
module.exports = CheckController;