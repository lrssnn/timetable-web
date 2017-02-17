'use strict';

// Declare app level module which depends on views, and components
angular.module('Timetables', [
    'ngRoute',
    'Timetables.Ingest',
    'Timetables.Display'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/Ingest'});
}]).factory('Courses', function CoursesFactory() {
    return [{
        name: "Test",
        classes: [{
            name: "Lecture",
            dur: 1,
            options: [
                {
                    day: "Monday",
                    time: "09:00",
                    selected: false
                },
                {
                    selected: false,
                    day: "Tuesday",
                    time: "10:00"
                },
                {
                    selected: false,
                    day: "Wednesday",
                    time: "11:00"
                },
                {
                    selected: true,
                    day: "Thursday",
                    time: "12:00"
                },
                {
                    selected: false,
                    day: "Friday",
                    time: "13:00"
                },
                {
                    selected: false,
                    day: "Thursday",
                    time: "11:00"
                }]
        }]
    }];
});
