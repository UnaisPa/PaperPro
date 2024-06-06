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
import { authAdminUseCase,getAllUsersUseCase,blockUserUseCase,getPostsUseCase,hidePostUseCase,deletePostByAdminUseCase,getReportedPostsUseCase,getUserPortfolioUseCase,getAdminsUseCase,createAdminUseCase,getDashboardDetailsUseCase } from "./adminUseCases/index.js"
import {createTradeUseCase, getPositionsUseCase,updatePositionUseCase,getTotalProfitUseCase,getPastTradesUseCase} from "./portfolioUseCase/index.js"
import {getChatHistoryUseCase,saveMessageUseCase,createChatUseCase,getChatsUseCase,countUnreadUseCase,markAsReadUseCase} from "./chatUseCases/index.js"
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
    getUserPortfolioUseCase,
    getAdminsUseCase,
    createAdminUseCase,
    getDashboardDetailsUseCase,

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
    getChatsUseCase,
    countUnreadUseCase,
    markAsReadUseCase
}