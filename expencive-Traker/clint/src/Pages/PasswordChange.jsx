import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const PasswordChange = () => {
  const { URL, setLogin } = useContext(StoreContext);
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Client-side validation
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

if (newPassword === oldPassword) {
  toast.error("New password cannot be same as old password");
  return;
}

// Confirm password validation
if (newPassword !== confirmPassword) {
  toast.error("Passwords do not match");
  return;
}

    const email = localStorage.getItem("email");
    const accessToken = localStorage.getItem("accessToken");

    try {
      setLoading(true);

      const response = await axios.patch(
        `${URL}/api/auth/change-password`,
        {
          email,
          oldPassword,
          newPassword,
        },
        {
          withCredentials: true,
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Password changed successfully");

        // Backend logs the user out of all devices, so clear local data too
        localStorage.removeItem("accessToken");
        localStorage.removeItem("email");
        setLogin(false);

        navigate("/login");
      } else {
        toast.error(response.data.message || "Failed to change password");
      }
    } catch (error) {
      console.log("Change password error:", error);

      if (error.response) {
        toast.error(
          error.response.data?.message || "Failed to change password"
        );
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-lg outline-none text-sm focus:border-[#13294B] focus:ring-1 focus:ring-[#13294B]";

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
            Keep Your
            <br />
            Account Secure
          </h1>

          <p className="mt-4 text-sm text-gray-500 leading-6 max-w-xs">
            Choose a strong password you don't use anywhere else. You'll be
            logged out of all devices after changing it.
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
                Change Password
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Enter your current password and choose a new one.
              </p>
            </div>

            <form onSubmit={onSubmitHandler}>
              {/* OLD PASSWORD */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter your current password"
                  required
                  autoComplete="current-password"
                  className={inputClass}
                />
              </div>

              {/* NEW PASSWORD */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  required
                  autoComplete="new-password"
                  className={inputClass}
                />

                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-2">
                    Passwords don't match
                  </p>
                )}
              </div>

              {/* SHOW PASSWORD */}
              <label className="flex items-center gap-2 text-sm text-gray-500 mb-6 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="accent-[#13294B]"
                />
                Show passwords
              </label>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#13294B] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#0e203b] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Changing password..." : "Change Password"}
              </button>
            </form>

            {/* BACK */}
            <p className="text-center text-sm text-gray-500 mt-7">
              Changed your mind?{" "}
              <button
                type="button"
                onClick={() => navigate("/dashbord")}
                className="text-[#315B9B] font-semibold hover:underline"
              >
                Back to Dashboard
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;