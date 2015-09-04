/**
 * Created by dongyin on 8/27/15.
 */
management.controller('catagoryController',
        function($scope,$http,$rootScope,ManagementAPI,$state,$timeout,$mdDialog) {
            $scope.loading = false;
            $scope.dialogTitle = "Catagory";
            $scope.closeDialog = function(){
                $mdDialog.hide();
                $state.go($state.current, {}, {reload: true});
            };
                var navbarList ;
               ManagementAPI.selectAll("newsclass", function(data){
                   navbarList = data;
                   var cata = ['Add Navbar'];
                    $scope.catagory = [];
                   for(var i = 0; i< data.length;i++){
                       if(data[i].f_id ==0){
                           cata.push(data[i].name);
                       }
                   }
                   cata = cata.map(function(item){
                       return {
                           name : item
                       };
                   });
                  $scope.cata = cata;
                var items = data;
                var parents = [];
                var subs = [];
                for (var i = 0; i < items.length; i++) {
                    if (items[i].f_id == 0) {
                        parents.push(items[i]);
                    }
                }
                for (var i = 0; i < parents.length; i++) {
                    subs.push([]);
                }
                for (var i = 0; i < parents.length; i++) {
                    for (var j = 0; j < items.length; j++) {
                        if (parents[i].id == items[j].f_id) {
                            subs[i].push(items[j]);
                        }
                    }
                }
                var nav = {};
                var bars = [];
                nav.bars = bars;
                for (var i = 0; i < parents.length; i++) {
                    bars.push(parents[i]);
                    bars[i].subs = subs[i];
                }

                $scope.nav = nav;
            });

            $scope.navbar = '';
            $scope.addCata = function(){
                var obj = {};
                $mdDialog.show({
                    templateUrl : './management/templates/dialog.html',
                    scope : $scope
                });
                if($scope.catagory == 'Add Navbar'){
                    obj.f_id = 0;
                    obj.name = $scope.navbar;
                    $scope.loading = true;
                }else{
                    console.log("list",navbarList);
                    for(var i = 0; i<navbarList.length;i++){
                        if(navbarList[i].name == $scope.catagory){
                            obj.f_id = navbarList[i].id;
                            obj.name = obj.name = $scope.navbar;
                            $scope.loading = true;
                        }
                    }
                }
                ManagementAPI.insert("newsclass",obj,function(data){
                    console.log(data);
                    if(data.msg = 'success'){
                        $timeout(function(){
                            $scope.loading = false;
                            console.log( $scope.loading);
                            $scope.dialogContent = "Success";
                            $scope.dialogButton = "OK";
                        },2000);
                    }else{
                        $scope.loading = false;
                        $scope.dialogContent = "False";
                        $scope.dialogButton = "OK";
                    }
                });

            };

            $scope.updateNav = function(obj){
                var target = {};
                var id = 0;
                var temp = {};
                if( typeof obj.sub == 'undefined'){
                    id = obj.item.id;
                    temp = obj.item;
                }else{
                    id = obj.sub.id;
                    temp = obj.sub;
                }
                target.id = temp.id;
                target.f_id = temp.f_id;
                target.name = temp.name;
                target.remark = temp.remark;
                target.keyword = temp.keyword;
                $scope.loading = true;
                $mdDialog.show({
                    templateUrl : './management/templates/dialog.html',
                    scope : $scope
                });
                ManagementAPI.update('newsclass',id,target,function(data){
                    if(data.msg = 'success'){
                        $timeout(function(){
                            $scope.loading = false;
                            $scope.dialogContent = "Success";
                            $scope.dialogButton = "OK";

                        },2000);
                    }else{
                        $scope.loading = false;
                        $scope.dialogContent = "False";
                        $scope.dialogButton = "OK";
                    }

                });
            };

            $scope.deleteNav = function(obj) {
                var id;
                if (typeof obj.sub == 'undefined') {
                    id = obj.item.id;
                } else {
                    id = obj.sub.id;
                }
                $scope.loading = true;
                $mdDialog.show({
                    templateUrl: './management/templates/dialog.html',
                    scope: $scope
                });
                ManagementAPI.delete('newsclass', id, function (data) {
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
            };
            });