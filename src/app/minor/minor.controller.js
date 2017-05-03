(function() {
    'use strict';

    angular
        .module('inspinia')
        .controller('MinorController', MinorController);

    MinorController.inject = ['$scope'];

    function MinorController($scope) {
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