(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('api', ApiService);

    ApiService.$inject = ['$q', '$rootScope', '$http', 'config', 'apiErrors'];

    function ApiService($q, $rootScope, $http, config, apiErrors) {
        var API = config.API_BASE_URL;
        var service = {};

        // Auth
        service.authorize      = authorize;
        service.refresh        = refreshToken;
        service.license        = confirmLicense;
        service.password       = resetPassword;

        // Activities
        service.getActivities  = getActivities;
        service.getActivity    = getActivity;

        // Users
        service.getUsers       = getUsers;
        service.getUser        = getUser;

        // Standards
        service.getStandards   = getStandards;
        service.getStandard    = getStandard;

        function authorize(login, password, config) {
            var url = API + 'auth/authorize';
            var data = { login: login, pass: password };

            return $http.post(url, data, config)
                .then(function(response) {
                    return response.data.success ? response : $q.reject(response);
                });
        }

        function refreshToken(token, config) {
            var url = API + 'auth/refresh';
            var data = { refresh_token: token };

            return $http.post(url, data, config)
                .then(function(response ) {
                    return response.data.success ? response : $q.reject(response);
                });
        }

        function confirmLicense(login, password, config) {
            var url = API + 'auth/license';
            var data = { login: login, pass: password, confirm: 1 };

            return $http.post(url, data, config)
                .then(function(response ) {
                    return response.data.success ? response : $q.reject(response);
                });
        }

        function resetPassword(login, config) {
            var url = API + 'auth/password';
            var data = { login: login };

            return $http.post(url, data, config)
                .then(function(response ) {
                    return response.data.success ? response : $q.reject(response);
                });
        }

        function getActivities(config) {
            var url = API + 'activities';

            return $http.get(url, config)
                .then(function(response) {
                    return response.data.success ? response : $q.reject(response);
                });
        }

        function getActivity(id, config) {
            var url = API + 'activities/' + id;

            return $http.get(url, config)
                .then(function(response) {
                    return response.data.success ? response : $q.reject(response);
                });
        }

        function getUsers() {

        }

        function getUser() {

        }

        function getStandards() {

        }

        function getStandard() {

        }

        return service;
    }
})();
