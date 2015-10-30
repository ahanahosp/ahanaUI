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
        .state ('app.dashboard-v1', {
        url: '/dashboard-v1',
        templateUrl: 'tpl/app_dashboard_v1.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load (['views/js/controllers/chart.js']);
            }]
        }
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
        .state ('app.dashboard-v2', {
        url: '/dashboard-v2',
        templateUrl: 'views/tpl/app_dashboard_v2.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load (['views/js/controllers/chart.js']);
            }]
        }
      })
        .state ('app.ui', {
        url: '/ui',
        template: '<div ui-view class="fade-in-up"></div>'
      })
        .state ('app.ui.buttons', {
        url: '/buttons',
        templateUrl: 'views/tpl/ui_buttons.html'
      })
        .state ('app.ui.icons', {
        url: '/icons',
        templateUrl: 'views/tpl/ui_icons.html'
      })
        .state ('app.ui.grid', {
        url: '/grid',
        templateUrl: 'views/tpl/ui_grid.html'
      })
        .state ('app.ui.widgets', {
        url: '/widgets',
        templateUrl: 'views/tpl/ui_widgets.html'
      })
        .state ('app.ui.bootstrap', {
        url: '/bootstrap',
        templateUrl: 'views/tpl/ui_bootstrap.html'
      })
        .state ('app.ui.sortable', {
        url: '/sortable',
        templateUrl: 'views/tpl/ui_sortable.html'
      })
        .state ('app.ui.scroll', {
        url: '/scroll',
        templateUrl: 'views/tpl/ui_scroll.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/scroll.js');
            }]
        }
      })
        .state ('app.ui.portlet', {
        url: '/portlet',
        templateUrl: 'views/tpl/ui_portlet.html'
      })
        .state ('app.ui.timeline', {
        url: '/timeline',
        templateUrl: 'views/tpl/ui_timeline.html'
      })
        .state ('app.ui.tree', {
        url: '/tree',
        templateUrl: 'views/tpl/ui_tree.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('angularBootstrapNavTree').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/tree.js');
                }
              );
            }
          ]
        }
      })
        .state ('app.ui.toaster', {
        url: '/toaster',
        templateUrl: 'views/tpl/ui_toaster.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('toaster').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/toaster.js');
                }
              );
            }]
        }
      })
        .state ('app.ui.jvectormap', {
        url: '/jvectormap',
        templateUrl: 'views/tpl/ui_jvectormap.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('views/js/controllers/vectormap.js');
            }]
        }
      })
        .state ('app.ui.googlemap', {
        url: '/googlemap',
        templateUrl: 'views/tpl/ui_googlemap.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ([
                'views/js/app/map/load-google-maps.js',
                'views/js/app/map/ui-map.js',
                'views/js/app/map/map.js']).then (
                function (){
                  return loadGoogleMaps ();
                }
              );
            }]
        }
      })
        .state ('app.chart', {
        url: '/chart',
        templateUrl: 'views/tpl/ui_chart.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load ('views/js/controllers/chart.js');
            }]
        }
      })
        // table
        .state ('app.table', {
        url: '/table',
        template: '<div ui-view></div>'
      })
        .state ('app.table.static', {
        url: '/static',
        templateUrl: 'views/tpl/table_static.html'
      })
        .state ('app.table.datatable', {
        url: '/datatable',
        templateUrl: 'views/tpl/table_datatable.html'
      })
        .state ('app.table.footable', {
        url: '/footable',
        templateUrl: 'views/tpl/table_footable.html'
      })
        .state ('app.table.grid', {
        url: '/grid',
        templateUrl: 'views/tpl/table_grid.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('ngGrid').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/grid.js');
                }
              );
            }]
        }
      })
        .state ('app.table.uigrid', {
        url: '/uigrid',
        templateUrl: 'views/tpl/table_uigrid.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('ui.grid').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/uigrid.js');
                }
              );
            }]
        }
      })
        .state ('app.table.editable', {
        url: '/editable',
        templateUrl: 'views/tpl/table_editable.html',
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
      })
        .state ('app.dummy', {
        url: '/dummy',
        templateUrl: 'views/tpl/dummy.html',
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
        .state ('app.register', {
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
        .state ('app.table.smart', {
        url: '/smart',
        templateUrl: 'views/tpl/table_smart.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('smart-table').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/table.js');
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
              return uiLoad.load ('views/js/controllers/form.js');
            }]
        }
      })
        .state ('app.form.components', {
        url: '/components',
        templateUrl: 'views/tpl/form_components.html',
        resolve: {
          deps: ['uiLoad', '$ocLazyLoad',
            function (uiLoad, $ocLazyLoad){
              return uiLoad.load (JQ_CONFIG.daterangepicker)
                .then (
                function (){
                  return uiLoad.load ('views/js/controllers/form.components.js');
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
        templateUrl: 'views/tpl/form_elements.html'
      })
        .state ('app.form.validation', {
        url: '/validation',
        templateUrl: 'views/tpl/form_validation.html'
      })
        .state ('app.form.wizard', {
        url: '/wizard',
        templateUrl: 'views/tpl/form_wizard.html'
      })
        .state ('app.form.fileupload', {
        url: '/fileupload',
        templateUrl: 'views/tpl/form_fileupload.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('angularFileUpload').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/file-upload.js');
                }
              );
            }]
        }
      })
        .state ('app.form.imagecrop', {
        url: '/imagecrop',
        templateUrl: 'views/tpl/form_imagecrop.html',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('ngImgCrop').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/imgcrop.js');
                }
              );
            }]
        }
      })
        .state ('app.form.select', {
        url: '/select',
        templateUrl: 'views/tpl/form_select.html',
        controller: 'SelectCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('ui.select').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/select.js');
                }
              );
            }]
        }
      })
        .state ('app.form.slider', {
        url: '/slider',
        templateUrl: 'views/tpl/form_slider.html',
        controller: 'SliderCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('vr.directives.slider').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/slider.js');
                }
              );
            }]
        }
      })
        .state ('app.form.editor', {
        url: '/editor',
        templateUrl: 'views/tpl/form_editor.html',
        controller: 'EditorCtrl',
        resolve: {
          deps: ['$ocLazyLoad',
            function ($ocLazyLoad){
              return $ocLazyLoad.load ('textAngular').then (
                function (){
                  return $ocLazyLoad.load ('views/js/controllers/editor.js');
                }
              );
            }]
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
        // pages
        .state ('app.page', {
        url: '/page',
        template: '<div ui-view class="fade-in-down"></div>'
      })
        .state ('app.page.profile', {
        url: '/profile',
        templateUrl: 'views/tpl/page_profile.html'
      })
        .state ('app.page.post', {
        url: '/post',
        templateUrl: 'views/tpl/page_post.html'
      })
        .state ('app.page.search', {
        url: '/search',
        templateUrl: 'views/tpl/page_search.html'
      })
        .state ('app.page.invoice', {
        url: '/invoice',
        templateUrl: 'views/tpl/page_invoice.html'
      })
        .state ('app.page.price', {
        url: '/price',
        templateUrl: 'views/tpl/page_price.html'
      })
        .state ('app.docs', {
        url: '/docs',
        templateUrl: 'views/tpl/docs.html'
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
        // fullCalendar
        .state ('app.calendar', {
        url: '/calendar',
        templateUrl: 'views/tpl/app_calendar.html',
        // use resolve to load other dependences
        resolve: {
          deps: ['$ocLazyLoad', 'uiLoad',
            function ($ocLazyLoad, uiLoad){
              return uiLoad.load (
                JQ_CONFIG.fullcalendar.concat ('views/js/app/calendar/calendar.js')
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
        templateUrl: 'views/tpl/mail.html',
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
        templateUrl: 'views/tpl/mail.list.html'
      })
        .state ('app.mail.detail', {
        url: '/{mailId:[0-9]{1,4}}',
        templateUrl: 'views/tpl/mail.detail.html'
      })
        .state ('app.mail.compose', {
        url: '/compose',
        templateUrl: 'views/tpl/mail.new.html'
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
        .state ('apps.note', {
        url: '/note',
        templateUrl: 'views/tpl/apps_note.html',
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
        templateUrl: 'views/tpl/apps_contact.html',
        resolve: {
          deps: ['uiLoad',
            function (uiLoad){
              return uiLoad.load (['views/js/app/contact/contact.js']);
            }]
        }
      })
        .state ('app.weather', {
        url: '/weather',
        templateUrl: 'views/tpl/apps_weather.html',
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
        templateUrl: 'views/tpl/apps_todo.html',
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
        templateUrl: 'views/tpl/music.html',
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
        templateUrl: 'views/tpl/music.home.html'
      })
        .state ('music.genres', {
        url: '/genres',
        templateUrl: 'views/tpl/music.genres.html'
      })
        .state ('music.detail', {
        url: '/detail',
        templateUrl: 'views/tpl/music.detail.html'
      })
        .state ('music.mtv', {
        url: '/mtv',
        templateUrl: 'views/tpl/music.mtv.html'
      })
        .state ('music.mtvdetail', {
        url: '/mtvdetail',
        templateUrl: 'views/tpl/music.mtv.detail.html'
      })
        .state ('music.playlist', {
        url: '/playlist/{fold}',
        templateUrl: 'views/tpl/music.playlist.html'
      })
    }
  ]
);
