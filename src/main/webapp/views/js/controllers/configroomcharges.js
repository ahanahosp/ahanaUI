'use strict';
/* Controllers */
app.controller ('ConfigRoomChargesController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout',
  function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
    $http.get (path + "rest/secure/lookup/loadLookupByName?lookupNames=TIMES").then (
      function (response){
        $scope.timesDetails = response.data.lookupValues.TIMESDetails;
      }
    )
    $scope.saveConfigRoomCharges = function (mode){
      $scope.errorData = "";
      $scope.successMessage = "";

      if ($scope.configRoomChargesForm.$valid){
        var data = {
          oid: $scope.data.oid,
          discount: $scope.data.discount,
          startTime: $scope.data.startTime,
          endTime: $scope.data.endTime,
          format: $scope.data.format
        }
        $http ({
          url: path + "rest/secure/config/createConfigRoomCharges",
          method: "POST",
          data: data
        }).then (
          function (response){
            if (response.data.Status === 'Ok'){
              if (mode === 'edit'){
                $scope.successMessage = "Config Room Charges updated successfully";
                $timeout (function (){
                  $state.transitionTo ($state.current, {}, {
                    reload: true,
                    inherit: false,
                    notify: true
                  });
                }, 1000);
              }
              else{
                $scope.successMessage = "Config Room Charges saved successfully";
                $timeout (function (){
                  $state.transitionTo ($state.current, {}, {
                    reload: true,
                    inherit: false,
                    notify: true
                  });
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
      $scope.errorData = "";
      $scope.data = {};

    };
    $scope.loadConfigRoomChargesList = function (){
      $scope.errorData = "";
      $http ({
        url: path + "rest/secure/config/getAllConfigRoomCharges",
        method: "GET"
      }).then (
        function (response){
          var data;
          if (response.data.Status === 'Ok'){
            data = response.data.configRoomChargesDetails;
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
              $defer.resolve ($scope.configRoomCharges = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
              $scope.checkboxes = {'checked': false, items: {}};
              $scope.configRoomChargeselectedItems = [];
            }
          });
        }
      )
    };
    $scope.checkboxes = {'checked': false, items: {}};
    $scope.configRoomChargeselectedItems = [];
    // watch for check all checkbox
    $scope.$watch ('checkboxes.checked', function (value){
      if ($scope.checkboxes.checked === false){
        $scope.configRoomChargeselectedItems = [];
      }
      angular.forEach ($scope.configRoomCharges, function (item){
        if (angular.isDefined (item.oid)){
          $scope.checkboxes.items[item.oid] = value;
        }
      });
    });
    $scope.loadConfigRoomChargesDetails = function (oid){
      $scope.errorData = "";
      $http ({
        url: path + "rest/secure/config/getConfigRoomChargesByOid?oid=" + oid,
        method: "GET"
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            $scope.data = response.data.configRoomCharges;
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    };
    $scope.deleteConfigRoomCharges = function (oid, name){
      $scope.errorData = "";
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete',
        headerText: 'Delete Config Room Charges?',
        bodyText: 'Are you sure you want to delete this config room charges?'
      };
      modalService.showModal ({}, modalOptions).then (function (result){
        $http ({
          url: path + "rest/secure/config/deleteConfigRoomCharges",
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
              $state.transitionTo ($state.current, {}, {
                reload: true,
                inherit: false,
                notify: true
              });
            }
            else{
              $scope.errorData = response.data;
            }
          }
        )
      });
    };
  }]);