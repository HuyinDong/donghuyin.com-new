/**
 * Created by dongyin on 9/5/15.
 */
introduction.controller("introductionController",function($scope,ManagementAPI){
    ManagementAPI.selectOne("config",1,function(data){
        $scope.me = data[0];
    })
});