/**
 * Created by dongyin on 8/29/15.
 */
management.factory('ManagementAPI',['ManagementResource','$q',
    function(ManagementResource,$q) {
        return {
                selectOne: function (table, id,callback) {
                    ManagementResource.query({table: table, id: id}, function (result) {
                        console.log("reslut", result);
                       callback(result);

                    });

                },

                selectAll: function (table) {
                    ManagementResource.query({table: table}, function (result) {
                        return result;
                    });
                },

                update: function (table, id, object) {
                    var result = ManagementResource.query({table: table, id: id}, function (result) {
                        console.log("update", result);
                        ManagementResource.update({table: table, id: id}, result[0], function (data) {
                            return data;
                        });
                    });

                },

                insert: function (table, object) {
                    var entry = new ManagementResource();
                    ManagementResource.save({table: table}, entry, function () {
                        return "success"
                    });
                },

                delete: function (table, id) {
                    ManagementResource.remove({table: table, id: id});
                    return "success";
                }
                // $http method
                /*  $http.post('/management/data', tran).then(function (data) {
                 console.log(data);
                 });
                 */
                /*
                 $http.delete('/management/data/'+tran.table+'/'+'9',function(data){
                 console.log(data);
                 });

                 $http.put('/management/data/'+tran.table+'/'+'4',{author : 'Huyin Dong'},function(data){
                 console.log(data);
                 })

                 console.log("User");
                 var user = ManagementResource.get({table: table , id : id}, function (u) {
                 console.log("User",u);
                 u.$save();
                 });*/
    };
    }]);