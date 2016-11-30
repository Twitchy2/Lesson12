/**
 * Created by RFreeman on 10/12/2016.
 */
//here come that angular

var app = angular.module('TeamApp', ['ui.router'])

//create factory
app.factory('teams', ['$http', function ($http) {
    //intialize 
    var t = {
        teams: []
    };
    //G E T 
    t.getTeams = function () {
        //execute a G E T on the teams route in our controller
        //returns the json object with teams in it
        return $http.get('/teams').success(function (data) {
            angular.copy(data, t.teams);
        });
    };
    //add
    t.addTeam = function (team) {
        //execute a post
        return $http.post('/teams', team).success(function (data) {
            //save to database
            //add new team object
            t.teams.push(data);
        });
    };
    //delete
    t.deleteTeam = function (_id, index) {
        //save monger, execute blah blah
        return $http.delete('/teams/' + _id, { _id: _id }).success(function(data) {
                t.teams.splice(index, 1);
        }); 
    };
    t.updateTeam = function(team) {
        return $http.put('/teams/' + team._id, team).success(function(data) {
            t.getTeams();   
        });
    }
    //put team array into controller
    return t;
}]);

//create the controller that interfaces the factory and the view
app.controller('TeamController', ['$scope', 'teams', function ($scope, teams) {

    //gettem
    $scope.getTeams = function () {
        teams.getTeams().then(function (response) {
            $scope.teams = response.data;
        });
    };
    //add
    $scope.addTeam = function () {
        //create add team values
        var team = {
            city: $scope.city,
            nickname: $scope.nickname,
            wins: $scope.wins,
            losses: $scope.losses
        };
        //pass the object to the factory and call the add method
        teams.addTeam(team);

        //refresh the team list
        $scope.getTeams();
        //clear the inputs
        clearForm();
    };
    //delete
    $scope.deleteTeam = function (_id, index) {
        if (confirm('Are you sure?')) {
            teams.deleteTeam(_id, index);
            //refresh list
            $scope.getTeams();
            
        }
    };
    //select single team
    $scope.selectTeam = function(index) {
        var team = $scope.teams[index];
        //populate
        $scope._id = team['_id'];
        $scope.city = team['city'];
        $scope.nickname = team['nickname'];
        $scope.wins = team['wins'];
        $scope.losses = team['losses']; 
    };

    //update
    $scope.updateTeam = function() {
        var team = {
            _id: $scope._id,
            city: $scope.city,
            nickname: $scope.nickname,
            wins: $scope.wins,
            losses: $scope.losses
        };
        TeamFactory.updateTeam(team)
        //refresh list
        $scope.getTeams();
        //clear form
        clearForm();
    };
    //clear form
    var clearForm = function () {
        $scope.city = '';
        $scope.nickname = '';
        $scope.wins = '';
        $scope.losses = '';
    }
}]);
