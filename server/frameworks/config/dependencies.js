//import usecases and repos

import {
    authUserRepo,
    createUserRepo,
    getUserByIdRepo,
    googleAuthRepo,
    sendOtpRepo,
    updateFollowListRepo,
    verifyOTPRepo,

    createCommentRepo,
    createPostRepo,
    getAllPostsRepo,
    postActionRepo


} from "../mongoDb/repositories/index.js";
import {
    authUserUseCase,
    createUserUseCase,
    getUserByIdUseCase,
    googleAuthUseCase,
    sentOtpUseCase,
    updateFollowListUseCase,
    verifyOtpUseCase,

    createCommentUseCase,
    createPostUseCase,
    getAllPostsUseCase,
    postActionUseCase


} from "../../applications/useCases/index.js";

const useCase = {
    authUserUseCase,
    createUserUseCase,
    getUserByIdUseCase,
    googleAuthUseCase,
    sentOtpUseCase,
    updateFollowListUseCase,
    verifyOtpUseCase,

    createCommentUseCase,
    createPostUseCase,
    getAllPostsUseCase,
    postActionUseCase

}

const repository = {
    authUserRepo,
    createUserRepo,
    getUserByIdRepo,
    googleAuthRepo,
    sendOtpRepo,
    updateFollowListRepo,
    verifyOTPRepo,

    createCommentRepo,
    createPostRepo,
    getAllPostsRepo,
    postActionRepo
}

export default { useCase, repository } 