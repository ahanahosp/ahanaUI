<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1" %>
<script>
    var redirectState = "/access/login";
    <%
        HttpSession session = request.getSession(false);
        if(session != null){ %>
    redirectState = "/app/inpatient-new";
    <%} %>
</script>
<%@include file="index.html" %>
