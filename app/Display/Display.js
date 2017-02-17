'use strict';

angular.module('Timetables.Display', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Display', {
            templateUrl: 'Display/Display.html',
            controller: 'DisplayCtrl'
        });
    }])

    .controller('DisplayCtrl', ['$scope', 'Courses', function ($scope, Courses) {
        $scope.courses = Courses;

        // Pull the course heirarchy which makes sense for data entry out into a flat format which makes sense for display.
        // Iterating through this function in the template DOES NOT WORK PROPERLY, it must be done at page load then
        // iterate through this $scope.bundles variable.
        var flat_bundles = function () {
            var res = [];
            for (var i in Courses) {
                var course = Courses[i];
                for (var j in course.classes) {
                    var clss = course.classes[j];
                    for (var k in clss.options) {
                        var opt = clss.options[k];
                        var bundle = {
                            course: course,
                            clss: clss,
                            opt: opt
                        };
                        res.push(bundle);
                    }
                }
            }
            return res;
        };

        $scope.bundles = flat_bundles();

        // Return an array of each time delineation in the system
        $scope.time_range = function () {
            return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
                "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
        };

        // Return an array of each day in the system
        $scope.day_range = function () {
            var res = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

            var weekend = true;
            if (weekend) {
                return res.concat(['Saturday', 'Sunday']);
            }

            return res;
        };

        // Activate the given bundle (Course, class, timeslot triple) and deactivate all other options in that class
        $scope.make_active = function (bundle) {
            var clss = bundle.clss, target_opt = bundle.opt; // Unpack Bundle
            for (var i in clss.options) {
                var opt = clss.options[i];
                opt.selected = opt == target_opt; // Activate the class if the option is what we are looking for
            }
        }
    }]);