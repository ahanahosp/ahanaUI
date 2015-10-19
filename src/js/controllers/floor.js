'use strict';
/* Controllers */
app.controller ('FloorController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope){
  $scope.saveFloor = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.floorForm.$valid){
      $http ({
        url: path + "rest/secure/common/createFloor",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $state.go ('app.floor');
            }
            else{
              $scope.successMessage = "Floor saved successfully";
              $scope.data = {};
            }
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    }
  };
  $scope.reset = function (){
    $scope.data = {};
  }
  $scope.loadFloorList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getAllActiveFloor",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.floorDetails;
        }
        else{
          data = []
          $scope.errorData = response.data;
        }
        $scope.tableParams = new NgTableParams ({
          page: 1,            // show first page
          count: 25,           // count per page
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
            $defer.resolve ($scope.floors = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
          }
        });
      }
    )
  }
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.floorSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.floorSelectedItems = [];
    }
    angular.forEach ($scope.floors, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.floorSelectedItems = [];
    if (!$scope.floors){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.floors.length;
    angular.forEach ($scope.floors, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.floorSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.floorSelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  $scope.loadFloorDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getFloorByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.floor;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.deleteMultipleFloors = function (){
  };
  $scope.editMultipleFloors = function (){
    $scope.errorData = "";
    var modalDefaults = {
      templateUrl: 'tpl/edit_multiple_floor.html'
    };
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Update',
      headerText: 'Edit Multiple Floors',
      floorSelectedItems: $scope.floorSelectedItems
    };
    modalService.showModal (modalDefaults, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/user/deleteRole",
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (obj){
          var str = [];
          for (var p in obj)
            str.push (encodeURIComponent (p) + "=" + encodeURIComponent (obj[p]));
          return str.join ("&");
        },
        data: {oid: oid}
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            $scope.loadRolesList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
  $scope.deleteFloor = function (oid, name){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Floor?',
      bodyText: 'Are you sure you want to delete this floor - ' + name + '?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/common/deleteFloor",
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (obj){
          var str = [];
          for (var p in obj)
            str.push (encodeURIComponent (p) + "=" + encodeURIComponent (obj[p]));
          return str.join ("&");
        },
        data: {oid: oid}
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            $scope.loadFloorList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);