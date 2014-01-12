/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes/index'),
    //user = require('./routes/user'),
    http = require('http'),
    path = require('path'),
    mongodb = require('mongodb'),
    MongoStore = require('connect-mongo')(express),
    //settings = require('./settings'),
    flash = require('connect-flash');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));//设置views文件夹为存放试图文件的目录，_dirname为全局变量，存储当前正在执行的脚本所在的目录
app.set('view engine', 'jade');
app.use(flash());
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({
    secret:'bby',//防止篡改cookies
    //key:settings.db,
    cookie :{maxAge:1000*60*6024*30},
    store:new MongoStore({
        db:'session',//把会话存储到数据库中避免丢失
        url:'mongodb://127.0.0.1:27017/session'
    })
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/*app.get('/', routes.index);
app.get('/users', user.list);*/
routes(app);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
