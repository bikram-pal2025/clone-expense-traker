import React, { useContext, useEffect, useState } from "react";

import { assets } from "../assets/assets";

import { StoreContext } from "../context/StoreContext";

import axios from "axios";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const { URL,setLogin} = useContext(StoreContext);

  const navigate = useNavigate();

  // 0 = Enter Email
  // 1 = Enter OTP
  // 2 = Reset Password
  const [count, setCount] = useState(0);

  const [forgerPasswordEmail, setForgerPasswordEmail] = useState("");

  const [forgetPasswordOtp, setForgetPasswordOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [time, setTime] = useState(0);

  // Show / Hide password
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading
  const [loading, setLoading] = useState(false);

  const [resendLoading, setResendLoading] = useState(false);

  // ==========================================
  // SEND EMAIL
  // ==========================================

  const sebmitEmail = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        `${URL}/api/auth/forget-password`,
        {
          email: forgerPasswordEmail,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Store email
        localStorage.setItem(
          "forgetPasswordEmail",
          forgerPasswordEmail
        );

        // OTP expires after 120 seconds
        localStorage.setItem(
          "otpExpiry",
          Date.now() + 2 * 60 * 1000
        );

        // Start timer from 120 seconds
        setTime(120);

        // Move to OTP page
        setCount(1);

        toast.success(
          response.data.message || "OTP sent successfully"
        );

        setForgerPasswordEmail("");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(
          error.response.data?.message || "Invalid email"
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VERIFY OTP
  // ==========================================

  const submitOtp = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const email = localStorage.getItem(
        "forgetPasswordEmail"
      );

      if (!email) {
        toast.error(
          "Email not found. Please try again."
        );

        setCount(0);

        return;
      }

      console.log("Sending:", {
        email: email,
        otp: forgetPasswordOtp,
      });

      const response = await axios.post(
        `${URL}/api/auth/verify-forgot-password-otp`,
        {
          email: email,
          otp: forgetPasswordOtp,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Move to reset password page
        setCount(2);

        setForgetPasswordOtp("");

        // OTP timer is no longer needed
        localStorage.removeItem("otpExpiry");

        setTime(0);

        toast.success(
          response.data.message ||
            "OTP verified successfully"
        );
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(
          error.response.data?.message ||
            "Invalid OTP"
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESET PASSWORD
  // ==========================================

  const resetPassword = async (e) => {
    e.preventDefault();

    // Password validation
    if (
      !newPassword.includes("@") ||
      newPassword.length < 8 ||
      !/[A-Z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword)
    ) {
      toast.error(
        "Password must be at least 8 characters and contain @, one uppercase letter, and one number."
      );

      return;
    }

    // Confirm password
    if (newPassword !== confirmPassword) {
      toast.error(
        "Password and confirm password do not match"
      );

      return;
    }

    setLoading(true);

    try {
      const email = localStorage.getItem(
        "forgetPasswordEmail"
      );

      if (!email) {
        toast.error(
          "Email not found. Please start again."
        );

        setCount(0);

        return;
      }

      const response = await axios.post(
        `${URL}/api/auth/reset-password`,
        {
          email: email,
          newPassword: newPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
         localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        setLogin(false)
        navigate("/login");
        toast.success(

          response.data.message ||
            "Password reset successfully"
        );

        // Remove forgot password data
        localStorage.removeItem(
          "forgetPasswordEmail"
        );

        localStorage.removeItem("otpExpiry");

        // Clear form
        setNewPassword("");
        setConfirmPassword("");

        // User must login again
       
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(
          error.response.data?.message ||
            "Password reset failed"
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESEND OTP
  // ==========================================

  const resendOtp = async () => {
    setResendLoading(true);

    try {
      const email = localStorage.getItem(
        "forgetPasswordEmail"
      );

      if (!email) {
        toast.error(
          "Email not found. Please start again."
        );

        setCount(0);

        return;
      }

      const response = await axios.post(
        `${URL}/api/auth/resend-otp`,
        {
          email: email,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // New OTP expires after 120 seconds
        localStorage.setItem(
          "otpExpiry",
          Date.now() + 2 * 60 * 1000
        );

        // Reset timer
        setTime(120);

        // Clear old OTP input
        setForgetPasswordOtp("");

        toast.success(
          response.data.message ||
            "New OTP sent successfully"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to resend OTP"
      );
    } finally {
      setResendLoading(false);
    }
  };

  // ==========================================
  // OTP TIMER
  // ==========================================

  useEffect(() => {
    if (count !== 1) {
      return;
    }

    const updateTimer = () => {
      const expiry =
        localStorage.getItem("otpExpiry");

      if (!expiry) {
        setTime(0);
        return;
      }

      const remaining = Math.ceil(
        (Number(expiry) - Date.now()) / 1000
      );

      if (remaining <= 0) {
        setTime(0);

        localStorage.removeItem("otpExpiry");

        return;
      }

      setTime(remaining);
    };

    // Run immediately
    updateTimer();

    // Run every second
    const timer = setInterval(
      updateTimer,
      1000
    );

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  return (
    <>
      {/* ==========================================
          LOADING SCREEN
      ========================================== */}

      {loading && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[#13294B] rounded-full animate-spin"></div>

          <p className="mt-4 text-sm font-medium text-[#13294B]">
            Please wait...
          </p>
        </div>
      )}

      <div className="min-h-screen w-full bg-[#F6F7FB] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm overflow-hidden flex min-h-[560px]">

          {/* ==========================================
              LEFT SIDE
          ========================================== */}

          <div className="hidden md:block w-[45%] bg-[#F1F6FF] px-8 py-8">

            <div className="flex gap-2 text-black text-2xl justify-center items-center font-semibold mb-10">
              <img
                src={assets.logo}
                alt="Expense Tracker"
                className="w-16"
              />

              <h1>Expense Tracker</h1>
            </div>

            <h1 className="text-3xl font-bold text-[#13294B] leading-tight">
              Take Control of
              <br />
              Your Finances
            </h1>

            <p className="mt-4 text-sm text-gray-500 leading-6 max-w-xs">
              Track your income, manage your expenses
              and build a better financial future.
            </p>

            <div className="mt-8 flex justify-center">
              <img
                src={assets.poster}
                alt="Expense Tracker"
                className="w-[85%] max-w-sm object-contain"
              />
            </div>

          </div>

          {/* ==========================================
              RIGHT SIDE
          ========================================== */}

          {/* ==========================================
              STEP 1 - EMAIL
          ========================================== */}

          {count === 0 && (
            <form
              onSubmit={sebmitEmail}
              className="w-full md:w-[55%] min-h-[500px] flex flex-col justify-center items-center px-8"
            >
              <div className="flex w-full flex-col gap-3">

                <h2 className="text-2xl font-bold text-[#13294B]">
                  Forgot Password
                </h2>

                <p className="text-sm text-gray-500">
                  Enter your registered email address.
                </p>

                <input
                  placeholder="Enter Register Email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:border-[#13294B] focus:ring-1 focus:ring-[#13294B]"
                  type="email"
                  value={forgerPasswordEmail}
                  onChange={(e) =>
                    setForgerPasswordEmail(
                      e.target.value
                    )
                  }
                  required
                />

              </div>

              {/* Verify Email */}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-5 bg-[#13294B] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#0e203b] transition disabled:opacity-60"
              >
                {loading
                  ? "Sending OTP..."
                  : "Verify Email"}
              </button>

              {/* Go Home */}

              <button
                type="button"
                onClick={() => navigate("/")}
                className="w-full mt-3 border border-[#13294B] text-[#13294B] py-3 rounded-lg text-sm font-semibold hover:bg-[#13294B] hover:text-white transition"
              >
                Go Home
              </button>

            </form>
          )}

          {/* ==========================================
              STEP 2 - OTP
          ========================================== */}

          {count === 1 && (
            <form
              onSubmit={submitOtp}
              className="w-full md:w-[55%] min-h-[500px] flex flex-col justify-center items-center px-8"
            >
              <div className="flex w-full flex-col gap-3">

                {/* Heading */}

                <h2 className="text-2xl font-bold text-[#13294B]">
                  Verify OTP
                </h2>

                <p className="text-sm text-gray-500 mt-2 mb-4">
                  Enter the OTP sent to your email.
                  If you don't see it in your inbox,
                  please check your{" "}
                  <span className="font-medium text-gray-700">
                    Spam or Junk folder
                  </span>
                </p>

                {/* OTP Label */}

                <p className="text-[#13294B] text-md">
                  Enter your 6 Digit OTP
                </p>

                {/* OTP Input */}

                <input
                  placeholder="Enter 6 Digit OTP"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:border-[#13294B] focus:ring-1 focus:ring-[#13294B]"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={forgetPasswordOtp}
                  onChange={(e) =>
                    setForgetPasswordOtp(
                      e.target.value
                    )
                  }
                  required
                />

              </div>

              {/* Verify OTP Button */}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-5 bg-[#13294B] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#0e203b] transition disabled:opacity-60"
              >
                {loading
                  ? "Verifying OTP..."
                  : "Verify OTP"}
              </button>

              {/* Resend OTP */}

              <div className="text-center mt-4">

                {resendLoading ? (
                  <p className="text-sm text-gray-500">
                    Sending OTP...
                  </p>
                ) : time > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend OTP in{" "}
                    <span className="font-semibold text-blue-600">
                      {time}
                    </span>{" "}
                    seconds
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={resendLoading}
                    className="text-sm text-blue-600 font-semibold hover:underline disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}

              </div>

            </form>
          )}

          {/* ==========================================
              STEP 3 - RESET PASSWORD
          ========================================== */}

          {count === 2 && (
            <form
              onSubmit={resetPassword}
              className="w-full md:w-[55%] min-h-[500px] flex flex-col justify-center items-center px-8"
            >
              <div className="flex w-full flex-col gap-5">

                <div>
                  <h2 className="text-2xl font-bold text-[#13294B]">
                    Reset Password
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    Enter your new password below.
                  </p>
                </div>

                {/* New Password */}

                <div className="flex flex-col gap-2">

                  <label className="text-sm font-medium text-[#13294B]">
                    New Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showNewPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 pr-16 border border-gray-200 rounded-lg outline-none text-sm focus:border-[#13294B] focus:ring-1 focus:ring-[#13294B]"
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(
                          e.target.value
                        )
                      }
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowNewPassword(
                          !showNewPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#13294B] font-medium"
                    >
                      {showNewPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>

                {/* Confirm Password */}

                <div className="flex flex-col gap-2">

                  <label className="text-sm font-medium text-[#13294B]">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 pr-16 border border-gray-200 rounded-lg outline-none text-sm focus:border-[#13294B] focus:ring-1 focus:ring-[#13294B]"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          !showConfirmPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#13294B] font-medium"
                    >
                      {showConfirmPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>

              </div>

              {/* Reset Password */}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-[#13294B] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#0e203b] transition disabled:opacity-60"
              >
                {loading
                  ? "Resetting Password..."
                  : "Reset Password"}
              </button>

            </form>
          )}

        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
