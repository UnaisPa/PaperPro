import {
    authUserUseCase,
    createUserUseCase,
    getUserByIdUseCase,
    googleAuthUseCase,
    sentOtpUseCase,
    updateFollowListUseCase,
    verifyOtpUseCase,
    editProfileUseCase,
    checkUsernameUseCase,
    checkCPasswordUseCase,
    updatePasswordUseCase,
    addWatchlistUseCase,
    getWatchlistUseCase,
    deleteWatchlistUseCase
} from "./userUseCases/index.js"

import {createCommentUseCase,createPostUseCase,getAllPostsUseCase,postActionUseCase,deletePostUseCase,savePostUseCase,getSavedPostsUseCase,getLikedUsersUseCase,createReportPostUseCase} from "./postUseCases/index.js"
import { authAdminUseCase,getAllUsersUseCase,blockUserUseCase,getPostsUseCase,hidePostUseCase,deletePostByAdminUseCase,getReportedPostsUseCase } from "./adminUseCases/index.js"
import {createTradeUseCase, getPositionsUseCase,updatePositionUseCase,getTotalProfitUseCase,getPastTradesUseCase} from "./portfolioUseCase/index.js"
import {getChatHistoryUseCase,saveMessageUseCase,createChatUseCase,getChatsUseCase} from "./chatUseCases/index.js"
export {
    //user
    authUserUseCase,
    createUserUseCase,
    getUserByIdUseCase,
    googleAuthUseCase,
    sentOtpUseCase,
    updateFollowListUseCase,
    verifyOtpUseCase,
    editProfileUseCase,
    checkUsernameUseCase,
    checkCPasswordUseCase,
    updatePasswordUseCase,
    addWatchlistUseCase,
    getWatchlistUseCase,
    deleteWatchlistUseCase,
    
    //post
    createCommentUseCase,
    createPostUseCase,
    getAllPostsUseCase,
    postActionUseCase,
    deletePostUseCase,
    savePostUseCase,
    getSavedPostsUseCase,
    getLikedUsersUseCase,
    createReportPostUseCase,

    //admin
    authAdminUseCase,
    getAllUsersUseCase,
    blockUserUseCase,
    getPostsUseCase,
    hidePostUseCase,
    deletePostByAdminUseCase,
    getReportedPostsUseCase,

    //portfolio
    createTradeUseCase,
    getPositionsUseCase,
    updatePositionUseCase,
    getTotalProfitUseCase,
    getPastTradesUseCase, 

    //chat
    getChatHistoryUseCase,
    saveMessageUseCase,
    createChatUseCase,
    getChatsUseCase
}