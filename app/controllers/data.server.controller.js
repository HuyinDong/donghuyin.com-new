/**
 * Created by dongyin on 8/22/15.
 */
var connection = require('../../config/mysql');
var mysql = require('mysql');
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

exports.select = function(req,res,next){
    var sql = 'select * from ?? where ?? = ?';
    var inserts = ["p_"+req.params["table"],req.params["key"],req.params["val"]];
    sql = mysql.format(sql,inserts);
    call(connection,sql,req,res,next);
};

exports.insert = function(req,res,next){
    var table = 'p_'+req.body.table;
    var sql = 'insert into '+table+' set ?';
    var obj = req.body.obj;
    connection.query(sql,obj,function(err,result){

    });
};

exports.update = function(req,res,next){
    var table = 'p_'+req.params.table;
    var sql = 'update '+table+' set ';
    var newData = req.body;
    Object.keys(newData).forEach(function(key) {
        sql+=key + " = '"+ newData[key]+"' ";
    });
    sql+="where id = "+req.params.id;
    console.log(sql);
    connection.query(sql,function(err,rows){
       console.log(rows);
    });
}

exports.delete = function(req,res,next){
    var table = 'p_'+req.params.table;
    var arr = [];
    arr.push(parseInt(req.params.id));
    var sql = 'delete from '+table+' where id = ?';
    console.log("delete",sql);
    connection.query(sql,arr,function(err,result){
        console.log(result);
    });
}

function call(connection,query,req,res,next){
    connection.query(query,function(err,rows){
        console.log(rows);
        res.json(rows);
    });
}