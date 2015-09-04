/**
 * Created by dongyin on 8/26/15.
 */
management.controller('configurationController',
    function($scope,$http,ManagementAPI,$timeout,$mdDialog,$state){
            var website = {};
            $scope.loading = false;
            $scope.dialogTitle = "Configuration";
            $scope.closeDialog = function(){
                $mdDialog.hide();
                $state.go($state.current, {}, {reload: true});
            };

            $http.get('/data/config').then(function(data){
               var items = data.data;
               website = items[0];
                $scope.website = website;
                console.log(website);
            });

            $scope.editConfig = function(){
                $scope.loading = true;
              $mdDialog.show({
                    templateUrl : './management/templates/dialog.html',
                    scope : $scope
              });
                ManagementAPI.update('config',1,$scope.website,function(data){
                        if(data.msg = 'success'){
                            $timeout(function(){
                                $scope.loading = false;
                                $scope.dialogContent = "Success";
                                $scope.dialogButton = "OK";

                            },2000);
                        }else{
                            $scope.loading = false;
                            $scope.dialogContent = "False";
                            $scope.dialogButton = "OK";
                        }

                });
            };


});