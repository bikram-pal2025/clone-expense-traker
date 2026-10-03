import React, { useContext, useEffect } from "react";

import { StoreContext } from "../context/StoreContext";

import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Topbar = () => {
  const {
    toggle,
    setToggle,
    toggleLaptop,
    setToggleLaptop,
    profileData,
    getMe,
  } = useContext(StoreContext);

  useEffect(() => {
    getMe();
  }, []);

  const navigate = useNavigate();

  const goToAdmin = () => {
    window.location.href = "your admin url";
  };

  return (
    <>
      {/* Top nav bar for medium and large screen */}
      <section
        className={`
          hidden h-[50px] bg-white sticky top-0 z-10
          md:flex items-center px-3 justify-between
          ${toggleLaptop ? "md:ml-[30%] lg:ml-[15%]" : ""}
             transition-all duration-500
        `}
      >
        {/* Sidebar Toggle */}
        <div>
          <i
            onClick={() => setToggleLaptop(!toggleLaptop)}
            className="text-xl fa-solid fa-bars cursor-pointer"
          ></i>
        </div>

        {/* User Section */}
        <div className="flex gap-3 mr-5 justify-center items-center">
          {/* Admin Panel */}
          <div
            onClick={goToAdmin}
            className="
              flex items-center gap-2
              px-3 py-2
              rounded-lg
              cursor-pointer
              hover:bg-[#F0F7FF]
              transition-all duration-300
            "
          >
            <i className="text-[#0768F3] text-lg fa-solid fa-user-shield"></i>

            <p className="text-sm font-medium text-[#0B1D35]">Admin Panel</p>
          </div>

          {/* Profile */}

          <div
            onClick={() => navigate("/profile")}
            className="
           flex items-center gap-3
                px-3 py-2
             rounded-xl
            cursor-pointer
             transition-all duration-300
           hover:bg-gray-100
              group
             "
          >
            {/* Profile Image */}
            <div
              className="
      h-[48px] w-[48px]
      rounded-full
      overflow-hidden
      border-2 border-[#019A6C]
      shadow-sm
      bg-gray-100
      flex items-center justify-center
      transition-all duration-300
      group-hover:scale-105
      group-hover:shadow-md
    "
            >
              {profileData?.gender === "male" ? (
                <img
                  src={assets.maleprofile}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : profileData?.gender === "female" ? (
                <img
                  src={assets.femaleProfile}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={assets.othersProfile}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* User Information */}
            <div className="hidden sm:block min-w-0">
              <p className="text-xs text-gray-400 font-medium">Welcome back</p>

              <p
                className="
        text-sm
        text-[#0B1D35]
        font-bold
        capitalize
        truncate
        max-w-[130px]
      "
              >
                {profileData?.name || "User"}
              </p>
            </div>

            {/* Arrow */}
            <i
              className="
      fa-solid fa-chevron-down
      text-gray-400
      text-xs
      transition-transform duration-300
      group-hover:rotate-180
    "
            ></i>
          </div>
        </div>
      </section>

      {/* Top nav bar for small screen */}
      <section
        className={`
          h-[50px]
          bg-white
          md:hidden
          sticky top-0
          z-10
          items-center
          px-3
          justify-between
          ${toggle ? "hidden" : "flex"}
          transition-all duration-300
        `}
      >
        {/* Mobile Sidebar Toggle */}
        <div>
          <i
            onClick={() => setToggle(!toggle)}
            className="text-xl fa-solid fa-bars cursor-pointer"
          ></i>
        </div>

        {/* User Section */}
        <div className="flex gap-3 mr-2 justify-center items-center">
          {/* Admin Panel */}
          <div
            onClick={goToAdmin}
            className="
              flex h-[40px] w-[40px]
              bg-[#F0F7FF]
              hover:bg-[#0B1D35]
              cursor-pointer
              duration-300
              rounded-full
              justify-center items-center
            "
          >
            <i
              className="
                text-[#0768F3]
                hover:text-white
                text-lg
                fa-solid fa-user-shield
              "
            ></i>
          </div>

          {/* Profile */}
          <div
            onClick={() => navigate("/profile")}
            className="
           flex items-center gap-3
                px-3 py-2
             rounded-xl
            cursor-pointer
             transition-all duration-300
           hover:bg-gray-100
              group
             "
          >
            {/* Profile Image */}
            <div
              className="
      h-[48px] w-[48px]
      rounded-full
      overflow-hidden
      border-2 border-[#019A6C]
      shadow-sm
      bg-gray-100
      flex items-center justify-center
      transition-all duration-300
      group-hover:scale-105
      group-hover:shadow-md
    "
            >
              {profileData?.gender === "male" ? (
                <img
                  src={assets.maleprofile}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : profileData?.gender === "female" ? (
                <img
                  src={assets.femaleProfile}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={assets.othersProfile}
                  alt="profile"
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* User Information */}
            <div className="hidden sm:block min-w-0">
              <p className="text-xs text-gray-400 font-medium">Welcome back</p>

              <p
                className="
        text-sm
        text-[#0B1D35]
        font-bold
        capitalize
        truncate
        max-w-[130px]
      "
              >
                {profileData?.name || "User"}
              </p>
            </div>

            {/* Arrow */}
            <i
              className="
      fa-solid fa-chevron-down
      text-gray-400
      text-xs
      transition-transform duration-300
      group-hover:rotate-180
    "
            ></i>
          </div>
        </div>
      </section>
    </>
  );
};

export default Topbar;
