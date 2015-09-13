/**
 * Created by dongyin on 8/27/15.
 */
management.controller('addController',
    function($scope,$http,ManagementAPI,$timeout,$mdDialog,$state){
       $scope.addOrEdit = "Add new Article";
        $scope.options = {
            language: 'en',
            allowedContent: true,
            entities: false
        };

        $scope.loading = false;
        $scope.dialogTitle = "Add";
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
        $scope.operate = "Add";
        $scope.newsContent = {};

        $scope.newsContent.keyword;
        $scope.newsContent.remark;
        $scope.newsContent.content;

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

        $scope.addArticle = function() {
            for(var i = 0 ; i <sub.length; i++){
                if(sub[i].name == $scope.selectedItem){
                    $scope.article.cid = sub[i].id;
                }
            }
            var date = new Date();

            $scope.article.date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();

            $mdDialog.show({
                templateUrl: './management/templates/dialog.html',
                scope: $scope
            });

            ManagementAPI.insert("newsbase", $scope.article, function (data) {
                if (data.msg = 'success') {
                    $scope.newsContent.id = data.insertId;
                    ManagementAPI.insert("newscontent", $scope.newsContent, function (data) {
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
                } else {
                    $scope.loading = false;
                    $scope.dialogContent = "False";
                    $scope.dialogButton = "OK";
                }
            });
        }
    });