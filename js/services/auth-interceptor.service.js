(function () {
    'use strict';

    angular
        .module('app.services')
        .config(configureAuthInterceptorService)
        .factory('authInterceptor', authInterceptorService);

    configureAuthInterceptorService.$inject = ['$httpProvider'];

    function configureAuthInterceptorService($httpProvider) {
        $httpProvider.interceptors.push(authInterceptorService);
    }

    authInterceptorService.$inject = ['$q', '$injector', '$rootScope', 'apiErrors'];

    function authInterceptorService($q, $injector, $rootScope, apiErrors) {
        var $http, auth;

        var service = {};
        service.request       = request;
        service.responseError = responseError;

        function request(config) {
            if (!config.ignoreAuthInterceptor) {
                auth = auth || $injector.get('auth');
                var token = auth.getAuthorization();
                if (token) {
                    config.headers['Authorization'] = token;
                }
            }
            return config;
        }

        function responseError(rejection) {
            var config = rejection.config || {};
            if (!config.ignoreAuthInterceptor) {
                if (rejection.status == 401) {
                    if (rejection.data.error_code == apiErrors.BASE_TOKEN_EXPIRED) {
                        var deferred = $q.defer();
                        auth = auth || $injector.get('auth');

                        auth.refreshToken({ ignoreAuthInterceptor: true })
                            .then(function(response) {
                                $rootScope.$broadcast('event:auth-expired', rejection);
                                repeatRequest(config, deferred);
                            })
                            .catch(function(response) {
                                $rootScope.$broadcast('event:auth-forbidden', rejection);
                                deferred.reject(rejection);
                            });

                        return deferred.promise;
                    }
                }
                if (rejection.status == 403) {
                    $rootScope.$broadcast('event:auth-forbidden', rejection);
                }
            }
            return $q.reject(rejection);
        }

        function repeatRequest(config, deferred) {
            console.log('REPEATING REQUEST: ' + config.url);

            $http = $http || $injector.get('$http');
            $http(config)
                .then(function(response) {
                    return deferred.resolve(response);
                })
                .catch(function(response) {
                    return deferred.reject(response);
                });
        }

        return service;
    }
})();
