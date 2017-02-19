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
        return [{
            name: "Test",
            colour: "purple",
            active: true,
            collapsed: false,
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

            },
                {
                    name: "Long",
                    dur: 3,
                    options: [
                        {
                            day: "Tuesday",
                            time: "09:00",
                            selected: false
                        },
                        {
                            day: "Monday",
                            time: "10:00",
                            selected: false
                        }
                    ]
                }]
        }];
    });
