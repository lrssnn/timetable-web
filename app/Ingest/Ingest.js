'use strict';

angular.module('Timetables.Ingest', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Ingest', {
            templateUrl: 'Ingest/Ingest.html',
            controller: 'IngestCtrl'
        });
    }]).controller('IngestCtrl', ['$scope', 'Courses', 'get_colour', 'day_range', 'time_range', 'weekend_enabled', function ($scope, Courses, get_colour, day_range, time_range, weekend_enabled) {

    $scope.courses = Courses; // Load global courses into local scope
    $scope.weekend_enabled = weekend_enabled;

    // Adds a course to the list of courses
    $scope.addCourse = function () {
        var result = {
            name: $scope.course_name,
            colour: get_colour.next(),
            active: true,
            collapsed: false,
            editing: false,
            classes: []
        };

        Courses.push(result);
        $scope.course_name = "";
    };

    // Adds a class to the provided course
    $scope.add_class_to_course = function (course) {
        course.classes.push({
            name: course.new_text,
            dur: course.new_dur,
            editing: false,
            options: []
        });
        course.new_text = "";
        course.new_dur = "";
    };

    // Adds an option to the provided class
    // Adopting 'clss' as 'class' because class is a keyword
    $scope.add_option_to_class = function (clss) {
        clss.options.push({
            day:  clss.new_day,
            time: clss.new_time,
            id: clss.options.length + 1,
            editing: false
        });
        clss.new_day = "";
        clss.new_time = "";
    };

    $scope.toggle_edit_opt = function(opt, clss){
        if(opt.editing){
            opt.editing = false;
            return;
        }
        for(var i in clss.options){
            clss.options[i].editing = clss.options[i] == opt;
        }
    };

    $scope.toggle_edit_class = function(clss, course){
        if(clss.editing){
            clss.editing = false;
            return;
        }
        for(var i in course.classes){
            course.classes[i].editing = course.classes[i] == clss;
        }
    };

    $scope.toggle_edit_course = function(course, courses){
        if(course.editing){
            course.editing = false;
            return;
        }
        for(var i in courses){
            courses[i].editing = courses[i] == course;
        }
    };

    $scope.time_range = time_range;
    $scope.day_range = day_range;
}]);