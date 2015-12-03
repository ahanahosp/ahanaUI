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
app
  .controller ('DoctorScheduleController', ['$scope', '$http', 'NgTableParams', '$state', '$timeout', function ($scope, $http, NgTableParams, $state, $timeout){
  $http.get (path + "rest/secure/config/getDoctorDetails").then (
    function (response){
      $scope.doctorDetails = response.data.doctorDetails;
    }
  )
  
  $http.get (path + "rest/secure/lookup/loadLookupByName?lookupNames=days").then (
    function (response){
      $scope.countries = response.data.lookupValues.countryDetails;
      $scope.days = response.data.lookupValues.daysDetails;
    }
  )
  
  $http.get (path + "rest/secure/config/getSavedSchedule").then (
    function (response){
      $scope.roleDetails = response.data.roleDetails;
    }
  )
  $scope.getSavedRoles = function (){
    $scope.errorData = "";
    $scope.successMessage = "";
    $http.get (path + "rest/secure/user/getSavedRolesByUserOid?userOid=" + $scope.data.userOid).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.selectedRoles = response.data.doctorScheduleDetails;
        }
        else{
          $scope.selectedRoles = [];
        }
      }
    )
  };
  $scope.selectedRoles = [];
  $scope.toggleSelection = function toggleSelection (role){
    var index = $scope.selectedRoles.indexOfObjectWithProperty ('oid', role.oid);
    if (index > -1){
      // Is currently selected, so remove it
      $scope.selectedRoles.splice (index, 1);
    }
    else{
      // Is currently unselected, so add it
      $scope.selectedRoles.push (role);
    }
  };

  $scope.loadOrganizationDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getDefaultOrganization",
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.organizationDetails;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.saveDoctorSchedule = function (){
    $scope.errorData = "";
    $scope.successMessage = "";
    var selectedUserRoles = [];
    angular.forEach ($scope.selectedRoles, function (value, key){
        selectedUserRoles.push (value.oid);
      }
    );
    var data = {
      'userOid': $scope.data.userOid,
      'roleOids': selectedUserRoles.join (",")
    };
    if ($scope.doctorScheduleForm.$valid){
        $http ({
          url: path + "rest/secure/user/createUserRole",
          method: "POST",
          data: data
        }).then (
          function (response){
            if (response.data.Status === 'Ok'){
              $scope.successMessage = "User roles saved successfully";
              $scope.selectedRoles = [];
              $scope.data = {};
            }
            else{
              $scope.errorData = response.data;
            }
          }
        )
    }
  };
  $scope.reset = function (){
    $scope.errorData = "";
    $scope.selectedRoles = [];
    $scope.data = {};
  }
}]);
