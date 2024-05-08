import {
    authUserRepo,
    createUserRepo,
    getUserByIdRepo,
    googleAuthRepo,
    sentOtpRepo,
    updateFollowListRepo,
    verifyOTPRepo
}
    from "./userRepo/index.js"

import {createCommentRepo,createPostRepo,getAllPostsRepo,postActionRepo,deletePostRepo,savePostRepo,getSavedPostsRepo} from "./postRepo/index.js"

export {
    authUserRepo,
    createUserRepo,
    getUserByIdRepo,
    googleAuthRepo, sentOtpRepo,
    updateFollowListRepo,
    verifyOTPRepo,

    createCommentRepo,
    createPostRepo,
    getAllPostsRepo,
    postActionRepo,
    deletePostRepo,
    savePostRepo,
    getSavedPostsRepo
    
    
}