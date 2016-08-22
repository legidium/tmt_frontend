'use strict';

angular
	.module('app.auth')
	.controller('AuthLoginController', AuthLoginController);

AuthLoginController.$inject = ['$q', '$rootScope', '$state', '$scope', '$timeout', 'config', 'auth'];

function AuthLoginController($q, $rootScope, $state, $scope, $timeout, config, auth) {
	var home        = config.STATE_HOME;
	var license     = config.STATE_LICENSE;
	var credentials = auth.getCredentials() || { login: null, password: null };

	var vm = this;

	vm.visible           = true;
	vm.loading           = false;
	vm.disabled 		 = false;
	vm.credentials       = credentials;
	vm.remember 		 = true;
	vm.loginError 		 = false;
	vm.loginMessage 	 = null;
	vm.passwordError     = false;
	vm.passwordMessage   = null;
	vm.isPasswordVisible = false;

	vm.submit 			 = submit;
	vm.signIn 			 = signIn;
	vm.signOut 			 = signOut;
	vm.showPassword 	 = showPassword;
	vm.hidePassword 	 = hidePassword;
	vm.setErrors         = setErrors;
	vm.clearErrors       = clearErrors;

	function submit() {
		setLoading(true);

		vm.hidePassword();
		vm.clearErrors();
		auth.setCredentials(vm.credentials);

		vm.signIn()
			.then(function(response) {
				$state.go(home);
			})
			.catch(function(response) {
				if (auth.isLicenseRequired()) {
					$state.go(license);
				} else {
					vm.setErrors(response.data.error_log);
				}
			})
			.finally(function() {
				setLoading(false);
			});
	}

	function signIn() {
		return auth.login(vm.credentials, vm.remember);
	}

	function signOut() {
		return auth.logout();
	}

	function showPassword() {
		vm.isPasswordVisible = true;
	}

	function hidePassword() {
		vm.isPasswordVisible = false;
	}

	function setErrors(errors) {
		if (errors) {
			vm.loginError      = !!errors.login;
			vm.loginMessage    = errors.login;
			vm.passwordError   = !!errors.pass;
			vm.passwordMessage = errors.pass;
		}
	}

	function clearErrors() {
		vm.loginError 		 = false;
		vm.loginMessage 	 = null;
		vm.passwordError     = false;
		vm.passwordMessage   = null;
	}

	function setLoading(value) {
		vm.loading = vm.disabled = !!value;
	}
}
