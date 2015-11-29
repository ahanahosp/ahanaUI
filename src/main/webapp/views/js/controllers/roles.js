'use strict';
/* Controllers */
app.controller ('RolesController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout',
  function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $scope.saveRoles = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.roleForm.$valid){
      $http ({
        url: path + "rest/secure/user/createRole",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Roles updated successfully";
              $timeout (function (){
                $state.go ('app.roles');
              }, 1000);
            }
            else{
              $scope.successMessage = "Roles saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.roles');
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
  $scope.loadRolesList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/user/getActiveRoles",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.roleDetails;
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
            $defer.resolve ($scope.roles = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
            $scope.checkboxes = {'checked': false, items: {}};
            $scope.roleSelectedItems = [];
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.roleSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.roleSelectedItems = [];
    }
    angular.forEach ($scope.roles, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.roleSelectedItems = [];
    if (!$scope.roles){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.roles.length;
    angular.forEach ($scope.roles, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.roleSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.roleSelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  $scope.loadRoleDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/user/getRoleByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.roles;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.deleteMultipleRoles = function (){
  };
  $scope.editMultipleRoles = function (){
    $scope.modalErrorData = "";
    $scope.modalSuccessMessage = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Update',
      headerText: 'Edit Multiple Roles',
      roleSelectedItems: $scope.roleSelectedItems
    };

    var modalDefaults = {
      templateUrl: contextPath + 'views/tpl/edit_multiple_role.html',
      controller: function ($scope, $modalInstance){
        $scope.modalOptions = modalOptions;
        $scope.saveMultipleRoles = function (){
          $http ({
            url: path + "rest/secure/config/createOrUpdateMultipleConfig",
            method: "POST",
            data: $scope.modalOptions.roleSelectedItems
          }).then (
            function (response){
              if (response.data.Status === 'Ok'){
                $scope.modalSuccessMessage = "Roles updated successfully";
                $timeout (function (){
                  $scope.loadRolesList ();
                  $modalInstance.close (response);
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
  $scope.deleteRole = function (oid, name){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Role?',
      bodyText: 'Are you sure you want to delete this role - ' + name + '?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/user/deleteRole",
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
            $scope.loadRolesList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);
