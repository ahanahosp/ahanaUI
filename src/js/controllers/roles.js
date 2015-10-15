'use strict';

//TODO need to move in properties file

/* Controllers */
app
// Registration controller
  .controller('RolesController', ['$scope', '$http','NgTableParams','$state', function($scope, $http, NgTableParams, $state) {
    $scope.saveRoles = function() {
      if ($scope.roleForm.$valid) {
        $http({
          url: path + "rest/secure/user/createRole",
          method: "POST",
          data: $scope.data
        }).then(
          function() {
            $scope.data = {};
            $scope.message = "Roles saved successfully";
          },
          /**Error handling*/
          function() {
            $scope.error = "Failed save";
          }
        )
      }
    }

    $scope.loadRolesList = function() {
      $http({
        url: path + "rest/secure/user/getActiveRoles",
        method: "GET"
      }).then(
        function(response){
          var data = response.data.roleDetails;
          $scope.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data});
        }
      )
    }

    $scope.loadRoleDetails = function(){
      $http({
        url: path + "rest/secure/user/getRoleByOid?oid="+$state.params.oid,
        method: "GET"
      }).then(
        function(response){
          $scope.data = response.data.roles;
        }
      )
    }
 }]);

(function() {
  "use strict";

  app.factory("RolesServices", ["$resource", function($resource) {
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
