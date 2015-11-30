'use strict';
/* Controllers */
app.controller ('RoomController',
  ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout',
    function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $http.get (path + "rest/secure/common/getWardValues").then (
    function (response){
      $scope.wards = response.data.wardDetails;
    }
  );
  $scope.saveRoom = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.roomForm.$valid){
      $http ({
        url: path + "rest/secure/common/createRoom",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Room updated successfully";
              $timeout (function (){
                $state.go ('app.room');
              }, 1000)
            }
            else{
              $scope.successMessage = "Room saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.room');
              }, 1000)
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
  $scope.loadRoomList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getAllRooms",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.roomDetails;
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
            $defer.resolve ($scope.rooms = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
            $scope.checkboxes = {'checked': false, items: {}};
            $scope.roomSelectedItems = [];
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.roomSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.roomSelectedItems = [];
    }
    angular.forEach ($scope.rooms, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.roomSelectedItems = [];
    if (!$scope.rooms){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.rooms.length;
    angular.forEach ($scope.rooms, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.roomSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.roomSelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  $scope.loadRoomDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getRoomByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.room;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.deleteMultipleRooms = function (){
  };
  $scope.editMultipleRooms = function (){
    $scope.errorData = "";
    $scope.modalSuccessMessage = "";
    var modalDefaults = {
      templateUrl: contextPath + 'views/tpl/edit_multiple_room.html',
      controller: function ($scope, $modalInstance, $state){
        $scope.modalOptions = modalOptions;
        $scope.saveMultipleRoom = function (){
          $scope.modalSuccessMessage = "";
          $scope.modalErrorData = "";
          $http ({
            url: path + "rest/secure/config/createOrUpdateMultipleRoom",
            method: "POST",
            data: {"room": $scope.modalOptions.roomSelectedItems}
          }).then (
            function (response){
              if (response.data.Status === 'Ok'){
                $scope.modalSuccessMessage = "Room updated successfully";
                $timeout (function (){
                  $modalInstance.close (response);
                  $state.go ('app.room', {}, {reload: true});
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
      headerText: 'Edit Multiple Rooms',
      roomSelectedItems: $scope.roomSelectedItems,
      wards: $scope.wards
    };
    modalService.showModal (modalDefaults, modalOptions);
  };
  $scope.deleteRoom = function (oid){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Room?',
      bodyText: 'Are you sure you want to delete this Room?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/common/deleteRoom",
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