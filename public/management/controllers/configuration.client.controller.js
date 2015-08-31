/**
 * Created by dongyin on 8/26/15.
 */
management.controller('configurationController',
    function($scope,$http,ManagementAPI,$timeout,$mdDialog,$rootScope){
            var website = {};
            $scope.loading = false;
            $scope.dialogTitle = "Configuration";
            $scope.closeDialog = function(){
                $mdDialog.hide();
            };

            $http.get('/data/config').then(function(data){
               var items = data.data;
               website = items[0];
                $scope.website = website;
            });
            $scope.editConfig = function(){
                $scope.loading = true;
              $mdDialog.show({
                    templateUrl : './templates/dialog.html',
                    scope : $scope
              });
                ManagementAPI.update('config',1,$scope.website,function(data){
                        if(data.msg = 'success'){
                            $timeout(function(){
                                $scope.loading = false;
                                console.log( $scope.loading);
                                $scope.dialogContent = "Success";
                                $scope.dialogButton = "OK";
                                console.log($scope.website);
                            },2000);
                        }else{
                            $scope.loading = false;
                            $scope.dialogContent = "False";
                            $scope.dialogButton = "OK";
                        }
                });
            };


});