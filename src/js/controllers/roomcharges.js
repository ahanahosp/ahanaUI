'use strict';

/* Controllers */
app.controller ('RoomChargesController', [ '$scope', '$http', 'NgTableParams', '$state', 'modalService', function ( $scope, $http, NgTableParams, $state, modalService ) {
  
	$http.get(path + "rest/secure/common/getRoomTypesValues").then(
	    function(response) {
	        $scope.rommTypes = response.data.roomTypesDetails;
	    }
	)
	
	$http.get(path + "rest/secure/common/getRoomChargeItemValues").then(
	    function(response) {
	        $scope.roomChargeItems = response.data.roomChargeItemDetails;
	    }
	)
	
	$scope.saveRoomChargeItem = function () {
    $scope.errorData = "";
    if ( $scope.roomChargesForm.$valid ) {
      $http({
        url: path + "rest/secure/common/createRoomCharge",
        method: "POST",
        data: $scope.data
      }).then(
        function ( response ) {
          if ( response.data.Status === 'Ok' ) {
            $scope.data = {};
          }
          else {
            $scope.errorData = response.data;
          }
        }
      )
    }
  }
  $scope.loadRoomChargesList = function () {
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getAllRoomCharges",
      method: "GET"
    }).then (
      function ( response ) {
        var data;
        if ( response.data.Status === 'Ok' ) {
          data = response.data.roomChargesDetails;
        }else {
          data = []
          $scope.errorData = response.data;
        }
        $scope.tableParams = new NgTableParams ({ count: 5 }, { counts: [ 5, 10, 25 ], dataset: data });
      }
    )
  }
  $scope.loadRoomChargesDetails = function () {
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getRoomChargesByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function ( response ) {
        if ( response.data.Status === 'Ok' ) {
          $scope.data = response.data.roomCharges;
        } else {
          $scope.errorData = response.data;
        }
      }
    )
  }
  $scope.deleteRoomCharges = function ( oid ) {
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Room Charges?',
      bodyText: 'Are you sure you want to delete this Room Charges?'
    };
    modalService.showModal ({}, modalOptions).then (function ( result ) {
      $http ({
        url: path + "rest/secure/common/deleteRoomCharges",
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function ( obj ) {
          var str = [];
          for ( var p in obj )
            str.push (encodeURIComponent (p) + "=" + encodeURIComponent (obj[ p ]));
          return str.join ("&");
        },
        data: { oid: oid }
      }).then (
        function ( response ) {
          if ( response.data.Status === 'Ok' ) {
            $scope.loadRoomList ();
          }
          else {
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
} ]);