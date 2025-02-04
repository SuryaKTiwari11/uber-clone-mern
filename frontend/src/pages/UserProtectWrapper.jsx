import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useContext(UserDataContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/users-login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          setUser(data.user);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        localStorage.removeItem("token");
        navigate("/users-login");
      });
  }, [token, navigate, setUser]);

  if (isLoading) return <div>Loading...</div>;
  return <>{children}</>;
};

export default UserProtectWrapper;
