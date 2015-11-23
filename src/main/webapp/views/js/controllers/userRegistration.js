'use strict';
//TODO need to move in properties file
/* Controllers */
app.controller ('UserRegistrationController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $scope.formats = ['dd/MM/yyyy hh:mm:ss', 'dd/MM/yyyy'];

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

  $http.get (path + "rest/secure/common/getSpecialityValues").then (
    function (response){
      $scope.specialityValues = response.data.specialityDetails;
    }
  );
  $http.get (path + "rest/secure/lookup/loadLookupByName?lookupNames=country,salutation").then (
    function (response){
      $scope.countries = response.data.lookupValues.countryDetails;
      $scope.salutations = response.data.lookupValues.salutationDetails;
    }
  )
  $scope.updateState = function (){
    $http.get (path + "rest/secure/lookup/populateState?countryId=" + $scope.data.country).then (
      function (response){
        $scope.states = response.data.stateDetails;
      }
    )
  }
  $scope.updateCity = function (){
    $http.get (path + "rest/secure/lookup/populateCity?stateId=" + $scope.data.state).then (
      function (response){
        $scope.cities = response.data.cityDetails;
      }
    )
  }
  /**Save Patient Registration data*/
  $scope.saveRegistration = function (mode){
    $scope.successMessage = "";
    $scope.errorData = "";
    if ($scope.userRegistrationForm.$valid){
      $http ({
        url: path + "rest/secure/user/createUser",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "User updated successfully";
              $timeout (function (){
                $state.go ('app.users');
              }, 1000);
            }
            else{
              $scope.successMessage = "User saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.users');
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
  $scope.loadUserRegistrationList = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/user/getUser?index=0&noOfRecords=10",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.userDetails;
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
            $defer.resolve ($scope.users = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.userSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.userSelectedItems = [];
    }
    angular.forEach ($scope.users, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.userSelectedItems = [];
    if (!$scope.users){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.users.length;
    angular.forEach ($scope.users, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.userSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.userSelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  $scope.loadUserRegistrationDetails = function (){
    $scope.errorData = "";
    $http ({
      url: path + "rest/secure/user/getUserByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.userProfile;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  }
  $scope.deleteUserRegistration = function (oid){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete User?',
      bodyText: 'Are you sure you want to delete this user?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/user/deleteUser",
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
            $scope.loadUserRegistrationList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);