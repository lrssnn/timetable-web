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
        console.log($scope.bundles);

        $scope.time_range = function () {
            return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
                "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
        };

        $scope.day_range = function () {
            var res = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

            var weekend = true;
            if (weekend) {
                return res.concat(['Saturday', 'Sunday']);
            }

            return res;
        };

        $scope.make_active = function (bundle) {
            var course = bundle.course, clss = bundle.clss, target_opt = bundle.opt;
            for (var i in clss.options) {
                var opt = clss.options[i];

                if (opt == target_opt) {
                    console.log("Match: ", opt, target_opt);
                    opt.selected = true;
                } else {
                    opt.selected = false;
                    console.log("Fail: ", opt, target_opt);
                }
            }
        }
    }]);