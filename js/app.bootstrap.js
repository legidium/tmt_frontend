'use strict';

angular
    .module('app')
    .run(AppBootstrap);

AppBootstrap.$inject = ['$rootScope', '$injector', '$location', '$state', '$document', '$timeout', 'config', 'auth'];

function AppBootstrap($rootScope, $injector, $location, $state, $document, $timeout, config, auth) {
    $rootScope.document  = angular.element(document.documentElement);
    $rootScope.$location = $location;
    $rootScope.$state    = $state;
    $rootScope.auth      = auth;
    $rootScope.locale    = 'ru';
    $rootScope.page      = {};
    $rootScope.loaded    = true;

    $rootScope.document.removeClass('no-js');

    AppInitEvents($rootScope, $state, config, auth);
}

function AppInitEvents($rootScope, $state, config, auth) {
    var home = config.STATE_HOME;
    var login = config.STATE_LOGIN;

    // Set background image for auth pages
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (auth.isGuest()) {
            $rootScope.document.addClass(/app.auth*/.exec(toState.name) ? 'page-auth': '');
        }
    });

    // Redirect to login if not authorized.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        fromState.params = fromParams;
        $state.previous = fromState;

        var data = toState.data || {};
        var isGuest = auth.isGuest();
        var name = toState.name;

        if (!isGuest && (name == 'app.auth.login' || name == 'app.auth.password' || name == 'app.auth.license')) {
            event.preventDefault();
            $state.go(home);
            return;
        }

        if (isGuest && !!data.authenticate) {
            event.preventDefault();
            $state.go(login);
        }
    });

    // Set default state paths
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
        var name = toState.name;

        var isSidebar = /app.sidebar*/.exec(name);
        if (fromState.name === '' && isSidebar) {
            event.preventDefault();
            $state.go('app.dashboard.main', null, { location: false, ignoreDsr: true })
                .then(function() {
                    $state.go(toState, toParams, { ignoreDsr: true });
                });
            return;
        }

        var isAuth = (name == 'app.auth.login' || name == 'app.auth.password' || name == 'app.auth.license');
        if (fromState.name === '' && isAuth) {
            event.preventDefault();
            $state.go('app.auth', null, { location: false, ignoreDsr: true })
                .then(function() {
                    $state.go(toState, toParams, { ignoreDsr: true });
                });
        }
    });

    // Set page params
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams, options) {
        var data = toState.data || {};

        $rootScope.pageClass = data.pageClass|| '';
        $rootScope.pageTitle = data.pageTitle || '';
        $rootScope.pageDescription = data.pageDescription || '';
    });
}

