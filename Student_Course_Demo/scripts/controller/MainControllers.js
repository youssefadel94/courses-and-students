app.controller("MainController", function ($scope, $http/*, ApiCall*/) {

    $http.get("/api/Cours")
         .then(function (response) {
             $scope.courses = response.data;

         });
    $http.get("/api/Students")
        .then(function (response) {
            $scope.students = response.data;

        });
    var Refresh = function(Des){
        if (Des == "Students") {
            $http.get("/api/Students")
   .then(function (response) {
       $scope.students = response.data;

   });
        }
        else {
            if (Des == "Cours") {
                $http.get("/api/Cours")
     .then(function (response) {
         $scope.courses = response.data;

     });
            }
        }
    }
    $scope.delete = function (name, id) {
        $http.delete("/api/" + name + "/" + id).success(function (data) {
            //either this
            //$scope.refresh();
            //or this "how to refresh"
            //$scope.students.splice(id, 1);
            Refresh(name);
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

    $scope.CName = '';
    $scope.SName = '';
    $scope.Level = '';
    $scope.Gender = '';
    $scope.Age = '';
    $scope.Year = '';

    $scope.submit = function (Des) {
        if (Des == "Cours") {
            if ($scope.CName && $scope.Level) {
                var Data = { "Name": $scope.CName, "Level": $scope.Level };
                var jData = JSON.stringify(Data);
                $http.post("/api/" + Des, jData, []).success(function (DataR) {
                    Refresh(Des);
                });

            }
        }
        else {
            if (Des == "Students") {
                if ($scope.SName && $scope.Gender && $scope.Year && $scope.Age) {
                    var Data = { "Name": $scope.SName, "Gender": $scope.Gender, "Age": $scope.Age, "Year": $scope.Year };
                    var jData = JSON.stringify(Data);
                    $http.post("/api/" + Des, jData, []).success(function (DataR) {
                        Refresh(Des);
                    });

                }
            }
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