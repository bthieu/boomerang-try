'use strict';

angular.module("myApp")
  .run(["$rootScope", function($rootScope) {
    var hadRouteChange = false;

    // The following listener is required if you're using ng-router
    $rootScope.$on("$routeChangeStart", function() {
      hadRouteChange = true;
    });

    // The following listener is required if you're using ui-router
    $rootScope.$on("$stateChangeStart", function() {
      hadRouteChange = true;
    });

    function hookAngularBoomerang() {
      if (window.BOOMR && BOOMR.version) {
        if (BOOMR.plugins && BOOMR.plugins.Angular) {
          BOOMR.plugins.Angular.hook($rootScope, hadRouteChange);
        }
        return true;
      }
    }

    if (!hookAngularBoomerang()) {
      if (document.addEventListener) {
        document.addEventListener("onBoomerangLoaded", hookAngularBoomerang);
      } else if (document.attachEvent) {
        document.attachEvent("onpropertychange", function (e) {
          e = e || window.event;
          if (e && e.propertyName === "onBoomerangLoaded") {
            hookAngularBoomerang();
          }
        });
      }
    }
  }]);
