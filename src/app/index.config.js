(function() {
    'use strict';

    angular.module('inspinia').value('pythonURL', 'http://localhost:8000');


    //toastr配置
    toastr.options.closeButton = true;
    angular.module('inspinia').config(['usSpinnerConfigProvider', function(usSpinnerConfigProvider) {
        // 配置 spinner (使用方法:
        // 1.现在页面上使用<span us-spinner spinner-key="spinner-XXX-list" spinner-start-active="true"></span>
        // 2.inject service
        // 3.设置开始与结束标志
        // )
        usSpinnerConfigProvider.setTheme('classic', { color: 'black', radius: 25, width: 5, length: 20, zIndex: 10 });
    }]);


})();