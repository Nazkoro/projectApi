import mongoose, { Schema } from "mongoose";

const MultiConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("MultiConversation", MultiConversationSchema);
