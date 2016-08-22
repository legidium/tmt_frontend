'use strict';

angular
    .module('app.dashboard')
    .controller('DashboardAlertsController', DashboardAlertsController);

DashboardAlertsController.$inject = ['$scope', 'ManagerService', 'DateService'];

function DashboardAlertsController($scope, ManagerService, DateService) {
    var vm = this;

    vm.loading    = false;
    vm.visible    = true;
    vm.data       = null;
    vm.query      = query;
    vm.refresh    = refresh;
    vm.show       = show;
    vm.hide       = hide;
    vm.toggle     = toggle;
    vm.hasData    = hasData;
    vm.getData    = getData;

    activate();

    function activate() {
        initEvents();
        query();
    }

    function query() {
        var params = getParams();
        vm.loading = true;

        ManagerService.getAlerts(params)
            .then(function (response) {
                setData(response.items);
            })
            .finally(function() {
                vm.loading = false;
            });
    }

    function refresh() {
        query();
    }

    function show() {
        vm.visible = true;
        $scope.$emit('dashboard:alerts:visibilityChange', { visible: vm.visible });
    }

    function hide() {
        vm.visible = false;
        $scope.$emit('dashboard:alerts:visibilityChange', { visible: vm.visible });
    }

    function toggle() {
        vm.visible ? hide() : show();
    }

    function hasData() {
        return !!vm.data;
    }

    function getData() {
        return vm.data;
    }

    function setData(data) {
        vm.data = data;
    }

    function getParams() {
        return {};
    }

    function initEvents() {
        $scope.$on('dashboard:alerts:show', function() { show(); });
        $scope.$on('dashboard:alerts:hide', function() { hide(); });
        $scope.$on('dashboard:alerts:toggle', function() { toggle(); });
    }
}
