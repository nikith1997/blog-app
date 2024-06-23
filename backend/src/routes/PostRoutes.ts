import express from "express"
import { body } from "express-validator"
import { createPost, deletePost } from "../controllers/PostController"

const router = express.Router()

router.post("/create", [
    body("title").isLength({min: 10, max: 500}).withMessage("Post title should be between 10 to 500 characters"),
    body("content").exists().withMessage("Missing content")
], createPost)

router.post("/delete", [
    body("id").exists().withMessage("Need to pass in post id")
], deletePost)

export default router
