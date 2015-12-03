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
        .otherwise (redirectState);
      $stateProvider
        .state ('app', {
        abstract: true,
        url: '/app',
        templateUrl: contextPath + 'views/tpl/app.html'
      })
        .state ('app.dashboard-v1', {
        url: '/dashboard-v1',
        templateUrl: contextPath + 'views/tpl/app_dashboard_v1.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load (['views/js/controllers/chart.js']);
            }]
        }
      })
        .state ('app.registration', {
        url: '/registration',
        templateUrl: contextPath + 'views/tpl/registration.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load (['views/js/controllers/registration.js']);
            }]
        }
      })
        .state ('app.inpatient', {
        url: '/inpatient',
        templateUrl: contextPath + 'views/tpl/inpatient.html',
        controller: 'XeditableCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('xeditable').then (
                function (){
                  return $ocLazyLoad.load (contextPath + 'views/js/controllers/xeditable.js');
                }
              );
            }]
        }
      })
        .state ('app.outpatient', {
        url: '/outpatient',
        templateUrl: contextPath + 'views/tpl/outpatient.html',
        controller: 'XeditableCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('xeditable').then (
                function (){
                  return $ocLazyLoad.load (contextPath + 'views/js/controllers/xeditable.js');
                }
              );
            }]
        }
      })
        .state ('app.dummy', {
        url: '/dummy',
        templateUrl: contextPath + 'views/tpl/dummy.html',
        controller: 'XeditableCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('xeditable').then (
                function (){
                  return $ocLazyLoad.load (contextPath + 'views/js/controllers/xeditable.js');
                }
              );
            }]
        }
      })
        .state ('app.register', {
        url: '/register',
        templateUrl: contextPath + 'views/tpl/register.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/registration.js');
            }
          ]
        }
      }).state ('app.createRole', {
        url: '/createRole',
        templateUrl: contextPath + 'views/tpl/create_role.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roles.js');
            }
          ]
        }
      })
        .state ('app.editRole', {
        url: '/editRole/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_role.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roles.js');
            }
          ]
        }
      }).state ('app.roles', {
        url: '/roles',
        templateUrl: contextPath + 'views/tpl/roles.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roles.js');
            }
          ]
        }
      }).state ('app.organization', {
        url: '/organization',
        templateUrl: contextPath + 'views/tpl/organization.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/organization.js');
            }
          ]
        }
      }).state ('app.organizationModule', {
        url: '/organizationModule',
        templateUrl: contextPath + 'views/tpl/organization_module.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/organizationModule.js');
            }
          ]
        }
      })
        .state ('app.createFloor', {
        url: '/createFloor',
        templateUrl: contextPath + 'views/tpl/create_floor.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/floor.js');
            }
          ]
        }
      })
        .state ('app.editFloor', {
        url: '/editFloor/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_floor.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/floor.js');
            }
          ]
        }
      }).state ('app.floor', {
        url: '/floor',
        templateUrl: contextPath + 'views/tpl/floor.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/floor.js');
            }
          ]
        }
      })
        .state ('app.createWard', {
        url: '/createWard',
        templateUrl: contextPath + 'views/tpl/create_ward.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/ward.js');
            }
          ]
        }
      })
        .state ('app.editWard', {
        url: '/editWard/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_ward.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/ward.js');
            }
          ]
        }
      }).state ('app.ward', {
        url: '/ward',
        templateUrl: contextPath + 'views/tpl/ward.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/ward.js');
            }
          ]
        }
      })
        .state ('app.createUserRegistration', {
        url: '/createUserRegistration',
        templateUrl: contextPath + 'views/tpl/create_userregistration.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/userRegistration.js');
            }
          ]
        }
      })
        .state ('app.editUserRegistration', {
        url: '/editUserRegistration/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_userregistration.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/userRegistration.js');
            }
          ]
        }
      }).state ('app.userRegistration', {
        url: '/userRegistration',
        templateUrl: contextPath + 'views/tpl/userregistration.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/userRegistration.js');
            }
          ]
        }
      })
        .state ('app.createAccountHead', {
        url: '/createAccountHead',
        templateUrl: contextPath + 'views/tpl/create_accounthead.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/accounthead.js');
            }
          ]
        }
      })
        .state ('app.editAccountHead', {
        url: '/editAccountHead/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_accounthead.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/accounthead.js');
            }
          ]
        }
      }).state ('app.accountHead', {
        url: '/accountHead',
        templateUrl: contextPath + 'views/tpl/accounthead.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/accounthead.js');
            }
          ]
        }
      })
        .state ('app.createProcedures', {
        url: '/createProcedures',
        templateUrl: contextPath + 'views/tpl/create_procedures.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/procedures.js');
            }
          ]
        }
      })
        .state ('app.editProcedures', {
        url: '/editProcedures/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_procedures.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/procedures.js');
            }
          ]
        }
      }).state ('app.procedures', {
        url: '/procedures',
        templateUrl: contextPath + 'views/tpl/procedures.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/procedures.js');
            }
          ]
        }
      })
        .state ('app.createSpeciality', {
        url: '/createSpeciality',
        templateUrl: contextPath + 'views/tpl/create_speciality.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/speciality.js');
            }
          ]
        }
      })
        .state ('app.editSpeciality', {
        url: '/editSpeciality/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_speciality.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/speciality.js');
            }
          ]
        }
      }).state ('app.speciality', {
        url: '/speciality',
        templateUrl: contextPath + 'views/tpl/speciality.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/speciality.js');
            }
          ]
        }
      })
        .state ('app.createRoomType', {
        url: '/createRoomType',
        templateUrl: contextPath + 'views/tpl/create_roomtype.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roomtype.js');
            }
          ]
        }
      })
        .state ('app.editRoomType', {
        url: '/editRoomType/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_roomtype.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roomtype.js');
            }
          ]
        }
      }).state ('app.roomType', {
        url: '/roomType',
        templateUrl: contextPath + 'views/tpl/roomtype.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roomtype.js');
            }
          ]
        }
      })
        .state ('app.createRoom', {
        url: '/createRoom',
        templateUrl: contextPath + 'views/tpl/create_room.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/room.js');
            }
          ]
        }
      })
        .state ('app.editRoom', {
        url: '/editRoom/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_room.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/room.js');
            }
          ]
        }
      }).state ('app.room', {
        url: '/room',
        templateUrl: contextPath + 'views/tpl/room.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/room.js');
            }
          ]
        }
      })
        .state ('app.createRoomChargeItems', {
        url: '/createRoomChargeItems',
        templateUrl: contextPath + 'views/tpl/create_roomchargeitem.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roomchargeitems.js');
            }
          ]
        }
      })
        .state ('app.editRoomChargeItems', {
        url: '/editRoomChargeItems/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_roomchargeitem.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roomchargeitems.js');
            }
          ]
        }
      }).state ('app.roomChargeItems', {
        url: '/roomChargeItems',
        templateUrl: contextPath + 'views/tpl/roomchargeitems.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roomchargeitems.js');
            }
          ]
        }
      })
        .state ('app.createRoomCharges', {
        url: '/createRoomCharges',
        templateUrl: contextPath + 'views/tpl/create_roomcharges.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roomcharges.js');
            }
          ]
        }
      })
        .state ('app.editRoomCharges', {
        url: '/editRoomCharges/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_roomcharges.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roomcharges.js');
            }
          ]
        }
      }).state ('app.roomCharges', {
        url: '/roomCharges',
        templateUrl: contextPath + 'views/tpl/roomcharges.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roomcharges.js');
            }
          ]
        }
      })
        .state ('app.createRoomMaintenance', {
        url: '/createRoomMaintenance',
        templateUrl: contextPath + 'views/tpl/create_roommaintenance.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roommaintenance.js');
            }
          ]
        }
      })
        .state ('app.editRoomMaintenance', {
        url: '/editRoomMaintenance/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_roommaintenance.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roommaintenance.js');
            }
          ]
        }
      }).state ('app.roomMaintenance', {
        url: '/roomMaintenance',
        templateUrl: contextPath + 'views/tpl/roommaintenance.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roommaintenance.js');
            }
          ]
        }
      })
        .state ('app.createAlertType', {
        url: '/createAlertType',
        templateUrl: contextPath + 'views/tpl/create_alerttype.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/alerttype.js');
            }
          ]
        }
      })
        .state ('app.editAlertType', {
        url: '/editAlertType/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_alerttype.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/alerttype.js');
            }
          ]
        }
      }).state ('app.alertType', {
        url: '/alertType',
        templateUrl: contextPath + 'views/tpl/alerttype.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/alerttype.js');
            }
          ]
        }
      }).state ('app.roleRights', {
        url: '/roleRights',
        templateUrl: contextPath + 'views/tpl/role_rights.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roleRights.js');
            }
          ]
        }
      })       
	 .state ('app.userRole', {
        url: '/userRole',
        templateUrl: contextPath + 'views/tpl/userroles.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/userroles.js');
            }
          ]
        }
      }).state ('app.createAlliedCharges', {
          url: '/createAlliedCharges',
          templateUrl: contextPath + 'views/tpl/create_alliedcharges.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/alliedcharges.js');
              }
            ]
          }
        })
          .state ('app.editAlliedCharges', {
          url: '/editAlliedCharges/{oid}',
          templateUrl: contextPath + 'views/tpl/edit_alliedcharges.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/alliedcharges.js');
              }
            ]
          }
        }).state ('app.alliedCharges', {
          url: '/alliedCharges',
          templateUrl: contextPath + 'views/tpl/alliedcharges.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/alliedcharges.js');
              }
            ]
          }
        })
        .state ('app.createPatientCategory', {
          url: '/createPatientCategory',
          templateUrl: contextPath + 'views/tpl/create_patientcategory.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/patientcategory.js');
              }
            ]
          }
        })
          .state ('app.editPatientCategory', {
          url: '/editPatientCategory/{oid}',
          templateUrl: contextPath + 'views/tpl/edit_patientcategory.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/patientcategory.js');
              }
            ]
          }
        }).state ('app.patientCategory', {
          url: '/patientCategory',
          templateUrl: contextPath + 'views/tpl/patientcategory.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/patientcategory.js');
              }
            ]
          }
        })
        .state ('app.createChargesForCategory', {
          url: '/createChargesForCategory',
          templateUrl: contextPath + 'views/tpl/create_chargesforcategory.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/chargesforcategory.js');
              }
            ]
          }
        })
          .state ('app.editChargesForCategory', {
          url: '/editChargesForCategory/{oid}',
          templateUrl: contextPath + 'views/tpl/edit_chargesforcategory.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/chargesforcategory.js');
              }
            ]
          }
        }).state ('app.chargesForCategory', {
          url: '/chargesForCategory',
          templateUrl: contextPath + 'views/tpl/chargesforcategory.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/chargesforcategory.js');
              }
            ]
          }
        })
        .state ('app.createRoomBedType', {
        url: '/createRole',
        templateUrl: contextPath + 'views/tpl/create_room_bed_type.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roomBedType.js');
            }
          ]
        }
      })
        .state ('app.editRoomBedType', {
        url: '/editRole/{oid}',
        templateUrl: contextPath + 'views/tpl/edit_room_bed_type.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roomBedType.js');
            }
          ]
        }
      }).state ('app.roomBedTypes', {
        url: '/roomBedTypes',
        templateUrl: contextPath + 'views/tpl/roomBedType.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/roomBedType.js');
            }
          ]
        }
      })
        .state ('app.createLogin', {
          url: '/createLogin',
          templateUrl: contextPath + 'views/tpl/create_login.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/login.js');
              }
            ]
          }
        })
          .state ('app.editLogin', {
          url: '/editLogin/{oid}',
          templateUrl: contextPath + 'views/tpl/edit_login.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/login.js');
              }
            ]
          }
        }).state ('app.login', {
          url: '/login',
          templateUrl: contextPath + 'views/tpl/login.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/login.js');
              }
            ]
          }
        })
        .state ('app.doctorSchedule', {
          url: '/doctorSchedule',
          templateUrl: contextPath + 'views/tpl/doctorschedule.html',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (contextPath + 'views/js/controllers/doctorschedule.js');
              }
            ]
          }
        })
        .state ('app.table.smart', {
        url: '/smart',
        templateUrl: contextPath + 'views/tpl/table_smart.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('smart-table').then (
                function (){
                  return $ocLazyLoad.load (contextPath + 'views/js/controllers/table.js');
                }
              );
            }]
        }
      })
        // form
        .state ('app.form', {
        url: '/form',
        template: '<div ui-view class="fade-in"></div>',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (contextPath + 'views/js/controllers/form.js');
            }]
        }
      })
        .state ('app.form.components', {
        url: '/components',
        templateUrl: contextPath + 'views/tpl/form_components.html',
        resolve: {
          deps: ['uiLoad', '$ocLazyLoad',
            function (uiLoad, $ocLazyLoad){
              return uiLoad.load (JQ_CONFIG.daterangepicker)
                .then (
                function (){
                  return uiLoad.load (contextPath + 'views/js/controllers/form.components.js');
                }
              ).then (
                function (){
                  return $ocLazyLoad.load ('ngBootstrap');
                }
              );
            }
          ]
        }
      })
        .state ('app.form.elements', {
        url: '/elements',
        templateUrl: contextPath + 'views/tpl/form_elements.html'
      })
        .state ('app.form.validation', {
        url: '/validation',
        templateUrl: contextPath + 'views/tpl/form_validation.html'
      })
        .state ('app.form.wizard', {
        url: '/wizard',
        templateUrl: contextPath + 'views/tpl/form_wizard.html'
      })
        .state ('app.form.fileupload', {
        url: '/fileupload',
        templateUrl: contextPath + 'views/tpl/form_fileupload.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('angularFileUpload').then (
                function (){
                  return $ocLazyLoad.load (contextPath + 'views/js/controllers/file-upload.js');
                }
              );
            }]
        }
      })
        .state ('app.form.imagecrop', {
        url: '/imagecrop',
        templateUrl: contextPath + 'views/tpl/form_imagecrop.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('ngImgCrop').then (
                function (){
                  return $ocLazyLoad.load (contextPath + 'views/js/controllers/imgcrop.js');
                }
              );
            }]
        }
      })
        .state ('app.form.select', {
        url: '/select',
        templateUrl: contextPath + 'views/tpl/form_select.html',
        controller: 'SelectCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('ui.select').then (
                function (){
                  return $ocLazyLoad.load (contextPath + 'views/js/controllers/select.js');
                }
              );
            }]
        }
      })
        .state ('app.form.slider', {
        url: '/slider',
        templateUrl: contextPath + 'views/tpl/form_slider.html',
        controller: 'SliderCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('vr.directives.slider').then (
                function (){
                  return $ocLazyLoad.load (contextPath + 'views/js/controllers/slider.js');
                }
              );
            }]
        }
      })
        .state ('app.form.editor', {
        url: '/editor',
        templateUrl: contextPath + 'views/tpl/form_editor.html',
        controller: 'EditorCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('textAngular').then (
                function (){
                  return $ocLazyLoad.load (contextPath + 'views/js/controllers/editor.js');
                }
              );
            }]
        }
      })
        .state ('app.form.xeditable', {
        url: '/xeditable',
        templateUrl: contextPath + 'views/tpl/form_xeditable.html',
        controller: 'XeditableCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('xeditable').then (
                function (){
                  return $ocLazyLoad.load (contextPath + 'views/js/controllers/xeditable.js');
                }
              );
            }]
        }
      })
        // pages
        .state ('app.page', {
        url: '/page',
        template: '<div ui-view class="fade-in-down"></div>'
      })
        .state ('app.page.profile', {
        url: '/profile',
        templateUrl: contextPath + 'views/tpl/page_profile.html'
      })
        .state ('app.page.post', {
        url: '/post',
        templateUrl: contextPath + 'views/tpl/page_post.html'
      })
        .state ('app.page.search', {
        url: '/search',
        templateUrl: contextPath + 'views/tpl/page_search.html'
      })
        .state ('app.page.invoice', {
        url: '/invoice',
        templateUrl: contextPath + 'views/tpl/page_invoice.html'
      })
        .state ('app.page.price', {
        url: '/price',
        templateUrl: contextPath + 'views/tpl/page_price.html'
      })
        .state ('app.docs', {
        url: '/docs',
        templateUrl: contextPath + 'views/tpl/docs.html'
      })
        // others
        .state ('lockme', {
        url: '/lockme',
        templateUrl: contextPath + 'views/tpl/page_lockme.html'
      })
        .state ('access', {
        url: '/access',
        template: '<div ui-view class="fade-in-right-big smooth"></div>'
      })
        .state ('access.login', {
        url: '/login',
          templateUrl: 'views/ahanaLogin.jsp',
          resolve: {
            deps: ['uiLoad',
              function (uiLoad){
                return uiLoad.load (['views/js/controllers/signin.js']);
              }]
          }
        })
        .state ('access.signin', {
        url: '/signin',
        templateUrl: contextPath + 'views/tpl/page_signin.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (['views/js/controllers/signin.js']);
            }]
        }
      })
        .state ('access.signup', {
        url: '/signup',
        templateUrl: contextPath + 'views/tpl/page_signup.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (['views/js/controllers/signup.js']);
            }]
        }
      })
        .state ('access.forgotpwd', {
        url: '/forgotpwd',
        templateUrl: contextPath + 'views/tpl/page_forgotpwd.html'
      })
        .state ('access.404', {
        url: '/404',
        templateUrl: contextPath + 'views/tpl/page_404.html'
      })
        // fullCalendar
        .state ('app.calendar', {
        url: '/calendar',
        templateUrl: contextPath + 'views/tpl/app_calendar.html',
        // use resolve to load other dependences
        resolve: {
          deps: ['$ocLazyLoad', 'uiLoad',
            function ($ocLazyLoad, uiLoad){
              return uiLoad.load (
                JQ_CONFIG.fullcalendar.concat (contextPath + 'views/js/app/calendar/calendar.js')
              ).then (
                function (){
                  return $ocLazyLoad.load ('ui.calendar');
                }
              )
            }]
        }
      })
        // mail
        .state ('app.mail', {
        abstract: true,
        url: '/mail',
        templateUrl: contextPath + 'views/tpl/mail.html',
        // use resolve to load other dependences
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (['views/js/app/mail/mail.js',
                'views/js/app/mail/mail-service.js',
                JQ_CONFIG.moment]);
            }]
        }
      })
        .state ('app.mail.list', {
        url: '/inbox/{fold}',
        templateUrl: contextPath + 'views/tpl/mail.list.html'
      })
        .state ('app.mail.detail', {
        url: '/{mailId:[0-9]{1,4}}',
        templateUrl: contextPath + 'views/tpl/mail.detail.html'
      })
        .state ('app.mail.compose', {
        url: '/compose',
        templateUrl: contextPath + 'views/tpl/mail.new.html'
      })
        .state ('layout', {
        abstract: true,
        url: '/layout',
        templateUrl: contextPath + 'views/tpl/layout.html'
      })
        .state ('layout.fullwidth', {
        url: '/fullwidth',
        views: {
          '': {
            templateUrl: contextPath + 'views/tpl/layout_fullwidth.html'
          },
          'footer': {
            templateUrl: contextPath + 'views/tpl/layout_footer_fullwidth.html'
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
            templateUrl: contextPath + 'views/tpl/layout_mobile.html'
          },
          'footer': {
            templateUrl: contextPath + 'views/tpl/layout_footer_mobile.html'
          }
        }
      })
        .state ('layout.app', {
        url: '/app',
        views: {
          '': {
            templateUrl: contextPath + 'views/tpl/layout_app.html'
          },
          'footer': {
            templateUrl: contextPath + 'views/tpl/layout_footer_fullwidth.html'
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
        templateUrl: contextPath + 'views/tpl/layout.html'
      })
        .state ('apps.note', {
        url: '/note',
        templateUrl: contextPath + 'views/tpl/apps_note.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (['views/js/app/note/note.js',
                JQ_CONFIG.moment]);
            }]
        }
      })
        .state ('apps.contact', {
        url: '/contact',
        templateUrl: contextPath + 'views/tpl/apps_contact.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (['views/js/app/contact/contact.js']);
            }]
        }
      })
        .state ('app.weather', {
        url: '/weather',
        templateUrl: contextPath + 'views/tpl/apps_weather.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load (
                {
                  name: 'angular-skycons',
                  files: ['views/js/app/weather/skycons.js',
                    'views/js/app/weather/angular-skycons.js',
                    'views/js/app/weather/ctrl.js',
                    JQ_CONFIG.moment]
                }
              );
            }]
        }
      })
        .state ('app.todo', {
        url: '/todo',
        templateUrl: contextPath + 'views/tpl/apps_todo.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (['views/js/app/todo/todo.js',
                JQ_CONFIG.moment]);
            }]
        }
      })
        .state ('app.todo.list', {
        url: '/{fold}'
      })
        .state ('music', {
        url: '/music',
        templateUrl: contextPath + 'views/tpl/music.html',
        controller: 'MusicCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ([
                'com.2fdevs.videogular',
                'com.2fdevs.videogular.plugins.controls',
                'com.2fdevs.videogular.plugins.overlayplay',
                'com.2fdevs.videogular.plugins.poster',
                'com.2fdevs.videogular.plugins.buffering',
                'views/js/app/music/ctrl.js',
                'views/js/app/music/theme.css'
              ]);
            }]
        }
      })
        .state ('music.home', {
        url: '/home',
        templateUrl: contextPath + 'views/tpl/music.home.html'
      })
        .state ('music.genres', {
        url: '/genres',
        templateUrl: contextPath + 'views/tpl/music.genres.html'
      })
        .state ('music.detail', {
        url: '/detail',
        templateUrl: contextPath + 'views/tpl/music.detail.html'
      })
        .state ('music.mtv', {
        url: '/mtv',
        templateUrl: contextPath + 'views/tpl/music.mtv.html'
      })
        .state ('music.mtvdetail', {
        url: '/mtvdetail',
        templateUrl: contextPath + 'views/tpl/music.mtv.detail.html'
      })
    }
  ]
);