'use strict';
/* Controllers */
app.controller ('PatientCategoryController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout',
  function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
    $scope.formats = ['yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd', 'MM/dd/yyyy'];
    $scope.openActivationDate = function ($event){
      $event.preventDefault ();
      $event.stopPropagation ();
      $scope.openedActivationDate = true;
    };
    var activationDate = new Date ();
    activationDate.setDate (activationDate.getDate () + 1);
    $scope.activationMinDate = $filter ('date') (activationDate, $scope.formats[2]);
    if (angular.isUndefined ($scope.data)){
      $scope.data = {};
    }
    $scope.data.activationDate = $filter ('date') (activationDate, $scope.formats[1]);
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };
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
      var selectedPatientCategoryOids = [];
      angular.forEach ($scope.patientCategorySelectedItems, function (value, key){
          selectedPatientCategoryOids.push (value.oid);
        }
      );
      $scope.errorData = "";
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete',
        headerText: 'Delete Multiple Patient Category(s)?',
        bodyText: 'Are you sure you want to delete selected patient category ?'
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
          data: {"oids": selectedPatientCategoryOids, "source": "PatientCategory"}
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
    $scope.editMultiplePatientCategory = function (){
      $scope.errorData = "";
      $scope.modalSuccessMessage = "";
      var modalDefaults = {
        templateUrl: contextPath + 'views/tpl/edit_multiple_patientcategory.html',
        controller: function ($scope, $modalInstance, $state){
          $scope.modalOptions = modalOptions;
          $scope.saveMultiplePatientCategory = function (){
            $scope.modalSuccessMessage = "";
            $scope.modalErrorData = "";
            $http ({
              url: path + "rest/secure/config/createOrUpdateMultipleConfig",
              method: "POST",
              data: {
                "patientCategories": $scope.modalOptions.patientCategorySelectedItems,
                "source": "patientCategories"
              }
            }).then (
              function (response){
                if (response.data.Status === 'Ok'){
                  $scope.modalSuccessMessage = "Patient Category updated successfully";
                  $timeout (function (){
                    $modalInstance.close (response);
                    $state.go ('app.patientCategory', {}, {reload: true});
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
        headerText: 'Edit Multiple Patient Category',
        patientCategorySelectedItems: $scope.patientCategorySelectedItems
      };
      modalService.showModal (modalDefaults, modalOptions);
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