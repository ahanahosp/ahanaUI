/**
 * Searches an array for an object with a specified property.
 *
 * Example usage:
 * <code>var index = myArray.indexOfObjectWithProperty('id', 123);</code>
 *
 * @param propertyName the name of the property to inspect
 * @param propertyValue the value to match
 * @returns the (zero-based) index at which the object was found, or -1 if no
 * such object was found
 */
Array.prototype.indexOfObjectWithProperty = function (propertyName, propertyValue){
  for (var i = 0, len = this.length; i < len; i++){
    if (this[i][propertyName] === propertyValue) return i;
  }
  return -1;
};
/**
 * Test if an array of objects contains an object with a specified property.
 *
 * Example usage:
 * <code>var isPresent = myArray.containsObjectWithProperty('id', 123);</code>
 *
 * @param propertyName the name of the property to inspect
 * @param propertyValue the value to match
 * @returns true if an object was found, false otherwise
 */
Array.prototype.containsObjectWithProperty = function (propertyName, propertyValue){
  return this.indexOfObjectWithProperty (propertyName, propertyValue) != -1;
};

'use strict';
/* Controllers */
app
  .controller ('DoctorScheduleController', ['$scope', '$http', 'NgTableParams','$filter', '$state', '$timeout', function ($scope, $http, NgTableParams,$filter, $state, $timeout){
  $http.get (path + "rest/secure/config/getDoctorDetails").then (
    function (response){
      $scope.doctorDetails = response.data.doctorDetails;
    }
  )
  
  $http.get (path + "rest/secure/lookup/loadLookupByName?lookupNames=days").then (
    function (response){
      $scope.countries = response.data.lookupValues.countryDetails;
      $scope.days = response.data.lookupValues.daysDetails;
    }
  )
  
  $http.get (path + "rest/secure/config/getSavedSchedule").then (
    function (response){
      $scope.roleDetails = response.data.roleDetails;
    }
  )

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
			  } else{
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
            $defer.resolve ($scope.roles = orderedData.slice ((params.page () - 1) * params.count (), params.page () * params.count ()));
          }
        });
      }
    )
  };

  $scope.saveDoctorSchedule = function (mode){
    $scope.errorData = "";
    $scope.successMessage = "";
    if ($scope.doctorScheduleForm.$valid){
      $http ({
        url: path + "rest/secure/config/createDoctorSchedule",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            if (mode === 'edit'){
              $scope.successMessage = "Doctor Schedule updated successfully";
              $timeout (function (){
                $state.go ('app.doctorSchedule');
              }, 1000);
            }
            else{
              $scope.successMessage = "Doctor Schedule saved successfully";
              $scope.data = {};
              $timeout (function (){
                $state.go ('app.doctorSchedule');
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
    $scope.errorData = "";
    $scope.data = {};
  }
}]);