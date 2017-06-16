angular.module('starter')

  .service('currentUserService', function () {
    var userData = "";
    var userMarkings = [];
    var userPevs = [];

    var setUserData = function (userData) {
      this.userData = userData;
    }

    var getUserData = function () {
      return this.userData
    }

    var setUserMarking = function (userMarkings) {
      this.userMarkings = userMarkings;
    }

    var getUserMarking = function () {
      return this.userMarkings;
    }

    var setUserPevs = function (userPevs) {
      this.userPevs = userPevs;
    }

    var getUserPevs = function () {
      return this.userPevs;
    }
    return {
      setUserData: setUserData,
      getUserData: getUserData,
      setUserMarking: setUserMarking,
      getUserMarking: getUserMarking,
      setUserPevs: setUserPevs,
      getUserPevs: getUserPevs
    }
  })