/**
 * Searches an array for an object with a specified property.
 *
 * Example usage:
 * <code>var index = myArray.indexOfObjectWithProperty('id', 123);</code>
 *
 * @param propertyName the name of the property to inspect
 * @param propertyValue the value to match
 * @returns the (zero-based) index at which the object was found, or -1 if no
 * such object was found
 */
Array.prototype.indexOfObjectWithProperty = function (propertyName, propertyValue){
  for (var i = 0, len = this.length; i < len; i++){
    if (this[i][propertyName] === propertyValue) return i;
  }
  return -1;
};
/**
 * Test if an array of objects contains an object with a specified property.
 *
 * Example usage:
 * <code>var isPresent = myArray.containsObjectWithProperty('id', 123);</code>
 *
 * @param propertyName the name of the property to inspect
 * @param propertyValue the value to match
 * @returns true if an object was found, false otherwise
 */
Array.prototype.containsObjectWithProperty = function (propertyName, propertyValue){
  return this.indexOfObjectWithProperty (propertyName, propertyValue) != -1;
};
'use strict';
/* Controllers */
app.controller ('RolesRightsController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $http ({
    url: path + "rest/secure/user/getActiveRoles",
    method: "GET"
  }).then (
    function (response){
      if (response.data.Status === 'Ok'){
        $scope.roles = response.data.roleDetails;
      }
      else{
        $scope.rolesErrorData = response.data;
      }
    }
  );
  $http ({
    url: path + "rest/secure/common/getAllOrganizationModule",
    method: "GET"
  }).then (
    function (response){
      if (response.data.Status === 'Ok'){
        $scope.modules = response.data.organizationModuleDetails;
      }
      else{
        $scope.moduleErrorData = response.data;
      }
    }
  );
  $scope.getSavedRights = function (){
    $http.get (path + "rest/secure/user/getSavedRightsByRoleOid?roleOid=" + $scope.data.roleOid).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.selectedModules = response.data.rightsDetails;
        }
        else{
          $scope.selectedModules = []
        }
      }
    )
  }
  $http ({
    url: path + "rest/secure/common/getDefaultOrganization",
    method: "GET"
  }).then (
    function (response){
      if (response.data.Status === 'Ok'){
        $scope.organization = response.data.organizationDetails;
        $scope.data = {organizationOid: $scope.organization.oid};
      }
      else{
        $scope.organizationErrorData = response.data;
      }
    }
  );
  $scope.selectedModules = [];
  $scope.toggleSelection = function toggleSelection (module){
    var index = $scope.selectedModules.indexOfObjectWithProperty ('oid', module.oid);
    if (index > -1){
      // Is currently selected, so remove it
      $scope.selectedModules.splice (index, 1);
    }
    else{
      // Is currently unselected, so add it
      $scope.selectedModules.push (module);
    }
  };
  $scope.saveRoleRights = function (){
    $scope.errorData = "";
    $scope.successMessage = "";
    var selectedRoleModules = [];
    angular.forEach ($scope.selectedModules, function (value, key){
        selectedRoleModules.push (value.oid);
      }
    );
    var data = {
      'roleOid': $scope.data.roleOid,
      'organizationOid': $scope.data.organizationOid,
      'moduleOids': selectedRoleModules.join (",")
    };
    if ($scope.roleRightsForm.$valid){
      $http ({
        url: path + "rest/secure/user/saveRoleRights",
        method: "POST",
        data: data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            $scope.successMessage = "Role rights saved successfully";
            $scope.data = {};
            $timeout (function (){
              $state.reload ();
            }, 1000);
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    }
  };
  $scope.reset = function (){
    $scope.selectedModules = [];
    $scope.data = {};
  }
}]);
