(function() {
    'use strict';

    angular
        .module('inspinia')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('index', {
                abstract: true,
                url: "/index",
                templateUrl: "app/components/common/content.html"
            })
            .state('index.main', {
                url: "/main",
                templateUrl: "app/main/main.html",
                data: { pageTitle: 'Example view' }
            })
            .state('index.minor', {
                url: "/minor/:key/:value",
                templateUrl: "app/minor/minor.html",
                controller: 'MinorController',
                data: { pageTitle: 'Example view' }
            });

        $urlRouterProvider.otherwise('/index/main');
    }

})();