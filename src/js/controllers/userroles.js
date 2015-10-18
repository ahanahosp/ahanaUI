'use strict';
/* Controllers */
app
// Registration controller
  .controller('UserRoleController', ['$scope', '$http','NgTableParams','$state', function($scope, $http, NgTableParams, $state) {
    
	$http.get (path + "rest/secure/user/getAllUserOidAndName").then (
		function (response){
			$scope.userDetails = response.data.userDetails;
		}
	)
	
	$http.get (path + "rest/secure/user/getActiveRoles").then (
		function (response){
			$scope.roleDetails = response.data.roleDetails;
		}
	)
			  
	$scope.loadOrganizationDetails = function () {
		$scope.errorData = "";
        $http ({
          url: path + "rest/secure/common/getDefaultOrganization",
          method: "GET"
        }).then (
          function ( response ) {
            if ( response.data.Status === 'Ok' ) {
              $scope.data = response.data.organizationDetails;
            }
            else {
              $scope.errorData = response.data;
            }
          }
        )
      };    
 }]);

(function() {
  "use strict";

  app.factory("UserRoleServices", ["$resource", function($resource) {
    return $resource("https://api.github.com/repos/:username/:repo/issues", {
      state: "open"
    }, {
      query: {
        method: "GET",
        isArray: true
      }
    });
  }]);
})();