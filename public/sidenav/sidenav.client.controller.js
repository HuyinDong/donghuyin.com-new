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
}).controller('rightController',
    function($scope, $timeout, $mdSidenav, $log,$http,md5,$mdDialog,$state) {
    $scope.close = function() {
        $mdSidenav('right').close()
            .then(function(){
                $log.debug("close RIGHT is done");
            });
    };
});