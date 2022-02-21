import PostModel from "../models/Post";
import User from "../models/User";
import ApiError from "../exceptions/api-error";
import CommentModel from "../models/Comment";

class PostService {
  async getAllPosts() {
    const posts = await PostModel.find();

    // const posts = await PostModel.aggregate([
    //   {
    //     $lookup: {
    //       from: CommentModel.collection.name,
    //       localField: "_id",
    //       foreignField: "postId",
    //       as: "commentsForPost",
    //     },
    //   },
    // ]);
    return posts;
  }

  async addPost(bodyOfPost) {
    console.log(bodyOfPost);
    const newPost = new PostModel(bodyOfPost);
    const savePost = await newPost.save();
    console.log("222", savePost);
    return savePost;
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
    // if (post.userId === bodyOfPost.userId) {
    //  const postDeleted =  await post.deleteOne();
    //
    //   return "the post has been deleted";
    // }
    console.log("------post-------",post)
    return post;
    // throw new ApiError(403, "you can delete only your post");
  }
  // like / dislike a post
  // async likePost (id, bodyOfPost) {
  //
  //     const post = await PostModel.findById(id);
  //     if (!post.likes.includes(bodyOfPost.userId)) {
  //       await post.updateOne({ $push: { likes: bodyOfPost.userId } });
  //       return res.status(200).json("The post has been liked");
  //     } else {
  //       await post.updateOne({ $pull: { likes: bodyOfPost.userId } });
  //       return  res.status(200).json("The post has been disliked");
  //     }
  // };
  async likePost(bodyOfPost) {
    // eslint-disable-next-line no-param-reassign
    bodyOfPost.likes.count = bodyOfPost.likes.isLiked
      ? bodyOfPost.likes.count + 1
      : bodyOfPost.likes.count - 1;

    await PostModel.findByIdAndUpdate(bodyOfPost._id, bodyOfPost);
    const updpatedPost = await PostModel.findById(bodyOfPost._id);
    return updpatedPost;
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
