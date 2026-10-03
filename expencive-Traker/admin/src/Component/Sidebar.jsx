import React, { useContext } from "react";
import { assets } from "../assets/asstes";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContextProvider";
import { toast } from "react-toastify";
import axios from "axios";

const Sidebar = () => {
  const navigate = useNavigate()
    const { toggle, setToggle,toggleLaptop,setToggleLaptop,URL,setLogin} = useContext(StoreContext);
      
    const logout = async () => {
     
      try{
           const response = await axios.get(`${URL}/api/admin/logout`,{
         withCredentials: true,
      } )



      if(response.data.success){
         setLogin(false);
         navigate("/")
         toast.success(response.data.message);
      }
      }catch (err) {
            console.error(err);
      
            if (err.response) {
              toast.error(err.response.data.message);
            } else {
              toast.error("Something wet Wrong");
            }
          }


    } 
     
  return (
    <>

    {toggleLaptop && (
    <section className="hidden fixed md:flex min-h-screen bg-[#0B1D35] animate-[slideIn_0.3s_ease-out] md:w-[30%] lg:w-[15%] flex-col">

      {/* Logo */}
      <div className="mt-5 flex items-center gap-2">
        <img
          className="h-[55px]"
          src={assets.logo}
          alt="logo"
        />

        <div>
          <p className="text-white text-lg font-bold">
            Expense Tracker
          </p>

          <p className="text-xs text-gray-400">
            Smart Money
            <span className="text-blue-500"> • </span>
            Better Future
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="mt-8 flex items-center gap-3 px-4 py-3">
        <i className="text-[#84b1f3] fa-solid fa-tag"></i>

        <p className="text-[#84b1f3]">
          Categories
        </p>
      </div>

      {/* Add Category */}
      <NavLink
        to="/add-category"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg ${
            isActive
              ? "bg-[#1677F2] text-white"
              : "hover:bg-[#132D4D] text-[#84b1f3]"
          }`
        }
      >
        <i className="fa-solid fa-plus"></i>
        <p>Add Category</p>
      </NavLink>

      {/* View Categories */}
      <NavLink
        to="/view-category"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 rounded-lg ${
            isActive
              ? "bg-[#1677F2] text-white"
              : "hover:bg-[#132D4D] text-[#84b1f3]"
          }`
        }
      >
        <i className="fa-solid fa-bars-staggered"></i>
        <p>View Categories</p>
      </NavLink>

      {/* Logout */}
      <div onClick={logout} className="mt-auto mb-5 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#132D4D] cursor-pointer">
        <i className="text-[#84b1f3] fa-solid fa-right-from-bracket"></i>

        <p  className="text-[#84b1f3]">
          Logout
        </p>
      </div>

    </section>

    )}


    {/* sidebar for mobile */}


<section
  className={`md:hidden fixed top-0 left-0 z-20 min-h-screen p-3
    bg-[#0B1D35] w-[60%] flex flex-col
    transition-all duration-300 ease-in-out
    ${toggle ? "translate-x-0" : "-translate-x-full"}`}
>

          <div  className="flex justify-end items-center mt-2">
            <i onClick={()=>setToggle(false)} className=" text-white text-xl fa-solid fa-bars"></i>
          </div>

          
          

           <div className="mt-5 flex items-center gap-2">
        <img
          className="h-[40px]"
          src={assets.logo}
          alt="logo"
        />

        <div>
          <p className="text-white text-md font-bold">
            Expense Tracker
          </p>

        
        </div>
      </div>
      
      {/* Categories */}
      <div className="mt-8 flex items-center gap-3 px-4 py-3">
        <i className="text-[#84b1f3] fa-solid fa-tag"></i>

        <p className="text-[#84b1f3]">
          Categories
        </p>
      </div>

      {/* Add Category */}
      <NavLink
        to="/add-category"

        onClick={()=>setToggle(false)}
        className={({ isActive }) =>
          `flex items-center mt-3 gap-3 px-2 py-2 rounded-lg ${
            isActive
              ? "bg-[#1677F2] text-white"
              : "hover:bg-[#132D4D] text-[#84b1f3]"
          }`
        }
      >
        <i className="fa-solid fa-plus"></i>
        <p>Add Category</p>
      </NavLink>

      {/* View Categories */}
      <NavLink
        to="/view-category"
        onClick={()=>setToggle(false)}
        className={({ isActive }) =>
          `flex items-center gap-3 mt-3 px-2 py-2 rounded-lg ${
            isActive
              ? "bg-[#1677F2] text-white"
              : "hover:bg-[#132D4D] text-[#84b1f3]"
          }`
        }
      >
        <i className="fa-solid fa-bars-staggered"></i>
        <p>View Categories</p>
      </NavLink>

      {/* Logout */}
      <div onClick={logout} className="mt-auto mb-5 flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#132D4D] cursor-pointer">
        <i className="text-[#84b1f3] fa-solid fa-right-from-bracket"></i>

        <p  className="text-[#84b1f3]">
          Logout
        </p>
      </div>

    </section>

  

</>
  );
};

export default Sidebar;