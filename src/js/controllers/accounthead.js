'use strict';

//TODO need to move in properties file

/* Controllers */
app
// Registration controller
  .controller('AccountHeadController', ['$scope', '$http','NgTableParams','$state', function($scope, $http, NgTableParams, $state) {
    $scope.saveAccountHead = function() {
      if ($scope.accountHeadForm.$valid) {
        $http({
          url: path + "rest/secure/common/createAccountHead",
          method: "POST",
          data: $scope.data
        }).then(
          function() {
            $scope.data = {};
            $scope.message = "Account Head saved successfully";
          },
          /**Error handling*/
          function() {
            $scope.error = "Failed save";
          }
        )
      }
    }

    $scope.loadAccountHeadList = function() {
      $http({
        url: path + "rest/secure/common/getAllAccountHead",
        method: "GET"
      }).then(
        function(response){
          var data = response.data.accountHeadDetails;
          $scope.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data});
        }
      )
    }

    $scope.loadAccountHeadDetails = function(){
      $http({
        url: path + "rest/secure/common/getAccountHeadByOid?oid="+$state.params.oid,
        method: "GET"
      }).then(
        function(response){
          $scope.data = response.data.accountHead;
        }
      )
    }
 }]);

(function() {
  "use strict";

  app.factory("AccountHeadServices", ["$resource", function($resource) {
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