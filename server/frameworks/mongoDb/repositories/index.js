import {
    authUserRepo,
    createUserRepo,
    getUserByIdRepo,
    googleAuthRepo,
    sendOtpRepo,
    updateFollowListRepo,
    verifyOTPRepo
}
    from "./userRepo/index.js"

import {createCommentRepo,createPostRepo,getAllPostsRepo,postActionRepo} from "./postRepo/index.js"

export {
    authUserRepo,
    createUserRepo,
    getUserByIdRepo,
    googleAuthRepo, sendOtpRepo,
    updateFollowListRepo,
    verifyOTPRepo,

    createCommentRepo,
    createPostRepo,
    getAllPostsRepo,
    postActionRepo
}