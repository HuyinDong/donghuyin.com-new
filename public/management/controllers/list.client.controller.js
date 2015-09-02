/**
 * Created by dongyin on 8/27/15.
 */
management.controller('listController',
    function($scope,$http,$rootScope,uiGridConstants,$state,ManagementAPI,$timeout,$mdDialog){
    var transferredId;


        $scope.loading = false;
        $scope.dialogTitle = "Delete";
        $scope.closeDialog = function(){
            $mdDialog.hide();
            $state.go($state.current, {}, {reload: true});
        };

        $scope.gridOptions = {
        enableRowSelection:true,
        enableRowHeaderSelection:false,
        multiSelect : false,
        columnDefs: [
            { name: 'title', },
            { name: 'author' },
            { name: 'date' }
        ],
    };

    $http.get('/data/base').then(function(data){
        var items = data.data;
        $scope.gridOptions.data = items;
    });

    $scope.gridOptions.onRegisterApi = function(gridApi){
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope,function(row){
            transferredId = row.entity.id;
        });
    };


    $scope.editLine = function(){
        $state.go('edit',{transferredId : transferredId});
    }

    $scope.deleteLine = function(){
        $scope.loading = true;
        $mdDialog.show({
            templateUrl : './templates/dialog.html',
            scope : $scope
        });
        ManagementAPI.delete('newsbase',transferredId,function(data){
            if(data.msg = 'success') {
                ManagementAPI.delete('newsbase', transferredId, function (data) {
                    if (data.msg = 'success') {
                        $timeout(function () {
                            $scope.loading = false;
                            $scope.dialogContent = "Success";
                            $scope.dialogButton = "OK";
                        }, 2000);
                    } else {
                        $scope.loading = false;
                        $scope.dialogContent = "False";
                        $scope.dialogButton = "OK";
                    }

                });
            }else{
                $scope.loading = false;
                $scope.dialogContent = "False";
                $scope.dialogButton = "OK";
            }
            });
    }
});