'use strict';
/* Controllers */
// signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', function ($scope, $http, $state){
  $scope.user = {};
  $scope.authError = null;
  $scope.login = function (){
    $scope.authError = null;
    // Try to login
    $http.post ('j_spring_security_check', {j_username: $scope.user.j_username, j_password: $scope.user.j_password})
      .then(function (response){
        if (!response.data.user){
          $scope.authError = 'Email or Password not right';
        }
        else{
          $state.go('app.dashboard-v1');
        }
      }, function (x){
        $scope.authError = 'Server Error';
      });
  };
}])
;