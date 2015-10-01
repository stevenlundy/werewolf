angular.module('werewolf', [
  'werewolf.services',
  'werewolf.start',
  'werewolf.play',
  'werewolf.host',
  'ngRoute'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/host/:roomcode', {
      templateUrl: 'app/host/host.html',
      controller: 'HostController',
      controllerAs: 'host'
    })
    .when('/play/:roomcode', {
      templateUrl: 'app/play/play.html',
      controller: 'PlayController',
      controllerAs: 'play'
    })
    .otherwise({
      templateUrl: 'app/init/init.html',
      controller: 'StartController',
      controllerAs: 'start'
    });

    $locationProvider.html5Mode(true);
  });