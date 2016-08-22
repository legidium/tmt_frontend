'use strict';

angular
    .module('app')
    .component('timetableWeek', {
        templateUrl: 'js/components/timetable-week/timetable-week.html',
        controller:  TimetableWeekController,
        bindings:    {
            data:  '<',
            dates: '<'
        }
    });

TimetableWeekController.$inject = ['$scope', '$element', '$attrs', '$window', '$timeout', 'DateService'];

function TimetableWeekController($scope, $element, $attrs, $window, $timeout, DateService) {
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
    ctrl.today       = DateService.getStartOfDay(Date.now());

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
