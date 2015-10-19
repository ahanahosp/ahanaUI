'use strict';
/* Controllers */
app.controller ('OrganizationController', ['$scope', '$http', 'NgTableParams', '$state', function ($scope, $http, NgTableParams, $state){
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
}]);