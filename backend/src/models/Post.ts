import mongoose, {Schema} from "mongoose";

const PostSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Post = mongoose.model("Post", PostSchema);

export default Post;
