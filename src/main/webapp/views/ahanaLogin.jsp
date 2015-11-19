<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="container w-xxl w-auto-xs" ng-controller="SigninFormController" ng-init="app.settings.container = false;">
    <a href class="navbar-brand block m-t">{{app.name}}</a>
    <div class="m-b-lg">
        <div class="wrapper text-center">
            <strong>Sign in to get in touch</strong>
        </div>
        <form name="form" class="form-validation" action="<%= request.getContextPath()%>/j_spring_security_check" method="post">
            <div class="text-danger wrapper text-center">
                <c:choose>
                    <c:when test="${param.error!=null && param.error == 'invalidPassword'}"><i class="fa fa-warning"></i> Invalid username or password. </c:when>
                    <c:when test="${param.error!=null && param.error == 'accountLocked'}"><i class="fa fa-warning"></i> User account locked please contact support. </c:when>
                    <c:when test="${param.error!=null && param.error == 'accountDisabled'}"><i class="fa fa-warning"></i> User account disabled please contact support. </c:when>
                    <c:when test="${param.error!=null && param.error == 'userAccountNotActivated'}"><i class="fa fa-warning"></i> Account not in active please contact support. </c:when>
                    <c:when test="${param.error!=null && param.error == 'accessDenied'}"><i class="fa fa-warning"></i> Access Denied please contact support. </c:when>
                    <c:when test="${param.error!=null && param.error == 'serviceNotAvailable'}"><i class="fa fa-warning"></i> Service not available. </c:when>
                    <c:when test="${param.error!=null}"><i class="fa fa-warning"></i> Service not available. </c:when>
                </c:choose>
            </div>
            <div class="list-group list-group-sm">
                <div class="list-group-item">
                    <input type="text" placeholder="Username" name="j_username" class="form-control no-border" ng-model="user.j_username" required>
                </div>
                <div class="list-group-item">
                    <input type="password" placeholder="Password" name="j_password" class="form-control no-border" ng-model="user.j_password" required>
                </div>
            </div>
            <button type="submit" class="btn btn-lg btn-primary btn-block" ng-disabled='form.$invalid'>
                Log in
            </button>
            <div class="text-center m-t m-b"><a ui-sref="access.forgotpwd">Forgot password?</a></div>
        </form>
    </div>
    <div class="text-center" ng-include="'/tpl/blocks/page_footer.html'">
        {% include 'blocks/page_footer.html' %}
    </div>
</div>