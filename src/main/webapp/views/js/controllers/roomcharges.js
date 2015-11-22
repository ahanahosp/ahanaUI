'use strict';
/* Controllers */
app.controller ('RoomChargesController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $http.get (path + "rest/secure/common/getRoomTypesValues").then (
    function (response){
      $scope.roomTypes = response.data.roomTypesDetails;
    }
  )
  $http.get (path + "rest/secure/common/getRoomChargeItemValues").then (
    function (response){
      $scope.roomChargeItems = response.data.roomChargeItemDetails;
    }
  )
  $scope.saveRoomCharges = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.roomChargesForm.$valid){
      $http ({
        url: path + "rest/secure/common/createRoomCharge",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Room charges updated successfully";
              $timeout (function (){
                $state.go ('app.roomCharges')
              }, 1000);
            }
            else{
              $scope.successMessage = "Room charges saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.roomCharges')
              }, 1000);
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
  };
  $scope.loadRoomChargesList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getAllRoomCharges",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.roomChargesDetails;
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
            $defer.resolve ($scope.roomCharges = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
            $scope.checkboxes = {'checked': false, items: {}};
            $scope.roomChargeSelectedItems = [];
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.roomChargeSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.roomChargeSelectedItems = [];
    }
    angular.forEach ($scope.roomCharges, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.roomChargeSelectedItems = [];
    if (!$scope.roomCharges){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.roomCharges.length;
    angular.forEach ($scope.roomCharges, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.roomChargeSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.roomChargeSelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  $scope.loadRoomChargesDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getRoomChargesByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.roomCharges;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.deleteMultipleRoomCharges = function (){
  };
  $scope.editMultipleRoomCharges = function (){
    $scope.errorData = "";
    var modalDefaults = {
      templateUrl: contextPath + 'views/tpl/edit_multiple_room_charge.html'
    };
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Update',
      headerText: 'Edit Multiple Room Charges',
      roomChargeSelectedItems: $scope.roomChargeSelectedItems,
      roomTypes: $scope.roomTypes,
      roomChargeItems: $scope.roomChargeItems
    };
    modalService.showModal (modalDefaults, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/user/deleteRoomCharge",
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
            $scope.loadroomChargesList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
  $scope.deleteRoomCharges = function (oid){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Room Charges?',
      bodyText: 'Are you sure you want to delete this Room Charges?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/common/deleteRoomCharges",
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
            $scope.loadRoomList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);