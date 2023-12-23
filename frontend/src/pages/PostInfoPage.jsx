import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostInfoQuery } from '../features/api/postApiSlice';

const PostInfoPage = () => {
    const {id} = useParams();
    const {data, isLoading, isError, error} = useGetPostInfoQuery(id);
    if(isError) return <h1>{error?.data}</h1>
    if(isLoading) return <h1>Loading Data...</h1>
  return (
    <div>
        <h1>{data?.content}</h1>
        <img src={data?.image} alt="" />
    </div>
  )
}

export default PostInfoPage