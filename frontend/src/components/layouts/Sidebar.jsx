import React, { useState } from "react";
import {
  FaHome,
  FaSearch,
  FaPlusSquare,
  FaHeart,
  FaUser,
} from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import AddPost from "../posts/AddPost";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="w-64 px-4 flex flex-col items-start">
        <div className="flex items-center">
          <img
            src="./instagram.svg"
            alt="Instagram Logo"
            className="w-24 h-auto -mt-6"
          />
        </div>

        <div className="w-full flex flex-col items-start -mx-4">
          <NavItem icon={<FaHome />} label="Home" />
          <NavItem icon={<FaSearch />} label="Search" />
          <NavItem
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            icon={<FaPlusSquare />}
            label="Add"
          />
          <NavItem icon={<FaHeart />} label="Activity" />
          <NavImage img={userInfo?.image ? userInfo?.image : "./user.jpg"} label="Profile" />
          <NavItem icon={<FaBars/>} label="More"/>
        </div>
      </div>
      <AddPost isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Sidebar;

const NavItem = ({ icon, label, isModalOpen, setIsModalOpen }) => {
  return (
    <div
      onClick={() => setIsModalOpen(!isModalOpen)}
      className="flex items-center space-x-4 mb-4 cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md w-full"
    >
      <span className="text-gray-900 text-xl">{icon}</span>
      <span className="font-medium text-gray-900 text-xl">{label}</span>
    </div>
  );
};
const NavImage = ({img, label}) => {
  return (
    <div className="flex items-center space-x-4 mb-4 cursor-pointer hover:bg-gray-100 py-2 px-4 rounded-md w-full">
      <img src={img} alt="Image" className="w-6 h-6 rounded-full border border-pink-600 p-0.2"/>
      <span className="text-xl font-medium text-gray-900">{label}</span>
    </div>
  );
};
