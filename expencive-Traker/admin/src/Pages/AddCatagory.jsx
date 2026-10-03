
import React, { useContext, useEffect, useState } from "react";

import { StoreContext } from "../Context/StoreContextProvider";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { toast } from "react-toastify";

const AddCatagory = () => {
  const {
    URL,
    categories,
    setCategories,
    getCategories,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  // Add category
  const [category, setCategory] = useState("");
  const [type, setType] = useState("income");

  // Search
  const [search, setSearch] = useState("");

  // Edit
  const [editMode, setEditMode] = useState(false);
  const [editCategory, setEditCategory] = useState("");
  const [editType, setEditType] = useState("income");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Search by category and type
  const filteredCategories = categories?.filter((item) =>
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase())
  );

  // ================= ADD CATEGORY =================

  const addCategorySubmitHendler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${URL}/api/category/post-category`,
        {
          category,
          type,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Category added successfully");

        // Get latest categories
        getCategories();

        // Clear form
        setCategory("");
        setType("income");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // ================= EDIT BUTTON =================

  const editCategoryHandler = (item) => {
    setSelectedCategory(item);

    setEditCategory(item.category);
    setEditType(item.type);

    setEditMode(true);
  };

  // ================= UPDATE CATEGORY =================

  const updateCategoryHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${URL}/api/category/update-category/${selectedCategory._id}`,
        {
          category: editCategory,
          type: editType,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Category updated successfully");

        // Update category list immediately
        setCategories(
          categories.map((item) =>
            item._id === selectedCategory._id
              ? {
                  ...item,
                  category: editCategory,
                  type: editType,
                }
              : item
          )
        );

        // Close edit mode
        setEditMode(false);
        setSelectedCategory(null);

        setEditCategory("");
        setEditType("income");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // ================= DELETE CATEGORY =================

  const deleteCategoryHandler = async (item) => {
    const confirmDelete = window.confirm(
      `Do you want to delete "${item.category}" category?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        `${URL}/api/category/delete-category/${item._id}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Category deleted successfully");

        // Get latest categories
        getCategories();
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // ================= CANCEL EDIT =================

  const cancelEditHandler = () => {
    setEditMode(false);

    setSelectedCategory(null);

    setEditCategory("");
    setEditType("income");
  };

  // ================= GET CATEGORY =================

  useEffect(() => {
    getCategories();
  }, [URL]);

  return (
    <>
      <div className="w-[95%] mx-auto">

        {/* ================= PAGE TOP PART ================= */}

        <div className="flex justify-baseline items-baseline gap-3">

          <div className="h-[40px] w-[40px] bg-[#3E7FFD] flex justify-center items-center rounded-md">
            <i className="text-white text-xl fa-solid fa-tag"></i>
          </div>

          <div className="flex flex-col">

            <h2 className="text-xl font-semibold">
              Add Category
            </h2>

            <p className="text-sm md:text-base text-gray-500">
              Create a new category to organize your transaction
            </p>

          </div>

        </div>

        {/* ================= MAIN CONTENT ================= */}

        <div className="flex flex-col justify-center items-center lg:justify-between overflow-x-hidden lg:flex-row mt-3 gap-3">

          {/* ================= LEFT DIV ================= */}

          <div className="w-[100%] md:w-[80%] lg:w-[40%] p-4 flex flex-col gap-4 bg-white rounded-md">

            <h3 className="text-lg font-semibold">
              Add New Category
            </h3>

            <form
              onSubmit={addCategorySubmitHendler}
              className="w-full flex flex-col gap-4"
            >

              {/* Category Name */}

              <div className="w-full flex flex-col gap-2">

                <p className="font-semibold text-black/90">
                  Category Name
                  <span className="text-red-600">*</span>
                </p>

                <div className="text-sm text-gray-600 w-full px-3 py-2 border border-gray-400 rounded-md">

                  <input
                    type="text"
                    className="outline-none w-full"
                    placeholder="e.g. Food, Transport, Salary"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />

                </div>

              </div>

              {/* Category Type */}

              <div className="w-full flex flex-col gap-2">

                <p className="font-semibold text-black/90">
                  Category Type
                  <span className="text-red-600">*</span>
                </p>

                <div className="flex gap-3">

                  <button
                    type="button"
                    onClick={() => setType("income")}
                    className={`w-full py-2 rounded-md border ${
                      type === "income"
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-gray-700 border-gray-400"
                    }`}
                  >
                    Income
                  </button>

                  <button
                    type="button"
                    onClick={() => setType("expense")}
                    className={`w-full py-2 rounded-md border ${
                      type === "expense"
                        ? "bg-red-500 text-white border-red-500"
                        : "bg-white text-gray-700 border-gray-400"
                    }`}
                  >
                    Expense
                  </button>

                </div>

              </div>

              {/* Add Button */}

              <button
                type="submit"
                className="w-full py-2 bg-[#3E7FFD] text-white rounded-md hover:bg-[#326de0]"
              >
                Add Category
              </button>

            </form>

          </div>

          {/* ================= RIGHT DIV ================= */}

          <div className="w-[100%] md:w-[80%] lg:w-[55%]">

            {editMode ? (

              /* ================= EDIT FORM ================= */

              <div className="w-full p-4 bg-white rounded-md">

                <div className="flex justify-between items-center mb-4">

                  <h3 className="text-lg font-semibold">
                    Edit Category
                  </h3>

                  <button
                    type="button"
                    onClick={cancelEditHandler}
                    className="text-gray-500 hover:text-black"
                  >
                    Cancel
                  </button>

                </div>

                <form
                  onSubmit={updateCategoryHandler}
                  className="flex flex-col gap-4"
                >

                  {/* Category Name */}

                  <div className="flex flex-col gap-2">

                    <label className="font-semibold">
                      Category Name
                    </label>

                    <input
                      type="text"
                      value={editCategory}
                      onChange={(e) =>
                        setEditCategory(e.target.value)
                      }
                      className="border border-gray-400 rounded-md px-3 py-2 outline-none"
                      required
                    />

                  </div>

                  {/* Category Type */}

                  <div className="flex flex-col gap-2">

                    <label className="font-semibold">
                      Category Type
                    </label>

                    <div className="flex gap-3">

                      <button
                        type="button"
                        onClick={() => setEditType("income")}
                        className={`w-full py-2 rounded-md border ${
                          editType === "income"
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white text-gray-700 border-gray-400"
                        }`}
                      >
                        Income
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditType("expense")}
                        className={`w-full py-2 rounded-md border ${
                          editType === "expense"
                            ? "bg-red-500 text-white border-red-500"
                            : "bg-white text-gray-700 border-gray-400"
                        }`}
                      >
                        Expense
                      </button>

                    </div>

                  </div>

                  {/* Update Button */}

                  <button
                    type="submit"
                    className="w-full py-2 bg-[#3E7FFD] text-white rounded-md"
                  >
                    Update Category
                  </button>

                </form>

              </div>

            ) : (

              /* ================= CATEGORY LIST ================= */

              <div className="w-full bg-white rounded-md">

                {/* SEARCH SECTION */}

                <div className="p-4 border-b border-gray-200">

                  <h3 className="text-lg font-semibold mb-3">
                    Search Categories
                  </h3>

                  <div className="flex gap-2 items-center border border-gray-400 rounded-md px-3 py-2">

                    <i className="fa-solid fa-magnifying-glass text-gray-500"></i>

                    <input
                      type="text"
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      placeholder="Search category by name..."
                      className="outline-none w-full text-sm"
                    />

                  </div>

                </div>

                {/* CATEGORY HEADER */}

                <div className="p-4">

                  <div className="flex justify-between items-center mb-4">

                    <h3 className="text-lg font-semibold">
                      Existing Categories
                    </h3>

                    <button
                      type="button"
                      onClick={() => navigate("/view-category")}
                      className="px-4 py-2 bg-[#3E7FFD] text-white rounded-md"
                    >
                      View All Categories
                    </button>

                  </div>

                  {/* SCROLLABLE CATEGORY LIST */}

                  <div className="max-h-[300px] overflow-y-auto pr-1">

                    <div className="flex flex-col gap-2">

                      {filteredCategories?.map((item, index) => (

                        <div
                          key={item._id}
                          className="flex items-center justify-between border border-gray-200 rounded-md p-3"
                        >

                          {/* Category Information */}

                          <div className="flex items-center gap-3">

                            <span className="text-gray-500">
                              {index + 1}
                            </span>

                            <div>

                              <p className="font-semibold">
                                {item.category}
                              </p>

                              <p
                                className={`text-sm ${
                                  item.type === "income"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {item.type}
                              </p>

                            </div>

                          </div>

                          {/* ACTIONS */}

                          <div className="flex gap-2">

                            <button
                              type="button"
                              onClick={() =>
                                editCategoryHandler(item)
                              }
                              className="px-3 py-1 bg-blue-500 text-white rounded-md"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteCategoryHandler(item)
                              }
                              className="px-3 py-1 bg-red-500 text-white rounded-md"
                            >
                              Delete
                            </button>

                          </div>

                        </div>

                      ))}

                      {filteredCategories?.length === 0 && (

                        <p className="text-center text-gray-500 py-5">
                          No categories found
                        </p>

                      )}

                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>
    </>
  );
};

export default AddCatagory;

