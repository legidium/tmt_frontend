(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('StringsService', StringsService);

    function StringsService() {
        var service = {};
        service.capitalize = capitalize;
        service.ucfirst = ucfirst;

        function capitalize(value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }

        function ucfirst(value) {
            return value.replace(/(?:^|\s)\S/g, function(a) {
                return a.toUpperCase();
            });
        }

        return service;
    }
})();
