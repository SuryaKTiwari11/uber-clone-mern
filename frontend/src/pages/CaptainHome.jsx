import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { Button } from "../components/ui/Button";

const CaptainHome = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/captains-login");
      return;
    }

    const fetchCaptainProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.captain) {
          setCaptain(response.data.captain);
        } else {
          throw new Error("No captain data received");
        }
      } catch (error) {
        console.error("Error fetching captain profile:", error);
        localStorage.removeItem("token");
        navigate("/captains-login");
      }
    };

    fetchCaptainProfile();
  }, [setCaptain, navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      setCaptain(null);
      navigate("/captains-login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!captain) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">
            Welcome, {captain.firstname}!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <p>
                Name: {captain.firstname} {captain.lastname}
              </p>
              <p>Email: {captain.email}</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Vehicle Information</h2>
              <p>Type: {captain.vehicleType}</p>
              <p>Color: {captain.color}</p>
              <p>Plate: {captain.plate}</p>
              <p>Capacity: {captain.capacity} passengers</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaptainHome;
