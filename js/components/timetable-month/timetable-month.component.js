'use strict';

angular
    .module('app')
    .component('timetableMonth', {
        templateUrl: 'js/components/timetable-month/timetable-month.html',
        controller:  TimetableMonthController,
        bindings:    {
            data:  '<',
            dates: '<'
        }
    });

TimetableMonthController.$inject = ['$scope', '$element', '$attrs', '$window', '$timeout', 'DateService'];

function TimetableMonthController($scope, $element, $attrs, $window, $timeout, DateService) {
    var ctrl = this;

    ctrl.statusClass = {
        0: 'is-draft',
        1: 'is-pending',
        2: 'is-rejected',
        3: 'is-accepted',
        4: 'is-running',
        5: 'is-finished',
        6: 'is-failed',
        7: 'is-completed'
    };

    ctrl.$onInit    = onInit;
    ctrl.$postLink  = onPostLink;
    ctrl.$onChanges = onChanges;
    ctrl.$onDestroy = onDestroy;

    function onInit() {

    }

    function onPostLink() {
        $element.addClass('timetable-week');
    }

    function onChanges() {

    }

    function onDestroy() {

    }
}
