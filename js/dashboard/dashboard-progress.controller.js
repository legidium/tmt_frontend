'use strict';

angular
    .module('app.dashboard')
    .controller('DashboardProgressController', DashboardProgressController);

DashboardProgressController.$inject = ['$scope', 'ManagerService'];

function DashboardProgressController($scope, ManagerService) {
    var vm = this;

    vm.visible   = true;
    vm.collapsed = false;
    vm.loading   = false;
    vm.data      = null;
    vm.query     = query;
    vm.reset     = reset;
    vm.refresh   = refresh;
    vm.collapse  = collapse;
    vm.show      = show;
    vm.hide      = hide;
    vm.toggle    = toggle;
    vm.hasData   = hasData;
    vm.getData   = getData;
    vm.setData   = setData;

    activate();

    function activate() {
        initEvents();
        query();
    }

    function query() {
        var params = getParams();
        vm.loading = true;

        return ManagerService.getProgress(params)
            .then(function (response) {
                setData(response.items);
            })
            .finally(function () {
                vm.loading = false;
            });
    }

    function reset() {
        setData(null);
    }

    function refresh() {
        query();
    }

    function collapse() {
        vm.collapsed = !vm.collapsed;
    }

    function show() {
        vm.visible = true;
        $scope.$emit('dashboard:progress:visibilityChange', {visible: vm.visible});
    }

    function hide() {
        vm.visible = false;
        $scope.$emit('dashboard:progress:visibilityChange', {visible: vm.visible});
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
        $scope.$on('dashboard:progress:show', function () { show(); });
        $scope.$on('dashboard:progress:hide', function () { hide(); });
        $scope.$on('dashboard:progress:toggle', function () { toggle(); });
    }
}
