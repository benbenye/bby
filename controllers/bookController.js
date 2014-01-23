//var BookController;
function BookController(){
    this.getmybook = function(req, res){        
                        res.render('book/book',{
                            title:'书籍页面',
                            user:req.session.user,
                            success:req.flash('success').toString()
                        });
                    }
                }
module.exports = BookController;