
console.log("test");

var cv = require('opencv');
var async = require('async');
var SegfaultHandler = require('segfault-handler');

SegfaultHandler.registerHandler("crash.log");

try {
    var camera = new cv.VideoCapture(0);
    var window = new cv.NamedWindow('Video', 0);

    setInterval(function () {

        camera.read(function (err, frame) {
            if (err) throw err;

            if (frame.size()[0] > 0 && frame.size()[1] > 0) {

                frame.detectObject("/usr/local/share/OpenCV/haarcascades/haarcascade_upperbody.xml", {}, function (err, faces) {
                    if (err) throw err;
                    if (!faces.length) return ;
                    //console.log("found FACES!!!");

                    for (var i = 0; i < faces.length; i++) {
                        var face = faces[i];
                        frame.rectangle([face.x, face.y], [face.x + face.width, face.y + face.height], [0, 255, 0], 2);

                    }
                    window.show(frame);
                });
                res = window.blockingWaitKey(0, 50);
            }
        })
    }, 20);
} catch (e){
    console.log("Couldn't start camera:", e)
}
