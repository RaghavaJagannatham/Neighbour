import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false, // Mark as required if all threads must have a title
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  image: {
    type: String, // Stores the uploaded image URL
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  likesCount: {
    type: Number,
    default: 0, // Initialize likesCount to 0
  },
  userHasLiked: {
    type: Boolean,
    default: false, // Initialize as false. Can be updated when the user likes/unlikes the thread
  },
});

const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);

export default Thread;
