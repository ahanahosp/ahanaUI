'use strict';
/* Controllers */
app.controller ('SpecialityController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $scope.saveSpeciality = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.specialityForm.$valid){
      $http ({
        url: path + "rest/secure/common/createSpeciality",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Speciality updated successfully";
              $timeout (function (){
                $state.go ('app.speciality')
              }, 1000);
            }
            else{
              $scope.successMessage = "Speciality saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.speciality')
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
  $scope.loadSpecialityList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getAllSpeciality",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.specialityDetails;
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
            $defer.resolve ($scope.speciality = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.specialitySelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.specialitySelectedItems = [];
    }
    angular.forEach ($scope.speciality, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.specialitySelectedItems = [];
    if (!$scope.speciality){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.speciality.length;
    angular.forEach ($scope.speciality, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.specialitySelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.specialitySelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  $scope.loadSpecialityDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getSpecialityByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.speciality;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.deleteMultipleSpeciality = function (){
  };
  
  $scope.editMultipleSpeciality = function (){
    $scope.errorData = "";
    $scope.modalSuccessMessage = "";
    var modalDefaults = {
      templateUrl: contextPath + 'views/tpl/edit_multiple_speciality.html',
      controller: function ($scope, $modalInstance, $state){
        $scope.modalOptions = modalOptions;
        $scope.saveMultipleSpeciality = function (){
          $scope.modalSuccessMessage = "";
          $scope.modalErrorData = "";
          $http ({
            url: path + "rest/secure/config/createOrUpdateMultipleConfig",
            method: "POST",
            data: {"specialityDetails": $scope.modalOptions.specialitySelectedItems,"source":"specialityDetails"}
          }).then (
            function (response){
              if (response.data.Status === 'Ok'){
                $scope.modalSuccessMessage = "Speciality updated successfully";
                $timeout (function (){
                  $modalInstance.close (response);
                  $state.go ('app.speciality', {}, {reload: true});
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
      headerText: 'Edit Multiple Speciality',
      specialitySelectedItems: $scope.specialitySelectedItems
    };
    modalService.showModal (modalDefaults, modalOptions);
  };
	  
  
  $scope.deleteSpeciality = function (oid, name){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Speciality?',
      bodyText: 'Are you sure you want to delete this speciality - ' + name + '?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/common/deleteSpeciality",
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
            $scope.loadSpecialityList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);
