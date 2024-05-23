import {
    authUserRepo,
    createUserRepo,
    getUserByIdRepo,
    googleAuthRepo,
    sentOtpRepo,
    updateFollowListRepo,
    verifyOTPRepo,
    editProfileRepo,
    checkUsernameRepo,
    checkCPasswordRepo,
    updatePasswordRepo,
    addWatchlistRepo
}
    from "./userRepo/index.js"

import {createCommentRepo,createPostRepo,getAllPostsRepo,postActionRepo,deletePostRepo,savePostRepo,getSavedPostsRepo} from "./postRepo/index.js"
import {authAdminRepo,getAllUsersRepo,blockUserRepo} from "./adminRepo/index.js"

import {createTradeRepo,getPositionsRepo,updatePositionRepo,getTotalProfitRepo,getPastTradesRepo} from "./portfolioRepo/index.js"
export {
    authUserRepo,
    createUserRepo,
    getUserByIdRepo,
    googleAuthRepo, sentOtpRepo,
    updateFollowListRepo,
    verifyOTPRepo,
    editProfileRepo,
    checkUsernameRepo,
    checkCPasswordRepo,
    updatePasswordRepo,
    addWatchlistRepo,

    createCommentRepo,
    createPostRepo,
    getAllPostsRepo,
    postActionRepo,
    deletePostRepo,
    savePostRepo,
    getSavedPostsRepo,
    
    //admin
    authAdminRepo,
    getAllUsersRepo,
    blockUserRepo,

    //portfolio
    createTradeRepo,
    getPositionsRepo,
    updatePositionRepo,
    getTotalProfitRepo,
    getPastTradesRepo
    
}