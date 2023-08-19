"use strict";

var startBtn = document.getElementById('startBtn');
var video = document.getElementById('preview');
var stream;
var recoder;
var videoFile;

var handleDownload = function handleDownload() {
  var a = document.createElement('a');
  a.href = videoFile;
  a.download = 'my recoding.mp4';
  document.body.appendChild(a);
  a.click();
};

var handleStop = function handleStop() {
  startBtn.innerText = 'Start Recording';
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleStart);
};

var handleStart = function handleStart() {
  startBtn.innerText = 'Stop Recording';
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);
  recoder = new MediaRecorder(stream);

  recoder.ondataavailable = function (e) {
    videoFile = URL.createObjectURL(e.data);
    video.srcObject = null;
    video.src = videoFile;
    video.play();
  };

  recoder.start();
  setTimeout(function () {
    recoder.stop();
  }, 10000);
};

var init = function init() {
  return regeneratorRuntime.async(function init$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
          }));

        case 2:
          stream = _context.sent;
          // video.srcObject = stream;
          video.play();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

init();
startBtn.addEventListener('click', handleStart);