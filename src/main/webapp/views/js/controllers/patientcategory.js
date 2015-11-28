'use strict';
/* Controllers */
app.controller ('PatientCategoryController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout',
  function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $scope.savePatientCategory = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.patientCategoryForm.$valid){
      $http ({
        url: path + "rest/secure/config/createPatientCategory",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Patient Category updated successfully";
              $timeout (function (){
                $state.go ('app.patientCategory');
              }, 1000);
            }
            else{
              $scope.successMessage = "Patient Category saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.patientCategory');
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
  $scope.loadPatientCategoryList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/config/getAllPatientCategory",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.patientCategoryDetails;
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
            $defer.resolve ($scope.patientCategory = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
            $scope.checkboxes = {'checked': false, items: {}};
            $scope.patientCategorySelectedItems = [];
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.patientCategorySelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.patientCategorySelectedItems = [];
    }
    angular.forEach ($scope.patientCategory, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.patientCategorySelectedItems = [];
    if (!$scope.patientCategory){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.patientCategory.length;
    angular.forEach ($scope.patientCategory, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.patientCategorySelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.patientCategorySelected = checked;
  }, true);
  $scope.loadPatientCategoryDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/config/getPatientCategoryByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.patientCategory;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.deleteMultiplePatientCategory = function (){
  };
  $scope.editMultiplePatientCategory = function (){
    $scope.errorData = "";
    var modalDefaults = {
      templateUrl: contextPath + 'views/tpl/edit_multiple_patientcategory.html'
    };
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Update',
      headerText: 'Edit Multiple Patient Category',
      patientCategorySelectedItems: $scope.patientCategorySelectedItems
    };
    modalService.showModal (modalDefaults, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/config/deletePatientCategory",
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
            $scope.loadPatientCategoryList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
  $scope.deletePatientCategory = function (oid, name){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Patient Category?',
      bodyText: 'Are you sure you want to delete this patientCategory - ' + name + '?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/config/deletePatientCategory",
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
            $scope.loadPatientCategoryList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);