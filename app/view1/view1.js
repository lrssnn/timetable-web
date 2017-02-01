'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

  $scope.courses = [];
  $scope.classes = [];
  $scope.class_times = [];

  $scope.addCourse = function() {
      var result = {
          name: $scope.course_name,
          classes: $scope.classes
      };

      $scope.courses.push(result);
  };

  $scope.addClass = function() {
      var result = {
          name: $scope.class_name,
          times: $scope.class_times
      };

      $scope.classes.add(result);
  };

  $scope.addTime = function() {
      var result = {
          time: $scope.time
      };

      $scope.class_times.add(result);
  }
}]);