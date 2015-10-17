'use strict';

//TODO need to move in properties file

/* Controllers */
app
// Registration controller
    .controller('UserRegistrationController', ['$scope', '$http', function($scope, $http) {

      $scope.today = function() {
        $scope.dt = new Date();
      };
      $scope.today();

      $scope.clear = function() {
        $scope.dt = null;
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
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
      
      $http.get(path + "rest/secure/common/getSpecialityValues").then(
		  function(response) {
            $scope.specialityValues = response.data.specialityDetails;
          }
      )

      $http.get(path + "rest/secure/lookup/loadLookupByName?lookupNames=country,salutation").then(
          function(response) {
            $scope.countries = response.data.lookupValues.countryDetails;
            $scope.salutations = response.data.lookupValues.salutationDetails;
          }
      )

      $scope.updateState = function(){
        $http.get(path + "rest/secure/lookup/populateState?countryId="+$scope.data.country).then(
            function(response) {
              $scope.states = response.data.stateDetails;
            }
        )
      }

      $scope.updateCity = function(){
        $http.get(path + "rest/secure/lookup/populateCity?stateId="+$scope.data.state).then(
            function(response) {
              $scope.cities = response.data.cityDetails;
            }
        )
      }

      /**Save Patient Registration data*/
      $scope.saveRegistration = function() {
        if ($scope.registrationForm.$valid) {
          $http({
            url: path + "rest/secure/user/createUser",
            method: "POST",
            data: $scope.data
          }).then(
              function() {
                $scope.data = {};
                $scope.registrationMessage = "User saved successfully";
              },
              /**Error handling*/
              function() {
                $scope.registrationMessage = "Failed registration";
              }
          )
        }
      }
      
      $scope.loadUserRegistrationList = function () {
    	    $scope.errorData = "";
    	    $http ({
    	      url: path + "rest/secure/user/getUser?index=0&noOfRecords=10",
    	      method: "GET"
    	    }).then (
    	      function ( response ) {
    	        var data;
    	        if ( response.data.Status === 'Ok' ) {
    	          data = response.data.userDetails;
    	        }
    	        else {
    	          data = []
    	          $scope.errorData = response.data;
    	        }
    	        $scope.tableParams = new NgTableParams ({ count: 5 }, { counts: [ 5, 10, 25 ], dataset: data });
    	      }
    	    )
    	  }
    	  $scope.loadUserRegistrationDetails = function () {
    	    $scope.errorData = "";
    	    $http ({
    	      url: path + "rest/secure/user/getUserByOid?oid=" + $state.params.oid,
    	      method: "GET"
    	    }).then (
    	      function ( response ) {
    	        if ( response.data.Status === 'Ok' ) {
    	          $scope.data = response.data.userProfile;
    	        }
    	        else {
    	          $scope.errorData = response.data;
    	        }
    	      }
    	    )
    	  }
    	  $scope.deleteUserRegistration = function ( oid ) {
    	    $scope.errorData = "";
    	    var modalOptions = {
    	      closeButtonText: 'Cancel',
    	      actionButtonText: 'Delete',
    	      headerText: 'Delete User?',
    	      bodyText: 'Are you sure you want to delete this user?'
    	    };
    	    modalService.showModal ({}, modalOptions).then (function ( result ) {
    	      $http ({
    	        url: path + "rest/secure/user/deleteUser",
    	        method: "POST",
    	        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    	        transformRequest: function ( obj ) {
    	          var str = [];
    	          for ( var p in obj )
    	            str.push (encodeURIComponent (p) + "=" + encodeURIComponent (obj[ p ]));
    	          return str.join ("&");
    	        },
    	        data: { oid: oid }
    	      }).then (
    	        function ( response ) {
    	          if ( response.data.Status === 'Ok' ) {
    	            $scope.loadUserRegistrationList ();
    	          }
    	          else {
    	            $scope.errorData = response.data;
    	          }
    	        }
    	      )
    	    });
    	 };
    }]);