'use strict';

//TODO need to move in properties file

/*Global path declaration */
var path="http://localhost:9090/ahanaServices/services/";

/* Controllers */
app
  // Registration controller
  .controller('RegistrationController', ['$scope','$http', function($scope, $http) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.openDateOfBirth = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.openedDateOfBirth = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd/MM/yyyy hh:mm:ss', 'dd/MM/yyyy'];
    $scope.format = $scope.formats[0];
    $scope.formatDOB = $scope.formats[1];

    /**Copy current address to permanent address if checkbox is checked*/
    $scope.copyCurrentAddress = function(){
      if($scope.sameAsCurrentAddress && $scope.data && $scope.data.PatientRegistration){
        $scope.data.PatientRegistration.permanentAddress = $scope.data.PatientRegistration.address;
        $scope.data.PatientRegistration.permanentCountry = $scope.data.PatientRegistration.country;
        $scope.data.PatientRegistration.permanentState = $scope.data.PatientRegistration.state;
        $scope.data.PatientRegistration.permanentCity = $scope.data.PatientRegistration.city;
        $scope.data.PatientRegistration.permanentZip = $scope.data.PatientRegistration.zip;
      }
    }

    $http.get(path+"rest/lookup/loadLookupByName?lookupNames=salutation,country,bloodgroup,category,caretaker,patienttype").then(
      function(response){
        $scope.lookup = JSON.parse(response.data);
        console.log(response);
      },
      function(error){
        console.log(error);
      }
    )

    /**Save Patient Registration data*/
    $scope.saveRegistration = function(){
      if($scope.registrationForm.$valid){
        $http({
          url: path+"rest/registration/savePatient",
          method: "POST",
          data: $scope.data
          //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(
            function(){
              $scope.data = {};
              $scope.registrationMessage = "Registration saved successfully";
            },
            /**Error handling*/
            function(){
              $scope.registrationMessage = "Failed registration";
            }
        )
      }
    }
  }]);