var express = require('express');
var fs = require('fs')
var path = require('path')

var notFound = express.Router();
    notFound.all('*', function(req, res){
        // res.redirect('/')不可行
        res.sendFile(path.join(__dirname,'../public/index.html'))
        // fs.createReadStream('public/index.html').pipe(res)可行
    });
module.exports = notFound;
