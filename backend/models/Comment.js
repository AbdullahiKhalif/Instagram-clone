import mongoose from "mongoose";
const {Schema} = mongoose;

const commentShema = new Schema({
    content: {
        type: String
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Posts"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
}, {timestamps: true})

const Comment = mongoose.model('Comments', commentShema);
export default Comment;