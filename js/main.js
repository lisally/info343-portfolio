// Create app
var myApp = angular.module('myApp', ['ui.router', 'firebase'])

// Configure app
myApp.config(function($stateProvider) {
    // Config route provider
    $stateProvider

    // Config home page url, template url, and controller
    .state('home', {
        url:'',
        templateUrl: 'templates/home.html',
        controller: 'HomeController',
    })

    // Config dawg-coffee page url, template url, and controller
    .state('dawg-coffee', {
        url:'/dawg-coffee',
        templateUrl: 'templates/dawg-coffee.html',
        controller: 'DCController',
    })

    // Config police-shooting page url, template url, and controller
    .state('police-shooting', {
        url: '/police-shooting',
        templateUrl: 'templates/police-shooting.html',
        controller: 'PSController',

    })

    // Config crud-review page url, template url, and controller
    .state('crud-review', {
        url: '/crud-review',
        templateUrl: 'templates/crud-review.html',
        controller: 'CRController',

    })

    // Config spotify-challenge page url, template url, and controller
    .state('spotify-challenge', {
        url: '/spotify-challenge',
        templateUrl: 'templates/spotify-challenge.html',
        controller: 'SCController',

    })

    // Config contact page url, template url, and controller
    .state('contact', {
        url: '/contact',
        templateUrl: 'templates/contact.html',
        controller: 'ContactController',
    })
})

    // Controller for home page
    .controller('HomeController', function($scope, $http, $timeout) {
        // Gets data from data.json file for page title and description
        $http.get('data/data.json').success(function(response){
            $scope.data = response[0]
            console.log($scope.data)
            $scope.homeTitle = $scope.data.Title
            $scope.homeDescription = $scope.data.Description
        })
        // Gets data from data.json2 file for page table information
        $http.get('data/data2.json').then(function(response2) {
            $scope.data2 = response2.data

        })    
    })

    // Controller for dawg-coffee page
    .controller('DCController', function($scope, $http, $sce) {
        // Gets data from data.json file for page title, description, and iframe source
        $http.get('data/data.json', {cache: true}).success(function(response){
            $scope.data = response[1]
            console.log($scope.data)
            $scope.DCTitle = $scope.data.Title
            $scope.DCDescription = $scope.data.Description
            $scope.DCLink = $sce.trustAsResourceUrl($scope.data.Link)
        })
    })

    // Controller for police-shooting page
    .controller('PSController', function($scope, $http, $sce) {
        // Gets data from data.json file for page title, description, and iframe source
        $http.get('data/data.json').then(function(response){
            $scope.data = response.data[2]
            console.log($scope.data)
            $scope.PSTitle = $scope.data.Title
            $scope.PSDescription = $scope.data.Description
            $scope.PSLink = $sce.trustAsResourceUrl($scope.data.Link)
        })
    })

    // Controller for crud-review page
    .controller('CRController', function($scope, $http, $sce) {
        // Gets data from data.json file for page title, description, and iframe source
        $http.get('data/data.json').then(function(response){
            $scope.data = response.data[3]
            console.log($scope.data)
            $scope.CRTitle = $scope.data.Title
            $scope.CRDescription = $scope.data.Description
            $scope.CRLink = $sce.trustAsResourceUrl($scope.data.Link)
        })
    })

    // Controller for spotify-challenge page
    .controller('SCController', function($scope, $http, $sce) {
        // Gets data from data.json file for page title, description, and iframe source
        $http.get('data/data.json').then(function(response){
            $scope.data = response.data[4]
            console.log($scope.data)
            $scope.SCTitle = $scope.data.Title
            $scope.SCDescription = $scope.data.Description
            $scope.SCLink = $sce.trustAsResourceUrl($scope.data.Link)

        })
    })

    // Controller for contact page
    .controller('ContactController', function($scope, $firebaseArray) {
        // Creates new firebase reference
        var ref = new Firebase("https://lisallycontactapp.firebaseio.com/");
        var contactsRef = ref.child('contacts')

        // Creates firebase array for contact messages
        $scope.contacts = $firebaseArray(contactsRef)

        // Function to submit name, email, and message to firebase applcation with timestamp
        $scope.submit = function() {
            $scope.contacts.$add({
                name: $scope.name,
                email: $scope.email,
                message: $scope.message,
                time: Firebase.ServerValue.TIMESTAMP
            })
        
        // Clears the name, email, and message input boxes and saves messages to firebase application
            .then(function() {
                $scope.name = "";
                $scope.email = "";
                $scope.message = "";
                $scope.contacts.$save();
                alert("Thanks for leaving a message, Sally will contact you back as soon as possible!");
            })
        }
    })    

