'use strict';

angular.module('Timetables.Display', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Display', {
            templateUrl: 'Display/Display.html',
            controller: 'DisplayCtrl'
        });
    }])

    .controller('DisplayCtrl', ['$scope', 'Courses', 'time_range', 'weekend_enabled', 
            function ($scope, Courses, time_range, weekend_enabled) {
        $scope.courses = Courses;
        $scope.weekend_enabled = weekend_enabled;

        var hr_from_time = function(time){
            var split = time.split(":");
            return parseInt(split[0]);
        };

        var time_from_hr = function(hr){
            var str = hr.toString();
            if(str.length < 2) str = "0" + str;
            return str + ":00";
        };

        // Pull the course heirarchy which makes sense for data entry out into a flat format 
        // which makes sense for display.
        // Iterating through this function in the template DOES NOT WORK PROPERLY, it must be
        // done at page load then iterate through this $scope.bundles variable.
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

        var cont_bundles = function () {
            var res = [];
            for (var i in Courses) {
                var course = Courses[i];
                for (var j in course.classes) {
                    var clss = course.classes[j];
                    if (clss.dur > 1) {
                        for (var k in clss.options) {
                            var par_opt = clss.options[k];
                            for (var slot = 1; slot < clss.dur; slot++) {
                                var bundle = {
                                    course: course,
                                    clss: clss,
                                    opt: {
                                        day: par_opt.day,
                                        time: time_from_hr(hr_from_time(par_opt.time) + slot),
                                    },
                                    parent: par_opt
                                };
                                res.push(bundle);
                            }
                        }
                    }
                }
            }
            return res;
        };

        $scope.bundles = flat_bundles();
        $scope.cont_bundles = cont_bundles();
        $scope.time_range = time_range;

        // Activate the given bundle (Course, class, timeslot triple) and deactivate all 
        // other options in that class
        $scope.toggle_active = function (bundle) {
            if($scope.preview_mode) return;
            var clss = bundle.clss, target_opt = bundle.opt; // Unpack Bundle
            if(target_opt.selected){
                target_opt.selected = false;
                return;
            }
            for (var i in clss.options) {
                var opt = clss.options[i];
                opt.selected = opt == target_opt; // Activate the target class
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
        
        $scope.day_range = function() {
            if (weekend_enabled[0]) {
                return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 
                    'Saturday', 'Sunday'];
            } else {
                return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            }
        }
    }]);
