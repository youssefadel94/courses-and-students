app.controller("studentsCtrl", function ($scope, /*vcRecaptchaService,*/ $http/*, ApiCall*/) {
 
    //get students
    $http.get("/api/Students")
        .then(function (response) {
            $scope.students = response.data;

        });

    //refresh scope
    var Refresh = function (Des) {

        //refresh students scope
        if (Des == "Students") {
            $http.get("/api/Students")
   .then(function (response) {
       $scope.students = response.data;

   });
        }

       

    }



    //delete scope
    $scope.delete = function (name, Id) {



        // delete a student or cours
        if (name == "Students" || name == "Cours") {
            $http.delete("/api/" + name + "/" + Id).success(function (data) {
                Refresh(name);
            });
        }
    };


    //auto complete  

  
    $scope.loadsugs = function () {

        $scope.studentsNames = [''];

        //getv studneet names
        for (i = $scope.students.length ; i > 0 ; i--) {

            $scope.studentsNames[$scope.studentsNames.length + 1] = $scope.students[i - 1].Name;

        }




    }
    //



    var b = 1;
    var c = 1;

    //form submition
    $scope.submit = function (Des) {

       
        //post new student
        if (Des == "Students") {
            if ($scope.SName && $scope.Gender && $scope.Year && $scope.Age) {
                var Data = { "Name": $scope.SName, "Gender": $scope.Gender, "Age": $scope.Age, "Year": $scope.Year };
                var jData = JSON.stringify(Data);
                $http.post("/api/" + Des, jData, []).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    Refresh(Des);
                    $scope.errorPostStudent = "";
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.errorPostStudent = "something went wrong .. please check if the entry already exist or wrong data";
                });

            }
        }
        //

      
    }
});