app.controller("MainController", function ($scope, $http/*, ApiCall*/) {

    $http.get("/api/Cours")
         .then(function (response) {
             $scope.courses = response.data;

         });
    $http.get("/api/Students")
        .then(function (response) {
            $scope.students = response.data;

        });
    var Refresh = function (Des) {
        if (Des == "Students") {
            $http.get("/api/Students")
   .then(function (response) {
       $scope.students = response.data;

   });
        }

        if (Des == "Cours") {
            $http.get("/api/Cours")
 .then(function (response) {
     $scope.courses = response.data;

 });
        }

    }
    $scope.delete = function (name, Id) {

        if (name == "StudentofCours") {
            Des = "Cours";
            if ($scope.CId) {
                // $scope.students[$scope.studenttoCours - 1].Courses[$scope.students[$scope.studenttoCours].Courses.length] = $scope.Vcourse;

                for (i = $scope.students.length ; i > 0 ; i--) {
                    var a = $scope.students[i - 1].Id;
                    if (a == Id) {
                        $scope.studenttoadd = $scope.students[i - 1];
                    }
                }
                for (i = $scope.Vcourse.Students.length ; i > 0 ; i--) {
                    var a = $scope.Vcourse.Students[i - 1].Id;
                    if (a == Id) {
                        $scope.Vcourse.Students.splice(i - 1,1);
                    }
                }
               
                var jData = $scope.Vcourse;

                $http.put("/api/" + Des + "/" + $scope.Vcourse.Id, jData, []).success(function (DataR) {
                    Refresh(Des);
                });

            }

        }

        if (name == "CoursofStudent") {
            Des = "Students";
            if ($scope.SId) {
                // $scope.students[$scope.studenttoCours - 1].Courses[$scope.students[$scope.studenttoCours].Courses.length] = $scope.Vcourse;

                for (i = $scope.courses.length ; i > 0 ; i--) {
                    var a = $scope.courses[i - 1].Id;
                    if (a == Id) {
                        $scope.studenttoadd = $scope.courses[i - 1];
                    }
                }
                for (i = $scope.Vstudent.Courses.length ; i > 0 ; i--) {
                    var a = $scope.Vstudent.Courses[i - 1].Id;
                    if (a == Id) {
                        $scope.Vstudent.Courses.splice(i - 1,1);
                    }
                }
               
                var jData = $scope.Vstudent;

                $http.put("/api/" + Des + "/" + $scope.Vstudent.Id, jData, []).success(function (DataR) {
                    Refresh(Des);
                });

            }

        }
       
        if (name == "Students" || name == "Cours") {
        $http.delete("/api/" + name + "/" + Id).success(function (data) {
            //either this
            //$scope.refresh();
            //or this "how to refresh"
            //$scope.students.splice(Id, 1);
            Refresh(name);
        });
        }
    };

    /*  $scope.create = function (name, data) {
          $http.post("/api/" + name + "/", data).success(function (dataR) {
              //either this
              $scope.refresh();
              //or this "how to refresh"
              //$scope.students.splice(Id, 1);
          });
      };*/

    $scope.CName = '';
    $scope.SCName = '';
    $scope.CId = '';
    $scope.SId = '';
    $scope.SName = '';
    $scope.SSName = '';
    $scope.Level = '';
    $scope.SLevel = '';
    $scope.Gender = '';
    $scope.SGender = '';
    $scope.Age = '';
    $scope.SAge = '';
    $scope.Year = '';
    $scope.SYear = '';
    $scope.showC = false;
    $scope.showS = false;
    $scope.studenttoCours = '';

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
        if (Des == "SCours") {
            Des = "Cours";
            if ($scope.SCName && $scope.SLevel && $scope.Vcourse.Id) {
                var Data = { "Id": $scope.Vcourse.Id, "Name": $scope.SCName, "Level": $scope.SLevel };
                var jData = JSON.stringify(Data);
                $http.put("/api/" + Des + "/" + $scope.Vcourse.Id, jData, []).success(function (DataR) {
                    Refresh(Des);
                });

            }
        }
       
            if (Des == "studenttoCours") {
                Des = "Cours";
                if ($scope.SCName && $scope.SLevel) {
                   // $scope.students[$scope.studenttoCours - 1].Courses[$scope.students[$scope.studenttoCours].Courses.length] = $scope.Vcourse;
                    
                    for (i = $scope.students.length ; i > 0 ; i--) {
                        var a = $scope.students[i-1].Id;
                        if (a == $scope.studenttoCours) {
                        $scope.studenttoadd = $scope.students[i-1];
                    }
            }
                    $scope.Vcourse.Students[$scope.Vcourse.Students.length] = $scope.studenttoadd;
                    var jData = $scope.Vcourse;

                    $http.put("/api/" + Des + "/" + $scope.Vcourse.Id, jData, []).success(function (DataR) {
                        Refresh(Des);
                    });

                }
            }
       
        if (Des == "VCours") {
            Des = "Cours";
            if ($scope.CId) {
                $http.get("/api/" + Des + "/" + $scope.CId).then(function (response) {
                    $scope.Vcourse = response.data;
                    $scope.SCName = $scope.Vcourse.Name;
                    $scope.SLevel = $scope.Vcourse.Level;
                    $scope.showC = true;
                    $scope.Sstudents = $scope.Vcourse.Students;

                });

            }
        }
        if (Des == "Students") {
            if ($scope.SName && $scope.Gender && $scope.Year && $scope.Age) {
                var Data = { "Name": $scope.SName, "Gender": $scope.Gender, "Age": $scope.Age, "Year": $scope.Year };
                var jData = JSON.stringify(Data);
                $http.post("/api/" + Des, jData, []).success(function (DataR) {
                    Refresh(Des);
                });

            }
        }
        if (Des == "SStudents") {
            Des = "Students";
            if ($scope.SSName && $scope.SGender && $scope.SYear && $scope.SAge && $scope.Vstudent.Id) {
                var Data = { "Id": $scope.Vstudent.Id, "Name": $scope.SSName, "Gender": $scope.SGender, "Age": $scope.SAge, "Year": $scope.SYear };
                var jData = JSON.stringify(Data);
                $http.put("/api/" + Des + "/" + $scope.Vstudent.Id, jData, []).success(function (DataR) {
                    Refresh(Des);
                });

            }
        }
        if (Des == "coursetoStudent") {
            Des = "Students";
            if ($scope.SId) {
                // $scope.students[$scope.studenttoCours - 1].Courses[$scope.students[$scope.studenttoCours].Courses.length] = $scope.Vcourse;
                for (i = $scope.courses.length ; i > 0; i--) {
                    if ($scope.courses[i-1].Id == $scope.coursetoStudent) {
                        $scope.studenttoadd = $scope.courses[i-1];
                    }
                }
                $scope.Vstudent.Courses[$scope.Vstudent.Courses.length] = $scope.studenttoadd;
                var jData = $scope.Vstudent;

                $http.put("/api/" + Des + "/" + $scope.Vstudent.Id, jData, []).success(function (DataR) {
                    Refresh(Des);
                });

            }
        }
        if (Des == "VStudents") {
            Des = "Students";
            if ($scope.SId) {
                $http.get("/api/" + Des + "/" + $scope.SId).then(function (response) {
                    $scope.Vstudent = response.data;
                    $scope.SSName = $scope.Vstudent.Name;
                    $scope.SGender = $scope.Vstudent.Gender;
                    $scope.SAge = $scope.Vstudent.Age;
                    $scope.SYear = $scope.Vstudent.Year;
                    $scope.Ccourses = $scope.Vstudent.Courses;
                    $scope.showS = true;
                });

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