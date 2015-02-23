angular.module('CompBrowserControllers', [])

.controller('MainCtrl', function($scope) {
    'use strict';
    $scope.message = 'APP BASE';
})

.controller('RegisterCtrl', function($scope, $firebase, $firebaseAuth, FBURL) {
    'use strict';

    //collect name and other needed info for profile??
    var userRef = new Firebase(FBURL + '/users');
    var ref = new Firebase(FBURL);
    $scope.authObj = $firebaseAuth(ref);

    var authData = userRef.getAuth();
    if (authData) {
        console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
        var userData = new Firebase(FBURL+'/users/'+authData.uid);

        // Attach an asynchronous callback to read the data at our posts reference
        userData.on('value', function(snapshot) {
          console.log(snapshot.val());
        }, function (errorObject) {
          console.log('The read failed: ' + errorObject.code);
        });

    } else {
        console.log('User is logged out');
    }




    $scope.registerUser = function() {
        $scope.authObj.$createUser({

            email: $scope.person.email,
            password: $scope.person.password

        }).then(function(userData) {
            console.log('User ' + userData.uid + ' created successfully!');
            return $scope.authObj.$authWithPassword({

                email: $scope.person.email,
                password: $scope.person.password

            });
        }).then(function(authData) {
            console.log('Logged in as:', authData.uid);

            ref.child('users').child(authData.uid).set({

                provider: authData.provider,
                name: '',
                email: $scope.person.email,
                password: $scope.person.password

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
})

//example controller for testing - THIS ISN" USED
.controller('PasswordController', function PasswordController($scope) {
  'use strict';

  $scope.password = '';
  $scope.grade = function() {
    var size = $scope.password.length;
    if (size > 8) {
      $scope.strength = 'strong';
    } else if (size > 3) {
      $scope.strength = 'medium';
    } else {
      $scope.strength = 'weak';
    }
  };

  $scope.message = function(){
    return 'I am awesome';
  };

});
