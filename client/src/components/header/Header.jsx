// import React, { useContext } from "react";
// import { Link } from "react-router-dom";
// import { userContext } from "../context/Context";

// export default function Header() {
//   const { user,dispatch,role } = useContext(userContext);

//   const handleLogout = ()=>{
//     dispatch({type: 'LOGOUT'});
//   }
//   return (
//     <header className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <div className="text-2xl font-bold text-black">
//           <Link to={"/"}>Streamify</Link>
//         </div>

// {/* Navigation Links */}
// <nav className="hidden md:flex space-x-6">
//   <Link to={`/`} className="text-black hover:text-gray-600">
//     Home
//   </Link>
//   {role == 'admin' &&
//             <Link to={`/upload`} className="text-black hover:text-gray-600">
//             Upload
//           </Link>
//   }
//   {/* <Link to={"/register"} className="text-black hover:text-gray-600">
//                 Register
//             </Link> */}
//   {/* <a href="#contact" className="text-black hover:text-gray-600">
//                 Contact
//             </a> */}
// </nav>

//         {/* Action Buttons */}
//         <div className="space-x-4">
//           {user ? (
//             <>
//               <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 font-bold">
//                 {user.name.slice(0,1).toUpperCase()+user.name.slice(1).toLowerCase()}
//               </button>
//               <button className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-100" onClick={handleLogout}>
//                 LOGOUT
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to={"/login"}>
//                 <button className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-100">
//                   Login
//                 </button>
//               </Link>
//               <Link to={`/register`}>
//                 <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
//                   Sign Up
//                 </button>
//               </Link>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden flex items-center text-black">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//             stroke="currentColor"
//             className="w-6 h-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M4 6h16M4 12h16m-7 6h7"
//             />
//           </svg>
//         </button>
//       </div>
//     </header>
//   );
// }










import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/Context";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export default function Header() {
  const { user, dispatch, role } = useContext(userContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control mobile menu visibility
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the menu open/close state
  };

  const handleProfile = () => {
    navigate("/profile");
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-black">
          <Link to={"/"}>Streamify</Link>
        </div>

        {/* Navigation Links */}

        <nav className="hidden md:flex space-x-6">
          {/* <Link to={`/`} className="text-black hover:text-gray-600">
            Home
          </Link> */}
          {role == 'admin' &&
            <Link to={`/upload`} className="text-black hover:text-gray-600">
              Upload
            </Link>
          }
        </nav>

        {/* Action Buttons */}
        <div className="space-x-4">
          {user ? (
            <>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 font-bold" onClick={handleProfile}>
                {user.name.slice(0, 1).toUpperCase() + user.name.slice(1).toLowerCase()}
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-100" onClick={handleLogout}>
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <button className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-100">
                  Login
                </button>
              </Link>
              <Link to={`/register`}>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center text-black" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {/* Overlayed Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-2/5 bg-gray-200 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
      >
        <div className="flex justify-between items-center pt-4 pb-4 pl-5 bg-gray-100 border-b-gray-800 border-b-2 z-50">
          <button onClick={toggleMenu} className="text-gray-700 text-xl font-semibold">
            <div className="flex items-center text-2xl hover:text-gray-800">
              <MdOutlineKeyboardBackspace /><div className="pl-5">Back</div>
            </div>
          </button>
        </div>

        <nav className="flex flex-col items-start space-y-6 pt-5 pl-6 z-50">
          <Link
            to={`/`}
            className="text-gray-900 hover:text-gray-600 text-3xl font-medium transition-colors duration-200"
            onClick={toggleMenu}
          >
            Home
          </Link>
          {role === 'admin' && (
            <Link
              to={`/upload`}
              className="text-gray-900 hover:text-gray-700 text-3xl font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Upload
            </Link>
          )}
        </nav>
      </div>




    </header>
  );
}
