"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _ref;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userSchema = new _mongoose["default"].Schema((_ref = {
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatarUrl: String,
  socialOnly: {
    type: Boolean,
    "default": false
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  }
}, _defineProperty(_ref, "password", {
  type: String
}), _defineProperty(_ref, "name", {
  type: String,
  required: true
}), _defineProperty(_ref, "location", String), _defineProperty(_ref, "videos", [{
  type: _mongoose["default"].Schema.Types.ObjectId,
  ref: "Video"
}]), _ref)); //비밀번호 암호화

userSchema.pre("save", function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!this.isModified("password")) {
            _context.next = 4;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(this.password, 5));

        case 3:
          this.password = _context.sent;

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;