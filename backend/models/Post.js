import mongoose from "mongoose";
const {Schema} = mongoose;

const postSchema = new Schema({
    content: {
        type: String,
    },
    image: {
        type: String,
        default: null
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    }, 
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Likes"

        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comments"
        }
    ]
}, {timestamps: true})

const Post = mongoose.model('Post',postSchema);
export default Post;