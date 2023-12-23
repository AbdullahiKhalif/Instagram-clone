import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLogoutMutation } from "../features/api/authApiSlice";
import { logoutUser } from "../features/appSlice/authSlice";

const useAuthCheck = () => {

    const navigate = useNavigate();
    const [logout] = useLogoutMutation(); //server logout
    const dispatch = useDispatch();  // state logout


    useEffect(() => {

        const checkSessionAvailability = () => {

            const expirationTime = localStorage.getItem("expirationTime");

            console.log("current time", new Date().getTime());
            const isSessionValid = expirationTime && new Date().getTime() < parseInt(expirationTime, 10);

            console.log("server", isSessionValid);

            if (!isSessionValid) {
                logout();
                dispatch(logoutUser());
                navigate('/login');
            }
        };

        checkSessionAvailability();

    }, [dispatch]);

};

export default useAuthCheck;