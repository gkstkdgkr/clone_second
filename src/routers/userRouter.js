import express from "express";
import { edit,remove,getLogin,see,logout } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/login", getLogin);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get(":id", see);

export default userRouter;
