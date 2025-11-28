
// import React from 'react';
// import { Link } from '@tanstack/react-router';

// const Navbar = () => {
//   return (
//     <nav className="bg-white border border-b-black positon: sticky top-0 z-50">
//       <div className=" mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Left side - App Name */}
//           <div className="flex items-center">
//              <i className="fa-solid fa-scissors text-2xl text-black-600 hover:text-blue-800 transition-colors duration-300"></i>

            
//             <Link to="/" className="text-lg font-bold text-gray-800">
//               Shortly
//             </Link>
//           </div>
          
//           {/* Right side - Auth buttons */}

// <div className="flex items-center space-x-4">
//         <a
//           src="http://localhost:5173/auth"
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
//         >
//           Sign Up
//         </a>

//         <Link
//           to="http://localhost:5173/auth"
//           className="bg-gray-100 text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors duration-300"
//         >
//           Login
//         </Link>

//         <Link
//           to="/about.jsx"
//           className="bg-transparent text-gray-700 px-4 py-2 rounded-lg hover:text-blue-600 hover:bg-gray-100 transition-colors duration-300"
//         >
//           About
//         </Link>

//           <div className="flex items-center"> {}
//           </div>
//         </div>
//       </div>
            

//     </nav>
//   );
// };

// export default Navbar;


import React from "react";
import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo + App Name */}
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-scissors text-2xl text-blue-600 hover:text-blue-800 transition-colors duration-300"></i>
            <Link
              to="/"
              className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300"
            >
              Shortly
            </Link>
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-4">
            
           

            {/* Login */}
            <a
              href="http://localhost:5173/auth"
              className="bg-gray-100 text-blue-600 px-4 py-2 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors duration-300"
            >
              Login
            </a>

            {/* About */}
            <Link
              to="http://localhost:5173/about"
              className="bg-transparent text-gray-700 px-4 py-2 rounded-lg hover:text-blue-600 hover:bg-gray-100 transition-colors duration-300"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
