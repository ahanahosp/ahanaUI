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
	$scope.getSavedRoles = function (){
	    $http.get (path + "rest/secure/user/getSavedRolesByUserOid?userOid="+ $scope.data.userOid).then (
	      function (response){
	        $scope.roleDetails = response.data.userRoleDetails;
	      }
	    )
	  }
			  
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
      
      $scope.saveUserRole = function (){
    	  $scope.errorData = "";
    	  var selectedRoles = [];
    	  angular.forEach ($scope.data.roleDetails, function (value, key){
    		  angular.forEach (value, function (invalue, inkey){
	    	      if (invalue === 'ACT'){
	    	    	  selectedRoles.push (inkey);
	    	      }
    		  });
    	  }
    	 );
    	 var data = {
    			 'userOid': $scope.data.userOid,
    			 'roleOids': selectedRoles
    	    };
    	    if ($scope.userRoleForm.$valid){
    	      $http ({
    	        url: path + "/rest/secure/user/createUserRole",
    	        method: "POST",
    	        data: data
    	      }).then (
    	        function (response){
    	          if (response.data.Status === 'Ok'){
    	            $scope.data = {};
    	          } else{
    	            $scope.errorData = response.data;
    	          }
    	        }
    	      )
    	    }
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