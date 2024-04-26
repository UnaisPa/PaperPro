import PostUseCase from "../../useCases/postUseCase.js";
import Post from "../../entities/Post.js";
import User from "../../entities/User.js";
import Comment from "../../entities/Comment.js";
//instance for PostUseCase
const postUseCase = new PostUseCase(Post,User,Comment)

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
            const page = parseInt(req.query.page) || 1;
            const limits = 3
            const limit = page * limits
            const posts = await postUseCase.getAllPosts(limit);
            const count = await Post.countDocuments({hide:false})
            res.status(200).json({success:true,posts:posts,count});
        }catch(err){
            res.status(500).json({ message: err.message });
        }  
    }

    //@desk      Like/dislike a post
    //route      PUT api/post/post_action/:id
    //@access    Private
    async postAction(req,res){
        try{
            const id = req.params.id;
            const {action} = req.body
            //console.log(id,action);
            const postAction = await postUseCase.postAction(id,action);
            res.status(200).json(postAction)
        }catch(err){
            res.status(500).json({ message: err.message });
        }
    }

    //@desk      To add a comment
    //route      POST api/post/add_comment
    //@access    Private
    async createComment(req,res){
        try{
            const updatedPost = await postUseCase.createComment(req.body);
            if(updatedPost){
                res.status(201).json({success:true,post:updatedPost,message:'Your comment has been added successfully!'})
            }
        }catch(err){
            res.status(500).json({ message: err.message });
        }
    }
}

export default PostController