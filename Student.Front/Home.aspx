<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="Student.Front.Home" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Home Page - My ASP.NET Application</title>
    <link href="/Content/bootstrap/bootstrap.css" rel="stylesheet" />
    <link href="/Content/site.css" rel="stylesheet" />

    <link href="/Content/fa/font-awesome.css" rel="stylesheet" />

    <link href="/Content/bootstrap/bootstrap.css" rel="stylesheet" />
    <link href="/Content/site.css" rel="stylesheet" />

    <script type="text/javascript" async="" src="https://www.gstatic.com/recaptcha/api2/r20160726102812/recaptcha__en.js"></script>
    <script src="/Scripts/modern/modernizr-2.6.2.js"></script>


</head>
<body>




    <div class="jumbotron">
        <h1>this is a student courser demo</h1>
        <p class="lead">in this demo you will be able to view edit add and assign students to courses.</p>
    </div>

    <div class="row" ng-app="mainApp">
        
        <div ng-view></div>

    </div>





    <script src="/Scripts/jquery/jquery-1.10.2.js"></script>

    <script src="/Scripts/bootstrap/bootstrap.js"></script>
    <script src="/Scripts/angular/angular.js"></script>

    <script src="/Scripts/angular/angular-route.min.js"></script>
    <script src="/Scripts/angular/angular-route.js"></script>
    <script src="/Scripts/angular/angular-mocks.js"></script>
    <script src="/Scripts/angular/angular-recaptcha.min.js"></script>

    <script src="/Scripts/app.js"></script>

    <script src="/Scripts/controller/MainControllers.js"></script>
     <script src="/Scripts/controller/Coursesctrl.js"></script>
     <script src="/Scripts/controller/Studentsctrl.js"></script>
     <script src="/Scripts/controller/Editctrl.js"></script>

    <script src="/Scripts/angular/angular-recaptcha.js"></script>


    <script src="https://www.google.com/recaptcha/api.js" async="" defer=""></script>

</body>
</html>

