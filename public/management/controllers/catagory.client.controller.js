/**
 * Created by dongyin on 8/27/15.
 */
management.controller('catagoryController',function($scope,$http,$rootScope) {
    var tran = {};
    tran.table = "newsbase";
    tran.obj = {
        cid : 30,
        title : 'test',
        author : 'Chris',

        abstract : 'test'
    };
    $scope.insert = function(){
        $http.post('/management/data', tran).then(function (data) {
            console.log(data);
        });
    }
});