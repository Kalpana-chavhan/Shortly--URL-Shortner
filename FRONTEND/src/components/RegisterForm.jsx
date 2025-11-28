// import React, { useState } from 'react';
// import { registerUser } from '../api/user.api';
// import { useDispatch } from 'react-redux';
// import { login } from '../store/slice/authSlice';
// import { useNavigate } from '@tanstack/react-router';

// const RegisterForm = ({state}) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault();    
    
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }
    
//     setLoading(true);
//     setError('');
    
//     try {
//       const data = await registerUser(name, password, email);
//       setLoading(false);
//       dispatch(login(data.user))
//       navigate({to:"/dashboard"})
//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       setError(err.message || 'Registration failed. Please try again.');
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}
        
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//             Full Name
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="name"
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//             Email
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="email"
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//             Password
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="password"
//             type="password"
//             placeholder="******************"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             minLength={6}
//           />
//         </div>
    
        
//         <div className="flex items-center justify-between">
//           <button
//             className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             type="submit"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? 'Creating...' : 'Create Account'}
//           </button>
//         </div>
        
//         <div className="text-center mt-4">
//           <p className="cursor-pointer text-sm text-gray-600">
//             Already have an account? <span onClick={()=>state(true)} className="text-blue-500 hover:text-blue-700">Sign In</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm


import React, { useState } from 'react';
// Assuming useDispatch and useNavigate are imported from react-redux and react-router-dom, respectively.
// And registerUser and login are imported from your services/actions.

// The 'state' prop is the setter function (e.g., setShowLogin) passed from the parent component.
const RegisterForm = ({ state }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Placeholder definitions for imports not provided in the snippet
  const dispatch = (action) => console.log('Dispatching:', action);
  const navigate = () => console.log('Navigating to dashboard');
  const login = (user) => ({ type: 'LOGIN', payload: user });
  const registerUser = async (name, password, email) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { user: { id: Date.now(), name, email } };
  };
  
  // NOTE: If you are using actual redux/router, replace the placeholders above
  // with your real imports:
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await registerUser(name, password, email);
      setLoading(false);
      dispatch(login(data.user));
      
      // Changed navigate to a function call if using react-router's useNavigate
      // The destination should be the path string, not an object.
      // navigate("/dashboard"); 
      console.log("Navigating to dashboard...");
      
    } catch (err) {
      setLoading(false);
      // In a real app, use err.message if available
      const message = err.message || 'Registration failed. Please try again.';
      setError(message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8">
      {/* CRITICAL FIX: Changed the outer <div> to a <form> element 
        to correctly handle the onSubmit event for accessibility and standard HTML behavior.
      */}
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-8 space-y-6 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Create Your Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm transition-all duration-300">
            {error}
          </div>
        )}
        
        {/* Full Name Field */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-medium" htmlFor="name">
            Full Name
          </label>
          <input
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
            id="name"
            type="text"
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-medium" htmlFor="email">
            Email Address
          </label>
          <input
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
            id="password"
            type="password"
            placeholder="••••••••••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <p className="text-xs text-gray-500 pt-1">Must be at least 6 characters long.</p>
        </div>
    
        <div className="flex items-center justify-between pt-2">
          <button
            className={`
              bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg 
              focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 
              w-full transition-all duration-300 shadow-md transform hover:scale-[1.01]
              ${loading ? 'opacity-70 cursor-not-allowed shadow-none' : 'shadow-blue-500/50'}
            `}
            type="submit"
            // Removed redundant onClick={handleSubmit} as the <form onSubmit={handleSubmit}> handles it
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Create Account'
            )}
          </button>
        </div>
        
        
      </form>
    </div>
  );
};

export default RegisterForm;
