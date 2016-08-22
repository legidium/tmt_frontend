(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('config', ConfigService);

    function ConfigService() {
        return {
            // API
            'API_HOST_URL': 'http://tmt-api.local/',
            'API_BASE_URL': 'http://tmt-api.local/v1/',

            // States
            'STATE_HOME':    'app.dashboard.main',
            'STATE_LOGIN':   'app.auth.login',
            'STATE_LICENSE': 'app.auth.license'
        };
    }
})();
