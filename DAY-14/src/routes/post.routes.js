const express = require("express");
const multer = require("multer");
const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/auth.middleware");
const { sendFriendRequestController, getReceivedRequestsController, acceptFriendRequestController, rejectFriendRequestController, getFriendsController } = require("../controllers/friendRequest.controller");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const postRouter = express.Router();

/**
 * @route POST /api/posts [protected]
 * @description Create a post with the content and image (optional) provided in the request body. The post should be associated with the user that the request come from
 */

postRouter.post(
  "/",
  upload.single("image"),identifyUser,
  postController.createPostController,
);

/**
 * @route GET /api/posts/ [protected]
 * @description Get all the posts created by the user that the request come from. also return the total number of posts created by the user
 */

postRouter.get("/",identifyUser, postController.getPostController);

/**
 * @route GET /api/posts/details/:postid
 * @description return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */

postRouter.get("/details/:postId",identifyUser, postController.getPostDetailsController);

/**
 * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in the request params. 
 */

postRouter.post("/like/:postId",identifyUser,postController.likePostController)

/* 
POST /api/posts/friends/request/:userId
*/

postRouter.post("/friends/request/:userId",identifyUser,sendFriendRequestController);

/* 
GET /api/posts/friends/requests
 */

postRouter.get("/friends/requests",identifyUser,getReceivedRequestsController);

/* 
PATCH /api/posts/friends/requests/:requestId/accept
*/
 
postRouter.patch("/friends/requests/:requestId/accept",identifyUser,acceptFriendRequestController
);

/* 
PATCH /api/posts/friends/requests/:requestId/reject
*/
postRouter.patch("/friends/requests/:requestId/reject", identifyUser,rejectFriendRequestController);

/* 
GET /api/posts/friends
*/

postRouter.get( "/friends", identifyUser, getFriendsController);

module.exports = postRouter;
