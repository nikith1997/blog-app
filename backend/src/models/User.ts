import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    email: string
    password: string
    bio?: string
}

const UserSchema: Schema = new Schema({
    password: {
        type: String,
        minLength: 8,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    bio: String
})

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
