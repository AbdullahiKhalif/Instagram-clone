import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../features/api/authApiSlice";
import { logoutUser } from "../../features/appSlice/authSlice";

const RightSidebar = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useGetAllUsersQuery();
  // const data = useGetAllUsersQuery();
  // console.log("data:........", data);

  const dispatch = useDispatch();

  const handleLogoutUser = () => {
    dispatch(logoutUser());
    navigate('/login')
  }
  return (
    <>
      <div className="w-96 px-4 flex flex-col items-start">
        <div className="flex">
          <div className="flex space-x-3 items-center justify-between">
            <div>
              <img
                src={userInfo?.image || "./user.jpg"}
                alt={userInfo?.username}
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div>
              <span>
                <h1 className="font-semibold">{userInfo?.username}</h1>
              </span>
              <span>
                <h1 className="text-sm text-gray-400">
                  {userInfo?.firstName + " " + userInfo?.lastName}
                </h1>
              </span>
            </div>

            <div>
              <Link onClick={handleLogoutUser} className="mx-12 text-blue-600 font-semibold text-sm">
                Logout
              </Link>
            </div>
          </div>
        </div>

        <div className="">
          <div className="mt-4 mb-4">
            <p className="font-semibold text-gray-400">Suggested for you</p>

            {isLoading ? <h1>Loading... </h1>: (
              data.map((user) => (
              <div className="flex space-x-3 items-center justify-between mb-3 mt-3">
                <div>
                  <img
                    src={user?.image || "./user.jpg"}
                    alt={user?.username}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div>
                  <span>
                    <h1 className="font-semibold">{user?.username}</h1>
                  </span>
                  <span>
                    <h1 className="text-sm text-gray-400">
                      {user?.firstName + " " + user?.lastName}
                    </h1>
                  </span>
                </div>

                <div>
                  <Link className="mx-12 text-blue-600 font-semibold text-sm">
                    Follow
                  </Link>
                </div>
              </div>
            )))}

            
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
