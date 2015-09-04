management.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider
            .state('home',{
                url : '/',
                templateUrl :'./management/templates/welcome.html'
            })
            .state('configuration', {
                url: '/configuration',
                templateUrl: './management/templates/configuration.html',
                controller : 'configurationController'
            })
            .state('catagory',{
                url : '/catagory',
                templateUrl : './management/templates/catagory.html'
            })
            .state('list',{
                url : '/list',
                templateUrl : './management/templates/list.html'
            })
            .state('add',{
                url : '/add',
                templateUrl : './management/templates/addOrEdit.html',
                controller : 'addController'
            })
            .state('edit',{
                url : '/edit/:transferredId',
                templateUrl : './management/templates/addOrEdit.html',
                controller : 'editController'
            })
    }
]);