'use strict';

angular
    .module('app.sidebar')
    .controller('SidebarController', SidebarController);

SidebarController.$inject = ['$rootScope', '$scope', '$element', '$state', '$timeout', '$previousState'];

function SidebarController($rootScope, $scope, $element, $state, $timeout, $previousState) {
    var vm = this;

    var defaultParams = {
        title:          'iManager',
        view:           'menu',
        showBackButton: true,
        showHideButton: true
    };
    var viewClassMap = {
        'app.sidebar':         'sidebar_view_menu',
        'app.sidebar.plans':   'sidebar_view_plans',
        'app.sidebar.reports': 'sidebar_view_reports'
    };

    vm.visible   = false;
    vm.params    = defaultParams;
    vm.viewClass = viewClassMap;
    vm.show      = show;
    vm.hide      = hide;
    vm.toggle    = toggle;

    activate();

    function activate() {
        initEvents();
    }

    function show() {
        vm.visible = true;
    }

    function hide($event) {
        if ($event && $event.currentTarget != $event.target) {
            $event.stopPropagation();
        } else {
            $previousState.go('sidebarInvoker').then(function () {
                vm.visible = false;
            });
        }
    }

    function toggle() {
        vm.visible ? hide() : show();
    }

    function initEvents() {
        // Show sidebar on state change
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams) {
            if (/app.sidebar*/.exec(toState.name)) {

                var data = $state.current.data || {};
                setParams(data.sidebar);

                $timeout(function () {
                    vm.visible = true;
                });
            }
        });
    }

    function setParams(params) {
        vm.params = angular.extend(defaultParams, params);
    }
}
