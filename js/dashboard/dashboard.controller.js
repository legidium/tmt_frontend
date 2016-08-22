'use strict';

angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

DashboardController.$inject = ['$rootScope', '$scope', '$element', '$state', 'ManagerService'];

function DashboardController($rootScope, $scope, $element, $state, ManagerService) {
    var vm = this;

    vm.plans = {};
    vm.plans.visible = true;
    vm.plans.toggle  = togglePlans;

    vm.progress = {};
    vm.progress.visible = true;
    vm.progress.toggle = toggleProgress;

    vm.alerts = {};
    vm.alerts.visible = true;
    vm.alerts.toggle = toggleAlerts;

    activate();

    function activate() {
        initEvents();

        var a = ManagerService.getActivities();
    }

    function togglePlans() {
        $scope.$broadcast('dashboard:plans:toggle');
    }

    function toggleProgress() {
        $scope.$broadcast('dashboard:progress:toggle');
    }

    function toggleAlerts() {
        $scope.$broadcast('dashboard:alerts:toggle');
    }

    function initEvents() {
        $scope.$on('dashboard:plans:visibilityChange', function (e, data) { vm.plans.visible = !!data.visible; });
        $scope.$on('dashboard:progress:visibilityChange', function (e, data) { vm.progress.visible = !!data.visible; });
        $scope.$on('dashboard:alerts:visibilityChange', function (e, data) { vm.alerts.visible = !!data.visible; });
    }
}
