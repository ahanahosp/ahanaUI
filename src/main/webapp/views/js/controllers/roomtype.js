'use strict';
/* Controllers */
app.controller ('RoomTypeController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $scope.saveRoomType = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.roomTypeForm.$valid){
      $http ({
        url: path + "rest/secure/common/createRoomType",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Room type updated successfully";
              $timeout (function (){
                $state.go ('app.roomType')
              }, 1000);
            }
            else{
              $scope.successMessage = "Room type saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.roomType')
              }, 1000);
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
            $scope.checkboxes = {'checked': false, items: {}};
            $scope.roomTypeSelectedItems = [];
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
    $scope.modalSuccessMessage = "";
    var modalDefaults = {
      templateUrl: contextPath + 'views/tpl/edit_multiple_room_type.html',
      controller: function ($scope, $modalInstance, $state){
        $scope.modalOptions = modalOptions;
        $scope.saveMultipleRoomType = function (){
          $scope.modalSuccessMessage = "";
          $scope.modalErrorData = "";
          $http ({
            url: path + "rest/secure/config/createOrUpdateMultipleRoomType",
            method: "POST",
            data: {"roomType": $scope.modalOptions.roomTypeSelectedItems}
          }).then (
            function (response){
              if (response.data.Status === 'Ok'){
                $scope.modalSuccessMessage = "Room type updated successfully";
                $timeout (function (){
                  $modalInstance.close (response);
                  $state.go ('app.roomType', {}, {reload: true});
                }, 1000);
              }
              else{
                $scope.modalErrorData = response.data;
              }
            }
          )
        };
        $scope.close = function (result){
          $modalInstance.dismiss ('cancel');
        };
      }
    };
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Update',
      headerText: 'Edit Multiple Room Types',
      roomTypeSelectedItems: $scope.roomTypeSelectedItems
    };
    modalService.showModal (modalDefaults, modalOptions);
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
