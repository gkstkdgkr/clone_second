"use strict";

require("./db");

require("./models/Video");

require("./models/User");

var _server = _interopRequireDefault(require("./server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = 4000;

var handleListening = function handleListening() {
  return console.log("Server listening on port localhost:".concat(PORT, "\u2728"));
};

_server["default"].listen(PORT, handleListening); // port_number