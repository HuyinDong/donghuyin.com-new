/**
 * Created by dongyin on 8/24/15.
 */
sidenav.controller('sidenavController', function($scope, $timeout, $mdSidenav, $mdComponentRegistry, $log) {

    $scope.toggle = angular.noop;
    $scope.isOpen = function() { return false };

    $mdComponentRegistry
        .when('right')
        .then( function(sideNav){

            $scope.isOpen = angular.bind( sideNav, sideNav.isOpen );
            $scope.toggle = angular.bind( sideNav, sideNav.toggle );

        });

    $scope.toggleRight = function() {
        $mdSidenav('right').toggle()
            .then(function(){
                $log.debug("toggle RIGHT is done");
            });
    };
}).controller('rightController', function($scope, $timeout, $mdSidenav, $log,$http,md5,$mdDialog) {
    $scope.close = function() {
        $mdSidenav('right').close()
            .then(function(){
                $log.debug("close RIGHT is done");
            });
    };
    $scope.login = function() {
        $http.get('/data/admin').then(function (data) {
            var user = data.data;
            var username = md5.createHash($scope.name);
            var password = md5.createHash($scope.password);
            console.log(username,password);
            if(username == data.data[0].name && password == data.data[0].passwd){
                alert("OK");
            }else{
                var alert = $mdDialog.alert({
                    title: 'Error',
                    content: 'Username or password is not correct',
                    ok: 'OK'
                });
                $mdDialog
                    .show( alert )
            }
        });
    }
});