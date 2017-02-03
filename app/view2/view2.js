'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', 'Courses', function($scope, Courses) {
    $scope.courses = Courses;

    $scope.time_range = function () {
        return ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
            "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
            "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
            "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];
    }

    $scope.day_range = function(){
        var res = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        var weekend = true;
        if(weekend){
            return res.concat(['Saturday', 'Sunday']);
        }

        return res;
    }
}]);