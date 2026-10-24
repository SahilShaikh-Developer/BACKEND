const express = require("express");
const multer = require("multer");
const postController = require("../controllers/post.controller");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const postRouter = express.Router();

postRouter.post(
  "/",
  upload.single("image"),
  postController.createPostController,
);

postRouter.get("/", postController.getPostController);

postRouter.get("/details/:postId", postController.getPostDetailsController);

module.exports = postRouter;
