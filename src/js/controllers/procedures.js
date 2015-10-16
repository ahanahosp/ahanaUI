'use strict';

//TODO need to move in properties file

/* Controllers */
app
// Registration controller
  .controller('ProceduresController', ['$scope', '$http','NgTableParams','$state', function($scope, $http, NgTableParams, $state) {
    $scope.saveProcedures = function() {
      if ($scope.proceduresForm.$valid) {
        $http({
          url: path + "rest/secure/common/createProcedures",
          method: "POST",
          data: $scope.data
        }).then(
          function() {
            $scope.data = {};
            $scope.message = "Procedures saved successfully";
          },
          /**Error handling*/
          function() {
            $scope.error = "Failed save";
          }
        )
      }
    }

    $scope.loadProceduresList = function() {
      $http({
        url: path + "rest/secure/common/getAllProcedures",
        method: "GET"
      }).then(
        function(response){
          var data = response.data.proceduresDetails;
          $scope.tableParams = new NgTableParams({ count: 5}, { counts: [5, 10, 25], dataset: data});
        }
      )
    }

    $scope.loadProceduresDetails = function(){
      $http({
        url: path + "rest/secure/common/getProceduresByOid?oid="+$state.params.oid,
        method: "GET"
      }).then(
        function(response){
          $scope.data = response.data.procedures;
        }
      )
    }
 }]);

(function() {
  "use strict";

  app.factory("ProceduresServices", ["$resource", function($resource) {
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