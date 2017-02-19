'use strict';

angular.module('Timetables.Ingest', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Ingest', {
            templateUrl: 'Ingest/Ingest.html',
            controller: 'IngestCtrl'
        });
    }]).service("get_colour", function get_colour() {
    this.index = -1;
    this.next = function () {
        var colours = ['teal', 'red', 'green'];
        if (this.index > colours.length) {
            this.index = -1;
        }
        return colours[++this.index];
    };
}).controller('IngestCtrl', ['$scope', 'Courses', 'get_colour', 'day_range', 'time_range', function ($scope, Courses, get_colour, day_range, time_range) {

    $scope.courses = Courses; // Load global courses into local scope

    // Adds a course to the list of courses
    $scope.addCourse = function () {
        var result = {
            name: $scope.course_name,
            colour: get_colour.next(),
            active: true,
            classes: []
        };

        Courses.push(result);
    };

    // Adds a class to the provided course
    $scope.add_class_to_course = function (course) {
        course.classes.push({
            name: course.new_text,
            dur: course.new_dur,
            options: []
        })
    };

    // Adds an option to the provided class
    // Adopting 'clss' as 'class' because class is a keyword
    $scope.add_option_to_class = function (clss) {
        clss.options.push({
            day:  clss.new_day,
            time: clss.new_time,
            id: clss.options.length + 1,
        })
    };

    $scope.time_range = time_range;
    $scope.day_range = day_range;
}]);