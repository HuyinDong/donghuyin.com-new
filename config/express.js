var express = require('express');
var bodyParser = require('body-parser');
var index = require('../app/routes/index.server.router');
var data = require('../app/routes/data.server.router');
module.exports = function(){
    var app = express();

    app.use(bodyParser.urlencoded({extended : true}));

    app.use(bodyParser.json());

    app.set('views','./app/views');

    app.set('view engine', 'ejs');

    app.use(express.static('./public'));

    index(app);
    data(app);


    return app;

}