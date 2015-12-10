Array.prototype.indexOfObjectWithProperty = function (propertyName, propertyValue){
  for (var i = 0, len = this.length; i < len; i++){
    if (this[i][propertyName] === propertyValue) return i;
  }
  return -1;
};
Array.prototype.containsObjectWithProperty = function (propertyName, propertyValue){
  return this.indexOfObjectWithProperty (propertyName, propertyValue) != -1;
};
'use strict';
/* Controllers */
app
  .controller ('DoctorScheduleController', ['$scope', '$http', 'NgTableParams', '$filter', '$state', 'modalService', '$rootScope', '$timeout',
  function ($scope, $http, NgTableParams, $filter, $state, modalService, $rootScope, $timeout){
    $http.get (path + "rest/secure/config/getDoctorDetails").then (
      function (response){
        $scope.doctorDetails = response.data.doctorDetails;
      }
    )
    $http.get (path + "rest/secure/lookup/loadLookupByName?lookupNames=days").then (
      function (response){
        $scope.daysDetails = response.data.lookupValues.daysDetails;
      }
    )
    $http.get (path + "rest/secure/lookup/loadLookupByName?lookupNames=TIMES").then (
      function (response){
        $scope.timesDetails = response.data.lookupValues.TIMESDetails;
      }
    )
    
    $scope.getScheduledDoctorDetailsByOid = function (){
        $scope.errorData = "";
        $scope.successMessage = "";
        $http.get (path + "rest/secure/config/getScheduledDoctorDetailsByOid?doctorOid=" + $scope.data.doctorOid).then (
          function (response){
            if (response.data.Status === 'Ok'){
              $scope.data.visitingDay = response.data.scheduledDoctorDetails.visitingDay;
              $scope.data.startTime = response.data.scheduledDoctorDetails.startTime;
              $scope.data.endTime = response.data.scheduledDoctorDetails.endTime;
              $scope.data.oid = response.data.scheduledDoctorDetails.oid;
            }
          }
        )
      };
    
    $scope.updateSpeciality = function (){
      if (angular.isDefined ($scope.data.doctorOid)){
        angular.forEach ($scope.doctorDetails, function (value, key){
          if (value.value === $scope.data.doctorOid){
            $scope.data.speciality = value.speciality;
          }
        });
      }
      else{
        $scope.speciality = "";
      }
    }
    $scope.loadDoctorScheduleList = function (){
      $scope.errorData = "";
      $http ({
        url: path + "rest/secure/config/getAllDoctorDetails",
        method: "GET"
      }).then (
        function (response){
          var data;
          if (response.data.Status === 'Ok'){
            data = response.data.doctorDetails;
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
              $defer.resolve ($scope.doctorSchedules = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
              $scope.checkboxes = {'checked': false, items: {}};
              $scope.doctorScheduleSelectedItems = [];
            }
          });
        }
      )
    };
    $scope.checkboxes = {'checked': false, items: {}};
    $scope.doctorScheduleSelectedItems = [];
    // watch for check all checkbox
    $scope.$watch ('checkboxes.checked', function (value){
      if ($scope.checkboxes.checked === false){
        $scope.doctorScheduleSelectedItems = [];
      }
      angular.forEach ($scope.doctorSchedules, function (item){
        if (angular.isDefined (item.oid)){
          $scope.checkboxes.items[item.oid] = value;
        }
      });
    });
    // watch for data checkboxes
    $scope.$watch ('checkboxes.items', function (values){
      $scope.doctorScheduleSelectedItems = [];
      if (!$scope.doctorSchedules){
        return;
      }
      var checked = 0, unchecked = 0,
        total = $scope.doctorSchedules.length;
      angular.forEach ($scope.doctorSchedules, function (item){
        if ($scope.checkboxes.items[item.oid]){
          $scope.doctorScheduleSelectedItems.push (item);
        }
        checked += ($scope.checkboxes.items[item.oid]) || 0;
        unchecked += (!$scope.checkboxes.items[item.oid]) || 0;
      });
      if ((unchecked == 0) || (checked == 0)){
        $scope.checkboxes.checked = (checked == total);
      }
      $scope.doctorScheduleSelected = checked;
      // grayed checkbox
      // angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
    }, true);
    if (angular.isUndefined ($scope.data)){
      $scope.data = {};
    }

    $scope.saveDoctorSchedule = function (mode){
      $scope.errorData = "";
      $scope.successMessage = "";
      if ($scope.doctorScheduleForm.$valid){
        var data = {
          doctorOid: $scope.data.doctorOid,
          visitingDay: $scope.data.visitingDay,
          startTime: $scope.data.startTime,
          endTime: $scope.data.endTime,
          oid: $scope.data.oid
        }

        $http ({
          url: path + "rest/secure/config/createDoctorSchedule",
          method: "POST",
          data: data
        }).then (
          function (response){
            if (response.data.Status === 'Ok'){
              if (mode === 'edit'){
                $scope.successMessage = "Doctor Schedule updated successfully";
                $timeout (function (){
                  $scope.successMessage = "";
                  $scope.loadDoctorScheduleList ();
                  $scope.data = {};
                }, 1000);
              }
              else{
                $scope.successMessage = "Doctor Schedule saved successfully";
                $scope.data = {};
                $timeout (function (){
                  $scope.successMessage = "";
                  $scope.loadDoctorScheduleList ();
                  $scope.data = {};
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
    if (angular.isUndefined ($scope.data)){
      $scope.data = {};
    }
    $scope.data.visitingDay = 'All Days';
    $scope.reset = function (){
      $scope.errorData = "";
    };
    $scope.loadDoctorSchedule = function (ds){
      $scope.errorData = "";
      $http ({
        url: path + "rest/secure/config/getDoctorScheduleByOid?oid=" + ds.oid,
        method: "GET"
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            $scope.data = response.data.doctorSchdule;
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    };
    $scope.deleteDoctorSchedule = function (oid, name){
      $scope.listErrorData = "";
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete',
        headerText: 'Delete Doctor Schedule?',
        bodyText: 'Are you sure you want to delete this doctor schedule?'
      };
      modalService.showModal ({}, modalOptions).then (function (result){
        $http ({
          url: path + "rest/secure/config/deleteDoctorsSchedule",
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
              $scope.loadDoctorScheduleList ();
            }
            else{
              $scope.listErrorData = response.data;
            }
          }
        )
      });
    };
    $scope.deleteMultipleDoctorSchedules = function (){
      var selectedDoctorScheduleOids = [];
      angular.forEach ($scope.doctorScheduleSelectedItems, function (value, key){
          selectedDoctorScheduleOids.push (value.oid);
        }
      );
      $scope.listErrorData = "";
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete',
        headerText: 'Delete Multiple Doctor Schedule(s)?',
        bodyText: 'Are you sure you want to delete selected doctor schedules ?'
      };
      modalService.showModal ({}, modalOptions).then (function (result){
        $scope.listErrorData = "";
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
          data: {"oids": selectedDoctorScheduleOids, "source": "DoctorSchedule"}
        }).then (
          function (response){
            if (response.data.Status === 'Ok'){
              $scope.loadDoctorSchedulesList ();
            }
            else{
              $scope.listErrorData = response.data;
            }
          }
        )
      });
    };
    $scope.editMultipleDoctorSchedules = function (){
      $scope.modalErrorData = "";
      $scope.modalSuccessMessage = "";
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Update',
        headerText: 'Edit Multiple Doctor Schedules',
        doctorScheduleSelectedItems: $scope.doctorScheduleSelectedItems,
        loadDoctorSchedulesList: $scope.loadDoctorSchedulesList,
        doctorDetails: $scope.doctorDetails,
        daysDetails: $scope.daysDetails,
        timesDetails: $scope.timesDetails
      };
      var modalDefaults = {
        templateUrl: contextPath + 'views/tpl/edit_multiple_doctorSchedule.html',
        controller: function ($scope, $modalInstance, $state){
          $scope.modalOptions = modalOptions;
          $scope.saveMultipleDoctorSchedules = function (){
            var updatedDoctorScheduleData = [];
            angular.forEach ($scope.modalOptions.doctorScheduleSelectedItems, function (value, key){
              updatedDoctorScheduleData.push ({
                oid: value.oid,
                doctorOid: value.doctorOid,
                visitingDay: value.visitingDay,
                startTime: value.startTime,
                endTime: value.endTime
              });
            });

            $scope.modalSuccessMessage = "";
            $scope.modalErrorData = "";
            $http ({
              url: path + "rest/secure/config/createOrUpdateMultipleConfig",
              method: "POST",
              data: {"doctorSchedules": updatedDoctorScheduleData, "source": "doctorSchedules"}
            }).then (
              function (response){
                if (response.data.Status === 'Ok'){
                  $scope.modalSuccessMessage = "Doctor Schedules updated successfully";
                  $timeout (function (){

                    $modalInstance.close (response);
                      $state.transitionTo ($state.current,
                        {}, {
                      reload: true,
                      inherit: false,
                      notify: true
                    });
                    },
                    1000);
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
  }]);