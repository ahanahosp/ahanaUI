'use strict';
/* Controllers */
app.controller ('RoomChargeItemController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $http.get (path + "rest/secure/common/getCategoryValues").then (
    function (response){
      $scope.categories = response.data.categoryDetails;
    }
  )
  $scope.saveRoomChargeItem = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.roomChargeItemForm.$valid){
      $http ({
        url: path + "rest/secure/common/createRoomChargeItem",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Room charge items updated successfully";
              $timeout (function (){
                $state.go ('app.roomChargeItems');
              }, 1000);
            }
            else{
              $scope.successMessage = "Room charge items saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.roomChargeItems');
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
  $scope.loadRoomChargeItemList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getAllRoomChargeItem",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.roomChargeItemDetails;
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
            $defer.resolve ($scope.roomChargeItems = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
            $scope.checkboxes = {'checked': false, items: {}};
            $scope.roomChargeItemSelectedItems = [];
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.roomChargeItemSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.roomChargeItemSelectedItems = [];
    }
    angular.forEach ($scope.roomChargeItems, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.roomChargeItemSelectedItems = [];
    if (!$scope.roomChargeItems){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.roomChargeItems.length;
    angular.forEach ($scope.roomChargeItems, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.roomChargeItemSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.roomChargeItemSelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  $scope.loadRoomChargeItemDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getRoomChargeItemByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.roomChargeItem;
        }else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  
  $scope.deleteMultipleRoomChargeItems = function (){
	  var selectedRoomChargeItemOids = [];
	    angular.forEach ($scope.roomChargeItemSelectedItems, function (value, key){
	    	selectedRoomChargeItemOids.push (value.oid);
	      }
	    );
	    $scope.errorData = "";
	    var modalOptions = {
	      closeButtonText: 'Cancel',
	      actionButtonText: 'Delete',
	      headerText: 'Delete Multiple Room Charge Item(s)?',
	      bodyText: 'Are you sure you want to delete selected room charge item?'
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
	        data: {"oids": selectedRoomChargeItemOids,"source":"RoomChargeItem"}
	      }).then (
	        function (response){
	          if (response.data.Status === 'Ok'){
	            $scope.loadRoomChargeItemList ();
	          }
	          else{
	            $scope.errorData = response.data;
	          }
	        }
	      )
	    });
  };
  
  $scope.editMultipleRoomChargeItems = function (){
	  $scope.errorData = "";
	  $scope.modalSuccessMessage = "";
	  var modalDefaults = {
	  templateUrl: contextPath + 'views/tpl/edit_multiple_roomchargeitems.html',
	  controller: function ($scope, $modalInstance, $state){
		  $scope.modalOptions = modalOptions;
	      $scope.saveMultipleRoomChargeItems = function (){
	    	  var roomChargeItemSelectedItems = $scope.modalOptions.roomChargeItemSelectedItems;
	          angular.forEach (roomChargeItemSelectedItems, function (value, key){
	            delete value.category;
	          });
	    	  $scope.modalSuccessMessage = "";
	          $scope.modalErrorData = "";
	          $http ({
	            url: path + "rest/secure/config/createOrUpdateMultipleConfig",
	            method: "POST",
	            data: {"roomChargeItems": $scope.modalOptions.roomChargeItemSelectedItems,"source":"roomChargeItems"}
	          }).then (
	          function (response){
	        	  if (response.data.Status === 'Ok'){
	        		  $scope.modalSuccessMessage = "Room Charges Item updated successfully";
	        		  $timeout (function (){
	        			  $modalInstance.close (response);
	        			  $state.go ('app.roomChargeItems', {}, {reload: true});
	        		  }, 1000);
	              }else{
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
			  headerText: 'Edit Multiple Room Charges Item',
			  roomChargeItemSelectedItems: $scope.roomChargeItemSelectedItems,
			  categories: $scope.categories
	  };
	  modalService.showModal (modalDefaults, modalOptions);
  };
  
  $scope.deleteRoomChargeItem = function (oid){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Room Charge Items?',
      bodyText: 'Are you sure you want to delete this Room Charge Item?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/common/deleteRoomChargeItem",
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
            $scope.loadRoomChargeItemList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);