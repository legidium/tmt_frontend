'use strict';

angular
    .module('app.auth')
    .controller('AuthController', AuthController);

AuthController.$inject = ['$rootScope', '$scope', '$state', '$timeout'];

function AuthController($rootScope, $scope, $state, $timeout) {
    var vm = this;
}
