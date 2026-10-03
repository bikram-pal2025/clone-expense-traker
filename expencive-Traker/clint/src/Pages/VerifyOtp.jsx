import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const { URL } = useContext(StoreContext);
  const [otpValue, setOtpValue] = useState("");
  const [time, setTime] = useState(0);

  // Get remaining time
  const email = localStorage.getItem("registerEmail");
  useEffect(() => {
    const timer = setInterval(() => {
      const expiry = localStorage.getItem("otpExpiry");

      if (!expiry) {
        setTime(0);
        return;
      }

      const remaining = Math.floor((Number(expiry) - Date.now()) / 1000);

      if (remaining <= 0) {
        setTime(0);
        localStorage.removeItem("otpExpiry");
        clearInterval(timer);
      } else {
        setTime(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Verify OTP
  const verifyOTP = async () => {
    try {
      const response = await axios.post(
        `${URL}/api/auth/verify-email`,

        {
          email: email,
          otp: otpValue,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data.success) {
        // OTP verified successfully
        localStorage.removeItem("otpExpiry");
        localStorage.removeItem("registerEmail")
        navigate("/login");
        toast.success(response.data.message || "otp Verifiyed success Full");
      } else {
        toast.error("invalid otp");
      }
    } catch (error) {
      console.log(error);
      toast.error("internal server error try after sometime");
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    try {
      // Your resend OTP API
      await axios.post(`${URL}/api/auth/resend-otp`, {
        email: email,
      });

      // Create new 60 second timer
      localStorage.setItem("otpExpiry", Date.now() + 60 * 1000);

      setTime(60);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full bg-[#F6F7FB] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm overflow-hidden flex">
          {/* Left Side */}
          <div className="hidden md:block w-[45%] bg-[#F1F6FF] px-8 py-8">
            <div className="flex gap-2 text-black text-3xl justify-center items-center font-semibold mb-10">
              <img src={assets.logo} alt="Expense Tracker" className="w-20" />

              <h1>Expense Tracker</h1>
            </div>

            <h1 className="text-3xl font-bold text-[#13294B] leading-tight">
              Take Control of
              <br />
              Your Finances
            </h1>

            <p className="mt-4 text-sm text-gray-500 leading-6 max-w-xs">
              Track your income, manage your expenses and build a better
              financial future.
            </p>

            <div className="mt-8 flex justify-center">
              <img
                src={assets.poster}
                alt="Expense Tracker"
                className="w-[85%] max-w-sm object-contain"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-[55%] min-h-[500px] flex flex-col justify-center items-center px-8">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold text-[#13294B]">
                Verify Your Email
              </h2>
              <p className="text-sm text-gray-500 mt-2 mb-6">
                Enter the OTP sent to your email. If you don’t see it in your
                inbox, please check your{" "}
                <span className="font-medium text-gray-700">
                  Spam or Junk folder
                </span>
                .
              </p>

              <p className="text-sm text-gray-500 mt-2 mb-6">
                Please verify your account within 5 minutes. If your account
                remains unverified, it will be deleted and you will need to
                register again.
              </p>

              {/* OTP Input */}
              <input
                type="text"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                placeholder="Enter OTP"
                className="w-full px-3 py-3 rounded-md border border-gray-300 outline-none focus:border-2 focus:border-blue-600"
              />

              {/* Verify Button */}
              <button
                onClick={verifyOTP}
                className="w-full mt-4 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
              >
                Verify OTP
              </button>

              {/* Timer / Resend */}
              <div className="text-center mt-4">
                {time > 0 ? (
                  <p className="text-sm text-gray-500">
                    Resend OTP in{" "}
                    <span className="font-semibold text-blue-600">{time}</span>{" "}
                    seconds
                  </p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    className="text-sm text-blue-600 font-semibold hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
