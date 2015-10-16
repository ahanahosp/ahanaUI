'use strict';

//TODO need to move in properties file

/* Controllers */
app
// Registration controller
  .controller('SpecialityController', ['$scope', '$http','NgTableParams','$state', function($scope, $http, NgTableParams, $state) {
    $scope.saveSpeciality = function() {
      if ($scope.specialityForm.$valid) {
        $http({
          url: path + "rest/secure/common/createSpeciality",
          method: "POST",
          data: $scope.data
        }).then(
          function() {
            $scope.data = {};
            $scope.message = "Speciality saved successfully";
          },
          /**Error handling*/
          function() {
            $scope.error = "Failed save";
          }
        )
      }
    }

    $scope.loadSpecialityList = function() {
      $http({
        url: path + "rest/secure/common/getAllSpeciality",
        method: "GET"
      }).then(
        function(response){
          var data = response.data.specialityDetails;
          $scope.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data});
        }
      )
    }

    $scope.loadSpecialityDetails = function(){
      $http({
        url: path + "rest/secure/common/getSpecialityByOid?oid="+$state.params.oid,
        method: "GET"
      }).then(
        function(response){
          $scope.data = response.data.speciality;
        }
      )
    }
 }]);

(function() {
  "use strict";

  app.factory("SpecialityServices", ["$resource", function($resource) {
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