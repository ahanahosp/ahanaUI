'use strict';

/* Controllers */
app
// Registration controller
  .controller('OrganizationController', ['$scope', '$http','NgTableParams','$state', function($scope, $http, NgTableParams, $state) {
    $scope.loadOrganizationDetails = function () {
        $scope.errorData = "";
        $http ({
          url: path + "rest/secure/common/getDefaultOrganization",
          method: "GET"
        }).then (
          function ( response ) {
            if ( response.data.Status === 'Ok' ) {
              $scope.data = response.data.organizationDetails;
            }
            else {
              $scope.errorData = response.data;
            }
          }
        )
      };    
 }]);

(function() {
  "use strict";

  app.factory("OrganizationServices", ["$resource", function($resource) {
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