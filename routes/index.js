
/*
 * GET home page.
 */
var userRoute = require('./user.js');

module.exports = function(app){
    userRoute(app);    
};