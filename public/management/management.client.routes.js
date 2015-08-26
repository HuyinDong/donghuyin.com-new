management.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // Application routes
        $stateProvider
            .state('management', {
                url: '/management',
                templateUrl: './management/management.html'
            })

    }
]);