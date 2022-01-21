import PostModel from "../models/Post";
import CommentModel from "../models/Comment";
import ApiError from "../exceptions/api-error";
import User from "../models/User";

class CommentService {
  async getAllCommentS() {
    const comments = await CommentModel.find();
    console.log(comments);
    console.log("comments in service", comments);
    return comments;
  }

  // create a coment

  async addComment(bodyOfComment) {
    const newComment = new CommentModel(bodyOfComment);
    const saveComment = await newComment.save();
    return saveComment;
  }
  // create text coment

  async addTextComment(bodyOfComment) {
    const newComment = new CommentModel(bodyOfComment);
    const saveComment = await newComment.save();
    return saveComment;
  }

  // update a post

  async updComment(id, bodyOfComment) {
    try {
      const comment = await CommentModel.findById(id);

      if (comment.userId === bodyOfComment.userId) {
        await comment.updateOne({ $set: bodyOfComment });

        return "the comment has been updated";
      }
    } catch {
      throw new ApiError(403, "check your data input");
    }

    // res.status(403).json("you can update only your post");
  }
  // delete a post

  async removeComment(_id, bodyOfComment) {
    const post = await CommentModel.findById(_id);
    if (post.userId === bodyOfComment.userId) {
      await post.deleteOne();
      return "the post has been deleted";
    }
    console.log("throw error");
    throw new ApiError(403, "you can delete only your post");

    // return res.status(403).json("you can delete only your post");
  }
  // like / dislike a post

  // async likePost (id, bodyOfComment) {
  //
  //     const post = await CommentModel.findById(id);
  //     if (!post.likes.includes(bodyOfComment.userId)) {
  //       await post.updateOne({ $push: { likes: bodyOfComment.userId } });
  //       return res.status(200).json("The post has been liked");
  //     } else {
  //       await post.updateOne({ $pull: { likes: bodyOfComment.userId } });
  //       return  res.status(200).json("The post has been disliked");
  //     }
  // };
  async likeComment(bodyOfComment) {
    console.log("=============bodyOfComment================", bodyOfComment);
    const post = await CommentModel.findById(bodyOfComment._id);
    // if (!post.likes.includes(bodyOfComment.userId)) {
    if (!post.likes.includes(bodyOfComment.currentId)) {
      console.log(1);
      await post.updateOne({ $push: { likes: bodyOfComment.currentId } });
      return post;
      // return res.status(200).json("The post has been liked");
    }
    console.log(2);
    await post.updateOne({ $pull: { likes: bodyOfComment.currentId } });
    // return  res.status(200).json("The post has been disliked");
    return post;
  }

  // get a post
  async printComment(id) {
    const post = await CommentModel.findById(id);
    return post;
  }

  //   router.get("/posts", async (req, res) => {
  //     try {
  //       const posts = await CommentModel.find()
  //       res.status(200).json(posts);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   });

  // get timeline posts
  async printCommentTimeline(userId) {
    const currentUser = await User.findById(userId);
    const userPosts = await CommentModel.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return CommentModel.find({ userId: friendId });
      })
    );
    return userPosts.concat(...friendPosts);
  }

  // get user's all posts
  async printCommentAll(username) {
    const user = await User.findOne({ username });
    const posts = await CommentModel.find({ userId: user._id });
    return posts;
  }

  // get user's all posts
  async printCommentForThisPost(id) {
    const comment = await CommentModel.find({ postId: id });
    return comment;
  }
}

export default new CommentService();
