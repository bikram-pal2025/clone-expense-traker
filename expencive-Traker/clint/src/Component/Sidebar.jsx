
import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const {
    URL,
    toggle,
    setToggle,
    toggleLaptop,
    setToggleLaptop,
    setLogin,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [className, setClassName] = useState("");

  // Open logout popup
  const handleLogoutClick = () => {
    setShowLogoutPopup(true);
  };

  // Logout from this device
  const logout = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.get(`${URL}/api/auth/logout`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success(response.data.message || "Logout successful");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("email");

      setLogin(false);
      setToggle(false);
      setToggleLaptop(false);

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  // Confirm logout
  const confirmLogout = () => {
    setShowLogoutPopup(false);
    logout();
  };

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      {toggleLaptop && (
        <section
          className="
            hidden
            fixed
            top-0
            left-0
            md:flex
            min-h-screen
            bg-[#052B2A]
            md:w-[30%]
            lg:w-[15%]
            flex-col
            z-30
            animate-[slideIn_0.3s_ease-out]
          "
        >
          {/* Logo */}
          <div className="mt-5 flex items-center gap-2">
            <img className="h-[55px]" src={assets.logo} alt="logo" />

            <div>
              <p className="text-white text-lg font-bold">
                Expense <span className="text-[#02B176]">Tracker</span>
              </p>

              <p className="text-xs text-gray-400">
                Smart Money
                <span className="text-blue-500"> • </span>
                Better Future
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2 mt-5">
            {/* Dashboard */}
            <div
              onClick={() => {
                navigate("/dashbord");
                setClassName("dashboard");
                setToggle(false);
              }}
              className={`flex items-center gap-3 ${
                className === "dashboard" ? "bg-[#019A6C]" : ""
              } text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 duration-200`}
            >
              <i className="fa-solid fa-chart-line w-5"></i>
              <span>Dashboard</span>
            </div>

            {/* Create Transaction */}
            <div
              onClick={() => {
                navigate("/create-transaction");
                setClassName("create-transaction");
                setToggle(false);
              }}
              className={`flex items-center gap-3 ${
                className === "create-transaction" ? "bg-[#019A6C]" : ""
              } text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 duration-200`}
            >
              <i className="fa-solid fa-plus-circle w-5"></i>
              <span>Create Transaction</span>
            </div>

            {/* View Transactions */}
            <div
              onClick={() => {
                navigate("/transaction");
                setClassName("view-transaction");
                setToggle(false);
              }}
              className={`flex items-center gap-3 ${
                className === "view-transaction" ? "bg-[#019A6C]" : ""
              } text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 duration-200`}
            >
              <i className="fa-solid fa-money-bill-transfer w-5"></i>
              <span>View Transactions</span>
            </div>

            {/* Profile */}
            <div
              onClick={() => {
                navigate("/profile");
                setClassName("profile");
                setToggle(false);
              }}
              className={`flex items-center gap-3 ${
                className === "profile" ? "bg-[#019A6C]" : ""
              } text-white px-4 py-3 rounded-lg cursor-pointer hover:bg-white/10 duration-200`}
            >
              <i className="fa-solid fa-user w-5"></i>
              <span>Profile</span>
            </div>
          </div>

          {/* Logout Section */}
          <div className="mt-auto px-3 pb-5">
            <div
              onClick={handleLogoutClick}
              className="
                flex items-center gap-3
                text-white
                px-4 py-3
                rounded-lg
                cursor-pointer
                hover:bg-red-500/20
                duration-200
              "
            >
              <i className="fa-solid fa-right-from-bracket w-5"></i>
              <span>Logout</span>
            </div>
          </div>
        </section>
      )}

      {/* ================= MOBILE SIDEBAR ================= */}
   <section
  className={`
    md:hidden
    fixed
    top-0
    left-0
    bottom-0
    z-40
    h-dvh
    p-3
    bg-[#052B2A]
    w-[60%]
    flex
    flex-col
    overflow-y-auto
    transition-all
    duration-300
    ease-in-out
    ${toggle ? "translate-x-0" : "-translate-x-full"}
  `}
>
  {/* Mobile Header */}
  <div className="flex justify-end">
    <i
      onClick={() => setToggle(false)}
      className="
        fa-solid
        fa-xmark
        text-white
        text-xl
        cursor-pointer
      "
    ></i>
  </div>

  <div className="flex items-center justify-between px-2">
    <img
      className="h-[60px]"
      src={assets.logo}
      alt="logo"
    />

    <h1 className="text-white text-lg font-bold">
      Expense <span className="text-[#02B176]">Tracker</span>
    </h1>
  </div>

  {/* Navigation */}
  <div className="flex flex-col gap-2 mt-5">

    {/* Dashboard */}
    <div
      onClick={() => {
        navigate("/dashbord");
        setClassName("dashboard");
        setToggle(false);
      }}
      className={`
        flex items-center gap-3
        ${
          className === "dashboard"
            ? "bg-[#019A6C]"
            : ""
        }
        text-white
        px-4
        py-3
        rounded-lg
        cursor-pointer
        hover:bg-white/10
        duration-200
      `}
    >
      <i className="fa-solid fa-chart-line w-5"></i>
      <span>Dashboard</span>
    </div>

    {/* Create Transaction */}
    <div
      onClick={() => {
        navigate("/create-transaction");
        setClassName("create-transaction");
        setToggle(false);
      }}
      className={`
        flex items-center gap-3
        ${
          className === "create-transaction"
            ? "bg-[#019A6C]"
            : ""
        }
        text-white
        px-4
        py-3
        rounded-lg
        cursor-pointer
        hover:bg-white/10
        duration-200
      `}
    >
      <i className="fa-solid fa-plus-circle w-5"></i>
      <span>Create Transaction</span>
    </div>

    {/* View Transactions */}
    <div
      onClick={() => {
        navigate("/transaction");
        setClassName("view-transaction");
        setToggle(false);
      }}
      className={`
        flex items-center gap-3
        ${
          className === "view-transaction"
            ? "bg-[#019A6C]"
            : ""
        }
        text-white
        px-4
        py-3
        rounded-lg
        cursor-pointer
        hover:bg-white/10
        duration-200
      `}
    >
      <i className="fa-solid fa-money-bill-transfer w-5"></i>
      <span>View Transactions</span>
    </div>

    {/* Profile */}
    <div
      onClick={() => {
        navigate("/profile");
        setClassName("profile");
        setToggle(false);
      }}
      className={`
        flex items-center gap-3
        ${
          className === "profile"
            ? "bg-[#019A6C]"
            : ""
        }
        text-white
        px-4
        py-3
        rounded-lg
        cursor-pointer
        hover:bg-white/10
        duration-200
      `}
    >
      <i className="fa-solid fa-user w-5"></i>
      <span>Profile</span>
    </div>

  </div>

  {/* Mobile Logout Section */}
  <div className="mt-auto pt-3 pb-2">
    <div
      onClick={handleLogoutClick}
      className="
        flex items-center gap-3
        text-white
        px-4
        py-3
        rounded-lg
        cursor-pointer
        hover:bg-red-500/20
        duration-200
      "
    >
      <i className="fa-solid fa-right-from-bracket w-5"></i>
      <span>Logout</span>
    </div>
  </div>

</section>

      {/* ================= LOGOUT POPUP ================= */}
      {showLogoutPopup && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/40
            px-4
          "
        >
          <div
            className="
              w-full
              max-w-[350px]
              bg-white
              rounded-xl
              p-6
              shadow-xl
            "
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div
                className="
                  h-[50px]
                  w-[50px]
                  rounded-full
                  bg-red-100
                  flex
                  items-center
                  justify-center
                "
              >
                <i
                  className="
                    fa-solid
                    fa-right-from-bracket
                    text-red-500
                    text-xl
                  "
                ></i>
              </div>
            </div>

            {/* Title */}
            <h2
              className="
                text-center
                text-lg
                font-bold
                text-[#0B1D35]
              "
            >
              Are you sure you want to logout?
            </h2>

            {/* Message */}
            <p
              className="
                text-center
                text-sm
                text-gray-500
                mt-2
              "
            >
              You will be logged out from this device.
            </p>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              {/* Cancel */}
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="
                  w-full
                  py-2
                  rounded-lg
                  border
                  border-gray-300
                  text-gray-600
                  hover:bg-gray-100
                  duration-200
                  cursor-pointer
                "
              >
                Cancel
              </button>

              {/* Yes */}
              <button
                onClick={confirmLogout}
                className="
                  w-full
                  py-2
                  rounded-lg
                  bg-red-500
                  text-white
                  hover:bg-red-600
                  duration-200
                  cursor-pointer
                "
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;