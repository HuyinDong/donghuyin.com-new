/**
 * Created by dongyin on 8/27/15.
 */
management.controller('catagoryController',function($scope,$http,$rootScope) {
    var tran = {};
    tran.table = "newsbase";
    tran.obj = {
        cid : 30,
        title : 'test',
        author : 'Huyin Dong',

        abstract : 'test'
    };
    $scope.insert = function(){
      /*  $http.post('/management/data', tran).then(function (data) {
            console.log(data);
        });
        */
        /*
        $http.delete('/management/data/'+tran.table+'/'+'9',function(data){
            console.log(data);
        });
        */
        $http.put('/management/data/'+tran.table+'/'+'4',{author : 'Huyin Dong'},function(data){
            console.log(data);
        })
    }

});