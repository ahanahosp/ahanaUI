'use strict';
/**
 * Config for the router
 */
angular.module ('app')
  .run (
  ['$rootScope', '$state', '$stateParams',
    function ($rootScope, $state, $stateParams){
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
    }
  ]
)
  .config (
  ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG',
    function ($stateProvider, $urlRouterProvider, JQ_CONFIG){
      $urlRouterProvider
        .otherwise ('/app/inpatient');
      $stateProvider
        .state ('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'views/tpl/app.html'
      })

        .state ('app.registration', {
        url: '/registration',
        templateUrl: 'views/tpl/registration.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load (['views/js/controllers/registration.js']);
            }]
        }
      })
        .state ('app.inpatient', {
        url: '/inpatient',
        templateUrl: 'views/tpl/inpatient.html',
        controller: 'XeditableCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('xeditable').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/xeditable.js');
                }
              );
            }]
        }
      })
        .state ('app.outpatient', {
        url: '/outpatient',
        templateUrl: 'views/tpl/outpatient.html',
        controller: 'XeditableCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('xeditable').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/xeditable.js');
                }
              );
            }]
        }
      })
        .state ('app.inpatient-new', {
        url: '/inpatient-new',
        templateUrl: 'views/tpl/inpatient-new.html',
        controller: 'XeditableCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('xeditable').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/xeditable.js');
                }
              );
            }]
        }
      })
        .state ('app.outpatient-new', {
        url: '/outpatient-new',
        templateUrl: 'views/tpl/outpatient-new.html',
        controller: 'XeditableCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('xeditable').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/xeditable.js');
                }
              );
            }]
        }
        }).state ('app.register', {
        url: '/register',
        templateUrl: 'views/tpl/register.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/registration.js');
            }
          ]
        }
      }).state ('app.createRole', {
        url: '/createRole',
        templateUrl: 'views/tpl/create_role.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roles.js');
            }
          ]
        }
      })
        .state ('app.editRole', {
        url: '/editRole/{oid}',
        templateUrl: 'views/tpl/edit_role.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roles.js');
            }
          ]
        }
      }).state ('app.roles', {
        url: '/roles',
        templateUrl: 'views/tpl/roles.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roles.js');
            }
          ]
        }
      }).state ('app.organization', {
        url: '/organization',
        templateUrl: 'views/tpl/organization.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/organization.js');
            }
          ]
        }
      }).state ('app.organizationModule', {
        url: '/organizationModule',
        templateUrl: 'views/tpl/organization_module.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/organizationModule.js');
            }
          ]
        }
      })
        .state ('app.createFloor', {
        url: '/createFloor',
        templateUrl: 'views/tpl/create_floor.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/floor.js');
            }
          ]
        }
      })
        .state ('app.editFloor', {
        url: '/editFloor/{oid}',
        templateUrl: 'views/tpl/edit_floor.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/floor.js');
            }
          ]
        }
      }).state ('app.floor', {
        url: '/floor',
        templateUrl: 'views/tpl/floor.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/floor.js');
            }
          ]
        }
      })
        .state ('app.createWard', {
        url: '/createWard',
        templateUrl: 'views/tpl/create_ward.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/ward.js');
            }
          ]
        }
      })
        .state ('app.editWard', {
        url: '/editWard/{oid}',
        templateUrl: 'views/tpl/edit_ward.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/ward.js');
            }
          ]
        }
      }).state ('app.ward', {
        url: '/ward',
        templateUrl: 'views/tpl/ward.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/ward.js');
            }
          ]
        }
      })
        .state ('app.createUserRegistration', {
        url: '/createUserRegistration',
        templateUrl: 'views/tpl/create_userregistration.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/userRegistration.js');
            }
          ]
        }
      })
        .state ('app.editUserRegistration', {
        url: '/editUserRegistration/{oid}',
        templateUrl: 'views/tpl/edit_userregistration.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/userRegistration.js');
            }
          ]
        }
      }).state ('app.userRegistration', {
        url: '/userRegistration',
        templateUrl: 'views/tpl/userregistration.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/userRegistration.js');
            }
          ]
        }
      })
        .state ('app.createAccountHead', {
        url: '/createAccountHead',
        templateUrl: 'views/tpl/create_accounthead.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/accounthead.js');
            }
          ]
        }
      })
        .state ('app.editAccountHead', {
        url: '/editAccountHead/{oid}',
        templateUrl: 'views/tpl/edit_accounthead.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/accounthead.js');
            }
          ]
        }
      }).state ('app.accountHead', {
        url: '/accountHead',
        templateUrl: 'views/tpl/accounthead.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/accounthead.js');
            }
          ]
        }
      })
        .state ('app.createProcedures', {
        url: '/createProcedures',
        templateUrl: 'views/tpl/create_procedures.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/procedures.js');
            }
          ]
        }
      })
        .state ('app.editProcedures', {
        url: '/editProcedures/{oid}',
        templateUrl: 'views/tpl/edit_procedures.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/procedures.js');
            }
          ]
        }
      }).state ('app.procedures', {
        url: '/procedures',
        templateUrl: 'views/tpl/procedures.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/procedures.js');
            }
          ]
        }
      })
        .state ('app.createSpeciality', {
        url: '/createSpeciality',
        templateUrl: 'views/tpl/create_speciality.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/speciality.js');
            }
          ]
        }
      })
        .state ('app.editSpeciality', {
        url: '/editSpeciality/{oid}',
        templateUrl: 'views/tpl/edit_speciality.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/speciality.js');
            }
          ]
        }
      }).state ('app.speciality', {
        url: '/speciality',
        templateUrl: 'views/tpl/speciality.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/speciality.js');
            }
          ]
        }
      })
        .state ('app.createRoomType', {
        url: '/createRoomType',
        templateUrl: 'views/tpl/create_roomtype.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roomtype.js');
            }
          ]
        }
      })
        .state ('app.editRoomType', {
        url: '/editRoomType/{oid}',
        templateUrl: 'views/tpl/edit_roomtype.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roomtype.js');
            }
          ]
        }
      }).state ('app.roomType', {
        url: '/roomType',
        templateUrl: 'views/tpl/roomtype.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roomtype.js');
            }
          ]
        }
      })
        .state ('app.createRoom', {
        url: '/createRoom',
        templateUrl: 'views/tpl/create_room.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/room.js');
            }
          ]
        }
      })
        .state ('app.editRoom', {
        url: '/editRoom/{oid}',
        templateUrl: 'views/tpl/edit_room.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/room.js');
            }
          ]
        }
      }).state ('app.room', {
        url: '/room',
        templateUrl: 'views/tpl/room.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/room.js');
            }
          ]
        }
      })
        .state ('app.createRoomChargeItems', {
        url: '/createRoomChargeItems',
        templateUrl: 'views/tpl/create_roomchargeitem.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roomchargeitems.js');
            }
          ]
        }
      })
        .state ('app.editRoomChargeItems', {
        url: '/editRoomChargeItems/{oid}',
        templateUrl: 'views/tpl/edit_roomchargeitem.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roomchargeitems.js');
            }
          ]
        }
      }).state ('app.roomChargeItems', {
        url: '/roomChargeItems',
        templateUrl: 'views/tpl/roomchargeitems.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roomchargeitems.js');
            }
          ]
        }
      })
        .state ('app.createRoomCharges', {
        url: '/createRoomCharges',
        templateUrl: 'views/tpl/create_roomcharges.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roomcharges.js');
            }
          ]
        }
      })
        .state ('app.editRoomCharges', {
        url: '/editRoomCharges/{oid}',
        templateUrl: 'views/tpl/edit_roomcharges.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roomcharges.js');
            }
          ]
        }
      }).state ('app.roomCharges', {
        url: '/roomCharges',
        templateUrl: 'views/tpl/roomcharges.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roomcharges.js');
            }
          ]
        }
      })
        .state ('app.createRoomMaintenance', {
        url: '/createRoomMaintenance',
        templateUrl: 'views/tpl/create_roommaintenance.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roommaintenance.js');
            }
          ]
        }
      })
        .state ('app.editRoomMaintenance', {
        url: '/editRoomMaintenance/{oid}',
        templateUrl: 'views/tpl/edit_roommaintenance.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roommaintenance.js');
            }
          ]
        }
      }).state ('app.roomMaintenance', {
        url: '/roomMaintenance',
        templateUrl: 'views/tpl/roommaintenance.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roommaintenance.js');
            }
          ]
        }
      })
        .state ('app.createAlertType', {
        url: '/createAlertType',
        templateUrl: 'views/tpl/create_alerttype.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/alerttype.js');
            }
          ]
        }
      })
        .state ('app.editAlertType', {
        url: '/editAlertType/{oid}',
        templateUrl: 'views/tpl/edit_alerttype.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/alerttype.js');
            }
          ]
        }
      }).state ('app.alertType', {
        url: '/alertType',
        templateUrl: 'views/tpl/alerttype.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/alerttype.js');
            }
          ]
        }
      }).state ('app.roleRights', {
        url: '/roleRights',
        templateUrl: 'views/tpl/role_rights.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/roleRights.js');
            }
          ]
        }
      })       
	 .state ('app.userRole', {
        url: '/userRole',
        templateUrl: 'views/tpl/userroles.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/userroles.js');
            }
          ]
        }
      })
        .state ('app.form.xeditable', {
        url: '/xeditable',
        templateUrl: 'views/tpl/form_xeditable.html',
        controller: 'XeditableCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('xeditable').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/xeditable.js');
                }
              );
            }]
        }
      })

        // others
        .state ('lockme', {
        url: '/lockme',
        templateUrl: 'views/tpl/page_lockme.html'
      })
        .state ('access', {
        url: '/access',
        template: '<div ui-view class="fade-in-right-big smooth"></div>'
      })
        .state ('access.signin', {
        url: '/signin',
        templateUrl: 'views/tpl/page_signin.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (['views/js/controllers/signin.js']);
            }]
        }
      })
        .state ('access.signup', {
        url: '/signup',
        templateUrl: 'views/tpl/page_signup.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (['views/js/controllers/signup.js']);
            }]
        }
      })
        .state ('access.forgotpwd', {
        url: '/forgotpwd',
        templateUrl: 'views/tpl/page_forgotpwd.html'
      })
        .state ('access.404', {
        url: '/404',
        templateUrl: 'views/tpl/page_404.html'
      })
        .state ('layout', {
        abstract: true,
        url: '/layout',
        templateUrl: 'views/tpl/layout.html'
      })
        .state ('layout.fullwidth', {
        url: '/fullwidth',
        views: {
          '': {
            templateUrl: 'views/tpl/layout_fullwidth.html'
          },
          'footer': {
            templateUrl: 'views/tpl/layout_footer_fullwidth.html'
          }
        },
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (['views/js/controllers/vectormap.js']);
            }]
        }
      })
        .state ('layout.mobile', {
        url: '/mobile',
        views: {
          '': {
            templateUrl: 'views/tpl/layout_mobile.html'
          },
          'footer': {
            templateUrl: 'views/tpl/layout_footer_mobile.html'
          }
        }
      })
        .state ('layout.app', {
        url: '/app',
        views: {
          '': {
            templateUrl: 'views/tpl/layout_app.html'
          },
          'footer': {
            templateUrl: 'views/tpl/layout_footer_fullwidth.html'
          }
        },
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (['views/js/controllers/tab.js']);
            }]
        }
      })
        .state ('apps', {
        abstract: true,
        url: '/apps',
        templateUrl: 'views/tpl/layout.html'
      })
    }
  ]
);
