/**
 * Created by dongyin on 8/26/15.
 */
var managementApplicationModule = angular.module('managementApplicationModule',
    [
        'management',
        'ngMaterial'
    ]);

angular.element(document).ready(function(){
    angular.bootstrap(document,['managementApplicationModule']);
});
