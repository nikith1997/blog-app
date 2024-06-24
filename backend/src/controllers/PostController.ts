import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Post from "../models/Post";

export const listPosts = async (_: Request, res: Response) => {
    try {
        const posts = await Post.find({})
        res.status(200).json({
            posts: posts
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const createPost = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const post = new Post({
            userId: req.userId,
            title: req.body.title,
            content: req.body.content
        })
        await post.save()
        res.status(201).json({
            message: "Post created successfully",
            id: post._id
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const deletePost = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    try {
        const post = await Post.findOneAndDelete({
            userId: req.userId,
            _id: req.body.id
        })
        if (post) {
            return res.status(200).json({
                message: "Successfully deleted blog post"
            })
        }
        else {
            return res.status(400).json({
                message: "Blog post does not exist"
            })
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}
