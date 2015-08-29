/**
 * Created by dongyin on 8/22/15.
 */
var data = require('../controllers/data.server.controller');
module.exports = function(app){
    app.get('/data/admin',data.getAdmin);
    app.get('/data/config', data.getConfig);
    app.get('/data/base',data.getAllBase);
    app.get('/data/base/:id',data.getBase);
    app.get('/data/class',data.getClass);
    app.get('/data/content',data.getContent);
    app.get('/data/:table/:key/:val',data.select);
    app.post('/management/data',data.insert);
}