'use strict';

angular
    .module('app')
    .component('plansTable', {
        templateUrl: 'js/components/plans-table.html',
        controller:  PlansTableComponentController,
        bindings:    {
            data:  '<',
            dates: '<'
        }
    });

PlansTableComponentController.$inject = ['$scope', '$element', '$attrs', '$window', '$timeout', 'DateService'];

function PlansTableComponentController($scope, $element, $attrs, $window, $timeout, DateService) {
    var ctrl = this;

    var tableWidth;
    var tableHeader;
    var tableContent;
    var tableHeaderEl;
    var statusesClassMap = [
        'is-draft',
        'is-pending',
        'is-rejected',
        'is-accepted',
        'is-running',
        'is-finished',
        'is-failed',
        'is-completed'
    ];

    ctrl.$onInit = onInit;
    ctrl.$postLink = onPostLink;
    ctrl.$onChanges = onChanges;
    ctrl.$onDestroy = onDestroy;

    function onInit() {
        ctrl.data = ctrl.data || null;
        ctrl.dates = ctrl.dates || null;
        ctrl.today = DateService.getStartOfDay(Date.now());
        ctrl.statusClass = statusesClassMap;
    }

    function onDestroy() {
        angular.element($window).off('resize', onWindowResize);
    }

    function onPostLink() {
        $element.addClass('plans-table');

        var container = $element.children()[0];
        var children  = angular.element(container).children();
        tableHeader   = angular.element(children[0]).children()[0];
        tableContent  = angular.element(children[1]).children()[0];
        tableHeaderEl = angular.element(tableHeader);

        if (tableHeader && tableContent) {
            angular.element($window).on('resize', onWindowResize);
        }
    }

    function onChanges(changesObj) {
        $timeout(updateWidth, 0);
    }

    function onWindowResize() {
        if (tableContent.offsetWidth != tableWidth) {
            tableWidth = tableContent.offsetWidth;
            tableHeaderEl.css('width', tableWidth + 'px');
            $scope.$apply();
        }
    }

    function updateWidth() {
        if (tableHeader && tableContent) {
            tableHeaderEl.css('width', tableContent.offsetWidth + 'px');
        }
    }
}
