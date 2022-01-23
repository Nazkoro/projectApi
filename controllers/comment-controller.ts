import commentService from "../service/comment-service";
import postService from "../service/post-service";
// const ApiError = require('../exceptions/api-error');

class CommentController {
  getComments(req, res) {
    return commentService.getAllCommentS();
  }

  createComment(req, res) {
    req.body.img = req.file.filename;
    req.body.username = req.user.username;
    return commentService.addComment(req.body);
  }

  createTextComment(req, res) {
    req.body.userId = req.user.id;
    req.body.username = req.user.username;
    console.log(req.body);
    return commentService.addTextComment(req.body);
  }

  updateComment(req, res) {
    return commentService.updComment(req.params.id, req.body);
  }

  // delete a post
  deleteComment(req, res) {
    return commentService.removeComment(req.params.id, req.body);
  }

  // like / dislike a post
  likedComment(req, res) {
    return commentService.likeComment(req.body);
  }

  // get a post
  getComment(req, res) {
    return commentService.printComment(req.params.id);
  }

  // get timeline posts
  getTimelineComment(req, res) {
    return commentService.printCommentTimeline(req.params.userId);
  }

  // get user's all posts
  getUserAllComment(req, res) {
    return commentService.printCommentAll(req.params.username);
  }

  geAllCommentForPost(req, res) {
    return commentService.printCommentForThisPost(req.params.id);
  }
}

export default new CommentController();
