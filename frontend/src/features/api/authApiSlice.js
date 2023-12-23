import { apiSlice } from "./baseApiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "users/getOtherUser"
            })
        }),
        login: builder.mutation({
            query: (userData) => ({
                url: '/users/login',
                method: 'POST',
                body: userData
            }),
            rovidesTags: ['User']
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: 'POST',
            })
        }),
        addUser: builder.mutation({

            query: (newUser) => {

                const formData = new FormData();
                formData.append('firstName', newUser.firstName);
                formData.append('lastName', newUser.lastName);
                formData.append('email', newUser.email);
                formData.append('username', newUser.username);
                formData.append('password', newUser.password);
                formData.append('image', newUser.image);

                console.log("newUser:-", newUser);
                return {
                    url: "/users/",
                    method: 'POST',
                    body: formData
                };

            },
            invalidatesTags: ["User"]
        }),
    })
})

export const {useGetAllUsersQuery, useLoginMutation, useLogoutMutation, useAddUserMutation} = authApiSlice