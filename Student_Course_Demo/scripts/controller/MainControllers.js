/*app.controller('MainController', ['$scope', function ($scope) {
    $scope.courses = [{
        Id: 1,
        name: 'test',
        Level: 'hard'
    }, {
        Id: 2,
        name: 'test',
        Level: 'hard'
    }];
}]);

*/
app.controller("MainController", function ($scope, $http) {

    $http.get("http://localhost:24116/api/Cours")
         .then(function (response) {
               $scope.courses = response.data;
            /* $scope.courses = [{
                 Id: 1,
                 name: 'test',
                 Level: 'hard'
             }, {
                 Id: 2,
                 name: 'test',
                 Level: 'hard'
             }];*/
         });


});
