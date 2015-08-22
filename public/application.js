/**
 * Created by dongyin on 8/22/15.
 */

var mainApplicationModule = angular.module('mainApplicationModule',
    [
        'header',
        'content'
    ]);

angular.element(document).ready(function(){
   angular.bootstrap(document,['mainApplicationModule']);
});

