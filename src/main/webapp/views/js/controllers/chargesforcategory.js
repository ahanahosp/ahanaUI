'use strict';
/* Controllers */
app.controller ('ChargesForCategoryController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout',
  function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
	$http.get (path + "rest/secure/lookup/loadLookupByName?lookupNames=chargescategory").then (
	    function (response){
	      $scope.categories = response.data.lookupValues.chargescategoryDetails;
	    }
	)
	$scope.updateSubCategory = function (mode){
	    $http.get (path + "rest/secure/config/getSubCategoryByCategory?category=" + $scope.data.category).then (
	      function (response){
	        $scope.subCategories = response.data.subCategoryDetails;
	        if (angular.isUndefined (mode)){
	        	$scope.data.subCategories = undefined;
	        }
	      }
	    )
	}
  $scope.saveChargesForCategory = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.chargesForCategoryForm.$valid){
      $http ({
        url: path + "rest/secure/config/createChargesForCategory",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Charges For Category updated successfully";
              $timeout (function (){
                $state.go ('app.chargesForCategory');
              }, 1000);
            }
            else{
              $scope.successMessage = "Charges For Category saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.chargesForCategory');
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
  $scope.loadChargesForCategoryList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/config/getActiveChargesForCategory",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.chargesForCategoryDetails;
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
            $defer.resolve ($scope.chargesForCategory = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
            $scope.checkboxes = {'checked': false, items: {}};
            $scope.chargesForCategorySelectedItems = [];
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.chargesForCategorySelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.chargesForCategorySelectedItems = [];
    }
    angular.forEach ($scope.chargesForCategory, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.chargesForCategorySelectedItems = [];
    if (!$scope.chargesForCategory){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.chargesForCategory.length;
    angular.forEach ($scope.chargesForCategory, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.chargesForCategorySelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.chargesForCategorySelected = checked;
  }, true);
  $scope.loadChargesForCategoryDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/config/getChargesForCategoryByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.chargesForCategory;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.deleteMultipleChargesForCategory = function (){
  };
  $scope.editMultipleChargesForCategory = function (){
    $scope.errorData = "";
    var modalDefaults = {
      templateUrl: contextPath + 'views/tpl/edit_multiple_chargesForCategory.html'
    };
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Update',
      headerText: 'Edit Multiple Charges For Category',
      chargesForCategorySelectedItems: $scope.chargesForCategorySelectedItems
    };
    modalService.showModal (modalDefaults, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/config/deleteChargesForCategory",
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
            $scope.loadChargesForCategoryList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
  $scope.deleteChargesForCategory = function (oid, name){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Charges For Category?',
      bodyText: 'Are you sure you want to delete this chargesForCategory - ' + name + '?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/config/deleteChargesForCategory",
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
            $scope.loadChargesForCategoryList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);