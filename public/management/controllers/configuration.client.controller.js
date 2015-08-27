/**
 * Created by dongyin on 8/26/15.
 */
management.controller('configurationController',function($scope,$http){
            $http.get('/data/config').then(function(data){
               var items = data.data;
                console.log(items);
                var website = {};
                website.name = items[0].name;
                website.address = items[0]["Website Address"];
                website.remark = items[0].Remark;
                website.keywords = items[0]["Key Words"];
                console.log(website);
                $scope.website = website;
            });
});