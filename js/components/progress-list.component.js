'use strict';

angular
  .module('app')
  .component('progressList', {
    templateUrl: 'js/components/progress-list.html',
    controller: ProgressListComponentController,
    bindings: {
      model: '<'
    }
  });

ProgressListComponentController.$inject = ['$scope', '$element', '$attrs', 'ACTIVITY'];

function ProgressListComponentController($scope, $element, $attrs, ACTIVITY) {
  var ctrl = this;

  ctrl.model       = ctrl.model || null;
  ctrl.statusClass = [
    'is-draft',     // 0 - DRAFT
    'is-pending',   // 1 - PENDING
    'is-rejected',  // 2 - REJECTED
    'is-accepted',  // 3 - ACCEPTED
    'is-running',   // 4 - RUNNING
    'is-finished',  // 5 - FINISHED
    'is-failed',    // 6 - FAILED
    'is-completed'  // 7 - COMPLETED
  ];
  ctrl.$onInit    = onInit;
  ctrl.$postLink  = onPostLink;
  ctrl.$onChanges = onChanges;

  function onInit() {}

  function onPostLink() {
    $element.addClass('progress-list');
  }

  function onChanges(obj) {
    var data = obj.model.currentValue || [];
    var now = Date.now();

    // Calculate activity progress value
    for (var i = 0, len = data.length; i < len; i++) {
      if (data[i].activity) {
        var progress = calculateProgress(data[i], now);
        data[i].activity.progress = progress.toFixed(2);
      }
    }
  }

  function calculateProgress(data, now) {
    now = angular.isDefined(now) ? now : Date.now();

    var activity   = data.activity;
    var status     = activity.status || 0;
    var dateStart  = activity.date_start || false;
    var dateEnd    = activity.date_end || false;
    var finishedAt = activity.finished_at || false;

    var start    = angular.isNumber(dateStart) ? dateStart : Date.parse(dateStart);
    var end      = angular.isNumber(dateEnd) ? dateEnd : Date.parse(dateEnd);
    var finished = angular.isNumber(finishedAt) ? finishedAt : Date.parse(finishedAt);
    var current;

    if (isNaN(start) || isNaN(end)) return 0;

    if (status == ACTIVITY.STATUS_RUNNING || status == ACTIVITY.STATUS_FINISHED ) {
      current = now;
    } else if (status == ACTIVITY.STATUS_FAILED || status == ACTIVITY.STATUS_COMPLETED) {
      current = finished || end;
    } else {
      current = start;
    }

    var len = end - start;
    var pos = current - start;
    pos = pos < 0 ? 0 : (pos > len ? len : pos);

    return pos / len * 100;
  }
}
