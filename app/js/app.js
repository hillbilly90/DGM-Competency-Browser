angular.module('CompBrowser', ['ui.router', 'CompBrowser.controllers', 'skillsCtrl', 'courseCtrl', 'firebase'])

.config(function($stateProvider, $urlRouterProvider) {
    'use strict';
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'MainCtrl'
    })
    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html',
        controller: 'RegisterCtrl'
    })
    .state('about', {
        url: '/about',
        templateUrl: 'templates/about.html'
    })
    .state('tracks', {
        url: '/tracks',
        templateUrl: 'templates/tracks.html',
        controller: 'TrackCtrl'
    })
    .state('courses', {
        url: '/courses',
        templateUrl: 'courses/courses.html',
        controller: 'CourseCtrl'
    })
    .state('skills', {
        url: '/skills',
        templateUrl: 'skills/skills.html',
        controller: 'SkillsCtrl'
    });
    $urlRouterProvider.otherwise('/');
})

// your Firebase URL goes here
// should look something like: https://blahblahblah.firebaseio.com
.constant('FBURL', 'https://competency-browser.firebaseio.com/');
