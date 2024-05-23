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
    addWatchlistRepo


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
    getWatchlistUseCase


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

    //Post
    createCommentUseCase,
    createPostUseCase,
    getAllPostsUseCase,
    postActionUseCase,
    deletePostUseCase,
    savePostUseCase,
    getSavedPostsUseCase,
    getLikedUsersUseCase,

    //admin
    authAdminUseCase,
    getAllUsersUseCase,
    blockUserUseCase,

    //portfolio
    createTradeUseCase,
    getPositionsUseCase,
    updatePositionUseCase,
    getTotalProfitUseCase,
    getPastTradesUseCase
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

    //Post
    createCommentRepo,
    createPostRepo,
    getAllPostsRepo,
    postActionRepo,
    deletePostRepo,
    savePostRepo,
    getSavedPostsRepo,
    getLikedUsersRepo,


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

export default { useCase, repository } 