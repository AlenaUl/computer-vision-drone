/**
 * Created by tobias on 08.02.17.
 */

var Drone = require('./Drone.js');
var usonic = require('mmm-usonic');


usonic.init(function (error) {

    if(error) {
        console.log(error);
    } else {
        //this.sensor = usonic.createSensor(this.gpioEcho, this.gpioTrigger, timeout, delay, rate);
    }

});

//usonic.createSensor(10, 9, 750, 60, 5);
//usonic.createSensor(22, 27, 750, 60, 5);

console.log("Starting drone..");
var myDrone = new Drone();


myDrone.start();