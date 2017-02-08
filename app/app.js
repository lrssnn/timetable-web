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
            name: "Class",
            dur: 1,
            options: [{
                day: "Monday",
                time: "09:00"
            },
                {
                    day: "Tuesday",
                    time: "10:00"
                },
                {
                    day: "Wednesday",
                    time: "11:00"
                },
                {
                    day: "Thursday",
                    time: "12:00"
                },
                {
                    day: "Friday",
                    time: "13:00"
                },
                {
                    day: "Thursday",
                    time: "11:00"
                }]
        }]
    }];
    ;
});
