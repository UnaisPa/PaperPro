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
    updatePasswordRepo


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
    updatePasswordUseCase


} from "../../applications/useCases/index.js";
import getLikedUsersRepo from "../mongoDb/repositories/postRepo/getLikedUsersRepo.js";

const useCase = {
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