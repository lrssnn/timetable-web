'use strict';

// Declare app level module which depends on views, and components
angular.module('Timetables', [
    'ngRoute',
    'Timetables.Ingest',
    'Timetables.Display'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/Ingest'});
}]).value('day_range', ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    .value('time_range', ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
        "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"])
    .factory('Courses', function CoursesFactory() {
    return [];
});
