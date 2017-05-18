(function() {
    'use strict';

    angular
        .module('inspinia')
        .controller('MinorController', MinorController);

    MinorController.inject = ['$scope', '$stateParams', 'StoreService', '$resource', 'pythonURL', 'usSpinnerService'];

    function MinorController($scope, $stateParams, StoreService, $resource, pythonURL, usSpinnerService) {
        $('input[type=file]').bootstrapFileInput();
        $('.file-inputs').bootstrapFileInput();
        $scope.file = {}
        if ($stateParams.key) {
            StoreService.set($stateParams.key, $stateParams.value);
        }
        if (StoreService.get('stopwords')) {
            console.log(StoreService.get('stopwords'));
            $scope.file.stopwords = StoreService.get('stopwords')
        }
        if (StoreService.get('prowords')) {
            $scope.file.prowords = StoreService.get('prowords')
        }
        if (StoreService.get('rawdata')) {
            $scope.file.rawdata = StoreService.get('rawdata')
        }
        if (StoreService.get('trainset')) {
            $scope.file.trainset = StoreService.get('trainset')
        }
        if (StoreService.get('trainmodel')) {
            $scope.file.trainmodel = StoreService.get('trainmodel')
        }
        if (StoreService.get('model')) {
            $scope.downloadModel = pythonURL + '/download/model?&filename=' + StoreService.get('model');
            $scope.file.model = StoreService.get('model')
        }
        if (StoreService.get('predict_res')) {
            $scope.downloadcvsRes = pythonURL + '/download/csvRes?&filename=' + StoreService.get('predict_res');
            $scope.file.predict_res = StoreService.get('predict_res')
        }
        $scope.training = function() {
            usSpinnerService.spin('spinner-train-model');

            var params = {};
            if (StoreService.get('prowords')) {
                params.userDict = true;
                params.userDictName = StoreService.get('prowords');
            } else {
                params.userDict = false;
            }
            if (StoreService.get('stopwords')) {
                params.stopword = true;
                params.stopwordName = StoreService.get('stopwords');
            } else {
                params.stopword = false;
            }
            if (StoreService.get('trainset')) {
                params.trainSet = StoreService.get('trainset')
            } else {
                alert('请上传训练集');
            }
            params.model = $scope.model;
            console.log(params);
            $resource(pythonURL + '/training').save(
                params,
                function(response) {
                    usSpinnerService.stop('spinner-train-model');
                    toastr.success('训练完成');
                    if (response.status) {
                        StoreService.set('model', response.modelName);
                        $scope.file.model = StoreService.get('model')
                        $scope.downloadModel = pythonURL + '/download/model?&filename=' + response.modelName;
                    }
                },
                function(error) {
                    usSpinnerService.stop('spinner-train-model');

                });
        };

        $scope.predict = function() {
            usSpinnerService.spin('spinner-predict-model');

            var params = {};
            if (StoreService.get('prowords')) {
                params.userDict = true;
                params.userDictName = StoreService.get('prowords');
            } else {
                params.userDict = false;
            }
            if (StoreService.get('stopwords')) {
                params.stopword = true;
                params.stopwordName = StoreService.get('stopwords');
            } else {
                params.stopword = false;
            }
            if (StoreService.get('trainmodel')) {
                params.custom = true;
                params.fileName = StoreService.get('trainmodel');
            } else {
                params.custom = false;
            }
            if (StoreService.get('rawdata')) {
                params.predictSet = StoreService.get('rawdata');
            } else {
                toastr.error('请上传要预测的数据(.csv格式)');
                return;
            }
            console.log(params);
            $resource(pythonURL + '/predict/csv').save(
                params,
                function(response) {
                    usSpinnerService.stop('spinner-predict-model');
                    toastr.success('训练完成');
                    if (response.status) {
                        StoreService.set('predict_res', response.csvName);
                        $scope.file.predict_res = StoreService.get('predict_res')
                        $scope.downloadcvsRes = pythonURL + '/download/csvRes?&filename=' + response.csvName;
                    }
                },
                function(error) {
                    usSpinnerService.stop('spinner-predict-model');
                });
        };
        $scope.clearStopwords = function() {
            StoreService.delete('stopwords');
            $scope.file.stopwords = null;
        };
        $scope.clearProwords = function() {
            StoreService.delete('prowords');
            $scope.file.prowords = null;
        };
        $scope.clearTrainmodel = function() {
            StoreService.delete('trainmodel');
            $scope.file.trainmodel = null;
        };
        $scope.clearRawdata = function() {
            StoreService.delete('rawdata');
            $scope.file.rawdata = null;
        };
        $scope.clearTrainset = function() {
            StoreService.delete('trainset');
            $scope.file.trainset = null;
        };
    }
})();