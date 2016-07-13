app.controller("MainController", function ($scope, $http/*, ApiCall*/) {

    $http.get("/api/Cours")
         .then(function (response) {
               $scope.courses = response.data;
           
         });
    $http.get("/api/Students")
        .then(function (response) {
            $scope.students = response.data;

        });

    $scope.delete = function (name,id) {
        $http.delete("/api/"+name+"/" + id).success(function (data) {
            //either this
            $scope.refresh();
            //or this
            //$scope.students.splice(id, 1);
        });
    };
    
});
/*/ Simple GET request example:
$http({
    method: 'GET',
    url: '/someUrl'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
}, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
});*/