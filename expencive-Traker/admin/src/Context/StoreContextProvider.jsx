import axios from "axios";
import { createContext, useEffect, useState } from "react";

const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const URL = "deploued backend || http://localhost:8000 ";
  // toggle state for sidebar
  const [toggle,setToggle] = useState(false);
  const [toggleLaptop, setToggleLaptop] = useState(true);
  const [checkingLogin, setCheckingLogin] = useState(true);


  // store the categors

    const [categories, setCategories] = useState([]);;

    //get Categoris

      const getCategories = async () => {
        try {
          const response = await axios.get(
            `${URL}/api/category/get-category-admin`,
            {
              withCredentials: true,
            },
          );
    
          setCategories(response.data.category);
        } catch (error) {
          console.log(error);
        }
      };

  // for login

  const [login, setLogin] = useState(false);



  useEffect(() => {
    const checkLogin = async () => {
      try {
        const responce = await axios.get(`${URL}/api/admin/admin-status`, {
          withCredentials: true,
        });
        if ( responce.data.success) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (error) {
        console.error(error);
      } finally{
         setCheckingLogin(false);
      }
    };
 
    checkLogin()
   
  }, [URL]);

  const contextValue = {
    toggle,
    setToggle,
    toggleLaptop,
    setToggleLaptop,
    login,
    setLogin,
    URL,
    checkingLogin,
    setCheckingLogin,
    categories,
    setCategories,
    getCategories
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext };

export default StoreContextProvider;
