/**
 * Created by dongyin on 8/22/15.
 */

var mainApplicationModule = angular.module('mainApplicationModule',
    [
        'sidenav',
        'header',
        'content',
        'lumx'

    ]);

angular.element(document).ready(function(){
   angular.bootstrap(document,['mainApplicationModule']);
});

