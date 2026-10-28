
const mongoose = require("mongoose");

const friendRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Sender ID is required"],
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Receiver ID is required"],
    },

    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "accepted", "rejected"],
        message: "Invalid friend request status",
      },
    },
  },
  {
    timestamps: true,
  }
);




friendRequestSchema.index(
  { sender: 1, receiver: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: "pending",
    },
  }
);



const friendRequestModel = mongoose.model(
  "friendRequests",
  friendRequestSchema
);


module.exports = friendRequestModel;

