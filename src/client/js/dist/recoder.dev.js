"use strict";

var startBtn = document.getElementById('startBtn');

var handleStart = function handleStart() {
  var stream;
  return regeneratorRuntime.async(function handleStart$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
          }));

        case 2:
          stream = _context.sent;

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

startBtn.addEventListener('click', handleStart);