app.controller("coursesCtrl", function ($scope, /*vcRecaptchaService,*/ $http/*, ApiCall*/) {
    // get courses
    $http.get("/api/Cours")
         .then(function (response) {
             $scope.courses = response.data;

         });



    //refresh scope
    var Refresh = function (Des) {

        

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


       
    }





});