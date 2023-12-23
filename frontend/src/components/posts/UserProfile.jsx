import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import React, { useState } from 'react';
import { FiMoreHorizontal } from "react-icons/fi";
import { useSelector } from 'react-redux';
import EditAndDeleteModal from './EditAndDeleteModal';

const UserProfile = ({ post, author }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const handleMoreIconClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className='flex justify-between  py-2'>
        <div className='flex items-center'>
          <img src={author.image ?? "./user.jpg"} alt="Author" className="rounded-full w-10 h-10 object-cover cursor-pointer" />
          <span className="ml-1 text-sm font-semibold text-gray-800 cursor-pointer">{author.username}</span>
          <span className="ml-3 text-sm font-semibold text-gray-800">{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
        </div>
        <div className='' onClick={handleMoreIconClick}>
          {
            userInfo._id === author._id && <FiMoreHorizontal className='text-2xl cursor-pointer' />
          }
        </div>
      </div>

      {isModalOpen && (
        <EditAndDeleteModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          post={post}
        />
      )}
    </>
  );
};

export default UserProfile;
