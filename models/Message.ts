// import mongoose, { Schema } from "mongoose";
//
// const MessageSchema = new mongoose.Schema(
//   {
//     conversationId: {
//       type: String,
//     },
//
//     sender: {
//       type: String,
//     },
//     text: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );
// export default mongoose.model("Message", MessageSchema);
import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    conversationId: { type: String },
    text: { type: String },
  },
  { timestamps: true }
);

export default model("Message", MessageSchema);
