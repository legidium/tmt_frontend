(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('auth', AuthService);

    AuthService.$inject = ['$q', '$rootScope', '$window', 'api', 'apiErrors'];

    function AuthService($q, $rootScope, $window, api, apiErrors) {
        var service = {};

        service.data               = null;
        service.remember           = false;
        service.credentials        = null;
        service.licenseUrl         = null;

        service.login              = login;
        service.logout             = logout;
        service.refreshToken       = refreshToken;
        service.confirmLicense     = confirmLicense;
        service.resetPassword      = resetPassword;
        service.getAuthorization   = getAuthorization;
        service.getRefreshToken    = getRefreshToken;
        service.getAccessToken     = getAccessToken;
        service.isManager          = isManager;
        service.isGuest            = isGuest;
        service.isLicenseConfirmed = isLicenseConfirmed;
        service.isLicenseRequired  = isLicenseRequired;
        service.getLicenseUrl      = getLicenseUrl;
        service.setLicenseUrl      = setLicenseUrl;
        service.hasCredentials     = hasCredentials;
        service.getCredentials     = getCredentials;
        service.setCredentials     = setCredentials;
        service.getData            = getData;
        service.setData            = setData;

        activate();

        function activate() {
            load();
        }

        function login(credentials, remember) {
            credentials = credentials || {};
            return api.authorize(credentials.login, credentials.password)
                .then(function (response) {
                    if (response.data.success) {
                        if (checkRole(response.data.role)) {
                            service.setData(response.data, remember);
                            return response;
                        } else {
                            response.data.success = 0;
                            response.data.error_code = apiErrors.AUTH_BAD_CREDENTIALS;
                            response.data.error_log = {login: 'Доступ для этой учетной записи не разрешен.'};
                            return $q.reject(response);
                        }
                    } else {
                        return $q.reject(response);
                    }
                })
                .catch(function (response) {
                    if (response.data.error_code == apiErrors.AUTH_LICENSE_REQUIRED) {
                        service.setLicenseUrl(response.data.license_url);
                    }
                    return $q.reject(response);
                });
        }

        function logout() {
            setData(null, false);
            setCredentials(null);
            clear();
        }

        function refreshToken(config) {
            console.log('REFRESHING TOKEN...');
            return api.refresh(service.getRefreshToken(), config)
                .then(function (response) {
                    service.setData(response.data);
                    return response;
                });
        }

        function confirmLicense(config) {
            var credentials = service.getCredentials() || {};
            return api.license(credentials.login, credentials.password)
                .then(function (response) {
                    service.setLicenseUrl(null);
                });
        }

        function resetPassword(login, config) {
            console.log('AUTH: RESETTING PASSWORD...');

            return api.password(login, config)
                .then(function() {
                    service.setData(null, true);
                    service.setCredentials(null);
                    service.setLicenseUrl(null);
                    service.remember = false;
                });
        }

        function getAuthorization() {
            var token = service.getAccessToken();
            return token ? 'Bearer ' + token : '';
        }

        function getRefreshToken() {
            return service.data && service.data.refresh_token;
        }

        function getAccessToken() {
            return service.data && service.data.access_token;
        }

        function isManager() {
            return service.data && service.data.role == 2;
        }

        function isGuest() {
            return !service.data;
        }

        function isLicenseConfirmed() {
            return service.data && !service.licenseUrl;
        }

        function isLicenseRequired() {
            return !!service.licenseUrl;
        }

        function getLicenseUrl() {
            return service.licenseUrl;
        }

        function setLicenseUrl(url) {
            service.licenseUrl = url;
        }

        function hasCredentials() {
            return !!service.credentials;
        }

        function getCredentials() {
            return service.credentials;
        }

        function setCredentials(credentials) {
            service.credentials = credentials;
        }

        function getData(mustLoad) {
            mustLoad && load();
            return service.data;
        }

        function setData(data, mustSave) {
            if (data) {
                service.data = {};
                service.data.access_token  = data.access_token || null;
                service.data.refresh_token = data.refresh_token || null;
                service.data.expires_in    = data.expires_in || null;
                service.data.role          = data.role || null;
            } else {
                service.data = null;
            }
            if (typeof mustSave == 'undefined' || mustSave) {
                save();
            }
        }

        function checkRole(role) {
            return role == 2; // Manager
        }

        function load() {
            console.log('LOADING AUTH DATA...');

            var storage = $window.localStorage;
            if (storage) {
                var saved;
                try { saved = JSON.parse(storage.getItem('app.auth')); } catch (e) {}
                if (saved) {
                    service.data = saved.data || null;
                }
            } else {
                console.log('[ERROR] No Local Storage Service Found');
            }
        }

        function save() {
            console.log('SAVING AUTH DATA...');

            var storage = $window.localStorage;
            if (storage) {
                service.data
                    ? storage.setItem('app.auth', JSON.stringify({data: service.data}))
                    : storage.removeItem('app.auth');
            } else {
                console.log('[ERROR] No Local Storage Service Found');
            }
        }

        function clear() {
            console.log('CLEARING AUTH DATA...');

            var storage = $window.localStorage;
            if (storage) {
                storage.removeItem('app.auth');
            } else {
                console.log('[ERROR] No Local Storage Service Found');
            }
        }

        return service;
    }
})();
