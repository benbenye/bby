var express = require('express'),
	session = require('express-session'),
	connect = require('connect'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	cookieParser = require('cookie-parser'),
	http = require('http'),
	path = require('path'),
	favicon = require('serve-favicon'),
	MongoStore = require('connect-mongo')(session),
	flash = require('connect-flash'),
	errorhandler = require('errorhandler'),
	book = require('./routers/book'),
	comment = require('./routers/comment'),
	user = require('./routers/user'),
	notFound = require('./routers/404');

var app = express();

app.set('port', process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
app.set('views', path.join(__dirname, 'views'));//设置views文件夹为存放试图文件的目录，_dirname为全局变量，存储当前正在执行的脚本所在的目录
app.set('view engine', 'jade');

app.use(flash());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(multer()); 
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
app.use(session({
	secret:'bby',//防止篡改cookies
	//key:settings.db,
	cookie :{maxAge:1000*60*6024*30},
	store:new MongoStore({
		db:'session',//把会话存储到数据库中避免丢失
		url:'mongodb://127.0.0.1/sessoin'
	})
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(book);
app.use(comment);
app.use(user);
app.use(notFound);

// development only
if ('development' == app.get('env')) {
  app.use(errorhandler());
}
http.createServer(app).listen(app.get('port'), host, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
