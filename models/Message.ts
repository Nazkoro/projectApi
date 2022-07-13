
import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    conversationId: { type: Schema.Types.ObjectId },
    text: { type: String },
  },
  { timestamps: true }
);

export default model("Message", MessageSchema);
