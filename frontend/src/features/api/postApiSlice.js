import { apiSlice } from "./baseApiSlice";

const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => ({
                url: "/posts",
            }),
            providesTags: ['Post']
        }),
        getPostInfo: builder.query({
            query: (postId) => ({
                url: `/posts/${postId}`
            })
        }),
        likePost: builder.mutation({
            query: (postId) => ({
                url: `/posts/likePost/${postId}`,
                method: 'POST'
            }),
            invalidatesTags: ["Post"]
        }),
        addComment: builder.mutation({
            query: ({ postId, content }) => {

                console.log(postId, content);

                return {
                    url: `/posts/createComment/${postId}`,
                    method: 'POST',
                    body: { content }
                };
            },
            invalidatesTags: ["Post"]
        }),
        addPost: builder.mutation({

            query: (newPost) => {

                const formData = new FormData();
                formData.append('content', newPost.content);
                formData.append('image', newPost.image);

                console.log("newPost", newPost);
                return {
                    url: "/posts/",
                    method: 'POST',
                    body: formData
                };

            },
            invalidatesTags: ["Post"]
        }),
        updatePost: builder.mutation({

            query: ({postId, updatedPost}) => {

                const formData = new FormData();
                formData.append('content', updatedPost.content);
                formData.append('image', updatedPost.image);

                console.log("updatePost", updatedPost);
                return {
                    url: `/posts/${postId}`,
                    method: 'PUT',
                    body: formData
                };

            },
            invalidatesTags: ["Post"]
        }),
        deletePost: builder.mutation({
            query: (postId) => ({
                url: `/posts/${postId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Post"]
        }),
    })
})

export const {useGetAllPostsQuery, useGetPostInfoQuery, useLikePostMutation, useAddCommentMutation, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation} = postApiSlice