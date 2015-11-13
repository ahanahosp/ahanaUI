<%@ page language="java" contentType="text/html; charset=UTF-8" errorPage="vinCubeErrorPage.jsp" pageEncoding="UTF-8"%>
<%@page import="java.util.UUID"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en" data-ng-app="app">
<head>
  	<meta charset="utf-8" />
  	<title>VinCube</title>
  	<meta name="description" content="app, web app, responsive, responsive layout, admin, admin panel, admin dashboard, flat, flat ui, ui kit, AngularJS, ui route, charts, widgets, components" />
  	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  	<link rel="stylesheet" href="<%=request.getContextPath()%>/views/css/bootstrap.css" type="text/css" />
  	<link rel="stylesheet" href="<%=request.getContextPath()%>/views/css/animate.css" type="text/css" />
  	<link rel="stylesheet" href="<%=request.getContextPath()%>/views/css/font-awesome.min.css" type="text/css" />
  	<link rel="stylesheet" href="<%=request.getContextPath()%>/views/css/simple-line-icons.css" type="text/css" />
  	<link rel="stylesheet" href="<%=request.getContextPath()%>/views/css/font.css" type="text/css" />
  	<link rel="stylesheet" href="<%=request.getContextPath()%>/views/vendor/angular/angular-ng-table/ng-table.css" type="text/css" />
  	<link rel="stylesheet" href="<%=request.getContextPath()%>/views/css/app.css" type="text/css" />
</head>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Cache-Control", "no-store");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
	String param = (String) request.getParameter("error");
%>
<body data-ng-controller="AppCtrl">
  <div class="app" id="app" ng-class="{'app-header-fixed':app.settings.headerFixed, 'app-aside-fixed':app.settings.asideFixed, 'app-aside-folded':app.settings.asideFolded, 'app-aside-dock':app.settings.asideDock, 'container':app.settings.container}">
  	<div class="container w-xxl w-auto-xs" data-ng-controller="SigninFormController" ng-init="app.settings.container = false;">
	  <a href class="navbar-brand block m-t">{{app.name}}</a>
	  <div class="m-b-lg">
		    <div class="wrapper text-center">
		      <strong>Sign in to get in touch</strong>
		    </div>
		    <form name='form' id="form" action="<%=request.getContextPath()%>/j_spring_security_check" method='POST' name="form" class="form-validation">
		    	<div class="text-danger wrapper text-center" >
		    		<i class="fa fa-warning"></i>
		    		<c:choose>
			    		<c:when test="${param.error!=null && param.error == 'invalidPassword'}">
			    			Invalid username or password.
			    		</c:when>
			    		<c:when test="${param.error!=null && param.error == 'accountLocked'}">
	       					User account locked please contact support.
					    </c:when>
					    <c:when test="${param.error!=null && param.error == 'accountDisabled'}">
	       					User account disabled please contact support.
					    </c:when>
					    <c:when test="${param.error!=null && param.error == 'userAccountNotActivated'}">
					        Account not in active please contact support.
					    </c:when>
					    <c:when test="${param.error!=null && param.error == 'accessDenied'}">
					        Access Denied please contact support.
					    </c:when>
					    <c:when test="${param.error!=null && param.error == 'serviceNotAvailable'}">
					        Service not available.
					    </c:when>
					    <c:when test="${param.error!=null}">
					        Service not available.
					    </c:when>
					</c:choose> 
		    	</div>
		      	<div class="list-group list-group-sm">
			        <div class="list-group-item">
			          <input type="text" placeholder="Email" class="form-control no-border" ng-model="user.email"  required id="j_username" name="j_username" autofocus="autofocus" value="selva@gmail.com" maxlength="50" title="Email" tabindex="1" autocomplete="off"/>
			        </div>
			        <div class="list-group-item">
			           <input type="password" placeholder="Password" class="form-control no-border" ng-model="user.password" required id="password" name="j_password" maxlength="50" title="password" value="test123" tabindex="2" autocomplete="off"/>
			        </div>
			        <%-- <csrf:csrfToken/> --%>
		      	</div>
		      	<button type="submit" class="btn btn-lg btn-primary btn-block" ng-click="login()" ng-disabled='form.$invalid'>Log in</button>
		      	<div class="text-center m-t m-b"><a ui-sref="access.forgotpwd">Forgot password?</a></div>
		      	<div class="line line-dashed"></div>
		    </form>
	  </div>
	  <div class="text-center" ng-include="'<%=request.getContextPath()%>/views/tpl/blocks/page_footer.html'"></div>
	</div>
	</div>
  <!-- jQuery -->
  <script src="<%=request.getContextPath()%>/views/vendor/jquery/jquery.min.js"></script>

  <!-- Angular -->
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular.js"></script>
  
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular-animate/angular-animate.js"></script>
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular-cookies/angular-cookies.js"></script>
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular-resource/angular-resource.js"></script>
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular-sanitize/angular-sanitize.js"></script>
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular-touch/angular-touch.js"></script>
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular-ng-table/ng-table.js"></script>
<!-- Vendor -->
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular-ui-router/angular-ui-router.js"></script> 
  <script src="<%=request.getContextPath()%>/views/vendor/angular/ngstorage/ngStorage.js"></script>

  <!-- bootstrap -->
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular-bootstrap/ui-bootstrap-tpls.js"></script>
  <!-- lazyload -->
  <script src="<%=request.getContextPath()%>/views/vendor/angular/oclazyload/ocLazyLoad.js"></script>
  <!-- translate -->
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular-translate/angular-translate.js"></script>
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular-translate/loader-static-files.js"></script>
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular-translate/storage-cookie.js"></script>
  <script src="<%=request.getContextPath()%>/views/vendor/angular/angular-translate/storage-local.js"></script>

  <!-- App -->
  <script src="<%=request.getContextPath()%>/views/js/app.js"></script>
  <script src="<%=request.getContextPath()%>/views/js/config.js"></script>
  <script src="<%=request.getContextPath()%>/views/js/main.js"></script>
  <script src="<%=request.getContextPath()%>/views/js/services/ui-load.js"></script>
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
  <script src="<%=request.getContextPath()%>/views/js/directives/ui-validate.js"></script>
  <script src="<%=request.getContextPath()%>/views/js/controllers/signin.js"></script>  
  <script>
  	var path = "<%=request.getContextPath()%>/";
  </script>
  
  <!-- Lazy loading -->
</body>
</html>