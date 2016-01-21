'use strict';

/**
* @ngdoc overview
* @name gitmeterApp
* @description
* # gitmeterApp
*
* Main module of the application.
*/
var myApp = angular
.module('gitmeterApp', ['ui.router','chart.js']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('userDetails', {
    url: "/user?username",
    templateUrl: "views/displayuser.html",
    controller: function($scope, $stateParams, $state) {
      $scope.username = $stateParams.username;
    }
  })
  .state('repositoryDetails', {
    url: "/repository?name&username",
    templateUrl: "views/displayrepository.html",
    controller: function($scope, $stateParams, $state) {
      $scope.name = $stateParams.name;
      $scope.username = $stateParams.username;
    }
  })
  .state('usersResults', {
    url: "/users?q",
    templateUrl: "views/users.html",
    controller: function($scope, $stateParams, $state) {
      $scope.q = $stateParams.q;
    }
  })
  .state('repositoriesResults', {
    url: "/repositories?q",
    templateUrl: "views/repositories.html",
    controller: function($scope, $stateParams, $state) {
      $scope.q = $stateParams.q;
    }
  });
});
