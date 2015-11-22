<html>
<head>
	<style>
		.mainLoadingImg{
			margin-top:200px;
		}
	</style>
</head>
<body>
<div align="center"><img src="<%=request.getContextPath() %>/images/app/loading-main.gif">loading...</div>
<%
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Cache-Control", "no-store");
	response.setHeader("Pragma", "no-cache");
	response.setDateHeader("Expires", 0);
%>
<script language="JavaScript">
	history.forward();
	window.top.location.href = "<%=request.getContextPath()%>/services/rest/secure/doPostLogin";
</script>
</body>
</html>