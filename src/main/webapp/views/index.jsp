<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<%@page import="com.ahana.commons.system.domain.user.UserProfile" %>
<%@page import="org.springframework.security.core.context.SecurityContextHolder" %>
<%@page import="org.springframework.security.core.Authentication" %>
<%@page import="org.springframework.security.core.context.SecurityContext" %>

<!DOCTYPE html>
<html lang="en" data-ng-app="app">
<head>
    <meta charset="utf-8" />
    <title>Ahana Hospital HMS</title>
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/views/bower_components/bootstrap/dist/css/bootstrap.css" type="text/css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/views/bower_components/animate.css/animate.css" type="text/css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/views/bower_components/font-awesome/css/font-awesome.min.css" type="text/css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/views/bower_components/simple-line-icons/css/simple-line-icons.css" type="text/css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/views/bower_components/ng-table/ng-table.min.css" type="text/css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/views/css/font.css" type="text/css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/views/css/app.css" type="text/css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/views/css/style.css" type="text/css" />
    <link rel="stylesheet" href="<%=request.getContextPath()%>/views/css/slidebars.css" type="text/css" />
    <script>
        var contextPath = "<%=request.getContextPath()%>/";
        var basePath = "<%=request.getContextPath()%>/app/";
        var redirectState = "/access/login";
        <%
            response.setHeader("Cache-Control", "no-cache");
            response.setHeader("Cache-Control", "no-store");
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0);
            SecurityContext securityContext = SecurityContextHolder.getContext();
            Authentication authentication = securityContext.getAuthentication();
            if(authentication != null){
                try{
                    UserProfile userProfile = (UserProfile) authentication.getPrincipal();
        %>
        redirectState = "/app/inpatient-new";

        <%
                }catch(Exception e){
                }
            }
        %>
        var path = contextPath+"services/";
    </script>
</head>
<body ng-controller="AppCtrl">

<div id="sb-site">

    <div class="app" id="app" ng-class="{'app-header-fixed':app.settings.headerFixed, 'app-aside-fixed':app.settings.asideFixed, 'app-aside-folded':app.settings.asideFolded, 'app-aside-dock':app.settings.asideDock, 'container':app.settings.container}" ui-view></div>

</div>

<div class="sb-slidebar sb-right">
    <!-- Your right Slidebar content. -->

    <div class="thumb-bg">

        <a class="sb-close" href="#"> <img src="img/close.png" alt=""></a>
        <h4> Menu</h4>

        <div class="clearfix"></div>

        <h2> Ahana Hospitals </h2>

        <img src="img/user-thumb.jpg" alt="" class="thumb-img">

        <p><a href="#"> <i class="fa fa-sign-out"></i> Logout </a></p>

    </div>

    <div class="doctor-name">
        <b> Dr.vikhram </b> <br />

        Ramasubramanian

    </div>

</div>

<!-- jQuery -->
<script src="<%=request.getContextPath()%>/views/bower_components/jquery/dist/jquery.min.js"></script>

<!-- Angular -->
<script src="<%=request.getContextPath()%>/views/bower_components/angular/angular.js"></script>

<script src="<%=request.getContextPath()%>/views/bower_components/angular-animate/angular-animate.js"></script>
<script src="<%=request.getContextPath()%>/views/bower_components/angular-cookies/angular-cookies.js"></script>
<script src="<%=request.getContextPath()%>/views/bower_components/angular-resource/angular-resource.js"></script>
<script src="<%=request.getContextPath()%>/views/bower_components/angular-sanitize/angular-sanitize.js"></script>
<script src="<%=request.getContextPath()%>/views/bower_components/angular-touch/angular-touch.js"></script>

<script src="<%=request.getContextPath()%>/views/bower_components/angular-ui-router/release/angular-ui-router.js"></script>
<script src="<%=request.getContextPath()%>/views/bower_components/ngstorage/ngStorage.js"></script>
<script src="<%=request.getContextPath()%>/views/bower_components/angular-ui-utils/ui-utils.js"></script>

<!-- bootstrap -->
<script src="<%=request.getContextPath()%>/views/bower_components/angular-bootstrap/ui-bootstrap-tpls.js"></script>
<!-- lazyload -->
<script src="<%=request.getContextPath()%>/views/bower_components/oclazyload/dist/ocLazyLoad.js"></script>
<!-- translate -->
<script src="<%=request.getContextPath()%>/views/bower_components/angular-translate/angular-translate.js"></script>
<script src="<%=request.getContextPath()%>/views/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js"></script>
<script src="<%=request.getContextPath()%>/views/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js"></script>
<script src="<%=request.getContextPath()%>/views/bower_components/angular-translate-storage-local/angular-translate-storage-local.js"></script>
<script src="<%=request.getContextPath()%>/views/bower_components/ng-table/ng-table.min.js"></script>

<!-- App -->
<script src="<%=request.getContextPath()%>/views/js/app.js"></script>
<script src="<%=request.getContextPath()%>/views/js/config.js"></script>
<script src="<%=request.getContextPath()%>/views/js/config.lazyload.js"></script>
<script src="<%=request.getContextPath()%>/views/js/config.router.js"></script>
<script src="<%=request.getContextPath()%>/views/js/main.js"></script>
<script src="<%=request.getContextPath()%>/views/js/services/ui-load.js"></script>
<script src="<%=request.getContextPath()%>/views/js/services/modal-service.js"></script>
<script src="<%=request.getContextPath()%>/views/js/filters/fromNow.js"></script>
<script src="<%=request.getContextPath()%>/views/js/directives/setnganimate.js"></script>
<script src="<%=request.getContextPath()%>/views/js/directives/ui-butterbar.js"></script>
<script src="<%=request.getContextPath()%>/views/js/directives/ui-focus.js"></script>
<script src="<%=request.getContextPath()%>/views/js/directives/ui-fullscreen.js"></script>
<script src="<%=request.getContextPath()%>/views/js/directives/ui-jq.js"></script>
<script src="<%=request.getContextPath()%>/views/js/directives/ui-module.js"></script>
<script src="<%=request.getContextPath()%>/views/js/directives/ui-nav.js"></script>
<script src="<%=request.getContextPath()%>/views/js/directives/ui-scroll.js"></script>
<script src="<%=request.getContextPath()%>/views/js/directives/ui-shift.js"></script>
<script src="<%=request.getContextPath()%>/views/js/directives/ui-toggleclass.js"></script>
<script src="<%=request.getContextPath()%>/views/js/controllers/bootstrap.js"></script>
<script src="<%=request.getContextPath()%>/views/js/custom.js"></script>
<script src="<%=request.getContextPath()%>/views/js/slidebars.js"></script>
<script type="text/ng-template" id="ng-table/headers/checkbox.html">
    <label class="i-checks ">
        <input type="checkbox" ng-model="checkboxes.checked" id="select_all" name="filter-checkbox" value="" /> <i></i>
    </label>
</script>
<!-- Lazy loading -->
</body>
</html>