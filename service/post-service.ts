import PostModel from "../models/Post";
import User from "../models/User";
import ApiError from "../exceptions/api-error";
import CommentModel from "../models/Comment";

class PostService {
  async getAllPosts() {
    // ПЕРЕДАВАТЬ ОБЬЕКТ НА ФРОНТ В КОТОРМ К КАЖДОМУ ПОСТУ БУДЕТ ДОЮАВЛЕНА АВТАРКА АВТОРА ПОСТА
    const posts = await PostModel.find();
    const users = await User.find();
    posts.forEach((post) => {
      users.forEach((user) => {
        // eslint-disable-next-line
        let newpost = { ...post };
        // eslint-disable-next-line eqeqeq
        if (post.userId == user._id) {
          // eslint-disable-next-line no-param-reassign
          console.log("user", user);
          // eslint-disable-next-line no-param-reassign
          newpost.picture = user.coverPicture;
          console.log("post", newpost);
        }
      });
    });

    // const aggregatePosts = await PostModel.aggregate([
    //   {
    //     $lookup: {
    //       from: User.collection.name,
    //       localField: "userId",
    //       foreignField: "_id",
    //       as: "avtorPost",
    //     },
    //   },
    // ]);
    return posts;
  }

  async addPost(bodyOfPost) {
    const newPost = new PostModel(bodyOfPost);
    const savePost = await newPost.save();
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
