management.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider
            .state('home',{
                url : '/',
                templateUrl :'./templates/welcome.html'
            })
            .state('configuration', {
                url: '/configuration',
                templateUrl: './templates/configuration.html',
                controller : 'configurationController'
            })
            .state('catagory',{
                url : '/catagory',
                templateUrl : './templates/catagory.html'
            })
            .state('list',{
                url : '/list',
                templateUrl : './templates/list.html'
            })
            .state('add',{
                url : '/add',
                templateUrl : './templates/add.html'
            })
    }
]);