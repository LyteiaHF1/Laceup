var app = angular.module("laceup", ['ngRoute','firebase']);
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/',{
    controller: 'homeController' ,
    templateUrl: 'views/home.html'
  }).when('/trade',{
    controller: 'tradeController',
    templateUrl: 'views/trade.html'
  });        
}]);

//app.run controls the twitter login functionallity
app.run(['$rootScope', '$firebase', '$firebaseAuth',function ($rootScope, $firebase, $firebaseAuth) {
    //store URL in variable
 	var url = "https://cntdown.firebaseio.com";
 	//new reference variable, passing url in
 	var ref = new Firebase(url);
 	//new auth object created with reference
 	$rootScope.authObj = $firebaseAuth(ref);
 	$rootScope.authObj.$onAuth(function(data){
 		//console log login data
    	 console.log('data',data);

    	//if the data exists
    	if(data){
			var url2 = 'https://cntdown.firebaseio.com/users/'+data.uid;
			var ref2 = new Firebase(url2);
			//put user in object
			$rootScope.user = data;
			
            //put varaible in scop
			$rootScope.userloggedin.username = $rootScope.user.twitter.username;
            //console.log($rootScope.userloggedin.username);
            //console.log($rootScope.user.twitter.username);
			$rootScope.users = $firebase(ref2).$asArray();
			$rootScope.users.$add($rootScope.user.twitter.username);
    	}
  	});
}]);

//home page controller
app.controller('homeController', ['$scope', '$firebase', function($scope, $firebase){
	//store firebase database URL
	var url = "https://cntdown.firebaseio.com/users";
	//open connection
	var ref = new Firebase(url);

	//passes connection to angular fire
	//you have to specificly tell it is an array, or an object
	$scope.users = $firebase(ref).$asArray
}]);
