import express from "express"
import { body } from "express-validator"
import { createPost, deletePost, listPosts } from "../controllers/PostController"
import verifyToken from "../middlewares/verifyToken"

const router = express.Router()

router.get("/list", listPosts)

router.post("/create", [
    body("title").isLength({min: 10, max: 500}).withMessage("Post title should be between 10 to 500 characters"),
    body("content").exists().withMessage("Missing content")
], verifyToken, createPost)

router.post("/delete", [
    body("id").exists().withMessage("Need to pass in post id")
], verifyToken, deletePost)

export default router
