// Modal.js
import React, { useState } from "react";
import { useAddPostMutation, useUpdatePostMutation } from "../../features/api/postApiSlice";
import { toast } from "react-toastify";

function Modal({ onClose, onSubmit, post }) {
    const [content, setContent] = useState(post?.content || "");
    const [image, setImage] = useState(post?.image || null);
    const posts = post;
    console.log("POST:.........",post);

    const [addPost, { isLoading }] = useAddPostMutation();
    const [updatePost] = useUpdatePostMutation();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("image", image);
        if (content || image) {
            if(!post) {
                handleAddPost({ content, image });
            }else{
                handleUpdatePost();
            }
        }else{
            toast.error("You must provide a post content or image!")
        }
    };

    const handleAddPost = (post) => {
        console.log("post", post);
        addPost(post).unwrap()
            .then(() => onClose())
            .catch((err) => console.log("error creating post", err));

    };
    const handleUpdatePost = () => {
        console.log("post", post);
        updatePost({ postId: post._id, updatedPost: {content, image} }).unwrap()
            .then(() => onClose())
            .catch((err) => console.log("error updating post", err));
    };
    


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("fiel", file);
        if (file) setImage(file);
    };

    if (isLoading) return <h1>...</h1>;

    return (
        <div style={{ background: "white", padding: "20px", borderRadius: "8px" }}>
            <form onSubmit={handleSubmit}>
                <h1 class="text-center font-semibold">{post ? "Create Update Post" : "Create New Post"}</h1>
                <hr className="border border-gray-200 my-2"/>
                <textarea
                style={{ resize:"none"}}
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full border border-gray-300 outline-none p-1"
                />
                <input type="file" onChange={handleImageChange} className="w-full my-1" />
            
                {image && (
                    <div className="flex items-center justify-center">
                        <img src={post ? post.image : URL.createObjectURL(image)} alt="" className="w-28 h-28 object-cover rounded-full text-center border border-pink-600 p-1"/>
                    </div>
                ) }
               <div className="flex justify-end items-start space-x-5">
               <button type="submit" className="w-24 bg-pink-600 outline-none p-1 text-white rounded-md">{post ? "Update" : "Post"}</button>
                <button onClick={onClose}>Close</button>
               </div>
            </form>
            
        </div>
    );
}

export default Modal;