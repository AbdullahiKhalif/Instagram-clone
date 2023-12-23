// App.js
import React, { useState } from "react";
import Modal from "./Modal"; // Adjust the import path accordingly
import { useAddPostMutation } from "../../features/api/postApiSlice";
import ActionModal from "./ActionModal";

function EditAndDeleteModal({ isModalOpen, setIsModalOpen, post }) {




    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div>


            {isModalOpen && (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    background: "rgba(0,0,0,0.5)"
                }}>
                    <ActionModal onClose={handleCloseModal} post={post}/>
                </div>
            )}
        </div>
    );
}

export default EditAndDeleteModal;