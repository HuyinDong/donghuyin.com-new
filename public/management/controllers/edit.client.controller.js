/**
 * Created by dongyin on 9/1/15.
 */
management.controller('editController',
    function($scope,$http,ManagementAPI,$timeout,$mdDialog,$state,$stateParams){
        $scope.addOrEdit = "Edit Article";
        $scope.options = {
            language: 'en',
            allowedContent: true,
            entities: false
        };

        $scope.loading = false;
        $scope.dialogTitle = "Edit";
        $scope.closeDialog = function(){
            $mdDialog.hide();
            $state.go($state.current, {}, {reload: true});
        };
        $scope.article = {};
        $scope.article.title ;
        $scope.article.author;
        $scope.article.abstract;
        $scope.article.lecture;
        $scope.article.week;
        $scope.article.cid =0;

        $scope.newsContent = {};

        $scope.newsContent.keyword;
        $scope.newsContent.remark;
        $scope.newsContent.content;

        $scope.operate = "Update";

        $scope.selectedItem ;
        var sub = [];
        var main = [];
        var navList = [];
        ManagementAPI.selectAll("newsclass", function(data){
            for(var i = 0; i < data.length; i++){
                if(data[i].f_id == 0){
                    main.push(data[i]);
                }else{
                    sub.push(data[i]);
                }
            }
            for(var i =0; i<sub.length;i++){
                for(var j = 0; j < main.length;j++){
                    if(sub[i].f_id == main[j].id){
                        navList.push({
                            name : sub[i].name,
                            main : main[j].name,
                            id : sub[i].id
                        })
                    }
                }
            }
            $scope.main = main;
            $scope.navList = navList;

        });

        ManagementAPI.selectOne("newsbase",$stateParams.transferredId,function(data) {

            $scope.article.title = data[0].title;
            $scope.article.author = data[0].author;
            $scope.article.abstract = data[0].abstract;
            $scope.article.lecture = data[0].lecture;
            $scope.article.week = data[0].week;
            $scope.article.cid = data[0].cid;
            
            for(var i = 0; i< sub.length;i++){
                if(sub[i].id == $scope.article.cid){
                    $scope.selectedItem  = sub[i].name;
                }
            }
                ManagementAPI.selectOne("newscontent", $stateParams.transferredId, function (data) {
                    $scope.newsContent.keyword = data[0].keyword;
                    $scope.newsContent.remark = data[0].remark;
                    $scope.newsContent.content = data[0].content;
                    $scope.newsContent.id = data[0].id;
                });

        });

        $scope.addArticle = function() {
            for(var i = 0; i< sub.length;i++){
                if(sub[i].name == $scope.selectedItem){
                    $scope.article.cid  = sub[i].id;
                }
            }
            var date = new Date();
            $scope.article.date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
            $scope.loading = true;
            $mdDialog.show({
                templateUrl : './management/templates/dialog.html',
                scope : $scope
            });
            ManagementAPI.update('newsbase',$scope.newsContent.id,$scope.article,function(data){
                if(data.msg = 'success') {
                    ManagementAPI.update('newscontent', $scope.newsContent.id, $scope.newsContent, function (data) {
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
            //$state.go($state.current, {}, {reload: true});
        };
    });
