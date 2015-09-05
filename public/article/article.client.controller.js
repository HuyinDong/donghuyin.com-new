/**
 * Created by dongyin on 9/5/15.
 */
article.controller('articleController',function($scope,$http,$stateParams,ManagementAPI){
    $scope.article = {};
    console.log($stateParams);
    ManagementAPI.selectOne("newsbase",$stateParams.id,function(data){
        $scope.article = data[0];
        ManagementAPI.selectOne("newscontent",$stateParams.id,function(data){
            console.log(data);
            var parser = new DOMParser();
            var doc = $.parseHTML( data[0].content );
                $scope.doc = doc;
            console.log(doc);
                $scope.content = data[0];
        });
    });
});