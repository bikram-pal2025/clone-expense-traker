
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";

const Register = () => {
  const { URL } = useContext(StoreContext);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    confirmPassword: "",
    status: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      number,
      dateOfBirth,
      gender,
      password,
      confirmPassword,
      status,
    } = formData;

    // Name validation
    if (name.trim().length < 3) {
      toast.error("Name must contain at least 3 characters");
      return;
    }

    // Email validation
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    // Phone number validation
if (!/^\d{10}$/.test(number)) {
  toast.error("Please enter a valid 10 digit phone number");
  return;
};

    // Date of birth validation
    if (!dateOfBirth) {
      toast.error("Please select your date of birth");
      return;
    }



    // Gender validation
    if (!gender) {
      toast.error("Please select your gender");
      return;
    }

    // Status validation
    if (!status) {
      toast.error("Please select your status");
      return;
    }

    // Password validation
    if (
      !password.includes("@") ||
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      toast.error(
        "Password must be at least 8 characters and contain @, one uppercase letter, and one number."
      );
      return;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/api/auth/register`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "Registration successful"
        );

        localStorage.setItem("registerEmail", email);

        localStorage.setItem(
          "otpExpiry",
          Date.now() + 2 * 60 * 1000
        );

        // Reset form
        setFormData({
          name: "",
          email: "",
          number: "",
          dateOfBirth: "",
          gender: "",
          password: "",
          confirmPassword: "",
          status: "",
        });

        // Go to OTP verification
        navigate("/verify-otp");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F6F7FB] flex items-center justify-center p-4">

      {/* MAIN CARD */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm overflow-hidden flex">

        {/* ================= LEFT ================= */}
        <div className="hidden md:block w-[45%] bg-[#F1F6FF] px-8 py-8">

          {/* LOGO */}
          <div className="flex gap-2 text-black text-3xl justify-center items-center font-semibold mb-10">
            <img
              src={assets.logo}
              alt="Expense Tracker"
              className="w-20"
            />

            <h1>Expense Tracker</h1>
          </div>

          {/* TEXT */}
          <h1 className="text-3xl font-bold text-[#13294B] leading-tight">
            Take Control of
            <br />
            Your Finances
          </h1>

          <p className="mt-4 text-sm text-gray-500 leading-6 max-w-xs">
            Track your income, manage your expenses and build a better
            financial future.
          </p>

          {/* IMAGE */}
          <div className="mt-8 flex justify-center">
            <img
              src={assets.poster}
              alt="Expense Tracker"
              className="w-[85%] max-w-sm object-contain"
            />
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="w-full md:w-[55%] px-7 sm:px-10 py-8">

          {/* HEADING */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#13294B]">
              Create Your Account
            </h2>

            <p className="mt-1.5 text-sm text-gray-500">
              Register to start tracking your expenses
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* NAME */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-[#13294B]">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-[#13294B]">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            {/* PHONE NUMBER */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-[#13294B]">
                Phone Number
              </label>

              <input
                type="tel"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Enter your phone number"
                maxLength="10"
                inputMode="numeric"
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            {/* DATE OF BIRTH */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-[#13294B]">
                Date of Birth
              </label>

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition"
              />
            </div>

            {/* GENDER */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-[#13294B]">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition"
              >
                <option value="">
                  Select your gender
                </option>

                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>

                <option value="other">
                  Other
                </option>
              </select>
            </div>

            {/* STATUS */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-[#13294B]">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition"
              >
                <option value="">
                  Select your status
                </option>

                <option value="employed">
                  Employed
                </option>

                <option value="unemployed">
                  Unemployed
                </option>

                <option value="student">
                  Student
                </option>
              </select>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-[#13294B]">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="w-full h-11 rounded-lg border border-gray-200 px-4 pr-16 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-[#13294B]">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full h-11 rounded-lg border border-gray-200 px-4 pr-16 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 transition"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              className="w-full h-11 mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
            >
              Register →
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="text-xs text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* LOGIN */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}

            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;

