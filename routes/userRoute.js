import express from "express";
import {
  signUp,
  login,
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  searchUsersByName,
} from "../controllers/userController.js";

import {
  restrictTo,
  retriveIdAfterTokenAuth,
  tokenAuth,
} from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/signup").post(signUp);

// Make <auth.tokenAuth> a Middleware for all routes down below
userRouter.use(tokenAuth);
userRouter.get("/account", retriveIdAfterTokenAuth, getUser);

// Make <auth.restrictTo("admin")> a Middleware for all routes down below
userRouter.use(restrictTo("admin"));
userRouter.route("/search").get(searchUsersByName);
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default userRouter;
