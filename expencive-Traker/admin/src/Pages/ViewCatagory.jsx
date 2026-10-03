import React, { useContext, useEffect, useState } from "react";

import { StoreContext } from "../Context/StoreContextProvider";

const ViewCatagory = () => {
  const { URL, categories, getCategories } = useContext(StoreContext);

  // Search
  const [search, setSearch] = useState("");

  // Category filter
  const [filterType, setFilterType] = useState("all");

  // ================= GET CATEGORIES =================

  useEffect(() => {
    getCategories();
  }, [URL]);

  // ================= FILTER CATEGORIES =================

  const filteredCategories = categories?.filter((item) => {
    const searchValue = search.toLowerCase().trim();

    const matchSearch =
      item.category.toLowerCase().includes(searchValue) ||
      item.type.toLowerCase().includes(searchValue);

    const matchType = filterType === "all" || item.type === filterType;

    return matchSearch && matchType;
  });

  // ================= CATEGORY COUNTS =================

  const totalCategories = categories?.length || 0;

  const incomeCategories =
    categories?.filter((item) => item.type === "income").length || 0;

  const expenseCategories =
    categories?.filter((item) => item.type === "expense").length || 0;

  // ================= DATE FORMAT =================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-[95%] mx-auto pb-6">
      {/* PAGE HEADER */}

      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#0B1D35]">
          Categories
        </h2>

        <p className="text-sm md:text-base text-gray-500 mt-1">
          View all categories created and managed by the admin.
        </p>
      </div>

      {/* INFORMATION BOX */}

      <div className="w-full bg-blue-50 border border-blue-200 rounded-md px-4 py-3 mb-4">
        <p className="text-sm md:text-base text-blue-700">
          These categories are created and managed by the admin. You can use
          them while adding transactions.
        </p>
      </div>

      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {/* TOTAL CATEGORIES */}

        <div className="bg-white border border-gray-200 rounded-md p-4">
          <p className="text-sm text-gray-500">Total Categories</p>

          <h3 className="text-2xl font-semibold text-[#0B1D35] mt-2">
            {totalCategories}
          </h3>

          <p className="text-xs text-gray-400 mt-1">All categories</p>
        </div>

        {/* INCOME CATEGORIES */}

        <div className="bg-white border border-gray-200 rounded-md p-4">
          <p className="text-sm text-gray-500">Income Categories</p>

          <h3 className="text-2xl font-semibold text-green-500 mt-2">
            {incomeCategories}
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            Categories used for income
          </p>
        </div>

        {/* EXPENSE CATEGORIES */}

        <div className="bg-white border border-gray-200 rounded-md p-4">
          <p className="text-sm text-gray-500">Expense Categories</p>

          <h3 className="text-2xl font-semibold text-red-500 mt-2">
            {expenseCategories}
          </h3>

          <p className="text-xs text-gray-400 mt-1">
            Categories used for expenses
          </p>
        </div>
      </div>

      {/* CATEGORY TABLE CONTAINER */}

      <div className="w-full bg-white rounded-md border border-gray-200 p-4">
        {/* SEARCH AND FILTER */}

        <div className="flex flex-col md:flex-row gap-3 justify-between mb-4">
          {/* SEARCH */}

          <div className="w-full md:w-[70%]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[#3E7FFD] text-sm"
            />
          </div>

          {/* FILTER */}

          <div className="w-full md:w-[30%]">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-[#3E7FFD] text-sm bg-white"
            >
              <option value="all">All Categories</option>

              <option value="income">Income</option>

              <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        {/* TABLE HEADER */}

        <div className="flex justify-between items-center mb-3">
          <div>
            <h3 className="text-lg font-semibold text-[#0B1D35]">
              All Categories
            </h3>

            <p className="text-sm text-gray-500">
              {filteredCategories?.length || 0} categories found
            </p>
          </div>
        </div>

        {/* TABLE */}

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse">
            {/* TABLE HEAD */}

            <thead>
              <tr className="bg-[#F0F5FF] border border-gray-200">
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#0B1D35]">
                  #
                </th>

                <th className="text-left px-4 py-3 text-sm font-semibold text-[#0B1D35]">
                  Category Name
                </th>

                <th className="text-left px-4 py-3 text-sm font-semibold text-[#0B1D35]">
                  Type
                </th>

                <th className="text-left px-4 py-3 text-sm font-semibold text-[#0B1D35]">
                  Created At
                </th>

                <th className="text-left px-4 py-3 text-sm font-semibold text-[#0B1D35]">
                  Updated At
                </th>
              </tr>
            </thead>

            {/* TABLE BODY */}

            <tbody>
              {filteredCategories?.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-x border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* NUMBER */}

                  <td className="px-4 py-4 text-sm text-gray-500">
                    {index + 1}
                  </td>

                  {/* CATEGORY NAME */}

                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-800">
                      {item.category}
                    </p>
                  </td>

                  {/* TYPE */}

                  <td className="px-4 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  {/* CREATED AT */}

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(item.createdAt)}
                  </td>

                  {/* UPDATED AT */}

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(item.updatedAt)}
                  </td>
                </tr>
              ))}

              {/* NO CATEGORY */}

              {filteredCategories?.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-500">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewCatagory;
