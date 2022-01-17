import postService from "../service/post-service";

class PostController {
  getPosts(req, res) {
    console.log("1111");
    return postService.getAllPosts();
  }

  createPost(req, res, next) {
    req.body.img = req.file.filename;

    return postService.addPost(req.body);
  }

  updatePost(req, res) {
    return postService.updPost(req.params.id, req.body);
  }

  deletePost(req, res) {
    return postService.removePost(req.params.id, req.body);
  }

  likedPost(req, res) {
    return postService.likePost(req.body);
  }

  getPost(req, res) {
    return postService.printPost(req.params.id);
  }

  getTimelinePosts(req, res) {
    return postService.printPostTimeline(req.params.userId);
  }

  getUserAllPosts(req, res) {
    return postService.printPostAll(req.params.username);
  }
}

export default new PostController();
