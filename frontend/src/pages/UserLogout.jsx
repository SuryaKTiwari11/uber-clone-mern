import axios from "axios";

import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_API_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/users-login");
      }
    });

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#ffffff] p-3">
      <h1 className="text-xl font-bold mb-4 text-center">Logging out...</h1>
    </div>
  );
};

export default UserLogout;
