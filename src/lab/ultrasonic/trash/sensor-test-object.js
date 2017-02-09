'use strict';

var statistics = require('math-statistics');
var usonic     = require('mmm-usonic');


function Sensor(echoPin, triggerPin, timeout, delay, rate) {

    console.log('Configured Pin: ' + triggerPin + " / " + echoPin);

}



var print = function (distances) {

    var distance = statistics.median(distances);

    process.stdout.clearLine();
    process.stdout.cursorTo(0);

    if (distance < 0) {
        process.stdout.write('Error: Measurement timeout.\n');
    } else {
        process.stdout.write('Distance: ' + distance.toFixed(2) + ' cm');
    }
};



var initSensor = function (echoPin, triggerPin, timeout, delay, rate) {



    var distances;

    (function measure() {
        if (!distances || distances.length === rate) {
            if (distances) {
                print(distances);
            }

            distances = [];
        }

        setTimeout(function () {
            distances.push(sensor());

            measure();
        }, delay);
    }());
};




usonic.init(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log("inited");
    }
});




initSensor(
    10,
    9,
    750,
    60,
    5
);


