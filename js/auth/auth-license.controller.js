'use strict';

angular
	.module('app.auth')
	.controller('AuthLicenseController', AuthLicenseController);

AuthLicenseController.$inject = ['$q', '$rootScope', '$state', 'config', 'auth'];

function AuthLicenseController($q, $rootScope, $state, config, auth) {
	var home  = config.STATE_HOME;
	var login = config.STATE_LOGIN;

	var vm = this;

	vm.loading   = false;
	vm.confirmed = auth.isLicenseConfirmed();
    vm.url       = auth.getLicenseUrl();
	vm.hide      = hide;
	vm.confirm   = confirm;

	function confirm() {
		vm.loading = true;

		auth.confirmLicense()
			.then(function(response) {
				auth.login(auth.getCredentials())
					.then(function(response) {
						$state.go(home);
					});
			})
			.finally(function() {
				vm.loading = false;
			})
	}

	function hide() {
        $state.go(login);
	}
}
