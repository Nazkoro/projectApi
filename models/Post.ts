import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // type: String,
      // required: true,
    },
    username: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      isLiked: {
        type: Boolean,
        default: false,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    coments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
