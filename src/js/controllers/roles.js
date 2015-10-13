'use strict';

//TODO need to move in properties file

/* Controllers */
app
// Registration controller
    .controller('RolesController', ['$scope', '$http', function($scope, $http) {
      $scope.saveRoles = function() {
        console.log($scope.roleForm.$valid);
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
    }]);