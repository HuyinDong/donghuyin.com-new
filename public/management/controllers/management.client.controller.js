management.controller('managementController',function($scope,$state){
    $scope.goConfiguration = function(){
        $state.go('configuration');
    };
    $scope.goCatagory = function(){
        $state.go('catagory');
    };
    $scope.goList = function(){
        $state.go('list');
    };
    $scope.goAdd = function(){
        $state.go('add');
    };
    $scope.goHome = function(){
        $state.go('home');
    }
});