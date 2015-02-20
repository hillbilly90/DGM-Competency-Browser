angular.module('CompBrowser.controllers', [])

.controller('MainCtrl', function($scope, $firebase, FBURL) {
    'use strict';
    $scope.message = 'APP BASE';

    var ref = new Firebase(FBURL);
    //Logout
    ref.unauth();

})

.controller('RegisterCtrl', function($scope, $firebase, $firebaseAuth, $rootScope, FBURL) {

  'use strict';
    var userRef = new Firebase(FBURL + '/users');
    var ref = new Firebase(FBURL);
    $scope.authObj = $firebaseAuth(ref);

    var authData = userRef.getAuth();
    if (authData) {
      console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
    } else {
      console.log('User is logged out');
    };



    $scope.registerUser = function() {

      $scope.authObj.$createUser({
        email: $scope.email,
        password: $scope.password
      }).then(function(userData) {
        console.log('User ' + userData.uid + ' created successfully!');

        return $scope.authObj.$authWithPassword({
          email: $scope.email,
          password: $scope.password
        });
      }).then(function(authData) {
        console.log('Logged in as:', authData.uid);

        ref.child('users').child(authData.uid).set({
          provider: authData.provider,
          name: '',
          email: $scope.email,
          password: $scope.password
        });

      }).catch(function(error) {
        console.error('Error: ', error);
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
