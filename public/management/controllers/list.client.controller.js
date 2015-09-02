/**
 * Created by dongyin on 8/27/15.
 */
management.controller('listController',function($scope,$http,$rootScope,uiGridConstants,$state){
    var transferredId;
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
        console.log(transferredId);
        $state.go('edit',{transferredId : transferredId});
    }

    $scope.deleteLine = function(){

    }
});