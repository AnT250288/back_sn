import express from "express";
import {deleteUser, followUser, getUser, unfollowUser, updateUser} from "../Controllers/UserController.js";

const router = express.Router()

router
    .get('/:id', getUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)
    .put('/:id/follow', followUser)
    .put('/:id/unfollow', unfollowUser)

export default router
