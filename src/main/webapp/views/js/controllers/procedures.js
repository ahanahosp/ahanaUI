'use strict';
/* Controllers */
app.controller ('ProceduresController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope){
  $scope.saveProcedures = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.proceduresForm.$valid){
      $http ({
        url: path + "rest/secure/common/createProcedures",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $state.go ('app.procedures');
            }
            else{
              $scope.successMessage = "Procedures saved successfully";
              $scope.data = {};
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
  $scope.loadProceduresList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getAllProcedures",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.proceduresDetails;
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
            $defer.resolve ($scope.procedures = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.procedureSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.procedureSelectedItems = [];
    }
    angular.forEach ($scope.procedures, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.procedureSelectedItems = [];
    if (!$scope.procedures){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.procedures.length;
    angular.forEach ($scope.procedures, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.procedureSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.procedureSelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  $scope.loadProcedureDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/common/getProceduresByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.procedures;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.deleteMultipleProcedures = function (){
  };
  $scope.editMultipleProcedures = function (){
    $scope.errorData = "";
    var modalDefaults = {
      templateUrl: 'views/tpl/edit_multiple_procedures.html'
    };
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Update',
      headerText: 'Edit Multiple Procedures',
      procedureSelectedItems: $scope.procedureSelectedItems
    };
    modalService.showModal (modalDefaults, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/common/deleteProcedure",
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
            $scope.loadProceduresList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
  $scope.deleteProcedure = function (oid, name){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Procedure?',
      bodyText: 'Are you sure you want to delete this procedure - ' + name + '?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/common/deleteProcedures",
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
            $scope.loadProceduresList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);
