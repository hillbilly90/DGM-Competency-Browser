angular.module('CompBrowser.controllers', [])

.controller('MainCtrl', function($scope, $firebase, $firebaseAuth, FBURL) {
    'use strict';
    $scope.message = 'APP BASE';

    var ref = new Firebase(FBURL);
    //Logout
    ref.unauth();

})

.controller('RegisterCtrl', function($scope, $firebase, $firebaseAuth, $rootScope, FBURL) {
    'use strict';

    var userRef = new Firebase(FBURL + '/users');

    // Create a callback which logs the current auth state
    function authDataCallback(authData) {
      if (authData) {
        console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
      } else {
        console.log('User is logged out');
      }
    }

    //check to see if user is authenticated
    userRef.onAuth(authDataCallback);



    $scope.registerUser = function() {

      userRef.createUser({
        email    : $scope.email,
        password : $scope.password
      }, function(error) {
        if (error === null) {
          console.log('User created successfully');

          //Generate a random id to store in db
          var newChildRef = userRef.push();

          //Store user data in the db to reference
          newChildRef.set({
            email    : $scope.email,
            password : $scope.password
          });

          //log the person in
          userRef.authWithPassword({
            email    : $scope.email,
            password : $scope.password
          }, function(error, authData) {
            if (error) {
              console.log('Login Failed!', error);
            } else {
              console.log('Authenticated successfully with payload:', authData);
            }
          });

        } else {
          console.log('Error creating user:', error);
        }
      });


    };

})



.controller('TrackCtrl', function ($scope) {
    'use strict';
    $scope.tracks = [
         {'semester': 'Spring 2015',
             'note': 'Generals',
             'order': 1,
             'track': 'recommended'
         },
         {'semester': 'Fall 2015',
              'note': 'Undergraduate Classes',
              'order': 2,
              'track': 'recommended'
         },
         {'semester': 'Spring 2016',
             'note': 'Undergraduate Classes',
             'order': 3,
             'track':'custom1'
         },
        {'semester': 'Fall 2016',
            'note': 'Undergraduate Classes',
            'order': 4,
            'track':'custom1'
        },
        {'semester': 'Spring 2017',
            'note': 'Upper Division Classes',
            'order': 5,
            'track':'custom2'
        },
        {'semester': 'Fall 2017',
            'note': 'Upper Division Classes',
            'order': 6,
            'track':'custom2'
        }
    ];

    $scope.orderProp = 'order';
});
