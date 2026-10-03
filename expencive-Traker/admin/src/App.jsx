
import React, { useContext } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./Pages/LoginPage";

import AddCatagory from "./Pages/AddCatagory";
import ViewCatagory from "./Pages/ViewCatagory";

import Sidebar from "./Component/Sidebar";
import TopNav from "./Component/TopNav";

import { StoreContext } from "./Context/StoreContextProvider";

const App = () => {
  const { toggleLaptop, login, checkingLogin } = useContext(StoreContext);

  return (
    <BrowserRouter>

      {checkingLogin ? (
        <div>Loading...</div>
      ) : !login ? (
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      ) : (
        <div className="min-h-screen bg-[#F4F7FC]">

          <Sidebar />

          <TopNav />

          <main
            className={`pt-[50px]  ${
              toggleLaptop
                ? "md:ml-[30%] lg:ml-[15%]"
                : ""
            } min-h-screen`}
          >

            <Routes>

              <Route
                path="/add-category"
                element={<AddCatagory />}
              />

              <Route
                path="/view-category"
                element={<ViewCatagory />}
              />

            </Routes>

          </main>

        </div>
      )}

      <ToastContainer />

    </BrowserRouter>
  );
};

export default App;

