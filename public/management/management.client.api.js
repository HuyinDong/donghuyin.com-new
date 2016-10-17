/**
 * Created by dongyin on 8/29/15.
 */
management.factory('ManagementAPI',['ManagementResource','$q',
    function(ManagementResource) {
        return {
                selectOne: function (table, id,callback) {
                    ManagementResource.query({table: table, id: id}, function (result) {
                       callback(result);
                    });
                },

                selectAll: function (table,callback) {
                    ManagementResource.query({table: table}, function (result) {
                        callback(result);
                    });
                },

                update: function (table, id, object,callback) {
                    ManagementResource.query({table: table, id: id}, function (result) {
                        var keys = Object.keys(object);
                        for(var i = 0 ; i< keys.length;i++){
                            result[0][keys[i]] = object[keys[i]];
                        }
                        ManagementResource.update({table: table, id:id}, result[0], function (data) {
                            callback(data);
                        });
                    });

                },

                insert: function (table, object,callback) {
                    var entry = new ManagementResource();

                    var keys = Object.keys(object);
                    for(var i = 0 ; i< keys.length;i++){
                        entry[keys[i]] = object[keys[i]];
                    }
                    ManagementResource.save({table: table}, entry, function (data) {
                        callback(data);
                    });
                },

                delete: function (table, id,callback) {
                    ManagementResource.remove({table: table, id: id},function(data){
                        callback(data);
                    });

                }
              
    };
    }]);
