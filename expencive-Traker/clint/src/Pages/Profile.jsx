import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {

  const navigate = useNavigate()
  const {
    URL,
    profileData,
    setProfileData,
    getSummary,
    summary,
    setLoading,
    loading,
    getMe,
  } = useContext(StoreContext);

  const [saving, setSaving] = useState(false);
  const [from, setFrom] = useState(false);

  const [updateProfileDta, setUpdateProfileDta] = useState({
    name: "",
    status: "student",
    gender: "",
    number: "",
    dateOfBirth: "",
  });

  const getHeaders = () => ({
    Authorization: `Bearer${" "}${localStorage.getItem("accessToken")}`,
  });

  const fillProfileForm = (user) => {
    setUpdateProfileDta({
      name: user?.name || "",
      status: user?.status || "student",
      gender: user?.gender || "",
      number: user?.number || "",
      dateOfBirth: user?.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : "",
    });
  };

  useEffect(() => {
    getMe();
    getSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateProfileDta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    fillProfileForm(profileData);
    setFrom(true);
  };

  const handleCancel = () => {
    fillProfileForm(profileData);
    setFrom(false);
  };

    

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      setSaving(true);

      const response = await axios.put(
        `${URL}/api/profile/update-profile`,
        updateProfileDta,
        { headers: getHeaders() },
      );
    

      if (response.data?.success) {
        const updatedUser = {
          ...profileData,
          ...updateProfileDta,
        };

        setProfileData(updatedUser);
        fillProfileForm(updatedUser);
        setFrom(false);

        toast.success(response.data.message || "Profile updated successfully");
      } else {
        toast.error(response.data?.message || "Update failed");
      }
    } catch (error) {
      console.log("Update error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);

  if (loading) {
    return (
      <div className="w-full min-w-0 min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              My Profile
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your personal information and expenses.
            </p>
          </div>

           <button
              onClick={ ()=> navigate("/change-password")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
            >
              <i className="fa-solid fa-pen-to-square mr-2 capitalize " />
             change password
            </button>

          {!from && (
            <button
              onClick={handleEdit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
            >
              <i className="fa-solid fa-pen-to-square mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Profile Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 sm:p-8 text-white shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-20 h-20 shrink-0 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-3xl font-bold">
              {(profileData?.name || "U").trim().charAt(0).toUpperCase()}
            </div>

            <div className="text-center sm:text-left flex-1 min-w-0">
              <h2 className="text-2xl font-bold break-words">
                {profileData?.name?.trim() || "User"}
              </h2>

              <p className="text-indigo-100 mt-1 break-all">
                {profileData?.email || ""}
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                <span className="bg-white/15 px-3 py-1 rounded-full text-sm capitalize">
                  <i className="fa-solid fa-user-graduate mr-2" />
                  {profileData?.status || "Student"}
                </span>

                <span className="bg-white/15 px-3 py-1 rounded-full text-sm">
                  <i className="fa-solid fa-circle-check mr-2" />
                  Verified Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className=" text-gray-500 text-sm">Total Balance</p>
              <i className="fa-solid fa-wallet text-indigo-600 text-xl" />
            </div>
            <h3
              className={`${
                summary.totalBalance < 0
                  ? "text-red-600"
                  : summary.totalBalance === 0
                    ? "text-blue-500"
                    : "text-green-500"
              } text-xl font-bold text-gray-800 mt-3 break-words`}
            >
              {formatCurrency(summary.totalBalance)}
            </h3>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-gray-500 text-sm">Total Income</p>
              <i className="fa-solid fa-arrow-down text-green-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-green-600 mt-3 break-words">
              {formatCurrency(summary.totalIncome)}
            </h3>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-gray-500 text-sm">Total Expenses</p>
              <i className="fa-solid fa-arrow-up text-red-500 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-red-500 mt-3 break-words">
              {formatCurrency(summary.totalExpense)}
            </h3>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-gray-500 text-sm">Transactions</p>
              <i className="fa-solid fa-receipt text-violet-600 text-xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-3">
              {summary.totalTransactions}
            </h3>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Personal Information
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Your account and personal details.
            </p>
          </div>

          {from ? (
            <form onSubmit={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={updateProfileDta.name}
                    onChange={handleChange}
                    required
                    minLength={3}
                    className="w-full min-w-0 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData?.email || ""}
                    readOnly
                    className="w-full min-w-0 bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={updateProfileDta.status}
                    onChange={handleChange}
                    className="w-full min-w-0 border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-indigo-500"
                  >
                    <option value="student">Student</option>
                    <option value="employed">Employed</option>
                    <option value="unemployed">Unemployed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={updateProfileDta.gender}
                    onChange={handleChange}
                    className="w-full min-w-0 border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-indigo-500"
                  >
                    
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="number"
                    value={updateProfileDta.number}
                    onChange={handleChange}
                    className="w-full min-w-0 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={updateProfileDta.dateOfBirth}
                    onChange={handleChange}
                    className="w-full min-w-0 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-7">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-6 py-3 rounded-xl font-medium"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">Full Name</p>
                <p className="font-medium text-gray-800 break-words">
                  {profileData?.name?.trim() || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Email Address</p>
                <p className="font-medium text-gray-800 break-all">
                  {profileData?.email || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Account Status</p>
                <p className="font-medium text-gray-800 capitalize">
                  {profileData?.status || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Gender</p>
                <p className="font-medium text-gray-800 capitalize">
                  {profileData?.gender || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Phone Number</p>
                <p className="font-medium text-gray-800">
                  {profileData?.number || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Date of Birth</p>
                <p className="font-medium text-gray-800">
                  {profileData?.dateOfBirth
                    ? new Date(profileData.dateOfBirth).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        },
                      )
                    : "Not provided"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
