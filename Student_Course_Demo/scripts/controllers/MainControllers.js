app.controller("myController", function ($scope, $http) {

    $http.get(".../Controllers/CoursController.cs/GetCourses")
         .then(function (response) {
             $scope.courses = response.data;
         });
});