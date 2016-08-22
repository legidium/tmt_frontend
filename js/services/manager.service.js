(function () {
    'use strict';

    angular
        .module('app.services')
        .constant('ACTIVITY', {
            STATUS_DRAFT:      0,
            STATUS_PENDING:    1,
            STATUS_UNASSIGNED: 2,
            STATUS_ASSIGNED:   3,
            STATUS_RUNNING:    4,
            STATUS_FINISHED:   5,
            STATUS_FAILED:     6,
            STATUS_COMPLETED:  7
        });

    angular
        .module('app.services')
        .factory('ManagerService', ManagerService);

    ManagerService.$inject = ['$http', 'config', 'api', 'auth'];

    function ManagerService($http, config, api, auth) {
        var BASE_URL = 'http://tmt-frontend.local/data/';

        var service = {};

        service.getActivities = getActivities;
        service.getPlans      = getPlans;
        service.getProgress   = getProgress;
        service.getAlerts     = getAlerts;

        function getActivities(params, raw) {
            return api.getActivities();
        }

        function getPlans(params, raw) {
            var url = BASE_URL + 'plans.json';
            var data = { params: params };

            return $http.get(url, data)
                .then(function (response) {
                    return raw ? response : response.data;
                })
        }

        function getProgress(params, raw) {
            var url = BASE_URL + 'progress.json';
            var data = { params: params };

            return $http.get(url, data)
                .then(function (response) {
                    return raw ? response : response.data;
                })
        }

        function getAlerts(params, raw) {
            var url = BASE_URL + 'alerts.json';
            var data = { params: params };

            return $http.get(url, data)
                .then(function (response) {
                    return raw ? response : response.data;
                })
        }

        return service;
    }
})();
