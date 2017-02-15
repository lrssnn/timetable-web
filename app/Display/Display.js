'use strict';

angular.module('Timetables.Display', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Display', {
    templateUrl: 'Display/Display.html',
    controller: 'DisplayCtrl'
  });
}])

.controller('DisplayCtrl', ['$scope', 'Courses', function($scope, Courses) {
    $scope.courses = Courses;

    $scope.time_range = function () {
        return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
            "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
    };

    $scope.day_range = function(){
        var res = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        var weekend = true;
        if(weekend){
            return res.concat(['Saturday', 'Sunday']);
        }

        return res;
    };

    // Returns every option in the system which starts in the provided day/time combo
    $scope.options_in_timeslot = function(day, time) {
        var res = [];

        for(var i in Courses) {
            var course = Courses[i];
            for (var j in course.classes) {
                var clss = course.classes[j];
                for (var k in clss.options) {
                    var opt = clss.options[k];
                    if (opt.day == day && opt.time == time){
                        res.push(opt);
                    }
                }
            }
        }
        return res;
    }
}]);