/**
 * Created by dongyin on 8/22/15.
 */
var connection = require('../../config/mysql');
exports.getAdmin = function(req,res,next){
    call(connection,'select * from p_admin', req,res,next);
};

exports.getConfig = function(req,res,next){
    call(connection,'select * from p_config', req,res,next);
};

exports.getAllBase = function(req,res,next){
    console.log('getAllBase');
    call(connection,'select * from p_newsbase LIMIT 0 , 10',req,res,next);
};

exports.getBase = function(req,res,next){
    var id = req.params.id;
    call(connection,'select * from p_newsbase where cid = '+id,req,res,next);
};

exports.getClass = function(req,res,next){
    call(connection,'select * from p_newsclass',req,res,next);
};

exports.getContent = function(req,res,next){
    call(connection,'select * from p_newscontent',req,res,next);
};

function call(connection,query,req,res,next){
    connection.query(query,function(err,rows){
        console.log(rows);
        res.json(rows);
    });
}