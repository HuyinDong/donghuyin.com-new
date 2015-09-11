/**
 * Created by dongyin on 8/22/15.
 */
content.controller('contentController',function($scope,$http,$stateParams){
    if(typeof $stateParams.id == 'undefined'){
        $http.get('/data/base/').then(function (data) {
            $scope.articles = data.data;
            $scope.name = "Latest Articles";
            $scope.quantity = 7;
        });
    }else {
        $http.get('/data/base/' + $stateParams.id).then(function (data) {
            $scope.articles = data.data;
            $scope.name = $stateParams.name;
        });
    }
    $scope.showMore = function(){
        $scope.quantity = $scope.quantity+4;
    };

});
content.filter('reverse', function() {
    return function(items) {
        if (!angular.isArray(items)) {return false;}
        return items.slice().reverse();
    };
});