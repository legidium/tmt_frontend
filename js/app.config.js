(function () {
    'use strict';

    angular
        .module('app')
        .config(configureCompiler);

    configureCompiler.$inject = ['$compileProvider'];
    function configureCompiler($compileProvider) {
        $compileProvider.debugInfoEnabled(true);
    }
})();
