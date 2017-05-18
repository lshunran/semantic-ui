'use strict';

angular.module('inspinia')
    .controller('MainController', function($scope, $stateParams, StoreService, usSpinnerService) {

        var vm = this;

        vm.userName = 'Example user';
        vm.helloText = 'Welcome in INSPINIA Gulp SeedProject';
        vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';

        $('input[type=file]').bootstrapFileInput();
        $('.file-inputs').bootstrapFileInput();
        $scope.file = {}
        if ($stateParams.key) {
            StoreService.set($stateParams.key, $stateParams.value);
        };
        if (StoreService.get('trainmodel')) {
            $scope.file.trainmodel = StoreService.get('trainmodel')
        };

        $scope.predict = function() {
            // usSpinnerService.spin('spinner-predict-model');

            var params = {};
            if (StoreService.get('trainmodel')) {
                params.custom = true;
                params.fileName = StoreService.get('trainmodel');
            } else {
                params.custom = false;
            }

            params.text = $scope.predict_text;

            console.log(params);
        };

    });