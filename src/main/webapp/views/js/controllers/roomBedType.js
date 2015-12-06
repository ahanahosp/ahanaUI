Array.prototype.indexOfObjectWithProperty = function (propertyName, propertyValue){
  for (var i = 0, len = this.length; i < len; i++){
    if (this[i][propertyName] === propertyValue) return i;
  }
  return -1;
};
Array.prototype.containsObjectWithProperty = function (propertyName, propertyValue){
  return this.indexOfObjectWithProperty (propertyName, propertyValue) != -1;
};
'use strict';
/* Controllers */
app.controller ('RoomBedTypesController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout',
  function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
    $http.get (path + "rest/secure/common/getRoomTypesValues").then (
      function (response){
        $scope.roomTypesDetails = response.data.roomTypesDetails;
      }
    );
    $scope.selectedRoomTypes = [];
    $scope.toggleSelection = function toggleSelection (roomType){
      var index = $scope.selectedRoomTypes.indexOfObjectWithProperty ('value', roomType.value);
      if (index > -1){
        // Is currently selected, so remove it
        $scope.selectedRoomTypes.splice (index, 1);
      }
      else{
        // Is currently unselected, so add it
        $scope.selectedRoomTypes.push (roomType);
      }
    };
    $scope.saveRoomBedTypes = function (mode){
      $scope.errorData = "";
      $scope.successMessage = "";
      if ($scope.roomBedTypeForm.$valid){
        var selectedRoomTypes = [];
        angular.forEach ($scope.selectedRoomTypes, function (value, key){
            selectedRoomTypes.push (value.value);
          }
        );
        var data = {};
        if (angular.isDefined ($scope.data.oid)){
          data = {
            'orderId': $scope.data.orderId,
            'bedNo': $scope.data.bedNo,
            'status': $scope.data.status,
            'roomTypeOids': selectedRoomTypes.join (","),
            'oid': $scope.data.oid
          };
        }
        else{
          data = {
            'orderId': $scope.data.orderId,
            'bedNo': $scope.data.bedNo,
            'status': $scope.data.status,
            'roomTypeOids': selectedRoomTypes.join (",")
          };
        }
        $http ({
          url: path + "rest/secure/config/createRoomAndBedType",
          method: "POST",
          data: data
        }).then (
          function (response){
            if (response.data.Status === 'Ok'){
              if (mode === 'edit'){
                $scope.successMessage = "Room Bed Types updated successfully";
                $timeout (function (){
                  $state.go ('app.roomBedTypes');
                }, 1000);
              }
              else{
                $scope.successMessage = "Room Bed Types saved successfully";
                $scope.selectedRoles = [];
                $scope.data = {};
                $timeout (function (){
                  $state.go ('app.roomBedTypes');
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
    $scope.loadRoomBedTypesList = function (){
      $scope.errorData = "";
      $http ({
        url: path + "rest/secure/config/getAllActiveRoomAndBedType",
        method: "GET"
      }).then (
        function (response){
          var data;
          if (response.data.Status === 'Ok'){
            data = response.data.roomAndBedTypeDetails;
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
              $defer.resolve ($scope.roomBedTypes = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
              $scope.checkboxes = {'checked': false, items: {}};
              $scope.roomBedTypeSelectedItems = [];
            }
          });
        }
      )
    };
    $scope.checkboxes = {'checked': false, items: {}};
    $scope.roomBedTypeSelectedItems = [];
    // watch for check all checkbox
    $scope.$watch ('checkboxes.checked', function (value){
      if ($scope.checkboxes.checked === false){
        $scope.roomBedTypeSelectedItems = [];
      }
      angular.forEach ($scope.roomBedTypes, function (item){
        if (angular.isDefined (item.oid)){
          $scope.checkboxes.items[item.oid] = value;
        }
      });
    });
    // watch for data checkboxes
    $scope.$watch ('checkboxes.items', function (values){
      $scope.roomBedTypeSelectedItems = [];
      if (!$scope.roomBedTypes){
        return;
      }
      var checked = 0, unchecked = 0,
        total = $scope.roomBedTypes.length;
      angular.forEach ($scope.roomBedTypes, function (item){
        if ($scope.checkboxes.items[item.oid]){
          $scope.roomBedTypeSelectedItems.push (item);
        }
        checked += ($scope.checkboxes.items[item.oid]) || 0;
        unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
      });
      if ((unchecked == 0) || (checked == 0)){
        $scope.checkboxes.checked = (checked == total);
      }
      $scope.roomBedTypeSelected = checked;
      // grayed checkbox
      // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
    }, true);
    $scope.loadRoomBedTypeDetails = function (){
      $scope.errorData = "";
      $http ({
        url: path + "rest/secure/config/getRoomAndBedTypeByOid?oid=" + $state.params.oid,
        method: "GET"
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            $scope.data = response.data.roomAndBedType;
            var savedRoomTypes = response.data.roomAndBedType.savedRoomTyes;
            angular.forEach ($scope.roomTypesDetails, function (value, key){
              for (var i = 0; i < savedRoomTypes.length; i++){
                if (value.value === savedRoomTypes[i]){
                  $scope.selectedRoomTypes.push ($scope.roomTypesDetails[key]);
                }
              }
            });
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    };
    $scope.deleteMultipleRoomBedTypes = function (){
    };
    $scope.editMultipleRoomBedTypes = function (){
      $scope.modalErrorData = "";
      $scope.modalSuccessMessage = "";
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Update',
        headerText: 'Edit Multiple Room Bed Types',
        roomBedTypeSelectedItems: $scope.roomBedTypeSelectedItems
      };
      var modalDefaults = {
        templateUrl: contextPath + 'views/tpl/edit_multiple_roomBedType.html',
        controller: function ($scope, $modalInstance, $state){
          $scope.modalOptions = modalOptions;
          $scope.saveMultipleRoomBedTypes = function (){
            $scope.modalSuccessMessage = "";
            $scope.modalErrorData = "";
            $http ({
              url: path + "rest/secure/config/createOrUpdateMultipleConfig",
              method: "POST",
              data: {"roomBedTypes": $scope.modalOptions.roomBedTypeSelectedItems, "source": "roomBedTypes"}
            }).then (
              function (response){
                if (response.data.Status === 'Ok'){
                  $scope.modalSuccessMessage = "Room Bed Types updated successfully";
                  $timeout (function (){
                    $modalInstance.close (response);
                    $state.go ('app.roomBedTypes', {}, {reload: true});
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
      modalService.showModal (modalDefaults, modalOptions);
    };
    $scope.deleteRoomBedType = function (oid, name){
      $scope.errorData = "";
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete',
        headerText: 'Delete RoomBedType?',
        bodyText: 'Are you sure you want to delete this Room Bed Type - ' + name + '?'
      };
      modalService.showModal ({}, modalOptions).then (function (result){
        $http ({
          url: path + "rest/secure/config/deleteRoomAndBedType",
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
              $scope.loadRoomBedTypesList ();
            }
            else{
              $scope.errorData = response.data;
            }
          }
        )
      });
    };
  }]);
