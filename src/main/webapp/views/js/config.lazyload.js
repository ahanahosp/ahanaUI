// lazyload config

angular.module('app')
/**
 * jQuery plugin config use ui-jq directive , config the js and css files that required
 * key: function name of the jQuery plugin
 * value: array of the css js file located
 */
    .constant('JQ_CONFIG', {
      easyPieChart: [contextPath + 'views/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'],
      sparkline: [contextPath + 'views/bower_components/jquery.sparkline/dist/jquery.sparkline.retina.js'],
      plot: [contextPath + 'views/bower_components/flot/jquery.flot.js',
          contextPath + 'views/bower_components/flot/jquery.flot.pie.js',
          contextPath + 'views/bower_components/flot/jquery.flot.resize.js',
          contextPath + 'views/bower_components/flot.tooltip/js/jquery.flot.tooltip.js',
          contextPath + 'views/bower_components/flot.orderbars/js/jquery.flot.orderBars.js',
          contextPath + 'views/bower_components/flot-spline/js/jquery.flot.spline.js'],
      moment: [contextPath + 'views/bower_components/moment/moment.js'],
      screenfull: [contextPath + 'views/bower_components/screenfull/dist/screenfull.min.js'],
      slimScroll: [contextPath + 'views/bower_components/slimscroll/jquery.slimscroll.min.js'],
      sortable: [contextPath + 'views/bower_components/html5sortable/jquery.sortable.js'],
      nestable: [contextPath + 'views/bower_components/nestable/jquery.nestable.js',
          contextPath + 'views/bower_components/nestable/jquery.nestable.css'],
      filestyle: [contextPath + 'views/bower_components/bootstrap-filestyle/src/bootstrap-filestyle.js'],
      slider: [contextPath + 'views/bower_components/bootstrap-slider/bootstrap-slider.js',
          contextPath + 'views/bower_components/bootstrap-slider/bootstrap-slider.css'],
      chosen: [contextPath + 'views/bower_components/chosen/chosen.jquery.min.js',
          contextPath + 'views/bower_components/bootstrap-chosen/bootstrap-chosen.css'],
      TouchSpin: [contextPath + 'views/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
          contextPath + 'views/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
      wysiwyg: [contextPath + 'views/bower_components/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
          contextPath + 'views/bower_components/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
      dataTable: [contextPath + 'views/bower_components/datatables/media/js/jquery.dataTables.min.js',
          contextPath + 'views/bower_components/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
          contextPath + 'views/bower_components/plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
      vectorMap: [contextPath + 'views/bower_components/bower-jvectormap/jquery-jvectormap-1.2.2.min.js',
          contextPath + 'views/bower_components/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
          contextPath + 'views/bower_components/bower-jvectormap/jquery-jvectormap-us-aea-en.js',
          contextPath + 'views/bower_components/bower-jvectormap/jquery-jvectormap-1.2.2.css'],
      footable: [contextPath + 'views/bower_components/footable/dist/footable.all.min.js',
          contextPath + 'views/bower_components/footable/css/footable.core.css'],
      fullcalendar: [contextPath + 'views/bower_components/moment/moment.js',
          contextPath + 'views/bower_components/fullcalendar/dist/fullcalendar.min.js',
          contextPath + 'views/bower_components/fullcalendar/dist/fullcalendar.css',
          contextPath + 'views/bower_components/fullcalendar/dist/fullcalendar.theme.css'],
      daterangepicker: [contextPath + 'views/bower_components/moment/moment.js',
          contextPath + 'views/bower_components/bootstrap-daterangepicker/daterangepicker.js',
          contextPath + 'views/bower_components/bootstrap-daterangepicker/daterangepicker-bs3.css'],
      tagsinput: [contextPath + 'views/bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
          contextPath + 'views/bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.css']

    }
)
    // oclazyload config
    .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        // We configure ocLazyLoad to use the lib script.js as the async loader
        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
            modules: [
                {
                    name: 'ngGrid',
                    files: [
                        contextPath + 'views/bower_components/ng-grid/build/ng-grid.min.js',
                        contextPath + 'views/bower_components/ng-grid/ng-grid.min.css',
                        contextPath + 'views/bower_components/ng-grid/ng-grid.bootstrap.css'
                    ]
                },
                {
                    name: 'ui.grid',
                    files: [
                        contextPath + 'views/bower_components/angular-ui-grid/ui-grid.min.js',
                        contextPath + 'views/bower_components/angular-ui-grid/ui-grid.min.css',
                        contextPath + 'views/bower_components/angular-ui-grid/ui-grid.bootstrap.css'
                    ]
                },
                {
                    name: 'ui.select',
                    files: [
                        contextPath + 'views/bower_components/angular-ui-select/dist/select.min.js',
                        contextPath + 'views/bower_components/angular-ui-select/dist/select.min.css'
                    ]
                },
                {
                    name: 'angularFileUpload',
                    files: [
                        contextPath + 'views/bower_components/angular-file-upload/angular-file-upload.min.js'
                    ]
                },
                {
                    name: 'ui.calendar',
                    files: [contextPath + 'views/bower_components/angular-ui-calendar/src/calendar.js']
                },
                {
                    name: 'ngImgCrop',
                    files: [
                        contextPath + 'views/bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
                        contextPath + 'views/bower_components/ngImgCrop/compile/minified/ng-img-crop.css'
                    ]
                },
                {
                    name: 'angularBootstrapNavTree',
                    files: [
                        contextPath + 'views/bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                        contextPath + 'views/bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css'
                    ]
                },
                {
                    name: 'toaster',
                    files: [
                        contextPath + 'views/bower_components/angularjs-toaster/toaster.js',
                        contextPath + 'views/bower_components/angularjs-toaster/toaster.css'
                    ]
                },
                {
                    name: 'textAngular',
                    files: [
                        contextPath + 'views/bower_components/textAngular/dist/textAngular-sanitize.min.js',
                        contextPath + 'views/bower_components/textAngular/dist/textAngular.min.js'
                    ]
                },
                {
                    name: 'vr.directives.slider',
                    files: [
                        contextPath + 'views/bower_components/venturocket-angular-slider/build/angular-slider.min.js',
                        contextPath + 'views/bower_components/venturocket-angular-slider/build/angular-slider.css'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular',
                    files: [
                        contextPath + 'views/bower_components/videogular/videogular.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.controls',
                    files: [
                        contextPath + 'views/bower_components/videogular-controls/controls.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.buffering',
                    files: [
                        contextPath + 'views/bower_components/videogular-buffering/buffering.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.overlayplay',
                    files: [
                        contextPath + 'views/bower_components/videogular-overlay-play/overlay-play.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.poster',
                    files: [
                        contextPath + 'views/bower_components/videogular-poster/poster.min.js'
                    ]
                },
                {
                    name: 'com.2fdevs.videogular.plugins.imaads',
                    files: [
                        contextPath + 'views/bower_components/videogular-ima-ads/ima-ads.min.js'
                    ]
                },
                {
                    name: 'xeditable',
                    files: [
                        contextPath + 'views/bower_components/angular-xeditable/dist/js/xeditable.min.js',
                        contextPath + 'views/bower_components/angular-xeditable/dist/css/xeditable.css'
                    ]
                },
                {
                    name: 'smart-table',
                    files: [
                        contextPath + 'views/bower_components/angular-smart-table/dist/smart-table.min.js'
                    ]
                }
            ]
        });
    }])
;
