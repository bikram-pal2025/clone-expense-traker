
import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Transaction from "./Pages/Transaction";
import VerifyOtp from "./Pages/VerifyOtp";
import Dashbord from "./Pages/Dashbord";
import ForgetPassword from "./Pages/ForgetPassword";

import { StoreContext } from "./context/StoreContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from "./Component/Sidebar";
import Topbar from "./Component/Topbar";
import CreateTransaction from "./Pages/CreateTransaction";
import PasswordChange from "./Pages/PasswordChange";

// Keep this component outside App
const ProtectedLayout = ({ children, toggle, toggleLaptop }) => {
  return (
    <div
      className={`
        ${toggleLaptop ? "md:ml-[30%] lg:ml-[15%] md:mt-[15px]" : ""}
        ${toggle ? "hidden md:block" : ""}
      `}
    >
      {children}
    </div>
  );
};

const App = () => {
  const {
    login,
    checkLogin,
    toggle,
    toggleLaptop,
  } = useContext(StoreContext);

  if (checkLogin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking login...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {login && (
        <>
          <Sidebar />
          <Topbar />
        </>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={login ? "/dashbord" : "/login"}
              replace
            />
          }
        />

        <Route
          path="/login"
          element={
            login ? (
              <Navigate to="/dashbord" replace />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            login ? (
              <Navigate to="/dashbord" replace />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/verify-otp"
          element={
            login ? (
              <Navigate to="/dashbord" replace />
            ) : (
              <VerifyOtp />
            )
          }
        />

        <Route
          path="/forget-password"
          element={
            
              <ForgetPassword />
           
          }
        />

        <Route
          path="/dashbord"
          element={
            login ? (
              <ProtectedLayout
                toggle={toggle}
                toggleLaptop={toggleLaptop}
              >
                <Dashbord />
              </ProtectedLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/change-password"
          element={
            login ? (
              <ProtectedLayout
                toggle={toggle}
                toggleLaptop={toggleLaptop}
              >
               <PasswordChange/>
              </ProtectedLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/profile"
          element={
            login ? (
              <ProtectedLayout
                toggle={toggle}
                toggleLaptop={toggleLaptop}
              >
                <Profile />
              </ProtectedLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/transaction"
          element={
            login ? (
              <ProtectedLayout
                toggle={toggle}
                toggleLaptop={toggleLaptop}
              >
                <Transaction />
              </ProtectedLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/create-transaction"
          element={
            login ? (
              <ProtectedLayout
                toggle={toggle}
                toggleLaptop={toggleLaptop}
              >
                <CreateTransaction />
              </ProtectedLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={login ? "/dashbord" : "/login"}
              replace
            />
          }
        />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;