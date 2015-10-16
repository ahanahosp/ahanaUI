'use strict';

//TODO need to move in properties file

/* Controllers */
app
// Registration controller
  .controller ('RolesController', [ '$scope', '$http', 'NgTableParams', '$state', 'modalService', function ( $scope, $http, NgTableParams, $state, modalService ) {
    $scope.saveRoles = function() {
      $scope.errorData = "";
      if ($scope.roleForm.$valid) {
        $http({
          url: path + "rest/secure/user/createRole",
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
          },
          /**Error handling*/
          function ( reponse ) {
            $scope.errorData = response.data;
          }
        )
      }
    }

    $scope.loadRolesList = function() {
      $scope.errorData = "";
      $http({
        url: path + "rest/secure/user/getActiveRoles",
        method: "GET"
      }).then(
        function(response){
          if ( response.data.Status === 'Ok' ) {
            var data = response.data.roleDetails;
            $scope.tableParams = new NgTableParams ({ count: 5 }, { counts: [ 5, 10, 25 ], dataset: data });
          }
        }
      )
    }

    $scope.loadRoleDetails = function(){
      $scope.errorData = "";
      $http({
        url: path + "rest/secure/user/getRoleByOid?oid="+$state.params.oid,
        method: "GET"
      }).then(
        function(response){
          if ( response.data.Status === 'Ok' ) {
            $scope.data = response.data.roles;
          }
          else {
            $scope.errorData = response.data;
          }
        }
      )
    }
    $scope.deleteRole = function ( roleOid ) {
      $scope.errorData = "";
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete',
        headerText: 'Delete Role?',
        bodyText: 'Are you sure you want to delete this role?'
      };
      modalService.showModal ({}, modalOptions).then (function ( result ) {
        $http ({
          url: path + "rest/secure/user/deleteRole",
          method: "POST",
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          transformRequest: function ( obj ) {
            var str = [];
            for ( var p in obj )
              str.push (encodeURIComponent (p) + "=" + encodeURIComponent (obj[ p ]));
            return str.join ("&");
          },
          data: { oid: roleOid }
        }).then (
          function ( response ) {
            if ( response.data.Status === 'Ok' ) {
              $scope.loadRolesList ();
            }
            else {
              $scope.errorData = response.data;
            }
          }
        )
      });
    }
  } ]);
