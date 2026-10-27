const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const userController = require("../controllers/user.controller")



const userRouter = express.Router()


//@route POST /api/users/follow/:userid
//@description Follow a user
//@access private

userRouter.post("/follow/:username",identifyUser,userController.followUserController)


//@route POST /api/users/unfollow/:userid
//@description Unfollow a user
//@access private

userRouter.post("/unfollow/:username",identifyUser,userController.unFollowUserController)




module.exports = userRouter