//import usecases and repos

import {
    authUserRepo,
    createUserRepo,
    getUserByIdRepo,
    googleAuthRepo,
    sentOtpRepo,
    updateFollowListRepo,
    verifyOTPRepo,
    checkUsernameRepo,
    

    createCommentRepo,
    createPostRepo,
    getAllPostsRepo,
    postActionRepo,
    deletePostRepo,
    savePostRepo,
    getSavedPostsRepo,
    editProfileRepo,
    authAdminRepo,
    createTradeRepo,
    getPositionsRepo,
    updatePositionRepo,
    getTotalProfitRepo,
    getPastTradesRepo,
    getAllUsersRepo,
    blockUserRepo,
    checkCPasswordRepo,
    updatePasswordRepo,
    addWatchlistRepo,
    deleteWatchlistRepo,
    getChatHistoryRepo,
    saveMessageRepo,
    createChatRepo,
    getChatsRepo,
    getPostsRepo,
    hidePostRepo,
    deletePostByAdminRepo,
    getReportedPostsRepo,
    createReportPostRepo


} from "../mongoDb/repositories/index.js";
import {
    authUserUseCase,
    createUserUseCase,
    getUserByIdUseCase,
    googleAuthUseCase,
    sentOtpUseCase,
    updateFollowListUseCase,
    verifyOtpUseCase,
    checkUsernameUseCase,

    createCommentUseCase,
    createPostUseCase,
    getAllPostsUseCase,
    postActionUseCase,
    deletePostUseCase,
    savePostUseCase,
    getSavedPostsUseCase,
    editProfileUseCase,
    getLikedUsersUseCase,
    authAdminUseCase,
    createTradeUseCase,
    getPositionsUseCase,
    updatePositionUseCase,
    getTotalProfitUseCase,
    getPastTradesUseCase,
    getAllUsersUseCase,
    blockUserUseCase,
    checkCPasswordUseCase,
    updatePasswordUseCase,
    addWatchlistUseCase,
    getWatchlistUseCase,
    deleteWatchlistUseCase,
    getChatHistoryUseCase,
    saveMessageUseCase,
    createChatUseCase,
    getChatsUseCase,
    getPostsUseCase,
    hidePostUseCase,
    deletePostByAdminUseCase,
    getReportedPostsUseCase,
    createReportPostUseCase


} from "../../applications/useCases/index.js";
import getLikedUsersRepo from "../mongoDb/repositories/postRepo/getLikedUsersRepo.js";
import getWatchlistRepo from "../mongoDb/repositories/userRepo/getWatchlistRepo.js";

const useCase = {
    //User
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

    //Post
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

const repository = {
    //User
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
    addWatchlistRepo,
    getWatchlistRepo,
    deleteWatchlistRepo,

    //Post
    createCommentRepo,
    createPostRepo,
    getAllPostsRepo,
    postActionRepo,
    deletePostRepo,
    savePostRepo,
    getSavedPostsRepo,
    getLikedUsersRepo,
    createReportPostRepo,

    //admin
    authAdminRepo,
    getAllUsersRepo,
    blockUserRepo,
    getPostsRepo,
    hidePostRepo,
    deletePostByAdminRepo,
    getReportedPostsRepo,

    //portfolio
    createTradeRepo,
    getPositionsRepo,
    updatePositionRepo,
    getTotalProfitRepo,
    getPastTradesRepo,

    //chat
    getChatHistoryRepo,
    saveMessageRepo,
    createChatRepo,
    getChatsRepo
}

export default { useCase, repository } 