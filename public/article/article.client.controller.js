/**
 * Created by dongyin on 9/5/15.
 */
article.controller('articleController',function($scope,$http,$stateParams,ManagementAPI){
    $scope.article = {};
  
    ManagementAPI.selectOne("newsbase",$stateParams.id,function(data){
        $scope.article = data[0];
        ManagementAPI.selectOne("newscontent",$stateParams.id,function(data){
            $scope.content = data[0];
            var content = data[0].content;
          $('#inner').append(data[0].content);
            $(document).ready(function() {

                hljs.configure({
                    languages:['java','javascript']
                });

                $('#inner code').each(function(i, Block) {
                    hljs.highlightBlock(Block);
                });
            });
        });
    });
});
