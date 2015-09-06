/**
 * Created by dongyin on 8/22/15.
 */
content.controller('contentController',function($scope,$http,$stateParams){
    if(typeof $stateParams.id == 'undefined'){
        $http.get('/data/base/').then(function (data) {
            console.log(data.data);
            $scope.articles = data.data;
            $scope.name = "Latest Articles";
            $scope.quantity = 10;
        });
    }else {
        $http.get('/data/base/' + $stateParams.id).then(function (data) {
            $scope.articles = data.data;
            $scope.name = $stateParams.name;
            console.log(data.data);
        });
    }
});
content.filter('reverse', function() {
    return function(items) {
        return items.slice().reverse();
    };
});