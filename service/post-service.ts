import PostModel from "../models/Post";
import User from "../models/User";
import ApiError from "../exceptions/api-error";

class PostService {
  // !!!IMPORTANT!!! ADD FUNCTION FOR DONT REPEAT REQUEST TO THE MONGODB (use ZAMYKANIYe)
  // async findData(func) {
  // ...
  //   return await func;
  // ...
  // }

  async getAllPosts() {
    const posts = await PostModel.find();
    return posts;
  }

  // create a post

  async addPost(bodyOfPost) {
    const newPost = new PostModel(bodyOfPost);
    const savePost = await newPost.save();
    return savePost;
  }
  // update a post

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

    // res.status(403).json("you can update only your post");
  }
  // delete a post

  async removePost(_id, bodyOfPost) {
    const post = await PostModel.findById(_id);
    if (post.userId === bodyOfPost.userId) {
      await post.deleteOne();
      return "the post has been deleted";
    }
    console.log("throw error");
    throw new ApiError(403, "you can delete only your post");

    // return res.status(403).json("you can delete only your post");
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
    console.log("=============bodyOfPost================", bodyOfPost);
    const post = await PostModel.findById(bodyOfPost._id);
    // if (!post.likes.includes(bodyOfPost.userId)) {
    if (!post.likes.includes(bodyOfPost.currentId)) {
      console.log(1);
      await post.updateOne({ $push: { likes: bodyOfPost.currentId } });
      return post;
      // return res.status(200).json("The post has been liked");
    }
    console.log(2);
    await post.updateOne({ $pull: { likes: bodyOfPost.currentId } });
    // return  res.status(200).json("The post has been disliked");
    return post;
  }

  // get a post
  async printPost(id) {
    const post = await PostModel.findById(id);
    return post;
  }

  //   router.get("/posts", async (req, res) => {
  //     try {
  //       const posts = await PostModel.find()
  //       res.status(200).json(posts);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   });

  // get timeline posts
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
