import mongoose, { Schema } from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
