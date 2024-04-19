
class PostUseCase {
    constructor(PostModel,UserModel){
        this.Post = PostModel;
        this.User = UserModel
    }
    async createPost(userId,{content,mediaUrls}){
        try{
            const user = await this.User.findById(userId);
            if(!user){
                throw new Error('User not found!');
            }

            const newPost = await this.Post.create({
                user: userId,
                content: content,
                mediaUrls: mediaUrls
            });
            
            const updateUser = await this.User.updateOne({ _id: userId }, { $push: { posts: newPost._id } });

            return {success:true,post:newPost ,message:'Your post has been successfully uploaded!'}
        }catch(err){
            throw new Error(err.message);
        }
    }

    async getAllPosts(){
        const posts = await this.Post.find({hide:false}).populate('user')
        return posts
    }

    async postAction(postId,action){
        if(action=='like'){
            await this.Post.findByIdAndUpdate(postId,{$inc:{likes:1}},{new:true});
            //console.log('liked')
            return {message:'liked'}
        }else if(action=='dislike'){
           
            await this.Post.findByIdAndUpdate(postId,{$inc:{likes:-1}},{new:true});
             //console.log('disliked');
            return {message:'disliked'}
        }
    }
}

export default PostUseCase