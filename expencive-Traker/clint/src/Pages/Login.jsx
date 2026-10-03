import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const Login = () => {
  const { URL,setLogin} = useContext(StoreContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const onSubmitHandler = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${URL}/api/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

 

    if (response.data.success) {
      setLogin(true)
      const accessToken = response.data.accessToken;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      localStorage.setItem("email", response.data.user.email);

      toast.success(response.data.message || "Login successful");

      navigate("/dashbord");
    } else {
      toast.error(response.data.message || "Login failed");
    }
  } catch (error) {
    console.log("Login error:", error);

    if (error.response) {
      toast.error(
        error.response.data?.message || "Invalid email or password"
      );
    } else {
      toast.error("Something went wrong");
    }
  }
};

  return (
    <div className="min-h-screen w-full bg-[#F6F7FB] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm overflow-hidden flex min-h-[560px]">
        {/* LEFT SIDE */}
        <div className="hidden md:block w-[45%] bg-[#F1F6FF] px-8 py-8">
          <div className="flex gap-2 text-black text-2xl justify-center items-center font-semibold mb-10">
            <img src={assets.logo} alt="Expense Tracker" className="w-16" />

            <h1>Expense Tracker</h1>
          </div>

          <h1 className="text-3xl font-bold text-[#13294B] leading-tight">
            Take Control of
            <br />
            Your Finances
          </h1>

          <p className="mt-4 text-sm text-gray-500 leading-6 max-w-xs">
            Track your income, manage your expenses and build a better financial
            future.
          </p>

          <div className="mt-8 flex justify-center">
            <img
              src={assets.poster}
              alt="Expense Tracker"
              className="w-[85%] max-w-sm object-contain"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-[55%] px-6 sm:px-10 py-10 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#13294B]">
                Welcome Back
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Login to continue managing your finances.
              </p>
            </div>

            <form onSubmit={onSubmitHandler}>
              {/* EMAIL */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:border-[#13294B] focus:ring-1 focus:ring-[#13294B]"
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:border-[#13294B] focus:ring-1 focus:ring-[#13294B]"
                />
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="w-full bg-[#13294B] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#0e203b] transition"
              >
                Login
              </button>
            </form>

            {/* REGISTER */}
            <p className="text-center text-sm text-gray-500 mt-7">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-[#315B9B] font-semibold hover:underline"
              >
                Register
              </button>
            </p>
            <p className="text-center text-sm text-gray-500 mt-7">
              Don't remember your password?{" "}
              <button
                type="button"
                onClick={() => navigate("/forget-password")}
                className="text-[#315B9B] font-semibold hover:underline"
              >
                Forget Password
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
