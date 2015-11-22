$(document).ready(function(){
    $.ajaxSetup({
        cache: false
    });
});

// Create app
var myApp = angular.module('myApp', ['ui.router'])

// Configure app
myApp.config(function($stateProvider) {
    // Config route provider
    $stateProvider
    .state('home', {
        url:'',
        templateUrl: 'templates/home.html',
        controller: 'HomeController',
    })

    .state('dawg-coffee', {
        url:'/dawg-coffee',
        templateUrl: 'templates/dawg-coffee.html',
        controller: 'DCController',
    })

    .state('police-shooting', {
        url: '/police-shooting',
        templateUrl: 'templates/police-shooting.html',
        controller: 'PSController',

    })

    .state('crud-review', {
        url: '/crud-review',
        templateUrl: 'templates/crud-review.html',
        controller: 'CRController',

    })

    .state('spotify-challenge', {
        url: '/spotify-challenge',
        templateUrl: 'templates/spotify-challenge.html',
        controller: 'SCController',

    })
})

    .controller('HomeController', function($scope, $http, $timeout) {
        $http.get('data/data.json').success(function(response){
            $scope.data = response[0]
            console.log($scope.data)
            $scope.homeTitle = $scope.data.Title
            $scope.homeDescription = $scope.data.Description
        })
        $http.get('data/data2.json').then(function(response2) {
            $scope.data2 = response2.data

        })    
    })

    .controller('DCController', function($scope, $http, $sce) {
        $http.get('data/data.json', {cache: true}).success(function(response){
            $scope.data = response[1]
            console.log($scope.data)
            $scope.DCTitle = $scope.data.Title
            $scope.DCDescription = $scope.data.Description
            $scope.DCLink = $sce.trustAsResourceUrl($scope.data.Link)
        })
    })

    .controller('PSController', function($scope, $http, $sce) {
        $http.get('data/data.json').then(function(response){
            $scope.data = response.data[2]
            console.log($scope.data)
            $scope.PSTitle = $scope.data.Title
            $scope.PSDescription = $scope.data.Description
            $scope.PSLink = $sce.trustAsResourceUrl($scope.data.Link)
        })
    })

    .controller('CRController', function($scope, $http, $sce) {
        $http.get('data/data.json').then(function(response){
            $scope.data = response.data[3]
            console.log($scope.data)
            $scope.CRTitle = $scope.data.Title
            $scope.CRDescription = $scope.data.Description
            $scope.CRLink = $sce.trustAsResourceUrl($scope.data.Link)
        })
    })

    .controller('SCController', function($scope, $http, $sce) {
        $http.get('data/data.json').then(function(response){
            $scope.data = response.data[4]
            console.log($scope.data)
            $scope.SCTitle = $scope.data.Title
            $scope.SCDescription = $scope.data.Description
            $scope.SCLink = $sce.trustAsResourceUrl($scope.data.Link)

        })
    })