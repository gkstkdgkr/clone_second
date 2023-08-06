import express from "express";
import {
  watch,
  postEdit,
  getEdit,
  upload,
  deleteVideo,
  getUpload,
  postUpload,
} from "../controllers/videoController";
import {
  protectorMiddleware, videoUpload
} from "../middlewares";

const videoRouter = express.Router();

// upload가 :id보다 위에있어야지 인식됨
// :id가 위에있으면 /upload는 인식 못함
// 리퀘스트는 제일 위에있는것부터 순차적으로 확인함

// :id(//d+) id를 불러오는데 숫자만 받아옴 
// :id는 express에게 id라는 변수를 받아오라는 표시

// 지금 현재 받아오는 id는 24비트 16진수([0-9a-f]{24})
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo);
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(videoUpload.single("video"), postUpload);
export default videoRouter;