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
            //or this "how to refresh"
            //$scope.students.splice(id, 1);
        });
    };
  /*  $scope.create = function (name, data) {
        $http.post("/api/" + name + "/", data).success(function (dataR) {
            //either this
            $scope.refresh();
            //or this "how to refresh"
            //$scope.students.splice(id, 1);
        });
    };*/

    $scope.Name = '';
    $scope.Level = '';
    $scope.submit = function (/*Des*/) {
        if ($scope.Name && $scope.Level) {
            Date = [{ Name: $scope.Name, Level: $scope.Level }];

            $http.post("/api/Cours"/* + Des + */, Data).success(function (DataR) {
                //either this
                $scope.refresh();
                //or this "how to refresh"
                //$scope.students.splice(id, 1);
            });

        }
    }
    
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