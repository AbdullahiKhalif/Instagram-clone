import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  useAddUserMutation,
  useLoginMutation,
} from "../../features/api/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../features/appSlice/authSlice";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState("password");

  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    // if (firstName === "") {
    //   toast.error("First name is required!");
    // } else if (lastName === "") {
    //   toast.error("Last name is required!");
    // }else{
    //   handleAddUser({firstName, lastName, email, username, password, image})
    //   navigate('/login')
    // }
    handleAddUser({ firstName, lastName, email, username, password, image });
  };

  const handleAddUser = (user) => {
    console.log("User", user);
    addUser(user)
      .unwrap()
      .then(() => navigate('/login'))
      .catch((err) => {
        console.log("error creating user", err);
        toast.error(err.data);
      });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("fiel", file);
    if (file) setImage(file);
  };
  return (
    <div className="fixed top-0 h-full left-0 right-0">
      <div className="flex justify-center items-center px-8 py-4 lg:py-8">
        <div className="bg-white border border-gray-300 rounded-lg w-96 h-auto p-8">
          <div className="flex flex-col justify-center items-center -mt-16">
            {" "}
            <img src="./instagram.svg" alt="Image" className="w-32" />
            <p className="text-center -mt-8 text-gray-600 text-[20">
              Sign up to see photos and videos from your friends.
            </p>
          </div>
          <hr className="mt-3 mb-3 border border-gray-200" />
          <form onSubmit={handleSignUpSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                name="fullName"
                placeholder="First Name"
                className="w-full bg-slate-100 shadow p-2 rounded-md outline-none mt-2"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                name="fullName"
                placeholder="Last Name"
                className="w-full bg-slate-100 shadow p-2 rounded-md outline-none mt-2"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                name="fullName"
                placeholder="Email"
                className="w-full bg-slate-100 shadow p-2 rounded-md outline-none mt-2"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                name="username"
                placeholder="username"
                className="w-full bg-slate-100 shadow p-2 rounded-md outline-none mt-2"
              />
            </div>

            <div className="relative form-group">
              <input
                type={showPassword}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                name="password"
                className="w-full bg-slate-100 shadow p-2 rounded-md outline-none mt-2"
                placeholder="password"
              />
              {showPassword == "password" ? (
                <AiFillEye
                  onClick={() => setShowPassword("")}
                  className="absolute top-5 right-5 text-xl cursor-pointer"
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword("password")}
                  className="absolute top-5 right-5 text-xl cursor-pointer"
                />
              )}
            </div>
            <div className="form-group">
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full my-1"
              />
            </div>

            <div className="form-group mt-6">
              <button
                type="submit"
                className="bg-blue-600 w-full p-2 rounded-md text-center text-white hover:bg-blue-800"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center mt-4">
            <p>
              Have an account ?{" "}
              <Link to="/login" className="text-blue-600 font-bold text-center">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
