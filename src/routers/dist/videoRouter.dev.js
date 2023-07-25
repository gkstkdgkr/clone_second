"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videoController = require("../controllers/videoController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router(); // upload가 :id보다 위에있어야지 인식됨
// :id가 위에있으면 /upload는 인식 못함
// 리퀘스트는 제일 위에있는것부터 순차적으로 확인함
// :id(//d+) id를 불러오는데 숫자만 받아옴 
// :id는 express에게 id라는 변수를 받아오라는 표시
// 지금 현재 받아오는 id는 24비트 16진수([0-9a-f]{24})


videoRouter.get("/:id([0-9a-f]{24})", _videoController.watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(_videoController.getEdit).post(_videoController.postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(_videoController.deleteVideo);
videoRouter.route("/upload").get(_videoController.getUpload).post(_videoController.postUpload);
var _default = videoRouter;
exports["default"] = _default;