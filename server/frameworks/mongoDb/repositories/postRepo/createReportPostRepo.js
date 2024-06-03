import Post from "../../database/entities/Post.js";
import ReportedPost from "../../database/entities/ReportedPost.js";

const createReportPostRepo = async (postId,postBy,reportedBy,reason) =>{
    try{
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error('Post not found!');
        }

        const newReportedPost = await ReportedPost.create({
            post:postId,
            postBy,
            reportedBy,
            reason
        });

        await newReportedPost.save();

        return {success:true}

    }catch(err){
        throw new Error(err)
    }
}

export default createReportPostRepo