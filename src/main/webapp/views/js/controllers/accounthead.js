'use strict';
//TODO need to move in properties file
/* Controllers */
app.controller ('AccountHeadController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $scope.saveAccountHead = function (){
    if ($scope.accountHeadForm.$valid){
      $http ({
        url: path + "rest/secure/common/createAccountHead",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $state.go ('app.accountHead');
            }
            else{
              $scope.successMessage = "Roles saved successfully";
              $scope.data = {};
            }
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    }
  }
  $scope.loadAccountHeadList = function (){
    $http ({
      url: path + "rest/secure/common/getAllAccountHead",
      method: "GET"
    }).then (
      function (response){
        var data = response.data.accountHeadDetails;
        $scope.tableParams = new NgTableParams ({count: 5}, {counts: [5, 10, 25], dataset: data});
      }
    )
  }
  $scope.loadAccountHeadDetails = function (){
    $http ({
      url: path + "rest/secure/common/getAccountHeadByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        $scope.data = response.data.accountHead;
      }
    )
  }
}]);
(function (){
  "use strict";
  app.factory ("AccountHeadServices", ["$resource", function ($resource){
    return $resource ("https://api.github.com/repos/:username/:repo/issues", {
      state: "open"
    }, {
      query: {
        method: "GET",
        isArray: true
      }
    });
  }]);
}) ();