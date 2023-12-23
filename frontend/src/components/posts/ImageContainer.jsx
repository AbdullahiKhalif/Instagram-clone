import React from 'react';

const ImageContainer = ({ image,post }) => {
    return (
        <div className="w-full">
            <p>{post.content}</p>
            <img src={post?.image} alt="Post" className="object-cover w-full rounded-" />
        </div>
    );
};

export default ImageContainer;