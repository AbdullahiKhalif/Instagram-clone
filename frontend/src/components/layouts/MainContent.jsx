import React from "react";
import Stories from "../Stories";
import { useGetAllPostsQuery } from "../../features/api/postApiSlice";
import PostContainer from "../posts/PostContainer";
import PostSkeleton from "../posts/PostSkeleton";

const MainContent = () => {
  const {data, isLoading} = useGetAllPostsQuery();
  return (
    <div className="w-full p-4 overflow-y-auto">
      <Stories />
      {isLoading
                ? <PostSkeleton /> :

                (
                    data.length > 0 && data.map(post => (
                        <PostContainer key={post._id} post={post} />
                    ))

                )}
    </div>
  );
};

export default MainContent;
