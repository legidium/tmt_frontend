(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('apiErrors', ApiErrorsService);

    function ApiErrorsService() {
        return {
            BASE:                       100,
            BASE_INTERNAL_FAILURE:      101,
            BASE_BAD_REQUEST:           102,
            BASE_BAD_TOKEN:             103,
            BASE_TOKEN_EXPIRED:         104,
            BASE_INVALID_VALUE:         105,
            BASE_ACTION_REJECTED:       106,
            BASE_CREATE_REJECTED:       107,
            BASE_UPDATE_REJECTED:       108,

            AUTH:                        200,
            AUTH_BAD_CREDENTIALS:        201,
            AUTH_LICENSE_REQUIRED:       202,
            AUTH_PASSWORD_RESET_FAILURE: 203,
            AUTH_PASSWORD_MAIL_FAILURE:  204
        };
    }
})();
