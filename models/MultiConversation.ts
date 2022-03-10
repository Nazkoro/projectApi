import mongoose, { Schema } from "mongoose";

const MultiConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("MultiConversation", MultiConversationSchema);
