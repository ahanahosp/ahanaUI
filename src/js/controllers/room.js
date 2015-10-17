'use strict';

/* Controllers */
app.controller ('RoomController', [ '$scope', '$http', 'NgTableParams', '$state', 'modalService', function ( $scope, $http, NgTableParams, $state, modalService ) {
  $scope.saveRoom = function () {
    $scope.errorData = "";
    if ( $scope.roomForm.$valid ) {
      $http({
        url: path + "rest/secure/common/createRoom",
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
  $scope.loadRoomList = function () {
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getAllRooms",
      method: "GET"
    }).then (
      function ( response ) {
        var data;
        if ( response.data.Status === 'Ok' ) {
          data = response.data.roomDetails;
        }else {
          data = []
          $scope.errorData = response.data;
        }
        $scope.tableParams = new NgTableParams ({ count: 5 }, { counts: [ 5, 10, 25 ], dataset: data });
      }
    )
  }
  $scope.loadRoomDetails = function () {
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getRoomByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function ( response ) {
        if ( response.data.Status === 'Ok' ) {
          $scope.data = response.data.room;
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
        url: path + "rest/secure/common/deleteRoom",
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