import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const UserLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        newUser
      );
      if (response.status === 200 && response.data) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setFormData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#ffffff] p-3">
      <div className="bg-white p-4 rounded-md shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">User Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-lg font-semibold mb-1">
              What is your email?
            </label>
            <Input
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              className="w-full"
              placeholder="email@example.com"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold text-lg mb-1">
              Enter Password
            </label>
            <Input
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="password"
              className="w-full"
            />
          </div>
          <Button className="w-full mb-3" type="submit">
            Login
          </Button>
          <p className="text-center font-semibold text-md">
            New Here? Create account{" "}
            <Link to="/users-signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <Link
        to="/captains-login"
        className="bg-green-500 flex items-center justify-center font-semibold text-white py-2 rounded-md mt-3 w-full max-w-md"
      >
        Sign In As Captain
      </Link>
    </div>
  );
};

export default UserLogin;
