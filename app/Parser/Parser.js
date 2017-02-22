'use strict';

angular.module('Timetables.Parser', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Parser', {
            templateUrl: 'Parser/Parser.html',
            controller: 'ParserCtrl'
        });
    }])
.controller('ParserCtrl', ['$scope', 'Courses', 'day_range', 'time_range', function ($scope, Courses, day_range, time_range) {

    $scope.courses = Courses;

    $scope.create_course_from_html = function(){
        var raw_text = $scope.raw_text;

        // Create the parser and parse the text
        var handler = new Tautologistics.NodeHtmlParser.DefaultHandler(function (error, dom) {
            if (error){
                console.log("ERROR");
            } else {
                console.log("Success?");
            }
        }, {ignoreWhitespace: true, verbose:false});

        var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
        parser.parseComplete(raw_text);

        var dom = handler.dom;
        var table_tag = find_table_tag(dom);
        console.log(table_tag);

        // List of all options parsed from the table. This list will get the first step of parsing, before each option
        // is resolved into its resultant course.
        var flat_opts = [];
        var course_name = "";

        for(var i in table_tag.children){
            if(table_tag.children[i].name == "tbody"){
                var tab_body = table_tag.children[i];
                for(var j in tab_body.children){
                    var row = tab_body.children[j];
                    console.log(row);
                    var cols = row.children;
                    var class_code = cols[0].children[0].children[0].data;
                    var class_name = cols[1].children[0].data;
                    var day = cols[2].children[1].data;
                    var start_time = cols[3].children[1].data;
                    var duration = cols[5].children[1].data;
                    var flat_option = {
                        class_code: class_code,
                        class_name: class_name,
                        day: day,
                        time: start_time,
                        dur: duration
                    };
                    flat_opts.push(flat_option);
                }
            }
        }

        console.log(flat_opts);

        // Now we need to determine the class/option relationship by reading the class code of each option
        var classes = [];
        for(var i in flat_opts){
            var opt = flat_opts[i];
            var parent_class = null;
            var class_details = parse_course_code(opt.class_code);
            if(!course_name){
                course_name = class_details.course_name;
            }
            for(var j in classes){
                var clss = classes[j];
                console.log(clss, class_details);
                if(clss.id == class_details.class_id){
                    // This is an option for an existing class, set this class as the target
                    parent_class = clss;
                    break;
                }
            }

            if(parent_class == null){
                // This option belongs to a class we don't have yet, add it to the list
                var clss = {
                    name: opt.class_name,
                    dur: parseInt(opt.dur.split()[0]),
                    options: [],
                    id: class_details.class_id
                };

                classes.push(clss);
                parent_class = clss;
            }

            // Add the option to its parent class in the expected format
            parent_class.options.push({
                day: opt.day,
                time: correct_time_format(opt.time),
                id: parseInt(class_details.option_id),
            });
        }

        console.log(classes);
        $scope.courses.push({
            name: course_name,
            colour: "red",
            active: true,
            collapsed: false,
            classes: classes
        })
    };

    function find_table_tag(children){
        for(var i in children){
            var tag = children[i];
            if((tag.attribs) && tag.attribs.class == "cyon_table") return tag;
            var res = find_table_tag(tag.children);
            if(res) return res;
        }
        return null;
    }

    // Class codes are of the format:
    // COURSENAME/SEMESTER_CAMPUS/CLASS_ID/OPTION_NUMBER
    function parse_course_code(code){
        var split = code.split("/");
        return {
            course_name: split[0],
            class_id: split[2],
            option_id: split[3]
        };
    }

    function correct_time_format(time){
        var split = time.split(":");
        var hour_num = parseInt(split[0]);
        if(split[1] == "00pm" && hour_num != 12){
            hour_num += 12;
        }
        return hour_num.toString() + ":00";
    }
}]);
