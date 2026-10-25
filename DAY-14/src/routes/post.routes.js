const express = require("express");
const multer = require("multer");
const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const postRouter = express.Router();

postRouter.post(
  "/",
  upload.single("image"),identifyUser,
  postController.createPostController,
);

postRouter.get("/",identifyUser, postController.getPostController);

postRouter.get("/details/:postId",identifyUser, postController.getPostDetailsController);

module.exports = postRouter;
