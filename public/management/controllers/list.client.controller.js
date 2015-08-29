/**
 * Created by dongyin on 8/27/15.
 */
management.controller('listController',function($scope,$http,$rootScope,uiGridConstants){
    $http.get('/data/base').then(function(data){
        var items = data.data;

        $rootScope.gridOptions = {
            enableRowSelection:true,
            enableRowHeaderSelection:false,
            multiSelect : false,
            columnDefs: [
                { name: 'title', },
                { name: 'author' },
                { name: 'date' }
            ],
            data: items
        };
        $rootScope.gridOptions.onRegisterApi = function(gridApi){
            //set gridApi on scope
            $rootScope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
                var msg = 'row selected ' + row.isSelected;
                console.log(msg);
            });
    };
});
});