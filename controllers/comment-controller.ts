import commentService from "../service/comment-service";

class CommentController {
  getComments(req, res) {
    return commentService.getAllCommentS();
  }

  createComment(req, res) {
    req.body.img = req.file.filename;
    return commentService.addComment(req.body);
  }

  createTextComment(req, res) {
    req.body.userId = req.user.id;
    req.body.comment.userId = req.user.id;
    return commentService.addTextComment(req.body);
  }

  updateComment(req, res) {
    return commentService.updComment(req.params.id, req.body);
  }

  deleteComment(req, res) {
    return commentService.removeComment(req.params.id, req.body);
  }

  likedComment(req, res) {
    return commentService.likeComment(req.body);
  }

  getComment(req, res) {
    return commentService.printComment(req.params.id);
  }

  getTimelineComment(req, res) {
    return commentService.printCommentTimeline(req.params.userId);
  }

  getUserAllComment(req, res) {
    return commentService.printCommentAll(req.params.username);
  }

  geAllCommentForPost(req, res) {
    return commentService.printCommentForThisPost(req.params.id);
  }
}

export default new CommentController();
