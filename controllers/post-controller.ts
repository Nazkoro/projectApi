import postService from "../service/post-service";

class PostController {
  getPosts(req, res) {
    return postService.getAllPosts();
  }

  createPost(req, res) {
    req.body.img = req.file.filename;
    req.body.userId = req.user.id;
    req.body.username = req.user.username;
    return postService.addPost(req.body);
  }

  updatePost(req, res) {
    return postService.updPost(req.params.id, req.body);
  }

  deletePost(req, res) {
    console.log(req.params.id)
    return postService.removePost(req.params.id);
  }

  likedPost(req, res) {
    return postService.likePost(req.body);
  }

  getCurrentuserPosts(req, res) {
    return postService.printPost(req.user.id);
  }

  getTimelinePosts(req, res) {
    return postService.printPostTimeline(req.params.userId);
  }

  getUserAllPosts(req, res) {
    return postService.printPostAll(req.params.username);
  }
}

export default new PostController();
