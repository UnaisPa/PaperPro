import PostUseCase from "../../useCases/postUseCase.js";
import Post from "../../entities/Post.js";
import User from "../../entities/User.js";
//instance for PostUseCase
const postUseCase = new PostUseCase(Post,User)

class PostController {
    async createPost(req,res) {
        try{
            const {id} = req.params;
            const post = await postUseCase.createPost(id,req.body);
            res.status(201).json(post);
        }catch(err){
            res.status(500).json({ message: err.message });
        }
    }

    //@desk      Getting all posts
    //route      GET api/post/get_all_posts
    //@access    Private
    async getAllPosts(req,res){
        try{
            const posts = await postUseCase.getAllPosts();
            res.status(201).json({success:true,posts:posts});
        }catch(err){
            res.status(500).json({ message: err.message });
        }
    }
}

export default PostController