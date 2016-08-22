'use strict';

angular
    .module('app.dashboard')
    .controller('DashboardPlansController', DashboardPlansController);

DashboardPlansController.$inject = ['$scope', 'ManagerService', 'DateService'];

function DashboardPlansController($scope, ManagerService, DateService) {
    var vm = this;

    vm.loading    = false;
    vm.visible    = true;
    vm.data       = null;
    vm.dates      = null;
    vm.dateStart  = null;
    vm.dateEnd    = null;
    vm.period     = null;
    vm.today      = null;
    vm.query      = query;
    vm.refresh    = refresh;
    vm.reset      = reset;
    vm.show       = show;
    vm.hide       = hide;
    vm.toggle     = toggle;
    vm.hasData    = hasData;
    vm.getData    = getData;
    vm.setData    = setData;
    vm.getDates   = getDates;
    vm.setDates   = setDates;
    vm.setWeek    = setWeek;
    vm.setMonth   = setMonth;

    activate();

    function activate() {
        initEvents();
        setToday();
        setWeek();
        query();
    }

    function query() {
        var params = getParams();

        ManagerService.getPlans(params)
            .then(function (response) {
                setData(response.items);
            });
    }

    function refresh() {
        query();
    }

    function reset() {
        setData(null);
        setWeek();
    }

    function show() {
        vm.visible = true;
        $scope.$emit('dashboard:plans:visibilityChange', {visible: vm.visible});
    }

    function hide() {
        vm.visible = false;
        $scope.$emit('dashboard:plans:visibilityChange', {visible: vm.visible});
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

    function getToday() {
        return vm.today;
    }

    function setToday() {
        vm.today = DateService.getStartOfDay(Date.now());
    }

    function setMonth() {

    }

    function setWeek(date) {
        date = angular.isDefined(date) ? date : Date.now();
        var timestamp = angular.isString(date) ? Date.parse(date) : date;

        if (!isNaN(timestamp)) {
            var d = new Date(timestamp);
            d.setHours(0, 0, 0, 0);
            return setDates(
                new Date(d.setDate(d.getDate() - d.getDay() + 1)), // Monday
                new Date(d.setDate(d.getDate() - d.getDay() + 7))  // Sunday
            );
        } else {
            return false;
        }
    }

    function getDates() {
        return vm.dates;
    }

    function setDates(start, end) {
        var _t1 = angular.isString(start) ? Date.parse(start) : (angular.isDate(start) ? start.valueOf() : start);
        var _t2 = angular.isString(end) ? Date.parse(end) : (angular.isDate(end) ? end.valueOf() : end);
        var valid = !(isNaN(_t1) || isNaN(_t2));

        vm.dates = [];
        vm.dateStart = null;
        vm.dateEnd = null;

        if (valid) {
            var t1 = Math.min(_t1, _t2);
            var t2 = Math.max(_t1, _t2);
            var count = Math.floor(Math.abs(t2 - t1) / 86400000) + 1;

            for (var i = 0; i < count; i++) {
                vm.dates.push(t1 + (i * 86400000));
            }

            vm.dateStart = new Date(t1);
            vm.dateEnd = new Date(t2);
        }

        return valid;
    }

    function getDateParams() {
        var params = {};
        var start = vm.dateStart || null;
        var end = vm.dateEnd || null;

        if (start !== null) {
            params.date_start = angular.isDate(start) ? start.getTime() : start;
        }
        if (end !== null) {
            params.date_end = angular.isDate(end) ? end.getTime() : end;
        }

        return params;
    }

    function getPaginationParams() {
        var params = {};
        var pagination = vm.pagination || null;

        if (pagination) {
            var page = vm.pagination.page && vm.pagination.page > 1 ? vm.pagination.page : null;
            var perPage = vm.pagination.perPage ? vm.pagination.perPage : null;

            if (page !== null) {
                params.page = page;
            }
            if (perPage !== null) {
                params.per_page = perPage;
            }
        }

        return params;
    }

    function getParams() {
        var dateParams = getDateParams();
        var paginationParams = getPaginationParams();
        return angular.extend({}, dateParams, paginationParams);
    }

    /**
     * Returns a start of the day timestamp for the specified date.
     * @param date Date
     * @return integer
     */
    function getStartOfDay(date) {
        var temp = new Date(date);
        return temp.setHours(0, 0, 0, 0);
    }

    /**
     * Returns an end of the day timestamp for the specified date.
     * @param date Date
     * @return integer
     */
    function getEndOfDay(date) {
        var temp = new Date(date);
        temp.setHours(0, 0, 0, 0);
        return temp.setHours(23, 59, 59, 999);
    }

    function initEvents() {
        $scope.$on('dashboard:plans:show', function() { show(); });
        $scope.$on('dashboard:plans:hide', function() { hide(); });
        $scope.$on('dashboard:plans:toggle', function() { toggle(); });
    }
}
