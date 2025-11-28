// import React, { useState } from 'react'
// import LoginForm from '../components/LoginForm'
// import RegisterForm from '../components/RegisterForm'

// const AuthPage = () => {

//     const [login, setLogin] = useState(true)

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//             {login ? <LoginForm state={setLogin} /> : <RegisterForm state={setLogin} />}
//         </div>
//     )
// }

// export default AuthPage


import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import ForgotPassword from '../components/ForgotPassword'; // Import the new component

const VIEWS = {
    LOGIN: 'login',
    REGISTER: 'register',
    FORGOT_PASSWORD: 'forgotPassword'
};

const AuthPage = () => {
    // Use a string state to manage the current view (login, register, or forgotPassword)
    const [authView, setAuthView] = useState(VIEWS.LOGIN);

    const renderView = () => {
        switch (authView) {
            case VIEWS.LOGIN:
                return (
                    // Pass explicit handlers for navigation
                    <LoginForm
                        onRegisterClick={() => setAuthView(VIEWS.REGISTER)}
                        onForgotPasswordClick={() => setAuthView(VIEWS.FORGOT_PASSWORD)}
                    />
                );
            case VIEWS.REGISTER:
                return (
                    // Assuming RegisterForm takes an onLoginClick prop
                    <RegisterForm onLoginClick={() => setAuthView(VIEWS.LOGIN)} />
                );
            case VIEWS.FORGOT_PASSWORD:
                return (
                    // Pass a function to switch back to the login view
                    <ForgotPassword onBackToLogin={() => setAuthView(VIEWS.LOGIN)} />
                );
            default:
                // Default to login view
                return (
                    <LoginForm
                        onRegisterClick={() => setAuthView(VIEWS.REGISTER)}
                        onForgotPasswordClick={() => setAuthView(VIEWS.FORGOT_PASSWORD)}
                    />
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            {renderView()}
        </div>
    );
}

export default AuthPage;
