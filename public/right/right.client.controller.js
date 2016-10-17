right.controller('rightController',function($scope,$http){
  $scope.catagories = [];
  $http.get('/data/class').then(function(data){
    $scope.catagories = data.data;
  });
});
