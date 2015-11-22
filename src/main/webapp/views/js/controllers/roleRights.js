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
    $http.get (path + "rest/secure/user/getSavedRightsByRoleOid?roleOid="+ $scope.data.roleOid).then (
      function (response){
        $scope.modules = response.data.rightsDetails;
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
  )
  $scope.saveRoleRights = function (){
    $scope.errorData = "";
    var selectedRoles = [];
    angular.forEach ($scope.data.modules, function (value, key){
        angular.forEach (value, function (invalue, inkey){
          if (invalue === 'ACT'){
            selectedRoles.push (inkey);
          }
        });
      }
    );
    var data = {
      'roleOid': $scope.data.roleOid,
      'organizationOid': $scope.data.organizationOid,
      'moduleOids': selectedRoles
    };
    if ($scope.roleRightsForm.$valid){
      $http ({
        url: path + "/rest/secure/user/saveRoleRights",
        method: "POST",
        data: data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            $scope.data = {};
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    }
  };
}]);
