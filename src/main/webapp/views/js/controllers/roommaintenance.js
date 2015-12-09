'use strict';
/* Controllers */
app.controller ('RoomMaintenanceController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $scope.saveRoomMaintenance = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.roomMaintenanceForm.$valid){
      $http ({
        url: path + "rest/secure/common/createRoomMaintenance",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Room maintenance updated successfully";
              $timeout (function (){
                $state.go ('app.roomMaintenance');
              }, 1000);
            }
            else{
              $scope.successMessage = "Room maintenance saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.roomMaintenance');
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
  }
  $scope.loadRoomMaintenanceList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getAllRoomMaintenance",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.roomMaintenanceDetails;
        }else{
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
            $defer.resolve ($scope.roomMaintenance = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
            $scope.checkboxes = {'checked': false, items: {}};
            $scope.roomMaintenanceSelectedItems = [];
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.roomMaintenanceSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.roomMaintenanceSelectedItems = [];
    }
    angular.forEach ($scope.roomMaintenance, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.roomMaintenanceSelectedItems = [];
    if (!$scope.roomMaintenance){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.roomMaintenance.length;
    angular.forEach ($scope.roomMaintenance, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.roomMaintenanceSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.roomMaintenanceSelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  
  $scope.loadRoomMaintenanceDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getRoomMaintenanceByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.roomMaintenance;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.deleteMultipleRoomMaintenance = function (){
	  var selectedRoomManintenanceOids = [];
	    angular.forEach ($scope.roomMaintenanceSelectedItems, function (value, key){
	    	selectedRoomManintenanceOids.push (value.oid);
	      }
	    );
	    $scope.errorData = "";
	    var modalOptions = {
	      closeButtonText: 'Cancel',
	      actionButtonText: 'Delete',
	      headerText: 'Delete Multiple Maintenance Detail(s)?',
        bodyText: 'Are you sure you want to delete selected maintenance details ?'
	    };
	    modalService.showModal ({}, modalOptions).then (function (result){
	      $http ({
	        url: path + "rest/secure/config/deleteMultipleObject",
	        method: "POST",
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	        transformRequest: function (obj){
	          var str = [];
	          for (var p in obj)
	            str.push (encodeURIComponent (p) + "=" + encodeURIComponent (obj[p]));
	          return str.join ("&");
	        },
	        data: {"oids": selectedRoomManintenanceOids,"source":"RoomMaintenanceDetails"}
	      }).then (
	        function (response){
	          if (response.data.Status === 'Ok'){
	            $scope.loadRoomMaintenanceList();
	          }
	          else{
	            $scope.errorData = response.data;
	          }
	        }
	      )
	    });
  };
  $scope.editMultipleRoomMaintenance = function (){
    $scope.errorData = "";
    $scope.modalSuccessMessage = "";
    var modalDefaults = {
      templateUrl: contextPath + 'views/tpl/edit_multiple_roommaintenance.html',
      controller: function ($scope, $modalInstance, $state){
        $scope.modalOptions = modalOptions;
        $scope.saveMultipleRoomMaintenance = function (){
          $scope.modalSuccessMessage = "";
          $scope.modalErrorData = "";
          $http ({
            url: path + "rest/secure/config/createOrUpdateMultipleConfig",
            method: "POST",
            data: {"roomMaintenanceDetails": $scope.modalOptions.roomMaintenanceSelectedItems,"source":"roomMaintenanceDetails"}
          }).then (
            function (response){
              if (response.data.Status === 'Ok'){
                $scope.modalSuccessMessage = "Room maintenance updated successfully";
                $timeout (function (){
                  $modalInstance.close (response);
                  $state.go ('app.roomMaintenance', {}, {reload: true});
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
      headerText: 'Edit Multiple Room Maintenance',
      roomMaintenanceSelectedItems: $scope.roomMaintenanceSelectedItems
    };
    modalService.showModal (modalDefaults, modalOptions);
  };
  $scope.deleteRoomMaintenance = function (oid, name){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Room Maintenance?',
      bodyText: 'Are you sure you want to delete this room maintenace?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/common/deleteRoomMaintenance",
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
            $scope.loadRoomMaintenanceList();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);
