(function() {
    'use strict';

    angular
        .module('inspinia')
        .controller('MinorController', MinorController);

    MinorController.inject = ['$scope', '$stateParams', 'StoreService'];

    function MinorController($scope, $stateParams, StoreService) {
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

        $scope.training = function() {
            //http://localhost:7777/file
            $.ajaxFileUpload({
                url: 'http://localhost:7777/file', //用于文件上传的服务器端请求地址
                secureuri: false, //是否需要安全协议，一般设置为false
                fileElementId: 'trainFile', //文件上传域的ID
                dataType: 'text', //返回值类型 一般设置为json
                success: function(response) {
                    console.log(response);
                },
                error: function(data, status, e) {
                    $.messager.alert('提示信息', '电视台类型导入失败！');
                }
            })
        }
    }
})();