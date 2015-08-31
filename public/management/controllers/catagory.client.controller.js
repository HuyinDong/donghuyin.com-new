/**
 * Created by dongyin on 8/27/15.
 */
management.controller('catagoryController',
    [
        '$scope',
        '$http',
        '$rootScope',
        'ManagementAPI',
        function($scope,$http,$rootScope,ManagementAPI) {

               ManagementAPI.selectAll("newsclass", function(data){
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
               });

            ManagementAPI.selectAll("newsclass", function(data) {
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
                console.log(nav);
                $scope.nav = nav;
            });
            }]);