var express = require('express');
var app = express();

app.use(express.static(__dirname)); 
app.use('/lib', express.static(__dirname + "/lib")); 

var port = 3005;
var server = app.listen(port);
console.log("Listening on port", port);
