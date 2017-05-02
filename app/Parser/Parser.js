'use strict';

angular.module('Timetables.Parser', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/Parser', {
            templateUrl: 'Parser/Parser.html',
            controller: 'ParserCtrl'
        });
    }])
.controller('ParserCtrl', ['$scope', 'Courses', 'time_range', 'get_colour', 
        function ($scope, Courses, time_range, get_colour) {

    $scope.courses = Courses;

    // Error wrapper for parse_course_from_html. Adds the resultant course to the global array if successful.
    $scope.create_course_from_html = function(){
        var course;
        try {
            course = parse_course_from_html();
        } catch (e){
            $scope.parse_result = "Parsing error occurred. Ensure you are copying the full source of the correct page." +
                "\nIf error persists contact me enter the data manually and contact me about the error." +
                "\nFull error Text: '" + e + "'";
            return;
        }
        $scope.parse_result = "Parsing Complete. View data in timetable or add another course.";
        if(course) $scope.courses.push(course);
        $scope.raw_text = "";
    };

    // Takes the html source of a uon timetable search result and returns a course created from that data
    function parse_course_from_html() {
        var raw_text = $scope.raw_text; // Full page source

        // Create the parser and parse the text
        var handler = new Tautologistics.NodeHtmlParser.DefaultHandler(function (error, dom) {
            if (error){
                console.log("Parsing error occurred: ", error);
            }
        }, {ignoreWhitespace: true, verbose:false});
        var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
        parser.parseComplete(raw_text);

        // Searches the dom for the data table's root tag from where we begin pulling out the data
        var table_tag = find_table_tag(handler.dom);

        // Build a list of "flat options" which are objects built more or less from the data in one row of the column.
        // These flat options contain the information necessary to build the class->opt hierarchy but this is done later
        var flat_opts = [];
        var course_name = ""; // This will be populated later

        // The table consists of a head, body and foot, pull out the body
        for(var i in table_tag.children){
            if(table_tag.children[i].name == "tbody"){
                var tab_body = table_tag.children[i];
                // Traverse each row in the column, and pull its children which is each column in the table.
                for(var j in tab_body.children){
                    var row = tab_body.children[j];
                    var cols = row.children;
                    // Each set of columns is well defined and ordered so we can explicitly pull the data we need.
                    var class_code = cols[0].children[0].children[0].data;
                    var class_name = cols[1].children[0].data;
                    var day = cols[2].children[1].data;
                    var start_time = cols[3].children[1].data;
                    var duration = cols[5].children[1].data;
                    // Build the option and store it
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

        // Now we need to determine the class/option relationship by reading the class code of each option
        var classes = [];
        for(var i in flat_opts){
            var opt = flat_opts[i];
            var parent_class = null; // This will reference the option's parent in the classes array once found/created
            var class_details = parse_course_code(opt.class_code);
            // Get the course name
            if(!course_name){
                course_name = class_details.course_name;
            }
            // For each class we know about, check if the class matches this option's class
            for(var j in classes){
                var clss = classes[j];
                if(clss.id == class_details.class_id){
                    // This is an option for an existing class, set this class as the target
                    parent_class = clss;
                    break;
                }
            }
            // If the option doesn't match any existing classes, add a new one
            if(parent_class == null){

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
         // Add a new course with our created data
        return {
            name: course_name,
            colour: get_colour.next(),
            active: true,
            collapsed: false,
            classes: classes
        }
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
