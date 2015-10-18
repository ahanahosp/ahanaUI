'use strict';
//TODO need to move in properties file
/* Controllers */
app.controller ('RegistrationController', ['$scope', '$http', function ($scope, $http){
  $scope.open = function ($event){
    $event.preventDefault ();
    $event.stopPropagation ();
    $scope.opened = true;
  };
  $http.get (path + "rest/secure/lookup/loadLookupByName?lookupNames=country").then (
    function (response){
      $scope.countries = response.data.lookupValues.countryDetails;
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
  $scope.saveRegistration = function (){
    $scope.errorData = "";
    if ($scope.registrationForm.$valid){
      $http ({
        url: path + "rest/secure/registration/savePatient",
        method: "POST",
        data: $scope.data
      }).then (
        function (response){
          if (response.data.Status === 'Ok'){
            $scope.data = {};
          }
          else{
            $scope.errorData = response.data;
          }
        }
      )
    }
  }
}]);