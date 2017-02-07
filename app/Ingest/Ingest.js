'use strict';

angular.module('Timetables.Ingest', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Ingest', {
            templateUrl: 'Ingest/Ingest.html',
            controller: 'IngestCtrl'
        });
    }])

    .controller('IngestCtrl', ['$scope', 'Courses', function ($scope, Courses) {

        $scope.courses = Courses; // Load global courses into local scope

        // Adds a course to the list of courses
        $scope.addCourse = function () {
            var result = {
                name: $scope.course_name,
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
                day: clss.new_day,
                time: clss.new_time
            })
        };

        // Generate a reasonable string from a time/day option
        $scope.time_string_from_option = function (option) {
            return "IMDABES";
        };


        $scope.time_range = function () {
            return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
                    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
        };

        // A list of days
        $scope.day_range = function(){
            var res = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

            var weekend = true;
            if(weekend){
                return res.concat(['Saturday', 'Sunday']);
            }

            return res;
        }
    }]);