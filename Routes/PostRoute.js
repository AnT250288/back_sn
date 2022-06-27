import express from "express";
import {createPost, deletePost, getPost, likePost, updatePost} from "../Controllers/PostController.js";


const router = express.Router()

router
    .post('/', createPost)
    .get('/:id', getPost)
    .put('/:id', updatePost)
    .delete('/:id', deletePost)
    .put('/:id/like', likePost)

export default router