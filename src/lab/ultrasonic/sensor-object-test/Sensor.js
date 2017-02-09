/**
 * Created by tobias on 09.02.17.
 */


/* TODO: mengenmessung / filter zum filtern von ausreisern (z.B. > 10m)
    -1 rausfiltern
    genauigkeit. ab einer bestimmten distanz kommen krumme sachen raus.

 */

var statistics = require('math-statistics');
var usonic = require('mmm-usonic');

module.exports = Sensor;

function Sensor(pinTrigger, pinEcho, name) {

    this.pinTrigger = pinTrigger;
    this.pinEcho = pinEcho;
    this.name = name;
    this.distances = [0, 0, 0 ,0 ,0]; // fixed length
    this.internalSensor = usonic.createSensor(this.pinEcho, this.pinTrigger, 750, true);
}

/* refresh the drone. will be called in an interval */
Sensor.prototype.refresh = function() {
    this.distances.push(this.internalSensor());
    this.distances.shift();
}

/* trigger the measurement background job */
Sensor.prototype.triggerStart = function() {
    console.log("sensor [" + this.name + " ] is beginning with scanning.");
    setInterval(this.refresh.bind(this), 500);
}


/* take the list of past measurements, remove the max and min value, and build
 * an average, and round that to 2 digits
 */
Sensor.prototype.getDistance = function() {
    return (
        this.distances.reduce(
            function(a,b) { return a+b}
        )
        - Math.max.apply(Math, this.distances)
        - Math.min.apply(Math, this.distances)
        ) / (this.distances.length-2)
            .toFixed(2);

    //return this.distance.toFixed(2);
}
