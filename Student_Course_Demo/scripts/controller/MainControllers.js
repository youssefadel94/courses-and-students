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
            //$scope.refresh();
            //or this "how to refresh"
            //$scope.students.splice(id, 1);
            if (name == "Students") {
                $http.get("/api/Students")
       .then(function (response) {
           $scope.students = response.data;

       });
            }
            else {
                if (name == "Cours") {
                    $http.get("/api/Cours")
         .then(function (response) {
             $scope.courses = response.data;

         });
                }
            }
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
    $scope.Gender = '';
    $scope.Age = '';
    $scope.Year = '';

    $scope.submit = function (Des) {
        if ($scope.Name && $scope.Level) {
            Date = [{ Name: $scope.Name, Level: $scope.Level }];

            $http.post("/api/" + Des , Data).success(function (DataR) {
                $http.get("/api/Cours")
          .then(function (response) {
              $scope.courses = response.data;

          });
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