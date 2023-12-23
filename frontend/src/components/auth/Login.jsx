import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "../../features/api/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../../features/appSlice/authSlice";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo){
      navigate('/');
    }
  }, [])

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const { error, data } = await login({ username, password });
    if (!error) {
      dispatch(setCredentials({...data}))
      navigate('/')
    } else {
      toast.error(error.data);
    }
  };
  return (
    <div className="fixed top-0 h-full left-0 right-0">
      <div className="flex justify-center items-center px-8 py-32 lg:py-12">
        <div className="bg-white border border-gray-300 rounded-lg w-96 h-auto p-10">
        <div className="flex justify-center -mt-14"> <img src="./instagram.svg" alt="Image" className="w-32"/></div>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="" className="font-bold">
                Username <span className="text-gray-500">*</span>
              </label>

              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                name="username"
                placeholder="username or email"
                className="w-full bg-slate-100 shadow p-3 rounded-md outline-none mt-2"
              />
            </div>

            <div className="relative form-group mt-4">
              <label htmlFor="" className="font-bold">
                Password <span className="text-gray-500">*</span>
              </label>

              <input
                type={showPassword}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                name="password"
                className="w-full bg-slate-100 shadow p-3 rounded-md outline-none mt-2"
              />
              {showPassword == "password" ? (
                <AiFillEye
                  onClick={() => setShowPassword("")}
                  className="absolute top-11 right-5 text-xl cursor-pointer"
                />
              ) : (
                <AiFillEyeInvisible
                  onClick={() => setShowPassword("password")}
                  className="absolute top-11 right-5 text-xl cursor-pointer"
                />
              )}
            </div>

            <div className="form-group mt-6">
              <button
                type="submit"
                className="bg-blue-600 w-full p-2 rounded-md text-center text-white hover:bg-blue-800"
              >
                Log in
              </button>
            </div>
          </form>
          <div className="flex flex-col items-center mt-4">
            <p>
              I don't have account ||{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-bold text-center"
              >
                Sign Up
              </Link>
            </p>
            <Link to="/forget-password" className="text-blue-600 font-bold">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
