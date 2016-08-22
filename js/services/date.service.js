(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('DateService', DateService);

    function DateService() {
        var service = {};
        service.getStartOfDay = getStartOfDay;
        service.getEndOfDay = getEndOfDay;

        /**
         * Returns a start of the day timestamp for the specified date.
         * @param date Date
         * @return integer
         */
        function getStartOfDay(date) {
            var temp = new Date(date);
            return temp.setHours(0, 0, 0, 0);
        }

        /**
         * Returns an end of the day timestamp for the specified date.
         * @param date Date
         * @return integer
         */
        function getEndOfDay(date) {
            var temp = new Date(date);
            temp.setHours(0, 0, 0, 0);
            return temp.setHours(23, 59, 59, 999);
        }

        return service;
    }
})();
