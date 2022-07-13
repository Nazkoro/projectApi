import PostModel from "../models/Post";
import CommentModel from "../models/Comment";
import ApiError from "../exceptions/api-error";
import User from "../models/User";

class CommentService {
  async getAllCommentS() {
    const comments = await CommentModel.find().populate("userId");
    return comments;
  }

  async addComment(bodyOfComment) {
    const newComment = new CommentModel(bodyOfComment);
    const saveComment = await newComment.save();
    return saveComment;
  }

  async addTextComment(bodyOfComment) {
    const newComment = new CommentModel(bodyOfComment.comment);
    const saveComment = await newComment.save();
    bodyOfComment.post.coments.push(saveComment);
    await PostModel.findByIdAndUpdate(
      bodyOfComment.post._id,
      bodyOfComment.post
    );

    const updpatedPost = await PostModel.findById(
      bodyOfComment.post._id
    ).populate("userId");
    return updpatedPost;
  }

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

  }

  async removeComment(_id, bodyOfComment) {
    const post = await CommentModel.findById(_id);
    if (post.userId === bodyOfComment.userId) {
      await post.deleteOne();
      return "the post has been deleted";
    }
    throw new ApiError(403, "you can delete only your post");
  }

  async likeComment(bodyOfComment) {
    const post = await CommentModel.findById(bodyOfComment._id);
    if (!post.likes.includes(bodyOfComment.currentId)) {
      await post.updateOne({ $push: { likes: bodyOfComment.currentId } });
      return post;
    }
    await post.updateOne({ $pull: { likes: bodyOfComment.currentId } });
    return post;
  }

  async printComment(id) {
    const post = await CommentModel.findById(id).populate("userId");
    return post;
  }

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

  async printCommentAll(username) {
    const user = await User.findOne({ username });
    const posts = await CommentModel.find({ userId: user._id }).populate(
      "userId"
    );
    return posts;
  }

  async printCommentForThisPost(id) {
    const comment = await CommentModel.find({ postId: id }).populate("userId");
    return comment;
  }
}

export default new CommentService();
