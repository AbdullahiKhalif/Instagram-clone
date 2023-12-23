import mongoose from "mongoose";
const {Schema} = mongoose;

const likeShema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: "Posts"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
}, {timestamps: true})

const Like = mongoose.model('likes', likeShema);
export default Like;