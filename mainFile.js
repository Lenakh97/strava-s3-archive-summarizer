"use strict";
exports.__esModule = true;
var summarizeTeamData_1 = require("./lib/summarizeTeamData");
var data = [
    {
        resource_state: 2,
        athlete: {
            resource_state: 2,
            firstname: "Jon Helge",
            lastname: "N."
        },
        name: "Afternoon Workout",
        distance: 2333520,
        moving_time: 264855,
        elapsed_time: 620969,
        total_elevation_gain: 924.6,
        type: "Workout",
        sport_type: "Workout"
    },
    {
        resource_state: 2,
        athlete: {
            resource_state: 2,
            firstname: "Geir",
            lastname: "K."
        },
        name: "Morning Mountain Bike Ride",
        distance: 25159.1,
        moving_time: 6081,
        elapsed_time: 31997,
        total_elevation_gain: 409,
        type: "Ride",
        sport_type: "MountainBikeRide",
        workout_type: null
    },
    {
        resource_state: 2,
        athlete: {
            resource_state: 2,
            firstname: "Jon Helge",
            lastname: "N."
        },
        name: "Afternoon Run",
        distance: 9658.5,
        moving_time: 4500,
        elapsed_time: 4500,
        total_elevation_gain: 0,
        type: "Run",
        sport_type: "Run",
        workout_type: null
    },
    {
        resource_state: 2,
        athlete: {
            resource_state: 2,
            firstname: "Øyvind",
            lastname: "A."
        },
        name: "Afternoon Ride",
        distance: 30697.4,
        moving_time: 5229,
        elapsed_time: 5606,
        total_elevation_gain: 553,
        type: "Ride",
        sport_type: "Ride",
        workout_type: 10
    },
];
(0, summarizeTeamData_1.summarizeTeamData)(data);
