'use strict';

//TODO need to move in properties file

/* Controllers */
app
// Registration controller
  .controller('OrgModuleController', ['$scope', '$http','NgTableParams','$state', function($scope, $http, NgTableParams, $state) {
    /*$scope.saveFloor = function() {
      if ($scope.floorForm.$valid) {
        $http({
          url: path + "rest/secure/common/createFloor",
          method: "POST",
          data: $scope.data
        }).then(
          function() {
            $scope.data = {};
            $scope.message = "Floor saved successfully";
          },
          *//**Error handling*//*
          function() {
            $scope.error = "Failed save";
          }
        )
      }
    }*/

    $scope.loadOrgModuleList = function() {
      $http({
        url: path + "rest/secure/common/getAllOrganizationModule",
        method: "GET"
      }).then(
        function(response){
          var data = response.data.organizationModuleDetails;
          $scope.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data});
        }
      )
    }
 }]);

(function() {
  "use strict";

  app.factory("OrgModuleServices", ["$resource", function($resource) {
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