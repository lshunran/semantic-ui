(function() {
    'use strict';

    angular
        .module('inspinia')
        .factory('StoreService', StoreService);

    StoreService.inject = ['$window'];

    function StoreService($window) {
        return {
            //通用操作
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key) {
                return $window.localStorage[key];
            },
            delete: function(key) {
                $window.localStorage.removeItem(key);
            }
        }
    }
})();