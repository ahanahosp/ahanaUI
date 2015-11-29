'use strict';
/* Controllers */
app.controller ('LoginController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $scope.formats = ['yyyy-MM-dd HH:mm:ss', 'yyyy-MM-dd'];
  $scope.openActivationDate = function ($event){
    $event.preventDefault ();
    $event.stopPropagation ();
    $scope.openedActivationDate = true;
  };
  $scope.openInActivationDate = function ($event){
    $event.preventDefault ();
    $event.stopPropagation ();
    $scope.openedInActivationDate = true;
  };
  if (angular.isUndefined ($scope.data)){
    $scope.data = {};
  }
  $scope.data.activationDate = $filter ('date') (new Date (), $scope.formats[1]);
  $scope.data.inactivationDate = $filter ('date') (new Date (), $scope.formats[1]);

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1,
    class: 'datepicker'
  };
  $scope.format = $scope.formats[1];

  $http.get (path + "rest/secure/user/getActiveUsers").then (
    function (response){
      $scope.userDetails = response.data.userDetails;
    }
  );
  /**Save Patient Registration data*/
  $scope.saveLogin = function (mode){
    $scope.successMessage = "";
    $scope.errorData = "";
    if ($scope.loginForm.$valid){
      $http ({
        url: path + "rest/secure/user/createLogin",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Login updated successfully";
              $timeout (function (){
                $state.go ('app.login');
              }, 1000);
            }
            else{
              $scope.successMessage = "Login saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.login');
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
  $scope.loadLoginList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/user/getAllLogin?index=0&noOfRecords=10",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.loginDetails;
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
            $defer.resolve ($scope.login = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.loginSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.loginSelectedItems = [];
    }
    angular.forEach ($scope.login, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.loginSelectedItems = [];
    if (!$scope.login){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.login.length;
    angular.forEach ($scope.login, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.loginSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.loginSelected = checked;
  }, true);
  $scope.loadLoginDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/user/getLoginByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.login;
          $scope.updateState ('edit');
          $scope.updateCity ('edit');
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  }
  $scope.deleteLogin = function (oid){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Login?',
      bodyText: 'Are you sure you want to delete this login?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/user/deleteLogin",
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
            $scope.loadLoginList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);