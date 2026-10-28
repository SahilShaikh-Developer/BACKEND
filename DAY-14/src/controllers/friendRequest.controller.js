const mongoose = require("mongoose");
const friendRequestModel = require("../models/friendRequest.model");
const userModel = require("../models/user.model");

async function sendFriendRequestController(req, res) {
 const senderId = req.user.id;
  const receiverId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(receiverId)) {
  return res.status(400).json({
    message: "Invalid receiver ID",
  });
}

  console.log("req.user:", req.user);
console.log("senderId:", senderId);
console.log("receiverId:", receiverId);

  // Check whether receiver exists
  const receiver = await userModel.findById(receiverId);

  if (!receiver) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Prevent sending request to yourself
if (senderId.toString() === receiverId.toString()) {
  return res.status(400).json({
    message: "You cannot send a friend request to yourself",
  });
}
  const existingRequest = await friendRequestModel.findOne({
  $or: [
    {
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    },
    {
      sender: receiverId,
      receiver: senderId,
      status: "pending",
    },
  ],
});

if (existingRequest) {
  return res.status(409).json({
    message: "Friend request already sent",
  });
}
const existingFriendship = await friendRequestModel.findOne({
  $or: [
    {
      sender: senderId,
      receiver: receiverId,
      status: "accepted",
    },
    {
      sender: receiverId,
      receiver: senderId,
      status: "accepted",
    },
  ],
});

if (existingFriendship) {
  return res.status(409).json({
    message: "You are already friends",
  });
}

  // Create friend request
  const friendRequest = await friendRequestModel.create({
    sender: senderId,
    receiver: receiverId,
  });

  return res.status(201).json({
    message: "Friend request sent successfully",
    friendRequest,
  });
}


async function getReceivedRequestsController(req, res) {
  const receiverId = req.user.id;

  const requests = await friendRequestModel.find({
      receiver: receiverId,
      status: "pending",
    })
    .populate("sender", "username");

  res.status(200).json({
    message: "Received friend requests fetched successfully",
    requests,
  });
}


async function acceptFriendRequestController(req, res) {
  const receiverId = req.user.id;
  const requestId = req.params.requestId;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
  return res.status(400).json({
    message: "Invalid friend request ID",
  });
}

  const friendRequest = await friendRequestModel.findOne({
    _id: requestId,
    receiver: receiverId,
    status: "pending",
  });

  if (!friendRequest) {
    return res.status(404).json({
      message: "Pending friend request not found",
    });
  }

  friendRequest.status = "accepted";

  await friendRequest.save();

  return res.status(200).json({
    message: "Friend request accepted successfully",
    friendRequest,
  });
}

async function rejectFriendRequestController(req, res) {
  const receiverId = req.user.id;
  const requestId = req.params.requestId;

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
  return res.status(400).json({
    message: "Invalid friend request ID",
  });
}

  const friendRequest = await friendRequestModel.findOne({
    _id: requestId,
    receiver: receiverId,
    status: "pending",
  });

  if (!friendRequest) {
    return res.status(404).json({
      message: "Pending friend request not found",
    });
  }

  friendRequest.status = "rejected";

  await friendRequest.save();

  return res.status(200).json({
    message: "Friend request rejected successfully",
    friendRequest,
  });
}



async function getFriendsController(req, res) {
  const userId = req.user.id;

  const friendRequests = await friendRequestModel
    .find({
      $or: [
        { sender: userId, status: "accepted" },
        { receiver: userId, status: "accepted" },
      ],
    })
    .populate("sender", "username")
    .populate("receiver", "username");

  const friends = friendRequests.map((request) => {
    if (request.sender._id.toString() === userId) {
      return request.receiver;
    }

    return request.sender;
  });

  return res.status(200).json({
    message: "Friends fetched successfully",
    friends,
  });
}









module.exports = {
  sendFriendRequestController,
  getReceivedRequestsController,
  acceptFriendRequestController,
  rejectFriendRequestController,
  getFriendsController
};