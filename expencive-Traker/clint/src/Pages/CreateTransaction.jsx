
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";

export const CreateTransaction = () => {
  const { URL} = useContext(StoreContext);

  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategory = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        `${URL}/api/category/get-category-user`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        setCategories(response.data.category || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const filteredCategories = categories.filter(
    (item) => item.type === formData.type
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "type" ? { category: "" } : {}),
    }));
  };

  const createTransaction = async (e) => {
    e.preventDefault();

    if (!formData.amount || Number(formData.amount) <= 0) {
      return toast.error("Please enter a valid amount");
    }

    if (!formData.category) {
      return toast.error("Please select a category");
    }

    try {
      setLoading(true);

      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        `${URL}/api/transation/create-transation`,
        {
          amount: Number(formData.amount),
          type: formData.type,
          category: formData.category,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Transaction created successfully");
    
        setFormData({
          amount: "",
          type: "expense",
          category: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to create transaction"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F2F7FB] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Create Transaction
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Record your income or expenses.
          </p>
        </div>

        <form
          onSubmit={createTransaction}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8"
        >
          {/* Transaction Type */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Transaction Type
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: "income",
                    category: "",
                  }))
                }
                className={`rounded-xl border px-4 py-3 font-medium transition ${
                  formData.type === "income"
                    ? "border-green-600 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <i className="fa-solid fa-arrow-down mr-2"></i>
                Income
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: "expense",
                    category: "",
                  }))
                }
                className={`rounded-xl border px-4 py-3 font-medium transition ${
                  formData.type === "expense"
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
                }`}
              >
                <i className="fa-solid fa-arrow-up mr-2"></i>
                Expense
              </button>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Amount (₹)
            </label>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                ₹
              </span>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                min="0.01"
                step="0.01"
                className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div className="mb-7">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              required
            >
              <option value="">Select a category</option>

              {filteredCategories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.category}
                </option>
              ))}
            </select>

            {filteredCategories.length === 0 && (
              <p className="mt-2 text-xs text-gray-500">
                No {formData.type} categories available.
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || filteredCategories.length === 0}
            className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              "Creating..."
            ) : (
              <>
                <i className="fa-solid fa-plus mr-2"></i>
                Create Transaction
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTransaction;