import express from "express";
import {deleteUser, followUser, getAllUsers, getUser, unfollowUser, updateUser} from "../Controllers/UserController.js";
import authMiddleware from "../Middleware/AuthMiddleware.js";


const router = express.Router()

router
    .get('/:id', getUser)
    .get('/', getAllUsers)
    .put('/:id',authMiddleware, updateUser)
    .delete('/:id',authMiddleware, deleteUser)
    .put('/:id/follow',authMiddleware, followUser)
    .put('/:id/unfollow',authMiddleware, unfollowUser)


export default router
