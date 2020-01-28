var express = require('express');
var app = express();
var myApp = require('./myApp.js')
var router = express.Router();


var port = process.env.PORT || 3000;
app.use(myApp);
app.listen(port, function(){
    console.log('Node is listening on port '+ port + '...')
});
