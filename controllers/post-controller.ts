import postService from "../service/post-service";
import ApiError from "../exceptions/api-error";
import PostModel from "../models/Post";

class PostController {
  async getPosts(req, res, next) {
    try {
      const posts = await postService.getAllPosts();
      return res.json(posts);
    } catch (e) {
      next(e);
    }
  }

  async createPost(req, res, next) {
    req.body.img = req.file.filename;
    console.log(req.body);
    try {
      const savedPost = await postService.addPost(req.body);
      return res.status(200).json(savedPost);
    } catch (e) {
      // res.status(500).json(err);
      next(e);
    }
  }
  // update a post

  async updatePost(req, res, next) {
    try {
      const resultUpdPost = await postService.updPost(req.params.id, req.body);
      return res.status(200).json(resultUpdPost);
    } catch (e) {
      next(e);
      //   res.status(500).json(err);
    }
  }
  // delete a post

  async deletePost(req, res, next) {
    try {
      const resultDeltePost = await postService.removePost(
        req.params.id,
        req.body
      );
      return res.status(200).json(resultDeltePost);
    } catch (e) {
      next(e);
      //   res.status(500).json(err);
    }
  }
  // like / dislike a post

  async likedPost(req, res, next) {
    try {
      // const resultLikedPost = await postService.likePost(req.params.id, req.body)
      const resultLikedPost = await postService.likePost(req.body);
      // return  resultLikedPost
      return res.status(200).json(resultLikedPost);
    } catch (e) {
      next(e);
      // res.status(500).json(err);
    }
  }
  // get a post

  async getPost(req, res, next) {
    try {
      const post = await postService.printPost(req.params.id);
      return res.status(200).json(post);
    } catch (e) {
      next(e);
      // res.status(500).json(err);
    }
  }

  //   router.get("/posts", async (req, res)  {
  //     try {
  //       const posts = await Post.find()
  //       res.status(200).json(posts);
  //     } catch (err) {
  //       res.status(500).json(err);
  //     }
  //   });

  // get timeline posts

  async getTimelinePosts(req, res, next) {
    try {
      const posts = await postService.printPostTimeline(req.params.userId);
      return res.status(200).json(posts);
    } catch (e) {
      next(e);
      //   res.status(500).json(err);
    }
  }

  // get user's all posts

  async getUserAllPosts(req, res, next) {
    try {
      const allPosts = await postService.printPostAll(req.params.username);
      return res.status(200).json(allPosts);
    } catch (e) {
      next(e);
      //   res.status(500).json(err);
    }
  }
}

export default new PostController();
