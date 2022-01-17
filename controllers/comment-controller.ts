import commentService from "../service/comment-service";
import postService from "../service/post-service";
// const ApiError = require('../exceptions/api-error');

class CommentController {
  getComments(req, res) {
    console.log("1111111111111111111111");
    return commentService.getAllCommentS();
  }

  createComment(req, res) {
    req.body.img = req.file.filename;
    console.log(req.body);
    return commentService.addComment(req.body);
  }

  updatePost(req, res) {
    return postService.updPost(req.params.id, req.body);
  }

  // delete a post
  deletePost(req, res) {
    return postService.removePost(req.params.id, req.body);
  }

  // like / dislike a post
  likedPost(req, res) {
    return postService.likePost(req.body);
  }

  // get a post
  getPost(req, res) {
    return postService.printPost(req.params.id);
  }

  // get timeline posts
  getTimelinePosts(req, res) {
    return postService.printPostTimeline(req.params.userId);
  }

  // get user's all posts
  getUserAllPosts(req, res) {
    return postService.printPostAll(req.params.username);
  }
}

export default new CommentController();
