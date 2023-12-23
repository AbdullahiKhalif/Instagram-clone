// Modal.js
import React, { useState } from "react";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import AddPost from "./AddPost";
import { useDeletePostMutation } from "../../features/api/postApiSlice";

function ActionModal({ onClose, onSubmit, post }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleMoreIconClick = () => {
        setIsModalOpen(!isModalOpen);
      };

      const [deletePost] = useDeletePostMutation();

      const handleDeletePost = () => {
        Swal.fire({
          title: "Are you sure?",
          text: "To delete this post permenently!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            handleDeletedUserPost();
            
          }
        });
      }

      const handleDeletedUserPost = () => {
        deletePost(post?._id).unwrap()
        .then(() => onClose())
        .catch((err) => console.log("error Deleting post", err));
      }

    return (
        <>
        <div style={{ background: "white", padding: "20px", borderRadius: "8px" }} className="w-64 h-34">
            <div className="flex flex-col items-center text-center">
                <Link className="text-md font-semibold cursor-pointer" onClick={handleMoreIconClick}>Edit</Link>
                <hr className="border border-gray-400 w-full my-2" />
                <Link className="text-md font-semibold cursor-pointer" onClick={handleDeletePost}>Delete</Link>
                <hr className="border border-gray-400 w-full my-2" />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
        {isModalOpen && (
        <AddPost
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
         post={post} Assuming you have an authorId property in your author object
        />
      )}
        </>
        
        
    );
}

export default ActionModal;
