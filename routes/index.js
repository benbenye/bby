
/*
 * GET home page.
 */
var userRoute = require('./user.js');
var bookRoute = require('./book.js');
var commentRoute = require('./comment.js');

module.exports = function(app){
    userRoute(app);  
    commentRoute(app);    
    bookRoute(app);      
};