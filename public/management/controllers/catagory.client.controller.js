/**
 * Created by dongyin on 8/27/15.
 */
management.controller('catagoryController',
    [
        '$scope',
        '$http',
        '$rootScope',
        'ManagementAPI',
        function($scope,$http,$rootScope,ManagementAPI) {
            $scope.selectOne = function() {
               ManagementAPI.selectOne("newsbase",4, function(data){
                  console.log(data);
               });

               };
}]);