import { useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserProtectWrapper = ({ children }) => {
  //   const { user } = useContext(UserDataContext);
  //rather than using the user context, we can check if the token is present in the local storage

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/users-login");
    }
  }, [token, navigate]);
  return <>{children}</>;
};

export default UserProtectWrapper;
