import React from 'react';
import { useGetAllPostsQuery } from '../features/api/postApiSlice';
import MainContent from '../components/layouts/MainContent';
import RightSidebar from '../components/layouts/RightSidebar';
import Sidebar from '../components/layouts/Sidebar';

const HomePage = () => {
  return (
    <div className='h-screen  flex flex-col'>
            <div className="flex flex-grow">

                <div className="flex flex-col p-4 border border-x-gray-300 z-10 top-0 left-0 right-0">
                    <Sidebar />
                </div>

                <div className="flex flex-col flex-grow-3 max-w-xl  mx-auto">
                    <MainContent />
                </div>

                <div className="flex flex-col p-4">
                    <RightSidebar />
                </div>
            </div>
        </div>
  )
}

export default HomePage