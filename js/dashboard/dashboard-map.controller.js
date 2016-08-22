'use strict';

angular
  .module('app.dashboard')
  .controller('DashboardMapController', DashboardMapController);

function DashboardMapController() {
  var vm = this;

  vm.visible = true;
  vm.instance = null;
  vm.beforeInit = beforeInit;
  vm.afterInit = afterInit;

  function beforeInit() {
    console.log('BEFORE MAP INIT');
  }

  function afterInit(instance) {
    console.log('AFTER MAP INIT');
    vm.instance = instance;
  }
}

