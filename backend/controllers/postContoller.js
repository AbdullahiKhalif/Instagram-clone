import chalk from 'chalk'
import cloudinary from '../config/cloudinary.js';
import Post from '../models/Post.js';
import Like from '../models/Like.js';
export const createPost = async(req, res) => {
    try{

        let result;

        if (req.file) {
            let encodedImage = `data:image/jpg;base64,${req.file.buffer.toString('base64')}`;

            result = await cloudinary.uploader.upload(encodedImage, {
                resource_type: 'image',
                transformation: [
                    { width: 400, height: 400, crop: "limit" }
                ],
                encoding: 'base64',
                folder: "post-images"
            });

        }

        const post = new Post({
            content: req.body.content,
            image: result?.url || null,
            author: req.user._id
        });

        await post.save();

        return res.status(201).send(post);

    }catch(err){
        console.log(`${chalk.red.bold("ERROR At Create Post")}. ${err}`);
        res.status(400).send(err.message);
    }
} 


export const updatePost = async(req, res) => {
    try{
        var updatedFelids = {
            content: req.body.content
        }
        const postExists = await Post.findById(req.params.id);
        
        if(!postExists) return res.status(404).send("Not Found This Post");

        const currentUser = req.user._id;

        if(currentUser.toString() != postExists.author.toString()){
            return res.status(403).send("You do not have permission to update this post!");
        }
        let result;


        const isExists = await Post.findById(req.params.id);

        if (!isExists) return res.status(400).send("post not found");


        if (req.file) {

            let encodedImage = `data:image/jpg;base64,${req.file.buffer.toString('base64')}`;

            result = await cloudinary.uploader.upload(encodedImage, {
                resource_type: 'image',
                transformation: [
                    { width: 400, height: 400, crop: "limit" }
                ],
                encoding: 'base64',
                folder: "posts"
            });

            updatedFelids.image = result.url;

        }
        const post = await Post.findByIdAndUpdate(req.params.id, updatedFelids, { new: true });

        return res.status(200).send(post);

    }catch(err){
        console.log(`${chalk.red.bold("ERROR At Update Post")}. ${err}`)
        res.status(400).send(err.message)
    }
}

export const toglePostLikes = async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);

        if(!post) return res.status(404).send("POst Not Found!");

        const exisingLike = await Like.findOne({post: req.params.id, user: req.user._id});

        if(exisingLike){
            await Like.findByIdAndDelete(exisingLike._id);
            post.likes.pull(exisingLike._id)
            await post.save();
            return res.status(200).send("Unliked Post successfully");
        }

        const like = new Like({
            post: post._id,
            user: req.user._id,
        })
        await like.save();
        post.likes.push(like._id);
        await post.save();

        return res.status(200).send("Liked Post successfully");
    }catch(err){
        console.log(`${chalk.red.bold("ERROR At Post Likes ")}, ${err}`)
        res.status(400).send(err.message)
    }
}

export const getAllPosts = async (req, res) => {
    try{
        const posts = await Post.find().populate({
            path: "author",
            model: "Users",
            select: "username image"
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
            select: "content",
            populate: {
                path: "user",
                model: "Users",
                select: "username image"
            }
        }).sort({createdAt: -1});
        return res.status(200).send(posts);
    }catch(err){
        console.log(`${chalk.red.bold("ERROR At Get All Posts ")}, ${err}`);
        res.status(400).send(err.message) ;
    }
}

export const getPostInfo = async(req, res) => {
    try{
        const post = await Post.findById(req.params.id).populate({
            path: "author",
            model: "Users",
            select: "username image"
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
            select: "content",
            populate: {
                path: "user",
                model: "Users",
                select: "username"
            }
        })
        if(!post) return res.status(404).send("Post Not Post");
       
        return res.status(200).send(post)
    }catch(err){
        console.log(`${chalk.red.bold("ERROR At Get Post Info")}, ${err.message}`)
        res.status(404).send(err.message);
    }
}

export const deletePost = async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).send("Post Not Found!");
        const currentUser = req.user._id;
        if(currentUser.toString() != post.author.toString()){
            return res.status(403).send("You do not have permission to delete this post!")
        }
        await Post.findByIdAndDelete(req.params.id);
        return res.status(201).send("Deleleted Post successfully ✔")
    }catch(err){
        console.log(`${chalk.red.bold("ERROR AT DELETE POST")} ${err}`)
    }
}