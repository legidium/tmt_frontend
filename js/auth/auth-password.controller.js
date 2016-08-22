'use strict';

angular
	.module('app.auth')
	.controller('AuthPasswordController', AuthPasswordController);

AuthPasswordController.$inject = ['$q', '$rootScope', '$state', 'config', 'auth'];

function AuthPasswordController($q, $rootScope, $state, config, auth) {
    console.log('AUTH PASSWORD CONTROLLER');

    var home = config.STATE_HOME;
	var vm = this;

    vm.loading      = false;
	vm.login        = null;
    vm.loginError   = false;
    vm.loginMessage = null;
    vm.submit       = submit;

    function submit() {
        vm.loading = true;
        clearErrors();

        auth.resetPassword(vm.login)
            .then(function(response) {
                $state.go(home);
            })
            .catch(function(response) {
                setErrors(response.data.error_log);
            })
            .finally(function() {
                vm.loading = false;
            })
    }

    function setErrors(errors) {
        if (errors) {
            vm.loginError   = !!errors.login;
            vm.loginMessage = errors.login;
        }
    }

    function clearErrors() {
        vm.loginError   = false;
        vm.loginMessage = null;
    }
}
