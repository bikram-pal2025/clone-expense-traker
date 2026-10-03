import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
 const URL = "deploued backend || http://localhost:8000 ";

  // Sidebar
  const [toggleLaptop, setToggleLaptop] = useState(true);
  const [toggle, setToggle] = useState(false);

  // Login
  const [login, setLogin] = useState(false);
  const [checkLogin, setCheckLogin] = useState(true);

  // Profile Data
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);

  // Summary data
  const [summary, setSummary] = useState({
    totalBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    totalTransactions: 0,
  });

  // Transactions
  const [transactions, setTransactions] = useState([]);

  // Get transactions
  const getTransactions = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      const response = await axios.get(`${URL}/api/transation/get-transation`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setTransactions(response.data.transactions || []);
    } catch (error) {
      console.log("Transactions error:", error.response?.data || error.message);
    }
  };

  // Check user login status
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          setLogin(false);
          return;
        }

        const response = await axios.get(`${URL}/api/auth/user-check`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setLogin(!!response.data.success);
      } catch (error) {
        console.log(
          "Login check error:",
          error.response?.data || error.message
        );

        const status = error.response?.status;

        if (status === 401 || status === 403) {
          // Token is really invalid or expired
          setLogin(false);
          localStorage.removeItem("accessToken");
        } else {
          // Network error or server waking up: don't log the user out
          setLogin(!!localStorage.getItem("accessToken"));
        }
      } finally {
        setCheckLogin(false);
      }
    };

    checkUserLogin();
  }, [URL]);

  // Get summary
  const getSummary = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      // FIX: withCredentials belongs in the config, not inside headers
      const response = await axios.get(`${URL}/api/transation/summary`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = response.data.summary;

      // FIX: handles both "success" and the old "sucess" spelling
      const ok = response.data.success ?? response.data.sucess;

      if (ok && data) {
        setSummary({
          totalBalance: data.balance ?? 0,
          totalIncome: data.totalIncome ?? 0,
          totalExpense: data.totalExpense ?? 0,
          totalTransactions: data.totalTransation ?? 0,
        });
      }
    } catch (error) {
      console.log("Summary error:", error.response?.data || error.message);
    }
  };

  // Get me
  const getMe = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        toast.error("Please login first");
        return;
      }

      const response = await axios.get(`${URL}/api/profile/get-me`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data?.success) {
        // FIX: removed fillProfileForm(user), it is not defined in this file
        setProfileData(response.data);
      }
    } catch (error) {
      console.log("Profile error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    URL,

    // Login
    login,
    setLogin,
    checkLogin,
    setCheckLogin,

    // Sidebar
    toggle,
    setToggle,
    toggleLaptop,
    setToggleLaptop,

    // Profile
    profileData,
    setProfileData,
    getMe,
    loading,
    setLoading,

    // Summary
    getSummary,
    summary,
    setSummary,

    // Transactions
    transactions,
    setTransactions,
    getTransactions,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext };
export default StoreContextProvider;