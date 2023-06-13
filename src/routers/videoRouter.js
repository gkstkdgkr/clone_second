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

const videoRouter = express.Router();

// upload가 :id보다 위에있어야지 인식됨
// :id가 위에있으면 /upload는 인식 못함
// 리퀘스트는 제일 위에있는것부터 순차적으로 확인함

// :id(//d+) id를 불러오는데 숫자만 받아옴 
// :id는 express에게 id라는 변수를 받아오라는 표시
videoRouter.get("/:id(\\d+)",watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload)
export default videoRouter;
