import chalk from "chalk";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const commentPost = async(req, res) => {
    try{
        const {content} = req.body;
        const post = await Post.findById(req.params.id).populate({
            path: "author",
            model: "Users",
            select: "username"
        }).populate({
            path: "likes",
            model: "likes",
            populate: {
                path: "user",
                model: "Users",
                select: "username email"
            }
        }).populate({
            path: "comments",
            model: "Comments",
            select: "content user",
            populate: {
                path: "user",
                model: "Users",
                // select: "username image"
            }
        });

        if(!post) return res.status(404).send("Post Not Found");
        const comment = new Comment({
            content,
            post: post._id,
            user: req.user._id
        })
        await comment.save();

        post.comments.push(comment._id);
        await post.save();
        return res.status(201).send(comment);
    }catch(err){
        console.log(`${chalk.red.bold("Error At Create Comment")} ${err}`)
        res.status(400).send(err.message)
    }
}

export const updateComment = async(req, res) => {
    try{
        const comment = await Comment.findById(req.params.id);
        if(!comment) return res.status(404).send("Comment Not Found!");
        const currentUser = req.user._id;
        if(currentUser.toString() != comment.user.toString()){
            return res.status(403).send("You do not have permission to update this comment!")
        }
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body.content);
        console.log("Content- ", req.body.content)
        return res.status(201).send(updatedComment)
    }catch(err){
        console.log(`${chalk.red.bold("ERROR AT Updated Comments")} ${err}`)
    }
}

export const deleteComment = async(req, res) => {
    try{
        const comment = await Comment.findById(req.params.id);
        if(!comment) return res.status(404).send("Comment Not Found!");
        const currentUser = req.user._id;
        if(currentUser.toString() != comment.user.toString()){
            return res.status(403).send("You do not have permission to delete this post!")
        }
        await Comment.findByIdAndDelete(req.params.id);
        return res.status(201).send("Deleleted Comment successfully ✔")
    }catch(err){
        console.log(`${chalk.red.bold("ERROR AT DELETE Comments")} ${err}`)
    }
}