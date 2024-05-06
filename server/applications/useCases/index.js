import {
    authUserUseCase,
    createUserUseCase,
    getUserByIdUseCase,
    googleAuthUseCase,
    sentOtpUseCase,
    updateFollowListUseCase,
    verifyOtpUseCase
} from "./userUseCases/index.js"

import {createCommentUseCase,createPostUseCase,getAllPostsUseCase,postActionUseCase,deletePostUseCase} from "./postUseCases/index.js"

export {
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
    postActionUseCase,
    deletePostUseCase
}