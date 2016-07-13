var app = angular.module("mainApp", []).config(['$controllerProvider',
        function ($controllerProvider) {
            $controllerProvider.allowGlobals();
        }
]);
