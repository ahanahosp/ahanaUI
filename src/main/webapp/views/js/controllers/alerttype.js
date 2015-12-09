'use strict';
/* Controllers */
app.controller ('AlertTypeController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $scope.saveAlertType = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.alertTypeForm.$valid){
      $http ({
        url: path + "rest/secure/config/createAlertTypes",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Alert type updated successfully";
              $timeout (function (){
                $state.go ('app.alertType');
              }, 1000);
            }
            else{
              $scope.successMessage = "Alert type saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.alertType');
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
  $scope.loadAlertTypeList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/config/getAllAlertType",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.alertDetails;
        }
        else{
          data = []
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
            $defer.resolve ($scope.alertType = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
            $scope.checkboxes = {'checked': false, items: {}};
            $scope.alertTypeSelectedItems = [];
          }
        });
      }
    )
  }
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.alertTypeSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.alertTypeSelectedItems = [];
    }
    angular.forEach ($scope.alertType, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.alertTypeSelectedItems = [];
    if (!$scope.alertType){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.alertType.length;
    angular.forEach ($scope.alertType, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.alertTypeSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.alertTypeSelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  $scope.loadAlertTypeDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/config/getAlertTypeByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.alertType;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.deleteMultipleAlertType = function (){
	  var selectedAlertTypeOids = [];
	    angular.forEach ($scope.alertTypeSelectedItems, function (value, key){
	        selectedAlertTypeOids.push (value.oid);
	      }
	    );
	    $scope.errorData = "";
	    var modalOptions = {
	      closeButtonText: 'Cancel',
	      actionButtonText: 'Delete',
	      headerText: 'Delete Multiple Alert Type(s)?',
	      bodyText: 'Are you sure you want to delete selected alert type ?'
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
	        data: {"oids": selectedAlertTypeOids,"source":"AlertType"}
	      }).then (
	        function (response){
	          if (response.data.Status === 'Ok'){
	            $scope.loadAlertTypeList ();
	          }
	          else{
	            $scope.errorData = response.data;
	          }
	        }
	      )
	    });
  };
  
  $scope.editMultipleAlertType = function (){
    $scope.errorData = "";
    $scope.modalSuccessMessage = "";
    var modalDefaults = {
      templateUrl: contextPath + 'views/tpl/edit_multiple_alerttype.html',
      controller: function ($scope, $modalInstance, $state){
        $scope.modalOptions = modalOptions;
        $scope.saveMultipleAlertType = function (){
          $scope.modalSuccessMessage = "";
          $scope.modalErrorData = "";
          $http ({
            url: path + "rest/secure/config/createOrUpdateMultipleConfig",
            method: "POST",
            data: {"alertTypes": $scope.modalOptions.alertTypeSelectedItems,"source":"alertTypes"}
          }).then (
            function (response){
              if (response.data.Status === 'Ok'){
                $scope.modalSuccessMessage = "Alert Types updated successfully";
                $timeout (function (){
                  $modalInstance.close (response);
                  $state.go ('app.alertType', {}, {reload: true});
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
      headerText: 'Edit Multiple Alert Types',
      alertTypeSelectedItems: $scope.alertTypeSelectedItems
    };
    modalService.showModal (modalDefaults, modalOptions);
  };
	  
  $scope.deleteAlertType = function (oid, name){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Alert Type?',
      bodyText: 'Are you sure you want to delete this alert type?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/config/deleteAlertType",
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
            $scope.loadAlertTypeList ();
          } else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);