app.controller("MainController", function ($scope, /*vcRecaptchaService,*/ $http/*, ApiCall*/) {

    // get courses
    $http.get("/api/Cours")
         .then(function (response) {
             $scope.courses = response.data;

         });


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

        //refresh corse scope
        if (Des == "Cours") {
            $http.get("/api/Cours")
 .then(function (response) {
     $scope.courses = response.data;

 });
        }

    }

    //delete scope
    $scope.delete = function (name, Id) {


        // unassign a student from a course 
        if (name == "StudentofCours") {
            Des = "Cours";
            if ($scope.CId) {

                for (i = $scope.students.length ; i > 0 ; i--) {
                    var a = $scope.students[i - 1].Id;
                    if (a == Id) {
                        $scope.studenttoadd = $scope.students[i - 1];
                    }
                }
                for (i = $scope.Vcourse.Students.length ; i > 0 ; i--) {
                    var a = $scope.Vcourse.Students[i - 1].Id;
                    if (a == Id) {
                        $scope.Vcourse.Students.splice(i - 1, 1);
                    }
                }

                var jData = $scope.Vcourse;

                $http.put("/api/" + Des + "/" + $scope.Vcourse.Id, jData, []).success(function (DataR) {
                    Refresh(Des);
                });

            }

        }


        //unassign a course from student
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
                        $scope.Vstudent.Courses.splice(i - 1, 1);
                    }
                }

                var jData = $scope.Vstudent;

                $http.put("/api/" + Des + "/" + $scope.Vstudent.Id, jData, []).success(function (DataR) {
                    Refresh(Des);
                });

            }

        }


        // delete a student or cours
        if (name == "Students" || name == "Cours") {
            $http.delete("/api/" + name + "/" + Id).success(function (data) {
                Refresh(name);
            });
        }
    };



    //auto complete  

    $scope.loadsugc = function () {
        $scope.coursesNames = [''];


        //get courses names
        for (i = $scope.courses.length ; i > 0 ; i--) {

            $scope.coursesNames[$scope.coursesNames.length + 1] = $scope.courses[i - 1].Name;
        }
        //getv studneet names




    }
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

        // if (vcRecaptchaService.getResponse() === "") { //if string is empty
        //     alert("Please resolve the captcha and submit!")
        // } else {

        //post new course
        if (Des == "Cours") {
            var res = $('#g-recaptcha-response');
            if (res.val()) {
                if ($scope.CName && $scope.Level) {
                    var Data = { "Name": $scope.CName, "Level": $scope.Level, "Code": $scope.Code };
                    var jData = JSON.stringify(Data);
                    $http.post("/api/" + Des, jData, []).then(function successCallback(response) {
                        // this callback will be called asynchronously
                        // when the response is available
                        Refresh(Des);
                        $scope.errorPostCourse = "";
                    }, function errorCallback(response) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        $scope.errorPostCourse = "something went wrong .. entry already exist";
                    });


                }
            }
            else {
                $scope.errorPostCourse = "please prove you are not a ROBOT";

            }
        }
        //


        //put course/id
        if (Des == "SCours") {
            Des = "Cours";
            if ($scope.SCName && $scope.SLevel && $scope.Vcourse.Id) {
                var Data = { "Id": $scope.Vcourse.Id, "Name": $scope.SCName, "Level": $scope.SLevel, "Code": $scope.SCode };
                var jData = JSON.stringify(Data);
                $http.put("/api/" + Des + "/" + $scope.Vcourse.Id, jData, []).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    Refresh(Des);
                    $scope.errorCourseAT = "";
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.errorCourseAT = "something went wrong .. name already taken";
                });


            }
          
        }
        //

        //assign student to course
        if (Des == "studenttoCours") {
            Des = "Cours";
            if ($scope.SCName && $scope.SLevel) {

                for (i = $scope.students.length ; i > 0 ; i--) {
                    var a = $scope.students[i - 1].Name;
                    if (a == $scope.studenttoCours) {
                        $scope.studenttoadd = $scope.students[i - 1];
                    }
                }
                $scope.Vcourse.Students[$scope.Vcourse.Students.length] = $scope.studenttoadd;
                var jData = $scope.Vcourse;

                $http.put("/api/" + Des + "/" + $scope.Vcourse.Id, jData, []).success(function (DataR) {
                    Refresh(Des);
                });

            }
        }
        //


        //get course/id
        if (Des == "VCours") {

            Des = "Cours";
            if ($scope.coursetoEdit) {
                for (i = $scope.courses.length ; i > 0 ; i--) {
                    var a = $scope.courses[i - 1].Name;
                    if (a == $scope.coursetoEdit) {
                        $scope.CId = $scope.courses[i - 1].Id;
                       
                    }
                }

                $http.get("/api/" + Des + "/" + $scope.CId).then(function successCallback(response) {
                    $scope.Vcourse = response.data;
                    $scope.SCName = $scope.Vcourse.Name;
                    $scope.SLevel = $scope.Vcourse.Level;
                    $scope.SCode = $scope.Vcourse.Code;
                    $scope.Sstudents = $scope.Vcourse.Students;
                    if (b == 1) {
                        $('#showcours').toggle('slow');
                        b = 0;
                        $scope.errorCourseNE = "";
                    }
                   
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.errorCourseNE = "course does not exist";
                });
              
            }

        }//

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

        //put student/id
        if (Des == "SStudents") {
            Des = "Students";
            if ($scope.SSName && $scope.SGender && $scope.SYear && $scope.SAge && $scope.Vstudent.Id) {
                var Data = { "Id": $scope.Vstudent.Id, "Name": $scope.SSName, "Gender": $scope.SGender, "Age": $scope.SAge, "Year": $scope.SYear };
                var jData = JSON.stringify(Data);
                $http.put("/api/" + Des + "/" + $scope.Vstudent.Id, jData, []).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                    Refresh(Des);
                    $scope.errorStudentAT = "";
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.errorStudentAT = "something went wrong .. name already taken";
                });
                    

            }
        }
        //

        //assign course to student
        if (Des == "coursetoStudent") {
            Des = "Students";
            if ($scope.SId) {
                for (i = $scope.courses.length ; i > 0; i--) {
                    if ($scope.courses[i - 1].Name == $scope.coursetoStudent) {
                        $scope.studenttoadd = $scope.courses[i - 1];
                    }
                }
                $scope.Vstudent.Courses[$scope.Vstudent.Courses.length] = $scope.studenttoadd;
                var jData = $scope.Vstudent;

                $http.put("/api/" + Des + "/" + $scope.Vstudent.Id, jData, []).success(function (DataR) {
                    Refresh(Des);
                });

            }
        }
        //


        //get student/id
        if (Des == "VStudents") {

            Des = "Students";
            if ($scope.studenttoEdit) {
                for (i = $scope.students.length ; i > 0 ; i--) {
                    var a = $scope.students[i - 1].Name;
                    if (a == $scope.studenttoEdit) {
                   
                        $scope.SId = $scope.students[i - 1].Id;
                    }
                }
                $http.get("/api/" + Des + "/" + $scope.SId).then(function successCallback(response) {
                    $scope.Vstudent = response.data;
                    $scope.SSName = $scope.Vstudent.Name;
                    $scope.SGender = $scope.Vstudent.Gender;
                    $scope.SAge = $scope.Vstudent.Age;
                    $scope.SYear = $scope.Vstudent.Year;
                    $scope.Ccourses = $scope.Vstudent.Courses;
                    if (c == 1) {
                        $('#showstudent').toggle('slow');
                        c = 0;
                        $scope.errorStudentNE = "";
                    }
                 
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $scope.errorStudentNE = "student does not exist";
                });
               
                //}
            }
            //



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