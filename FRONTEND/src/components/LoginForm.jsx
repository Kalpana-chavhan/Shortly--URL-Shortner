// import React, { useState } from 'react';
// import { loginUser } from '../api/user.api';
// import {useDispatch, useSelector} from 'react-redux';
// import { login } from '../store/slice/authSlice.js';
// import { useNavigate } from '@tanstack/react-router';

// const LoginForm = ({ state }) => {
//     const [email, setEmail] = useState('kalpnachauhan347@gmail.com');
//     const [password, setPassword] = useState('password347');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const auth = useSelector((state) => state.auth)
//     console.log(auth)

//     const handleSubmit = async () => {
//         setLoading(true);
//         setError('');

//         try {
//             const data = await loginUser(password, email);
//             dispatch(login(data.user))
//             navigate({to:"/dashboard"})
//             setLoading(false);
//             console.log("signin success")
//         } catch (err) {
//             setLoading(false);
//             setError(err.message || 'Login failed. Please check your credentials.');
//         }
//     };

//     return (
//         <div className="w-full max-w-md mx-auto">
//             <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                 <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

//                 {error && (
//                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//                         {error}
//                     </div>
//                 )}

//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                         Email
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="email"
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="mb-6">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                         Password
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="password"
//                         type="password"
//                         placeholder="******************"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="flex items-center justify-between">
//                     <button
//                         className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         type="submit"
//                         onClick={handleSubmit}
//                         disabled={loading}
//                     >
//                         {loading ? 'Signing in...' : 'Sign In'}
//                     </button>
//                 </div>

//                 <div className="text-center mt-4">
//                     <p className="cursor-pointer text-sm text-gray-600">
//                         Don't have an account? <span onClick={() => state(false)} className="text-blue-500 hover:text-blue-700">Register</span>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginForm;






// import React, { useState } from 'react';
// import { loginUser } from '../api/user.api';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../store/slice/authSlice.js';
// import { useNavigate } from '@tanstack/react-router';

// const LoginForm = ({ state }) => {
//     const [email, setEmail] = useState('kalpnachauhan347@gmail.com');
//     const [password, setPassword] = useState('password347');
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const auth = useSelector((state) => state.auth);
//     console.log(auth);

//     const handleSubmit = async () => {
//         setLoading(true);
//         setError('');

//         try {
//             const data = await loginUser(password, email);
//             dispatch(login(data.user));
//             navigate({ to: "/dashboard" });
//             setLoading(false);
//             console.log("signin success");
//         } catch (err) {
//             setLoading(false);
//             setError(err.message || 'Login failed. Please check your credentials.');
//         }
//     };

//     // New handler for the Forgot Password link
//     const handleForgotPassword = () => {
//         // TODO: Implement logic to navigate to the "Forgot Password" page
//         // or open a modal. For example:
//         // navigate({ to: "/forgot-password" });
//         console.log("Forgot Password clicked! Implement navigation here.");
//     };

//     return (
//         <div className="w-full max-w-md mx-auto">
//             <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//                 <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

//                 {error && (
//                     <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//                         {error}
//                     </div>
//                 )}

//                 <div className="mb-4">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//                         Email
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="email"
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className="mb-6">
//                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//                         Password
//                     </label>
//                     <input
//                         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         id="password"
//                         type="password"
//                         placeholder="******************"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
                    
                    
//                     <div className="flex justify-center mt-1">
//                         <a
//                             href="FRONTEND\src\components\ForgotPassword.jsx" 
//                             className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
//                             onClick={(e) => {
//                                 e.preventDefault(); // Prevent default link behavior
//                                 handleForgotPassword();
//                             }}
//                         >
//                             Forgot Password?
//                         </a>
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                     <button
//                         className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         type="submit"
//                         onClick={handleSubmit}
//                         disabled={loading}
//                     >
//                         {loading ? 'Signing in...' : 'Sign In'}
//                     </button>
//                 </div>

//                 <div className="text-center mt-4">
//                     <p className="cursor-pointer text-sm text-gray-600">
//                         Don't have an account? <span onClick={() => state(false)} className="text-blue-500 hover:text-blue-700">Register</span>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginForm;


import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

// Renamed 'state' to 'onRegisterClick' and added 'onForgotPasswordClick'
const LoginForm = ({ onRegisterClick, onForgotPasswordClick }) => {
    const [email, setEmail] = useState('abc@gmail.com');
    const [password, setPassword] = useState('password347');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    console.log(auth);

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            // Note: Replace with actual API call in a production environment
            const data = await loginUser(password, email);
            dispatch(login(data.user));
            // Note: Replace with actual navigation logic
            navigate({ to: "/dashboard" }); 
            setLoading(false);
            console.log("signin success");
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    // Handler that calls the prop function to switch the view in AuthPage to 'forgotPassword'
    const handleForgotPassword = () => {
        onForgotPasswordClick();
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <div className="flex justify-center mt-1">
                        <a
                            href="#" 
                            className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
                            onClick={(e) => {
                                e.preventDefault();
                                handleForgotPassword(); // Trigger the view change
                            }}
                        >
                            Forgot Password?
                        </a>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>

                <div className="text-center mt-4">
                    <p className="cursor-pointer text-sm text-gray-600">
                        Don't have an account? 
                        <span onClick={onRegisterClick} className="text-blue-500 hover:text-blue-700">Register</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
