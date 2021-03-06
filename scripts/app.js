var app = angular.module("timesheet", []);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
            templateUrl: 'partials/timesheet.html',
            controller: 'TimeController'
        }).
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        }).
        when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'LoginController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);
