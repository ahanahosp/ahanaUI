'use strict';

//TODO need to move in properties file

/* Controllers */
app
// Registration controller
  .controller('RoomTypeController', ['$scope', '$http','NgTableParams','$state', function($scope, $http, NgTableParams, $state) {
    $scope.saveRoomType = function() {
      if ($scope.roomTypeForm.$valid) {
        $http({
          url: path + "rest/secure/common/createRoomType",
          method: "POST",
          data: $scope.data
        }).then(
          function() {
            $scope.data = {};
            $scope.message = "Room Type saved successfully";
          },
          /**Error handling*/
          function() {
            $scope.error = "Failed save";
          }
        )
      }
    }

    $scope.loadRoomTypeList = function() {
      $http({
        url: path + "rest/secure/common/getAllRoomType",
        method: "GET"
      }).then(
        function(response){
          var data = response.data.roomTypeDetails;
          $scope.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data});
        }
      )
    }

    $scope.loadRoomTypeDetails = function(){
      $http({
        url: path + "rest/secure/common/getRoomTypeByOid?oid="+$state.params.oid,
        method: "GET"
      }).then(
        function(response){
          $scope.data = response.data.roomType;
        }
      )
    }
 }]);

(function() {
  "use strict";

  app.factory("RoomTypeServices", ["$resource", function($resource) {
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