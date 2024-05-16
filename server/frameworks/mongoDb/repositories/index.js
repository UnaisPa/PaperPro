import {
    authUserRepo,
    createUserRepo,
    getUserByIdRepo,
    googleAuthRepo,
    sentOtpRepo,
    updateFollowListRepo,
    verifyOTPRepo,
    editProfileRepo,
    checkUsernameRepo
}
    from "./userRepo/index.js"

import {createCommentRepo,createPostRepo,getAllPostsRepo,postActionRepo,deletePostRepo,savePostRepo,getSavedPostsRepo} from "./postRepo/index.js"
import {authAdminRepo} from "./adminRepo/index.js"

import {createTradeRepo,getPositionsRepo,updatePositionRepo} from "./portfolioRepo/index.js"
export {
    authUserRepo,
    createUserRepo,
    getUserByIdRepo,
    googleAuthRepo, sentOtpRepo,
    updateFollowListRepo,
    verifyOTPRepo,
    editProfileRepo,
    checkUsernameRepo,

    createCommentRepo,
    createPostRepo,
    getAllPostsRepo,
    postActionRepo,
    deletePostRepo,
    savePostRepo,
    getSavedPostsRepo,
    
    //admin
    authAdminRepo,

    //portfolio
    createTradeRepo,
    getPositionsRepo,
    updatePositionRepo
}