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
    flash = require('connect-flash'),
    io = require('socket.io')(http);

var app = express();

// app.set('port', process.env.VMC_APP_PORT || 3000);
var port = (process.env.VMC_APP_PORT || 3000);
var host = (process.env.VCAP_APP_HOST || 'localhost');
app.set('views', path.join(__dirname, 'views'));//设置views文件夹为存放试图文件的目录，_dirname为全局变量，存储当前正在执行的脚本所在的目录
app.set('view engine', 'jade');

app.use(flash());
app.use(express.bodyParser());
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
        url:'mongodb://'+MOPAAS_MONGODB26404_USERNAME+':'+MOPAAS_MONGODB26404_PASSWORD+'@'+MOPAAS_MONGODB26404_HOST+':'+MOPAAS_MONGODB26404_PORT+'/sessoin'
    })
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
/*app.get('/', routes.index);
app.get('/users', user.list);*/
routes(app);
http.createServer(app).listen(app.get('port'), host, function(){
  console.log('Express server listening on port ' + app.get('port'));
});
io.on('connected', function(socket){
  console.log('a user connected');
});
