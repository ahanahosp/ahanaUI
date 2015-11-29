<%@page import="com.ahana.commons.system.domain.user.UserProfileView"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" errorPage="vinCubeErrorPage.jsp" pageEncoding="UTF-8"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContext"%>
<html>
<head>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Cache-Control", "no-store");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
	SecurityContext securityContext = SecurityContextHolder.getContext();
	Authentication authentication = securityContext.getAuthentication();
	if(authentication != null){
		try{
			UserProfileView userProfile = (UserProfileView) authentication.getPrincipal(); 
			RequestDispatcher dispatcher = request.getRequestDispatcher("/services/rest/local/secure/doPostLogin");
			dispatcher.forward(request,response);
		}catch(Exception e){
			RequestDispatcher dispatcher = request.getRequestDispatcher("/services/rest/local/showLogin");
			dispatcher.forward(request,response);
		}
	}else{
		RequestDispatcher dispatcher = request.getRequestDispatcher("/services/rest/local/showLogin");
		dispatcher.forward(request,response);
	}
%>
</head>
<body>
</body>
</html>