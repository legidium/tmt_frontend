(function () {
    'use strict';

    angular
        .module('app')
        .config(configure);

    configure.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', '$stickyStateProvider'];

    function configure($locationProvider, $stateProvider, $urlRouterProvider, $stickyStateProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $urlRouterProvider.otherwise('/error/404');

        $stickyStateProvider.enableDebug(true);

        var states = [];

        // App
        states.push({
            abstract:     true,
            name:         'app',
            templateUrl:  '/views/app.html',
            controller:   'AppController',
            controllerAs: 'app'
        });

        // Auth
        states.push({
            name:  'app.auth',
            url:   '/auth',
            dsr:   { default: 'app.auth.login' },
            views: {
                'auth': {
                    templateUrl:  '/views/auth/auth.html',
                    controller:   'AuthController',
                    controllerAs: 'auth',
                }
            }
        });
        states.push({
            name:         'app.auth.login',
            url:          '/login',
            templateUrl:  '/views/auth/auth-login.html',
            controller:   'AuthLoginController',
            controllerAs: 'login',
            data:         {
                pageTitle: 'Вход на сайт'
            }
        });
        states.push({
            name:         'app.auth.license',
            url:          '/license',
            templateUrl:  '/views/auth/auth-license.html',
            controller:   'AuthLicenseController',
            controllerAs: 'license',
            data:         {
                pageTitle: 'Подтверждение лицензии'
            }
        });
        states.push({
            name:        'app.auth.password',
            url:         '/password',
            templateUrl: '/views/auth/auth-password.html',
            controller:   'AuthPasswordController',
            controllerAs: 'password',
            data:        {
                pageTitle: 'Сброс пароля'
            }
        });
        states.push({
            name:       'app.auth.logout',
            url:        '/logout',
            controller: ['$state', 'auth', 'config', function($state, auth, config) {
                auth.logout();
                $state.go(config.STATE_LOGIN, {}, {
                    reload: true,
                    inherit: false,
                    notify: true
                });
            }],
            data:        {
                authenticate: false,
            }
        });

        // Dashboard
        states.push({
            name:   'app.dashboard',
            dsr:    { default: 'app.dashboard.main' },
            sticky: true,
            views:  {
                'dashboard': {
                    templateUrl:  '/views/dashboard/dashboard.html',
                    controller:   'DashboardController',
                    controllerAs: 'dashboard'
                }
            },
            data:   {authenticate: true}
        });
        states.push({
            name:  'app.dashboard.main',
            url:   '/',
            views: {
                'map':      {
                    templateUrl:  '/views/dashboard/map.html',
                    controller:   'DashboardMapController',
                    controllerAs: 'map'
                },
                'plans':    {
                    templateUrl:  '/views/dashboard/plans.html',
                    controller:   'DashboardPlansController',
                    controllerAs: 'plans'
                },
                'progress': {
                    templateUrl:  '/views/dashboard/progress.html',
                    controller:   'DashboardProgressController',
                    controllerAs: 'progress'
                },
                'alerts':   {
                    templateUrl:  '/views/dashboard/alerts.html',
                    controller:   'DashboardAlertsController',
                    controllerAs: 'alerts'
                }
            }
        });

        // Sidebar
        states.push({
            name:    'app.sidebar',
            url:     '/sidebar',
            dsr:     true,
            sticky:  true,
            views:   {
                'sidebar': {
                    templateUrl:  '/views/sidebar/sidebar.html',
                    controller:   'SidebarController',
                    controllerAs: 'sidebar'
                }
            },
            onEnter: ['$previousState', function ($previousState) {
                $previousState.memo('sidebarInvoker');
            }],
            data:    {
                authenticate: true,
                sidebar:      {title: 'iManager', view: 'menu'}
            }
        });
        states.push({
            name:         'app.sidebar.plans',
            url:          '/plans',
            templateUrl:  '/views/sidebar/sidebar-plans.html',
            controller:   'SidebarPlansController',
            controllerAs: 'plans',
            data:         {
                sidebar: {title: 'Планы', view: 'plans'}
            }
        });
        states.push({
            name:         'app.sidebar.reports',
            url:          '/reports',
            templateUrl:  '/views/sidebar/sidebar-reports.html',
            controller:   'SidebarReportsController',
            controllerAs: 'reports',
            data:         {
                sidebar: {title: 'Отчеты', view: 'reports'}
            }
        });
        states.push({
            name:         'app.sidebar.team',
            url:          '/team',
            templateUrl:  '/views/sidebar/sidebar-team.html',
            controller:   'SidebarTeamController',
            controllerAs: 'team',
            data:         {
                sidebar: {title: 'Команда', view: 'team'}
            }
        });
        states.push({
            name:         'app.sidebar.standards',
            url:          '/standards',
            templateUrl:  '/views/sidebar/sidebar-standards.html',
            controller:   'SidebarStandardsController',
            controllerAs: 'standards',
            data:         {
                sidebar: {title: 'Стандарты', view: 'standards'}
            }
        });

        angular.forEach(states, function (state) {
            $stateProvider.state(state);
        });
    }
})();
