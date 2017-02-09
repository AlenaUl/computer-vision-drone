/**
 * Created by tobias on 08.02.17.
 */

'use strict'

var Sensor = require('./Sensor');
var usonic = require('mmm-usonic');

var sensorLeft  = new Sensor(22, 27, "front", 300);
var sensorFront = new Sensor(9, 10, "left", 300);
var sensorRight  = new Sensor(23, 24, "right", 300);


usonic.init(function (error) {
    if (error) {
        //sensorFront.triggerStart(); // only for local test
        console.log("FEHLER :(");
        console.log(error);
    } else {
        console.log("created sensor");
        sensorFront.triggerStart();
        sensorLeft.triggerStart();
        sensorRight.triggerStart();
    }
});


setTimeout(function() {
    /* this function will contain the drone steering */
    setInterval(function () {
        var curDis = sensorFront.getDistance();
        console.log("front: " + sensorFront.getDistance());
        console.log("left: " + sensorLeft.getDistance());
        console.log("right: " + sensorRight.getDistance());
        console.log("------------------------------------");


        if (curDis < 30) {
            console.log("OH MY GOD! BREAK THE DRONE!! STOP IT! Distance: " + curDis);
        }

    }, 200);
}, 1000);







