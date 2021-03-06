'use strict';
/* Controllers */
app.controller ('WardController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout', function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
  $http.get (path + "rest/secure/common/getFloorValues").then (
    function (response){
      $scope.floors = response.data.floorDetails;
    }
  )
  $scope.saveWard = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.wardForm.$valid){
      $http ({
        url: path + "rest/secure/common/createWard",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Ward updated successfully";
              $timeout (function (){
                $state.go ('app.ward');
              }, 1000);
            }
            else{
              $scope.successMessage = "Ward saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.ward');
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
  $scope.loadWardList = function (){
    $http ({
      url: path + "rest/secure/common/getAllWards",
      method: "GET"
    }).then (
      function (response){
        var data;
        if (response.data.Status === 'Ok'){
          data = response.data.wardDetails;
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
            $defer.resolve ($scope.wards = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
            $scope.checkboxes = {'checked': false, items: {}};
            $scope.wardSelectedItems = [];
          }
        });
      }
    )
  };
  $scope.checkboxes = {'checked': false, items: {}};
  $scope.wardSelectedItems = [];
  // watch for check all checkbox
  $scope.$watch ('checkboxes.checked', function (value){
    if ($scope.checkboxes.checked === false){
      $scope.wardSelectedItems = [];
    }
    angular.forEach ($scope.wards, function (item){
      if (angular.isDefined (item.oid)){
        $scope.checkboxes.items[item.oid] = value;
      }
    });
  });
  // watch for data checkboxes
  $scope.$watch ('checkboxes.items', function (values){
    $scope.wardSelectedItems = [];
    if (!$scope.wards){
      return;
    }
    var checked = 0, unchecked = 0,
      total = $scope.wards.length;
    angular.forEach ($scope.wards, function (item){
      if ($scope.checkboxes.items[item.oid]){
        $scope.wardSelectedItems.push (item);
      }
      checked += ($scope.checkboxes.items[item.oid]) || 0;
      unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
    });
    if ((unchecked == 0) || (checked == 0)){
      $scope.checkboxes.checked = (checked == total);
    }
    $scope.wardSelected = checked;
    // grayed checkbox
    // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
  }, true);
  $scope.loadWardDetails = function (){
    $http ({
      url: path + "rest/secure/common/getWardByOid?oid=" + $state.params.oid,
      method: "GET"
    }).then (
      function (response){
        if (response.data.Status === 'Ok'){
          $scope.data = response.data.ward;
        }
        else{
          $scope.errorData = response.data;
        }
      }
    )
  };
  $scope.deleteMultipleWards = function (){
	  var selectedWardOids = [];
	    angular.forEach ($scope.wardSelectedItems, function (value, key){
	    	selectedWardOids.push (value.oid);
	      }
	    );
	    $scope.errorData = "";
	    var modalOptions = {
	      closeButtonText: 'Cancel',
	      actionButtonText: 'Delete',
	      headerText: 'Delete Multiple Ward(s)?',
        bodyText: 'Are you sure you want to delete selected wards ?'
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
	        data: {"oids": selectedWardOids,"source":"Ward"}
	      }).then (
	        function (response){
	          if (response.data.Status === 'Ok'){
	            $scope.loadWardList ();
	          }
	          else{
	            $scope.errorData = response.data;
	          }
	        }
	      )
	    });
  };
  $scope.editMultipleWards = function (){
    $scope.errorData = "";
    $scope.modalSuccessMessage = "";
    var modalDefaults = {
      templateUrl: contextPath + 'views/tpl/edit_multiple_ward.html',
      controller: function ($scope, $modalInstance, $state){
        $scope.modalOptions = modalOptions;
        $scope.saveMultipleWard = function (){

          //delete floorName from list
          var wardSelectedItems = $scope.modalOptions.wardSelectedItems;
          angular.forEach (wardSelectedItems, function (value, key){
            delete value.floorName;
          });

          $scope.modalSuccessMessage = "";
          $scope.modalErrorData = "";
          $http ({
            url: path + "rest/secure/config/createOrUpdateMultipleConfig",
            method: "POST",
            data: {"wards": wardSelectedItems, "source": "wards"}
          }).then (
            function (response){
              if (response.data.Status === 'Ok'){
                $scope.modalSuccessMessage = "Ward updated successfully";
                $timeout (function (){
                  $modalInstance.close (response);
                  $state.go ('app.ward', {}, {reload: true});
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
      headerText: 'Edit Multiple Wards',
      wardSelectedItems: $scope.wardSelectedItems,
      floors: $scope.floors
    };
    modalService.showModal (modalDefaults, modalOptions);
  };
  $scope.deleteWard = function (oid, name){
    $scope.errorData = "";
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Delete',
      headerText: 'Delete Ward?',
      bodyText: 'Are you sure you want to delete this ward?'
    };
    modalService.showModal ({}, modalOptions).then (function (result){
      $http ({
        url: path + "rest/secure/common/deleteWard",
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
            $scope.loadWardList ();
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    });
  };
}]);