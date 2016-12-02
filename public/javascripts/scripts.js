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
   d.deleteDrink = function(_id) {
     return $http.delete('/drinks/' + _id).success(function(data) {
        //d.drinks.splice(index,  1);
     });
   };

   // SELECT
   d.selectDrink = function(_id) {
     return $http.get('/drinks/' + _id).success(function(data) { } );
   };

   // UPDATE
   d.updateDrink = function(drink) {
     return $http.put('/drinks/' + drink._id, drink).success(function(data) {} );
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
   $scope.deleteDrink = function(_id) {
      if (confirm('This drink rocks!  Are you sure you don\'t want it??')) {
        DrinkFactory.deleteDrink(_id);

         $scope.getDrinks();
      }
   };

   // SELECT
   $scope.selectDrink = function(_id) {
      // look up the selected drink
      DrinkFactory.selectDrink(_id).then(function(response) {
         $scope.currentDrink = response.data;
      });
   };

   // UPDATE
   $scope.updateDrink = function() {
     DrinkFactory.updateDrink($scope.currentDrink).then(function(response) {
        $scope.getDrinks();
        $scope.clearDrink();
     });
   };

   // CLEAR
   $scope.clearDrink = function() {
      $scope.currentDrink = null;
   };

}]);
// end controller

