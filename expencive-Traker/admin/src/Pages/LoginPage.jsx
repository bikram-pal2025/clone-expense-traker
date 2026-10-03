
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/asstes";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StoreContext } from "../Context/StoreContextProvider";

const LoginPage = () => {
  const {URL,setLogin,login} = useContext(StoreContext)
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${URL}/api/admin/login`,
        {
          userName,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
       
        toast.success(response.data.message);
        

        setTimeout(() => {
          navigate("/add-category");
        }, 1000);
      }

      setLogin(true);
    } catch (err) {
      console.error(err);

      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something wet Wrong");
      }
    }


  };
    if (login) {
  return "You are already logged in";
}

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center p-5 bg-[#F0F7FF]">

        <div className="w-[95%] md:w-[80%] max-w-6xl h-[70vh] md:h-[80vh] bg-white rounded-xl flex overflow-hidden shadow-lg">

          {/* ================= LEFT BANNER ================= */}
          <div className="hidden lg:block w-[45%] h-full">
            <img
              src={assets.adminBanner}
              alt="admin banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ================= RIGHT LOGIN SECTION ================= */}
          <div className="w-full lg:w-[55%] h-full flex flex-col items-center lg:justify-center justify-evenly lg:gap-3 px-10 md:px-16">

            {/* ================= HEADER ================= */}
            <div className="flex justify-center text-center items-center flex-col gap-2">

              <i className="text-[#2577FB] text-3xl md:text-5xl lg:text-4xl fa-solid fa-user-shield"></i>

              <h2 className="text-2xl md:text-5xl lg:text-4xl font-bold text-gray-800">
                Admin Login
              </h2>

              <p className="text-md md:text-xl lg:text-base text-gray-500">
                Login to manage system settings.
              </p>

            </div>

            {/* ================= LOGIN FORM ================= */}
            <form
              onSubmit={handleLogin}
              className="flex flex-col justify-center items-center gap-5 w-full"
            >

              {/* USERNAME */}
              <div className="border flex gap-2 items-center justify-center w-full md:w-[80%] px-2 py-2 md:py-3 border-gray-300 rounded-lg focus-within:border-[#2577FB] transition">

                <i className="fa-solid fa-user text-gray-500"></i>

                <input
                  className="w-full rounded-lg outline-none"
                  type="text"
                  name="userName"
                  placeholder="Enter username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />

              </div>

              {/* PASSWORD */}
              <div className="border flex gap-2 items-center justify-center w-full md:w-[80%] px-2 py-2 md:py-3 border-gray-300 rounded-lg focus-within:border-[#2577FB] transition">

                <i className="fa-solid fa-lock text-gray-500"></i>

                <input
                  className="w-full rounded-lg outline-none"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

              </div>

              {/* LOGIN BUTTON */}
              <button
    
                type="submit"
                className="flex gap-2 cursor-pointer group justify-center items-center h-[40px] w-full rounded-md md:w-[80%] md:py-5 lg:w-[80%] px-2 py-2 bg-[#2577FB] hover:bg-[#1768e8] transition duration-200"
              >

                <p className="text-white font-bold">
                  Login
                </p>

                <i className="text-white fa-solid fa-arrow-right-long transition-transform duration-200 group-hover:translate-x-2"></i>

              </button>

            </form>

            {/* ================= BOTTOM PART ================= */}
            <div className="flex justify-center items-center flex-col w-full">

              {/* Admin Access Only */}
              <div className="flex justify-center items-center gap-3">

                <hr className="w-[30px] border-gray-500" />

                <p className="text-gray-500 text-xl lg:text-base whitespace-nowrap">
                  Admin Access Only
                </p>

                <hr className="w-[30px] border-gray-500" />

              </div>

              {/* Information Box */}
              <div className="flex items-start gap-3 min-h-[60px] bg-[#F0F7FF] w-full rounded-md md:w-[80%] p-3 lg:w-[80%] mt-3">

                <i className="fa-solid fa-shield text-[#2577FB] mt-1"></i>

                <div>

                  <p className="text-sm">
                    Only authorized admins can access this panel.
                  </p>

                  <p className="text-sm text-gray-500">
                    Please use your admin credentials to log in.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default LoginPage;

