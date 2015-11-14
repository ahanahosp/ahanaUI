<%@page import="com.ahana.commons.system.domain.user.UserProfile"%>
<%@page import="org.springframework.security.core.Authentication"%>
<%@page import="org.springframework.security.core.context.SecurityContext"%>
<%@page import="org.springframework.security.core.context.SecurityContextHolder"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
</head>
<body>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Cache-Control", "no-store");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
	SecurityContext securityContext = SecurityContextHolder.getContext();
	Authentication authentication = securityContext.getAuthentication();
	if(authentication != null && authentication.getPrincipal() instanceof UserProfile){
%>
	<script language="JavaScript">
		history.forward();
		window.top.location.href = "<%=request.getContextPath()%>/#/inpatient-new";
	</script>
<%		
	}else{
		RequestDispatcher dispatcher = request.getRequestDispatcher("/services/rest/showLogin");
		dispatcher.forward(request,response);
	}
%>
</body>
</html>