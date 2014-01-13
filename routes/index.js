
/*
 * GET home page.
 */
var userRoute = require('./user.js');
var bookRoute = require('./book.js');

module.exports = function(app){
    userRoute(app);    
    bookRoute(app);    
};