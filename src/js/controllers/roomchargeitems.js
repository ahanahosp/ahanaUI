'use strict';

/* Controllers */
app.controller ('RoomChargeItemController', [ '$scope', '$http', 'NgTableParams', '$state', 'modalService', function ( $scope, $http, NgTableParams, $state, modalService ) {
  
	$http.get(path + "rest/secure/common/getCategoryValues").then(
	    function(response) {
	        $scope.categorys = response.data.categoryDetails;
	    }
	)
	
	$scope.saveRoomChargeItem = function () {
    $scope.errorData = "";
    if ( $scope.roomForm.$valid ) {
      $http({
        url: path + "rest/secure/common/createRoomChargeItem",
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
  $scope.loadRoomChargeItemList = function () {
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getAllRoomChargeItem",
      method: "GET"
    }).then (
      function ( response ) {
        var data;
        if ( response.data.Status === 'Ok' ) {
          data = response.data.roomChargeItemDetails;
        }else {
          data = []
          $scope.errorData = response.data;
        }
        $scope.tableParams = new NgTableParams ({ count: 5 }, { counts: [ 5, 10, 25 ], dataset: data });
      }
    )
  }
  $scope.loadRoomChargeItemDetails = function () {
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getRoomChargeItemByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function ( response ) {
        if ( response.data.Status === 'Ok' ) {
          $scope.data = response.data.roomChargeItem;
        } else {
          $scope.errorData = response.data;
        }
      }
    )
  }
  $scope.deleteRoom = function ( oid ) {
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Room?',
      bodyText: 'Are you sure you want to delete this Room?'
    };
    modalService.showModal ({}, modalOptions).then (function ( result ) {
      $http ({
        url: path + "rest/secure/common/deleteRoomChargeItem",
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