'use strict';

angular.module('Timetables.Display', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Display', {
            templateUrl: 'Display/Display.html',
            controller: 'DisplayCtrl'
        });
    }])

    .controller('DisplayCtrl', ['$scope', 'Courses', 'day_range', 'time_range', function ($scope, Courses, day_range, time_range) {
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
        $scope.time_range = time_range;
        $scope.day_range = day_range;

        // Activate the given bundle (Course, class, timeslot triple) and deactivate all other options in that class
        $scope.toggle_active = function (bundle) {
            var clss = bundle.clss, target_opt = bundle.opt; // Unpack Bundle
            if(target_opt.selected){
                target_opt.selected = false;
                return;
            }
            for (var i in clss.options) {
                var opt = clss.options[i];
                opt.selected = opt == target_opt; // Activate the class if the option is what we are looking for
            }
        };

        $scope.selections_complete = function() {
            for(var i in Courses){
                var course = Courses[i];
                for(var j in course.classes){
                    var clss = course.classes[j];
                    var satisfied = false;
                    for(var k in clss.options){
                        var opt = clss.options[k];
                        if(opt.selected){
                            satisfied = true;
                        }
                    }
                    if(!satisfied){
                        return false;
                    }
                }
            }
            return true;
        };
    }]);