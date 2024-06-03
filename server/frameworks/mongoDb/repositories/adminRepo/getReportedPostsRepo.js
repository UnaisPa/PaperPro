import ReportedPost from "../../database/entities/ReportedPost.js"

const getReportedPostsRepo = async (limit) => {
    try {

        const reportedPosts = await ReportedPost.find().sort({ createdAt: -1 }).limit(limit).populate('postBy').populate('reportedBy').populate([
            {
                path: 'post',
                populate: {
                    path: 'user',
                    model: 'User'
                }
            },
            {
                path: 'post',
                populate: [{
                    path: 'comments',
                    model: 'Comment',
                    populate: {
                        path: 'user',
                        model: 'User'
                    }
                },{
                    path: 'likes',
                    model: 'User',
                }]
            },
        ]);

        return reportedPosts;
    } catch (err) {
        throw new Error(err)
    }
}

export default getReportedPostsRepo