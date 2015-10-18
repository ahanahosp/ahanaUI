'use strict';
/* Controllers */
app.controller ('RolesRightsController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope){
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
  $scope.saveRolesRights = function (){
    $scope.errorData = "";
    var roleRightsData = $scope.data;
    console.log (roleRightsData.modules);
    for (var module in roleRightsData.modules){
      console.log (module);
    }
    /*if ($scope.roleRightsForm.$valid){
     $http ({
     url: path + "/rest/secure/user/saveRoleRights",
     method: "POST",
     data: roleRightsData
     }).then (
     function (response){
     if (response.data.Status === 'Ok'){
     $scope.data = {};
     }
     }
     )
     }*/
  };
}]);
