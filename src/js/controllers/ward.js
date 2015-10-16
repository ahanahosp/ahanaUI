'use strict';

//TODO need to move in properties file

/* Controllers */
app
// Registration controller
  .controller ('WardController', [ '$scope', '$http', 'NgTableParams', '$state', function ( $scope, $http, NgTableParams, $state ) {
  /* $http.get(path + "rest/secure/common/getFloorValues").then(
          function(response) {
            $scope.floors = response.data.floorDetails;
          }
   )*/
	      
    $scope.saveFloor = function() {
      if ($scope.wardForm.$valid) {
        $http({
          url: path + "rest/secure/common/createWard",
          method: "POST",
          data: $scope.data
        }).then(
          function() {
            $scope.data = {};
            $scope.message = "Ward saved successfully";
          },
          /**Error handling*/
          function() {
            $scope.error = "Failed save";
          }
        )
      }
    };

    $scope.loadWardList = function() {
      $http({
        url: path + "rest/secure/common/getAllWards",
        method: "GET"
      }).then(
        function(response){
          var data = response.data.wardDetails;
          $scope.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data});
        }
      )
    };

    $scope.loadWardDetails = function(){
      $http({
        url: path + "rest/secure/common/getWardByOid?oid="+$state.params.oid,
        method: "GET"
      }).then(
        function(response){
          $scope.data = response.data.ward;
        }
      )
    }
 }]);