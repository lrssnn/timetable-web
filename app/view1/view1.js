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

  $scope.addCourse = function() {
      var result = {
          name: $scope.course_name,
          classes: []
      };

      $scope.courses.push(result);
  };

  $scope.add_class_to_course = function(course) {
      course.classes.push({
          name: course.new_text,
          dur: course.new_dur,
          options: []
      })
  }

  // Adopting 'clss' as 'class' because class is a keyword
  $scope.add_option_to_class = function(clss) {
      clss.options.push({
          day: clss.new_day,
          time: clss.new_time
      })
  }

  $scope.time_string_from_option = function(option) {
      return "IMDABES"
  }
}]);