/**
 * Created by RFreeman on 10/14/2016.
 */

// create the angular application
var app = angular.module('DrinkApp', []);

// angular factory - interface between the express controller and angular controller
app.factory('DrinkFactory', ['$http', function($http) {

   // initialize an empty drinks list
   var d = {
      drinks: []
   };

   // GET
   d.getDrinks = function() {
     // call GET /drinks in the express controller; receive json back
      return $http.get('/drinks').success(function(data) {
         // copy the json response data to the in-memory drinks array
         angular.copy(data, d.drinks);
      });
   };

   // ADD
   d.addDrink = function(drink) {
      // call POST /drinks and send it the new drink json object
      return $http.post('/drinks', drink).success(function(data) {
         //d.drinks.push(data);
      });
   };

   // DELETE
   d.deleteDrink = function(_id, index) {
     return $http.delete('/drinks/' + _id).success(function(data) {
        //d.drinks.splice(index,  1);
     });
   };

   // return the current drinks list
   return d;

}]);

// end factory



// angular controller - interface between the factory and the view
app.controller('DrinkController', ['$scope', 'DrinkFactory', function($scope, DrinkFactory) {

   // GET
   $scope.getDrinks = function() {
      DrinkFactory.getDrinks().then(function(response) {
         $scope.drinks = response.data;
      });
   };

   // ADD
   $scope.addDrink = function() {
     // 1. call the factory and pass in the currentDrink object
      DrinkFactory.addDrink($scope.currentDrink);

      // 2. refresh the list
      $scope.getDrinks();

      // 3. clear the current drink / form
      $scope.currentDrink = null;
   };

   // DELETE
   $scope.deleteDrink = function(_id, index) {
      if (confirm('This drink rocks!  Are you sure you don\'t want it??')) {
        DrinkFactory.deleteDrink(_id,  index);

         $scope.getDrinks();
      }
   };

}]);
// end controller

