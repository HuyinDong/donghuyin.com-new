/**
 * Created by dongyin on 8/22/15.
 */


header.config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home',{
            url: '/',
            templateUrl : './content/content.client.view.html',
            controller: 'contentController'
        })
        .state('list', {
            url: '/list/:name/:id',
            templateUrl : './content/content.client.view.html',
            controller: 'contentController'
        })
        .state('article',{
            url:'/article/:cid/:id',
            templateUrl : './article/article.client.view.html',
            controller : 'articleController'
        });
}]);

header.controller('headerController',function($scope,$http,$rootScope,$state){
    $http.get('/data/config').then(function(data){
        $scope.brand = data.data[0].name;
    });
    $http.get('/data/class').then(function(data){
        var items = data.data;
        var parents = [];
        var subs = [];
        for(var i = 0; i<items.length;i++){
            if(items[i].f_id == 0){
                parents.push(items[i]);
            }
        }
        for(var i = 0; i<parents.length; i++){
            subs.push([]);
        }
        for(var i = 0; i<parents.length; i++){
            for(var j = 0; j<items.length;j++){
                if(parents[i].id == items[j].f_id){
                    subs[i].push(items[j]);
                }
            }
        }
        var nav = {};
        var bars = [];
        nav.bars = bars;
        for(var i = 0; i< parents.length;i++){
            bars.push(parents[i]);
            bars[i].subs = subs[i];
        }
        $scope.nav = nav;

        $scope.clickMenu = function(id,name){
            $state.go('list',{ id: id,name : name});

        }

        $scope.goHome = function(){
            $state.go('home');
        }
    });



});