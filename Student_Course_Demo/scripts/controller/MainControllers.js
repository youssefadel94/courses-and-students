app.controller("MainController", function ($scope, $http) {

    $http.get("http://localhost:24116/api/Cours")
         .then(function (response) {
               $scope.courses = response.data;
           
         });
    $http.get("http://localhost:24116/api/Students")
        .then(function (response) {
            $scope.students = response.data;

        });


});
