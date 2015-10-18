'use strict';
/* Controllers */
app.controller ('RoomTypeController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope){
  $scope.saveRoomType = function (mode){
    if ($scope.roomTypeForm.$valid){
      $http ({
        url: path + "rest/secure/common/createRoomType",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $state.go ('app.roomType');
            }
            else{
              $scope.data = {};
            }
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    }
  }
  $scope.reset = function (){
    $scope.data = {};
  };
  $scope.loadRoomTypeList = function (){
    $http ({
      url: path + "rest/secure/common/getAllRoomType",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.roomTypeDetails;
        }
        else{
          data = [];
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
            $defer.resolve ($scope.roomTypes = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.roomTypeSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.roomTypeSelectedItems = [];
    }
    angular.forEach ($scope.roomTypes, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.roomTypeSelectedItems = [];
    if (!$scope.roomTypes){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.roomTypes.length;
    angular.forEach ($scope.roomTypes, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.roomTypeSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.roomTypeSelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  $scope.loadRoomTypeDetails = function (){
    $http ({
      url: path + "rest/secure/common/getRoomTypeByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.roomType;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.deleteMultipleRoomTypes = function (){
  };
  $scope.editMultipleRoomTypes = function (){
    $scope.errorData = "";
    var modalDefaults = {
      templateUrl: 'tpl/edit_multiple_room_type.html'
    };
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Update',
      headerText: 'Edit Multiple Room Types',
      roomTypeSelectedItems: $scope.roomTypeSelectedItems
    };
    modalService.showModal (modalDefaults, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/common/deleteRoomType",
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
            $scope.loadRoomTypesList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
  $scope.deleteRoomType = function (oid, name){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete RoomType?',
      bodyText: 'Are you sure you want to delete this Room Type - ' + name + '?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/common/deleteRoomType",
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
            $scope.loadRoomTypeList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);
