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

    app.route('/management/data/:table', require('connect-ensure-login').ensureLoggedIn()).post(data.insert)
        .get(data.selectAll);

    app.route('/management/data/:table/:id', require('connect-ensure-login').ensureLoggedIn()).delete(data.delete)
        .put(data.update)
        .get(data.selectOne);
}