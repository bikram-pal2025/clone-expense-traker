import React, {useContext} from 'react';
import {StoreContext} from '../Context/StoreContextProvider';

const TopNav = () => {
  const { toggle,setToggle,toggleLaptop, setToggleLaptop} = useContext(StoreContext);
  return (
    <>
      {/* // top nav bar for medium and large screen */}

      <section 
        className={`hidden h-[50px] bg-white sticky top-0 z-10 md:flex items-center px-3 justify-between
  ${toggleLaptop ? 'md:ml-[30%] lg:ml-[15%]' : ''} transition-all duration-400`}
      >
        <div>
          <i
            onClick={() => setToggleLaptop(!toggleLaptop)}
            className=" text-xl fa-solid fa-bars"
          ></i>
        </div>

        {/* admin secqure font */}
        <div className="flex gap-5 mr-15 justify-center items-center">
          <div className="flex justify-center items-center gap-2">
            <div>
              <i className="text-[#0768F3] text-2xl fa-solid fa-shield-halved"></i>
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-sm">Admin</p>
              <p className="text-xs">Administrator</p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <i className="text-2xl text-[#0B1D35] fa-solid fa-user-lock"></i>
          </div>
        </div>
      </section>

       {/* // for small screen */}

        <section
        className={` h-[50px] bg-white md:flex sticky top-0 items-center px-3 justify-between
  ${toggle ? 'hidden ' : 'flex'} md:hidden transition-all duration-300`}
      >

   <div>
          <i
            onClick={() => setToggle(!toggle)}
            className=" text-xl fa-solid fa-bars"
          ></i>
        </div>

{/* admin secqure font */}
        <div className="flex gap-5 mr-2 justify-center items-center">
          <div className="flex justify-center items-center gap-2">
            <div>
              <i className="text-[#0768F3] text-xl fa-solid fa-shield-halved"></i>
            </div>

            <div className="flex flex-col">
              <p className="font-bold text-sm">Admin</p>
              <p className="text-xs">Administrator</p>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <i className="text-xl text-[#0B1D35] fa-solid fa-user-lock"></i>
          </div>
        </div>



       </section>
    </>
  );
};

export default TopNav;
