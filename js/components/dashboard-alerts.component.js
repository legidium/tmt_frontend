'use strict';

angular
    .module('app')
    .component('dashboardAlerts', {
        templateUrl: 'js/components/dashboard-alerts.html',
        controller:  DashboardAlertsComponentController,
        bindings:    {
            data: '<'
        }
    });

DashboardAlertsComponentController.$inject = ['$scope', '$element', '$attrs', '$filter'];

function DashboardAlertsComponentController($scope, $element, $attrs, $filter) {
    var ctrl = this;

    var classes = [
        'dashboard-alert_type_default',
        'dashboard-alert_type_primary',
        'dashboard-alert_type_info',
        'dashboard-alert_type_success',
        'dashboard-alert_type_warning',
        'dashboard-alert_type_danger'
    ];

    var icons = [
        'fa-info-circle',
        'fa-info-circle',
        'fa-info',
        'fa-check',
        'fa-warning',
        'fa-bolt'
    ];

    ctrl.data = ctrl.data || null;
    ctrl.$postLink = onPostLink;
    ctrl.$onChanges = onChanges;

    function onPostLink() {
        $element.addClass('dashboard-alerts');
    }

    function onChanges(obj) {
        var data = obj.data.currentValue || [];
        data.forEach(function(item) {
            item.created_at = Date.parse(item.created_at) || null;
            item.class = classes[item.type] || '';
            item.icon = icons[item.type] || 'fa-info';
        })
    }
}
