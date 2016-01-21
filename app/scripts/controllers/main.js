'use strict';

/**
* @ngdoc function
* @name gitmeterApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the gitmeterApp
*/
angular.module('gitmeterApp')
.controller('SearchCtrl', ['$scope', "$http", "$state", function($scope, $http, $state) {
  $scope.listOfUsers = function() {
    $http.get('https://api.github.com/search/users?q=' + $scope.q)
    .then(function(response) {
      $scope.users = response.data.items;
      console.log($scope.users);
    });
  };
  $scope.listOfRepositories = function() {
    $http.get('https://api.github.com/search/repositories?q=' + $scope.q)
    .then(function(response) {
      $scope.repositories = response.data.items;
    });
  };
  $scope.sendSearch = function() {
    $state.go($scope.search.type + 'Results', { 'q' : $scope.search.text });
  };
  $scope.chargeUser = function(username) {
    $state.go('userDetails', { 'username' : username });
  };
  $scope.chargeRepository = function(username, name) {
    $state.go('repositoryDetails', { 'username' : username, 'name' : name });
  };
}])
.controller('GitUserCtrl', ['$scope', "$http", "$state", function($scope, $http, $state) {
  $scope.chargeRepository = function(username, name) {
    $state.go('repositoryDetails', { 'username' : username, 'name' : name });
  };
  $scope.loadUserFromGit = function() {
    $http.get('https://api.github.com/users/' + $scope.username)
    .then(function(response) {
      $scope.user = response.data;
    });
    $http.get('https://api.github.com/users/' + $scope.username + '/repos')
    .then(function(response) {
      $scope.repositoriesOfAnUser = response.data;
    });
  };
}])
.controller('GitRepositoryCtrl', ['$scope', "$http", "$state",'$timeout', function($scope, $http, $state, $timeout) {
  $scope.labels = new Array();
  $scope.data = new Array();
  $scope.labelsAD = new Array();
  $scope.seriesA = ['Additions'];
  $scope.seriesD = ['Deletions'];
  $scope.dataA = new Array();
  $scope.dataD = new Array();
  $scope.loadRepositoryFromGit = function() {
    $http.get('https://api.github.com/repos/' + $scope.username + '/' + $scope.name)
    .then(function(response) {
      $scope.repository = response.data;
    });
    $http.get('https://api.github.com/repos/' + $scope.username + '/' + $scope.name + '/stats/contributors')
    .then(function(response) {
      $scope.contributors = response.data;
      for(var contributor in $scope.contributors) {
        $scope.labels.push($scope.contributors[contributor]['author']['login']);
        $scope.data.push($scope.contributors[contributor]['total']);
      }
    });
    $http.get('https://api.github.com/repos/' + $scope.username + '/' + $scope.name + '/stats/code_frequency')
    .then(function(response) {
      $scope.code_frequency = response.data;
      var tmpDataA = new Array();
      var tmpDataD = new Array();
      for(var code_frequency in $scope.code_frequency) {
        var date = new Date($scope.code_frequency[code_frequency][0] * 1000);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        $scope.labelsAD.push(day + "/" + (monthIndex+1) + "/"+ year);
        tmpDataA.push($scope.code_frequency[code_frequency][1]);
        tmpDataD.push($scope.code_frequency[code_frequency][2]);
      }
      $scope.dataA.push(tmpDataA);
      $scope.dataD.push(tmpDataD);
    });
  };
}]);
