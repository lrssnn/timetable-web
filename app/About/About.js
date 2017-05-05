'use strict';

angular.module('Timetables.About', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/About', {
            templateUrl: 'About/About.html',
            controller: 'AboutCtrl'
        });
    }])
    .controller('AboutCtrl', ['$scope', 'Courses', 'time_range', 'get_colour',
        function ($scope, Courses, time_range, get_colour) {
            $scope.courses = Courses;
        }]);
