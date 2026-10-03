
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../context/StoreContext";

const Transaction = () => {
  const { URL, transactions, getTransactions } = useContext(StoreContext);
  const [type, setType] = useState("all");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getTransactions();
  }, []);

  const getCategoryName = (category) => {
    if (typeof category === "string") return category;

    return category?.category || category?.name || "";
  };

  const filteredTransactions = [...(transactions || [])]
    .filter((item) => type === "all" || item.type === type)
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date || 0) -
        new Date(a.createdAt || a.date || 0)
    );

  const formatCurrency = (amount) =>
    Number(amount || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Date unavailable";
    }

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Delete transaction
  const deleteTransaction = async (item) => {
    const categoryName =
      getCategoryName(item.category) || "Uncategorized";

    const transactionName =
      item.title?.trim() || categoryName;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete this transaction?\n\n` +
        `Transaction: ${transactionName}\n` +
        `Category: ${categoryName}\n` +
        `Type: ${item.type}\n` +
        `Amount: ${formatCurrency(item.amount)}\n\n` +
        `This action cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(item._id);

      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.delete(
        `${URL}/api/transation/deleteone-transation/${item._id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Transaction deleted successfully");
        await getTransactions();
      } else {
        toast.error(
          response.data.message || "Failed to delete transaction"
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete transaction"
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F2F7FB] p-4 sm:p-6">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {/* Header and Filter */}
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 p-4">
          <p className="text-sm font-semibold text-gray-800">
            Transactions ({filteredTransactions.length})
          </p>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="max-w-[170px] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-green-500"
          >
            <option value="all">All Transactions</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Transaction List */}
        <div className="divide-y divide-gray-100 px-3 sm:px-5">
          {filteredTransactions.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">
              No {type === "all" ? "" : `${type} `}transactions found.
            </p>
          ) : (
            filteredTransactions.map((item) => {
              const categoryName = getCategoryName(item.category);

              const displayName =
                item.title?.trim() ||
                categoryName ||
                "Transaction";

              return (
                <div
                  key={item._id}
                  className="flex items-center gap-2 py-3 sm:gap-3"
                >
                  {/* Icon */}
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      item.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    <i
                      className={`fa-solid text-sm ${
                        item.type === "income"
                          ? "fa-arrow-down"
                          : "fa-arrow-up"
                      }`}
                    ></i>
                  </div>

                  {/* Transaction Details */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {displayName}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs capitalize text-gray-500">
                        {categoryName || item.type}
                      </span>

                      <span className="text-xs text-gray-400">
                        <i className="fa-regular fa-calendar mr-1"></i>
                        {formatDate(item.date || item.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="shrink-0 text-right">
                    <p
                      className={`text-xs font-bold sm:text-sm ${
                        item.type === "income"
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {item.type === "income" ? "+" : "-"}
                      {formatCurrency(item.amount)}
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      {item.type === "income"
                        ? "Received"
                        : "Spent"}
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => deleteTransaction(item)}
                    disabled={deletingId === item._id}
                    title="Delete transaction"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <i
                      className={`fa-solid ${
                        deletingId === item._id
                          ? "fa-spinner fa-spin"
                          : "fa-trash"
                      }`}
                    ></i>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;