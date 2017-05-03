'use strict';

// Declare app level module which depends on views, and components
angular.module('Timetables', [
    'ngRoute',
    'Timetables.Ingest',
    'Timetables.Display',
    'Timetables.Parser'
]).config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/Ingest'});
}]).factory('weekend_enabled', function() {
    return [false];
}).factory('time_range', function TimeFactory() {
    return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
        "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
}).factory('Courses', function CoursesFactory() {
    return []
}).service("get_colour", function get_colour() {
    this.index = -1;
    this.next = function () {
        var colours = ['teal', 'red', 'green'];
        if (this.index > colours.length) {
            this.index = -1;
        }
        return colours[++this.index];
    };
});
