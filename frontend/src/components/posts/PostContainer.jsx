import React from 'react';
import ActionBar from './ActionBar';
import CommentSection from './CommentSection';
import AddComment from './AddComment';
import UserProfile from './UserProfile';
import ImageContainer from './ImageContainer';

const PostContainer = ({ post }) => {
    return (
        <div>

            <UserProfile author={post.author} post={post}/>

            <ImageContainer image={post.image} post={post}/>

            <ActionBar post={post} />

            <CommentSection comments={post.comments} />

            <AddComment post={post} />
        </div>
    );
};

export default PostContainer;