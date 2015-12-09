'use strict';
/* Controllers */
app.controller ('AlliedChargesController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout',
  function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $scope.saveAlliedCharges = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.alliedChargesForm.$valid){
      $http ({
        url: path + "rest/secure/config/createAlliedCharges",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Allied Charges updated successfully";
              $timeout (function (){
                $state.go ('app.alliedCharges');
              }, 1000);
            }
            else{
              $scope.successMessage = "AlliedCharges saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.alliedCharges');
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
  $scope.loadAlliedChargesList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/config/getAllAlliedCharges",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.alliedChangesDetails;
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
            $defer.resolve ($scope.alliedCharges = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
            $scope.checkboxes = {'checked': false, items: {}};
            $scope.alliedChargesSelectedItems = [];
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.alliedChargesSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.alliedChargesSelectedItems = [];
    }
    angular.forEach ($scope.alliedCharges, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.alliedChargesSelectedItems = [];
    if (!$scope.alliedCharges){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.alliedCharges.length;
    angular.forEach ($scope.alliedCharges, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.alliedChargesSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.alliedChargesSelected = checked;
  }, true);
  $scope.loadAlliedChargesDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/config/getAlliedChargesByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.alliedCharges;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  
  $scope.deleteMultipleAlliedCharges = function (){
	  var selectedAlliedChargesOids = [];
	    angular.forEach ($scope.alliedChargesSelectedItems, function (value, key){
	        selectedAlliedChargesOids.push (value.oid);
	      }
	    );
	    $scope.errorData = "";
	    var modalOptions = {
	      closeButtonText: 'Cancel',
	      actionButtonText: 'Delete',
	      headerText: 'Delete Multiple Allied Charges(s)?',
        bodyText: 'Are you sure you want to delete selected allied charges ?'
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
	        data: {"oids": selectedAlliedChargesOids,"source":"AlliedCharges"}
	      }).then (
	        function (response){
	          if (response.data.Status === 'Ok'){
	            $scope.loadAlliedChargesList ();
	          }
	          else{
	            $scope.errorData = response.data;
	          }
	        }
	      )
	    });
  };
  
  $scope.editMultipleAlliedCharges = function (){
    $scope.errorData = "";
    $scope.modalSuccessMessage = "";
    var modalDefaults = {
      templateUrl: contextPath + 'views/tpl/edit_multiple_alliedcharges.html',
      controller: function ($scope, $modalInstance, $state){
        $scope.modalOptions = modalOptions;
        $scope.saveMultipleAlliedCharges = function (){
          $scope.modalSuccessMessage = "";
          $scope.modalErrorData = "";
          $http ({
            url: path + "rest/secure/config/createOrUpdateMultipleConfig",
            method: "POST",
            data: {"alliedCharges": $scope.modalOptions.alliedChargesSelectedItems,"source":"alliedCharges"}
          }).then (
            function (response){
              if (response.data.Status === 'Ok'){
                $scope.modalSuccessMessage = "Allied Charges updated successfully";
                $timeout (function (){
                  $modalInstance.close (response);
                  $state.go ('app.alliedCharges', {}, {reload: true});
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
      headerText: 'Edit Multiple Allied Charges',
      alliedChargesSelectedItems: $scope.alliedChargesSelectedItems
    };
    modalService.showModal (modalDefaults, modalOptions);
  };
  
  $scope.deleteAlliedCharges = function (oid, name){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Allied Charges?',
      bodyText: 'Are you sure you want to delete this allied charges?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/config/deleteAlliedCharges",
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
            $scope.loadAlliedChargesList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);