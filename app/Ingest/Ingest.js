'use strict';

angular.module('Timetables.Ingest', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Ingest', {
            templateUrl: 'Ingest/Ingest.html',
            controller: 'IngestCtrl'
        });
    }])

    .controller('IngestCtrl', ['$scope', 'Courses', function ($scope, Courses) {

        $scope.courses = Courses;
        $scope.addCourse = function () {
            var result = {
                name: $scope.course_name,
                classes: []
            };

            Courses.push(result);
        };

        $scope.add_class_to_course = function (course) {
            course.classes.push({
                name: course.new_text,
                dur: course.new_dur,
                options: []
            })
        }

        // Adopting 'clss' as 'class' because class is a keyword
        $scope.add_option_to_class = function (clss) {
            clss.options.push({
                day: clss.new_day,
                time: clss.new_time
            })
        }

        $scope.time_string_from_option = function (option) {
            return "IMDABES";
        }

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