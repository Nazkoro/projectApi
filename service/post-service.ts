import mongoose from "mongoose";
import PostModel from "../models/Post";
import User from "../models/User";
import ApiError from "../exceptions/api-error";
import CommentModel from "../models/Comment";

class PostService {
  async getAllPosts() {
    const result = await PostModel.find()
      .populate("userId")
      .sort({ createdAt: -1 });
    return result;
    // const aggregatePosts = await PostModel.aggregate([
    //   {
    //     $lookup: {
    //       from: User.collection.name,
    //       localField: "username",
    //       foreignField: "username",
    //       as: "avtorPost",
    //     },
    //   },
    //   { $sort: { createdAt: -1 } },
    // ]);
    // return aggregatePosts;
  }

  async addPost(bodyOfPost) {
    console.log("bodyOfPost", bodyOfPost);
    const newPost = new PostModel(bodyOfPost);
    const savePost = await newPost.save();

    const aggregatePosts = await PostModel.aggregate([
      { $match: { _id: savePost._id } },
      {
        $lookup: {
          from: User.collection.name,
          localField: "username",
          foreignField: "username",
          as: "avtorPost",
        },
      },
    ]);
    console.log("aggregatePosts", aggregatePosts);
    return aggregatePosts;
  }

  async updPost(id, bodyOfPost) {
    try {
      const post = await PostModel.findById(id);

      if (post.userId === bodyOfPost.userId) {
        await post.updateOne({ $set: bodyOfPost });

        return "the post has been updated";
      }
    } catch {
      throw new ApiError(403, "check your data input");
    }
  }

  // delete a post
  async removePost(id) {
    const post = await PostModel.findByIdAndDelete(id);
    return post;
    // throw new ApiError(403, "you can delete only your post");
  }

  async likePost(bodyOfPost) {
    // eslint-disable-next-line no-param-reassign
    bodyOfPost.likes.count = bodyOfPost.likes.isLiked
      ? bodyOfPost.likes.count + 1
      : bodyOfPost.likes.count - 1;
    const post = await PostModel.findByIdAndUpdate(bodyOfPost._id, bodyOfPost);

    const updpatedPost = await PostModel.findById(bodyOfPost._id);
    const objectId = new mongoose.Types.ObjectId(bodyOfPost._id);

    const aggregatePosts = await PostModel.aggregate([
      { $match: { _id: objectId } },
      {
        $lookup: {
          from: User.collection.name,
          localField: "username",
          foreignField: "username",
          as: "avtorPost",
        },
      },
    ]);
    return aggregatePosts;
    // return updpatedPost;
  }

  async printPost(id) {
    const myPost = await PostModel.find({ userId: id });
    return myPost;
  }

  async printPostTimeline(userId) {
    const currentUser = await User.findById(userId);
    const userPosts = await PostModel.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return PostModel.find({ userId: friendId });
      })
    );
    return userPosts.concat(...friendPosts);
  }

  // get user's all posts
  async printPostAll(username) {
    const user = await User.findOne({ username });
    const posts = await PostModel.find({ userId: user._id });
    return posts;
  }
}

export default new PostService();
