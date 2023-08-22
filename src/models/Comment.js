import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: "string", required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // reference:"User" model User에서 objectID가 온다는 것을 알려줌
  video: { type: mongoose.Schema.Types.ObjectId, ref: "Video", required: true },
  createAt: { type: Date, default: Date.now, required: true },
});


const Comment = mongoose.model("Comment", commentSchema);

export default Comment;