import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Dashbord = () => {
  const {
    profileData,
    getSummary,
    summary,
    getMe,
    transactions,
    getTransactions,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  // FIX: totalBalance lives inside summary, so define it here
  const totalBalance = Number(summary?.totalBalance) || 0;

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatCreatedAt = (date) => {
    if (!date) return "Time unavailable";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Show only 4 latest transactions
  const recentTransactions = [...(transactions || [])]
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
    )
    .slice(0, 4);

  useEffect(() => {
    getMe();
    getSummary();
    getTransactions();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col gap-5 bg-[#F2F7FB] p-3 sm:p-5 lg:p-7">
      {/* Welcome Section */}
      <section className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl">
            Welcome, {profileData?.name || "User"} 👋
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Stay on track with your finances. Small steps make big progress!
          </p>
        </div>

        <div className="flex w-fit shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2">
          <i className="fa-regular fa-calendar-days text-green-600"></i>
          <span className="text-sm font-medium text-gray-700">
            {currentDate}
          </span>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Income */}
        <div className="flex min-h-[135px] flex-col justify-between rounded-xl border border-green-100 bg-green-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600/15">
              <i className="fa-solid fa-wallet text-lg text-green-700"></i>
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-500">Total Income</p>
              <h3 className="mt-1 break-words text-xl font-bold text-green-700">
                {formatCurrency(summary?.totalIncome)}
              </h3>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            <i className="fa-solid fa-arrow-trend-up mr-1 text-green-600"></i>
            Income in the last 30 days
          </p>
        </div>

        {/* Total Expenses */}
        <div className="flex min-h-[135px] flex-col justify-between rounded-xl border border-red-100 bg-red-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600/15">
              <i className="fa-solid fa-money-bill-transfer text-lg text-red-700"></i>
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-500">Total Expenses</p>
              <h3 className="mt-1 break-words text-xl font-bold text-red-700">
                {formatCurrency(summary?.totalExpense)}
              </h3>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            <i className="fa-solid fa-arrow-trend-down mr-1 text-red-600"></i>
            Expenses in the last 30 days
          </p>
        </div>

        {/* Net Balance */}
        <div className="flex min-h-[135px] flex-col justify-between rounded-xl border border-blue-100 bg-blue-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/15">
              <i className="fa-solid fa-scale-balanced text-lg text-blue-700"></i>
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-500">Net Balance</p>
              <h3
                className={`mt-1 break-words text-xl font-bold ${
                  totalBalance >= 0 ? "text-blue-700" : "text-red-600"
                }`}
              >
                {formatCurrency(totalBalance)}
              </h3>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            <i className="fa-solid fa-wallet mr-1 text-blue-600"></i>
            Your available balance
          </p>
        </div>

        {/* Total Transactions */}
        <div className="flex min-h-[135px] flex-col justify-between rounded-xl border border-purple-100 bg-purple-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600/15">
              <i className="fa-solid fa-receipt text-lg text-purple-700"></i>
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-500">Total Transactions</p>
              <h3 className="mt-1 text-xl font-bold text-purple-700">
                {summary?.totalTransactions ??
                  summary?.totalTransation ??
                  transactions?.length ??
                  0}
              </h3>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            <i className="fa-solid fa-list-check mr-1 text-purple-600"></i>
            Your transaction activity
          </p>
        </div>
      </section>

      {/* Recent Transactions and Quick Actions */}
      <section className="grid grid-cols-1 items-start gap-5 xl:grid-cols-5">
        {/* Recent Transactions */}
        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm xl:col-span-3">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-5">
            <div>
              <h2 className="text-base font-semibold text-gray-800 sm:text-lg">
                <i className="fa-solid fa-clock-rotate-left mr-2 text-green-700"></i>
                Recent Transactions
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Your latest income and expenses
              </p>
            </div>

            <button
              onClick={() => navigate("/transaction")}
              className="shrink-0 text-sm font-medium text-green-700 hover:text-green-800"
            >
              View All <i className="fa-solid fa-arrow-right ml-1"></i>
            </button>
          </div>

          {/* Transaction List */}
          <div className="divide-y divide-gray-100 px-3 sm:px-5">
            {recentTransactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <i className="fa-solid fa-receipt text-xl text-gray-400"></i>
                </div>

                <p className="font-semibold text-gray-700">
                  No transactions yet
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Start tracking your income and expenses.
                </p>

                <button
                  onClick={() => navigate("/create-transaction")}
                  className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  <i className="fa-solid fa-plus mr-2"></i>
                  Add Transaction
                </button>
              </div>
            ) : (
              recentTransactions.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-2.5 py-2.5 transition hover:bg-gray-50/70 sm:gap-3"
                >
                  {/* Transaction Icon */}
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
                      {item.title}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${
                          item.type === "income"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {item.category?.category ||
                          item.category?.name ||
                          item.type}
                      </span>

                      <span className="text-[11px] text-gray-400">
                        <i className="fa-regular fa-calendar mr-1"></i>
                        {formatDate(item.date)}
                      </span>
                    </div>

                    {/* Creation Date and Time */}
                    <p className="mt-1 text-[11px] text-gray-400">
                      <i className="fa-regular fa-clock mr-1"></i>
                      Added {formatCreatedAt(item.createdAt)}
                    </p>
                  </div>

                  {/* Amount */}
                  <div className="shrink-0 text-right">
                    <p
                      className={`text-sm font-bold ${
                        item.type === "income"
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {item.type === "income" ? "+" : "-"}
                      {formatCurrency(item.amount)}
                    </p>

                    <p className="mt-0.5 text-[10px] text-gray-400">
                      {item.type === "income" ? "Received" : "Spent"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {recentTransactions.length > 0 && (
            <div className="border-t border-gray-100 p-3">
              <button
                onClick={() => navigate("/transaction")}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-50 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-100"
              >
                <i className="fa-solid fa-list"></i>
                View All Transactions
                <i className="fa-solid fa-chevron-right ml-1"></i>
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <aside className="h-fit rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 xl:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            <i className="fa-solid fa-bolt mr-2 text-green-700"></i>
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Add Transaction */}
            <button
              onClick={() => navigate("/create-transaction")}
              className="rounded-xl border border-green-100 bg-green-50/80 p-3 text-left transition hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-sm"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-700">
                <i className="fa-solid fa-circle-plus"></i>
              </div>

              <p className="text-sm font-semibold text-gray-800">
                Add Transaction
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Record a new expense or income
              </p>
            </button>

            {/* View Transactions */}
            <button
              onClick={() => navigate("/transaction")}
              className="rounded-xl border border-blue-100 bg-blue-50/80 p-3 text-left transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-sm"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <i className="fa-solid fa-clock-rotate-left"></i>
              </div>

              <p className="text-sm font-semibold text-gray-800">
                View Transactions
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Check your transaction history
              </p>
            </button>

            {/* Edit Profile */}
            <button
              onClick={() => navigate("/profile")}
              className="rounded-xl border border-purple-100 bg-purple-50/80 p-3 text-left transition hover:-translate-y-0.5 hover:bg-purple-50 hover:shadow-sm sm:col-span-2"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                <i className="fa-solid fa-user-pen"></i>
              </div>

              <p className="text-sm font-semibold text-gray-800">
                Edit Profile
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Update your personal details
              </p>
            </button>

            {/* Forget Password */}
            <button
              onClick={() => navigate("/forget-password")}
              className="rounded-xl border border-purple-100 bg-purple-50/80 p-3 text-left transition hover:-translate-y-0.5 hover:bg-purple-50 hover:shadow-sm sm:col-span-2"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-red-700">
                <i className="fa-solid fa-user-pen"></i>
              </div>

              <p className="text-sm font-semibold text-gray-800">
                Forget Password
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Create a new password
              </p>
            </button>

            {/* Change Password (NEW) */}
            <button
              onClick={() => navigate("/change-password")}
              className="rounded-xl border border-blue-100 bg-blue-50/80 p-3 text-left transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-sm sm:col-span-2"
            >
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <i className="fa-solid fa-key"></i>
              </div>

              <p className="text-sm font-semibold text-gray-800">
                Change Password
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Update your current password
              </p>
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Dashbord;