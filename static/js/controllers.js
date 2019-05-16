
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.town1City = "";
    $scope.town1Weather = "";

    $scope.town = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.town1m;
        } else if(which === 2) {
            data = $scope.town2m;
        } else if(which === 3) {
            data = $scope.town3m;
        } else if(which === 4) {
            data = $scope.town4m;
        } 

        if(data.length === 5) {
            $http({
                method: "GET",
                url: '/api/v1/getWeather?town=' + data
            }).then( function(response) {
                if(which === 1) {
                    $scope.town1City = response.data.city;
                    $scope.town1Weather = response.data.weather;
                } else if(which === 2) {
                    $scope.town2City = response.data.city;
                    $scope.town2Weather = response.data.weather;
                } else if(which === 3) {
                    $scope.town3City = response.data.city;
                    $scope.town3Weather = response.data.weather;
                } else if(which === 4) {
                    $scope.town4City = response.data.city;
                    $scope.town4Weather = response.data.weather;
                } 
            });
        } else {
            if(which === 1) {
                    $scope.town1City = "";
                    $scope.town1Weather = "";
                } else if(which === 2) {
                    $scope.town2City = "";
                    $scope.town2Weather = "";
                } else if(which === 3) {
                    $scope.town3City = "";
                    $scope.town3Weather = "";
                } else if(which === 4) {
                    $scope.town4City = "";
                    $scope.town4Weather = "";
                } 
        }
    };
    
}]);
