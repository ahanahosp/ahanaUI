'use strict';
/* Controllers */
app.controller ('OrgModuleController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $scope.loadOrgModuleList = function (){
    $http ({
      url: path + "rest/secure/common/getAllOrganizationModule",
      method: "GET"
    }).then (
      function (response){
        var data = [];
        if (response.data.Status === 'Ok'){
          data = response.data.organizationModuleDetails;
        }
        else{
          data = [];
          $scope.errorData = response.data;
        }
        $scope.tableParams = new NgTableParams ({
          page: 1,            // show first page
          count: 100,           // count per page
          counts: [10, 25, 50, 100]
        }, {
          total: data.length, // length of data
          getData: function ($defer, params){
            // use build-in angular filter
            var orderedData = params.sorting () ?
              $filter ('orderBy') (data, params.orderBy ()) :
              data;
            orderedData = params.filter () ?
              $filter ('filter') (orderedData, params.filter ()) :
              orderedData;
            params.total (orderedData.length); // set total for recalc pagination
            $defer.resolve ($scope.modules = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.moduleSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.moduleSelectedItems = [];
    }
    angular.forEach ($scope.modules, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.moduleSelectedItems = [];
    if (!$scope.modules){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.modules.length;
    angular.forEach ($scope.modules, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.moduleSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.moduleSelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  $scope.updateModuleStatus = function (model, deactivate){
    var selectedModules = $scope.moduleSelected.join (",");
    $http ({
      url: path + "rest/secure/common/updateModuleStatus",
      method: "POST",
      data: selectedModules
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          loadOrgModuleList ();
        }
        else{
          $scope.errorData = response.data;
        }
      }
    );
  }
}]);