import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAuth = () => {
    const userInfo = useContext(AuthContext)
    // console.log(userInfo)
    return userInfo
};

export default useAuth;