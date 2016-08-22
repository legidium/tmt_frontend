(function () {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$rootScope', '$scope', '$element', '$state', 'auth', '$timeout'];
    function AppController($rootScope, $scope, $element, $state, auth, $timeout) {
        var vm = this;
        vm.ready = true;
    }
})();
