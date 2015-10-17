'use strict';

/* Controllers */
app.controller ('UserRoleController', [ '$scope', '$http', 'NgTableParams', '$state', 'modalService', function ( $scope, $http, NgTableParams, $state, modalService ) {
  $scope.saveUserRole = function () {
    $scope.errorData = "";
    if ( $scope.userRoleForm.$valid ) {
      $http({
        url: path + "rest/secure/user/createUserRole",
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
  $scope.loadFloorList = function () {
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getAllActiveFloor",
      method: "GET"
    }).then (
      function ( response ) {
        var data;
        if ( response.data.Status === 'Ok' ) {
          data = response.data.floorDetails;
        }
        else {
          data = []
          $scope.errorData = response.data;
        }
        $scope.tableParams = new NgTableParams ({ count: 5 }, { counts: [ 5, 10, 25 ], dataset: data });
      }
    )
  }
  $scope.loadFloorDetails = function () {
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getFloorByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function ( response ) {
        if ( response.data.Status === 'Ok' ) {
          $scope.data = response.data.floor;
        }
        else {
          $scope.errorData = response.data;
        }
      }
    )
  }
  $scope.deleteFloor = function ( oid ) {
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Floor?',
      bodyText: 'Are you sure you want to delete this floor?'
    };
    modalService.showModal ({}, modalOptions).then (function ( result ) {
      $http ({
        url: path + "rest/secure/common/deleteFloor",
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
            $scope.loadFloorList ();
          }
          else {
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
} ]);