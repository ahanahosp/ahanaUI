'use strict';
/* Controllers */
app.controller ('AccountHeadController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $scope.saveAccountHead = function (){
    $scope.errorData = "";
    $scope.successMessage = "";

    if ($scope.accountHeadForm.$valid){
      $http ({
        url: path + "rest/secure/common/createAccountHead",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Category item for charge updated successfully";
              $timeout (function (){
                $state.go ('app.accountHead');
              }, 1000);
            }
            else{
              $scope.successMessage = "Category item for charge saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.accountHead');
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
  $scope.loadAccountHeadList = function (){
    $http ({
      url: path + "rest/secure/common/getAllAccountHead",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.accountHeadDetails;
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
            $defer.resolve ($scope.accountHeads = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
            $scope.checkboxes = {'checked': false, items: {}};
            $scope.accountHeadSelectedItems = [];
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.accountHeadSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.accountHeadSelectedItems = [];
    }
    angular.forEach ($scope.accountHeads, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.accountHeadSelectedItems = [];
    if (!$scope.accountHeads){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.accountHeads.length;
    angular.forEach ($scope.accountHeads, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.accountHeadSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.accountHeadSelected = checked;
  }, true);
  
  $scope.loadAccountHeadDetails = function (){
    $http ({
      url: path + "rest/secure/common/getAccountHeadByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.accountHead;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  }
  $scope.deleteMultipleAccountHeads = function (){
  };
  $scope.editMultipleAccountHeads = function (){
	  $scope.modalErrorData = "";
	  $scope.modalSuccessMessage = "";
	  var modalOptions = {
	      closeButtonText: 'Cancel',
	      actionButtonText: 'Update',
	      headerText: 'Edit Multiple Account Head',
	      accountHeadSelectedItems: $scope.accountHeadSelectedItems,
	      loadAccountHeadList: $scope.loadAccountHeadList
	  };

	  var modalDefaults = {
	      templateUrl: contextPath + 'views/tpl/edit_multiple_accounthead.html',
	      controller: function ($scope, $modalInstance, $state){
	        $scope.modalOptions = modalOptions;
	        $scope.saveMultipleAccountHead = function (){
	          $scope.modalSuccessMessage = "";
	          $scope.modalErrorData = "";
	          $http ({
	            url: path + "rest/secure/config/createOrUpdateMultipleConfig",
	            method: "POST",
	            data: {"accountHeadDetails": $scope.modalOptions.accountHeadSelectedItems,"source":"accountHeadDetails"}
	          }).then (
	            function (response){
	              if (response.data.Status === 'Ok'){
	                $scope.modalSuccessMessage = "Account Head updated successfully";
	                $timeout (function (){
	                  $modalInstance.close (response);
	                  $state.go ('app.accountHead', {}, {reload: true});
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
  $scope.deleteAccountHead = function (oid, name){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete category item for charge?',
      bodyText: 'Are you sure you want to delete this account head - ' + name + '?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/common/deleteAccountHead",
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
            $scope.loadAccountHeadList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);