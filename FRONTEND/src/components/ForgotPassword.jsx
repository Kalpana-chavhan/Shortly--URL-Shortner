

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Mail, Smartphone, Lock, CheckCircle, RotateCcw, KanbanSquare, BookHeadphonesIcon, BathIcon, YoutubeIcon, PoundSterling } from 'lucide-react';
import { UNSAFE_hydrationRouteProperties } from 'react-router-dom';
import { hydrate, notifyManager } from '@tanstack/react-query';


const TIMER_DURATION = 60; 


const simulateLatency = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));


const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const COUNTRY_CODES = [
  { code: '+1', name: 'USA/Canada' },
  { code: '+44', name: 'UK' },
  { code: '+91', name: 'India' },
  { code: '+49', name: 'Germany' },
  { code: '+81', name: 'Japan' },
];

const App = () => {
  const [step, setStep] = useState('input'); 
  
  
  const [selectionType, setSelectionType] = useState('email'); 
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  
  
  const [otp, setOtp] = useState('');
  const [resetToken, setResetToken] = useState(null); 
  const [timer, setTimer] = useState(0); 
  
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }
  const [isLoading, setIsLoading] = useState(false);

  const [mockServerData, setMockServerData] = useState({
    identifier: null,
    otp: null,
    expiry: 0,
    token: null,
  });

  const currentIdentifier = useMemo(() => {
    if (selectionType === 'email') {
      return email;
    }
    if (selectionType === 'mobile') {
      return `${countryCode}${mobile}`;
    }
    return '';
  }, [selectionType, email, mobile, countryCode]);

  useEffect(() => {
    let interval = null;
    if (timer > 0 && step === 'verify') {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && step === 'verify') {
      clearInterval(interval);
      // Only show error if the OTP hasn't been successfully verified yet
      if (mockServerData.otp) {
        setMessage({ type: 'error', text: 'OTP expired. Please request a new code.' });
      }
    }
    return () => clearInterval(interval);
  }, [timer, step, mockServerData.otp]);

  const resetFormState = useCallback(() => {
    setEmail('');
    setMobile('');
    setOtp('');
    setNewPassword('');
    setConfirmPassword('');
    setResetToken(null);
    setMessage(null);
    setIsLoading(false);
    setTimer(0);
    setStep('input');
    setMockServerData({
      identifier: null,
      otp: null,
      expiry: 0,
      token: null,
    });
    console.log("Simulating navigation: User is returning to the main login screen.");
  }, []);


  const handleRequestOtp = async (e) => {
    if (e) e.preventDefault();
    if (isLoading) return;

    let identifier = '';
    
    if (selectionType === 'email') {
      if (!email || !email.includes('@')) {
        setMessage({ type: 'error', text: 'Please enter a valid email address.' });
        return;
      }
      identifier = email;
    } else {
      if (!mobile || mobile.length < 6) {
        setMessage({ type: 'error', text: 'Please enter a valid mobile number.' });
        return;
      }
      identifier = `${countryCode}${mobile}`;
    }

    setIsLoading(true);
    setMessage(null);
    setTimer(0); 

    await simulateLatency(); 

    try {
      
      const generatedOtp = generateOtp();
      const expiryTime = Date.now() + TIMER_DURATION * 1000;

      setMockServerData({
        identifier: identifier,
        otp: generatedOtp,
        expiry: expiryTime,
        token: null, 
      });

      
      setStep('verify');
      setTimer(TIMER_DURATION); 
      setMessage({ 
        type: 'success', 
        
        text: `A new 6-digit OTP has been generated for ${identifier}. The code is: ${generatedOtp}.`
      });

    } catch (error) {
      console.error('OTP Request Error:', error);
      setMessage({ type: 'error', text: 'A network error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!otp || otp.length !== 6) {
      setMessage({ type: 'error', text: 'Please enter a valid 6-digit OTP.' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    await simulateLatency(); 

    try {
      const isExpired = Date.now() > mockServerData.expiry;
      const isIdentifierMatch = currentIdentifier === mockServerData.identifier;
      const isOtpMatch = otp === mockServerData.otp;

      if (!isIdentifierMatch || !mockServerData.otp) {
        setMessage({ type: 'error', text: 'Verification failed. Please request a new code.' });
        setOtp('');
      } else if (isExpired) {
        setMessage({ type: 'error', text: 'OTP expired. Please request a new code using the Resend button.' });
        setOtp('');
      } else if (isOtpMatch) {
        const mockToken = `RESET_TOKEN_${Math.random().toString(36).substring(2, 15)}`;
        setResetToken(mockToken);
        
        setMockServerData(prev => ({
            ...prev,
            otp: null, 
            token: mockToken,
        }));

        setStep('reset');
        setTimer(0); 
        setMessage({ type: 'success', text: 'Verification successful! You can now set a new password.' });
      } else {
        setMessage({ 
            type: 'error', 
            text: 'Verification failed. Invalid code. Please check the OTP or try resending.' 
        });
        setOtp(''); 
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      setMessage({ type: 'error', text: 'An error occurred during verification.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = (e) => {

      handleRequestOtp(e);
  };
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long.' });
      return;
    }
    // Check for the presence of the token granted in the previous step
    if (!resetToken || resetToken !== mockServerData.token || !mockServerData.token) {
        setMessage({ type: 'error', text: 'Missing or invalid security token. Please restart the process.' });
        return;
    }

    setIsLoading(true);
    setMessage(null);
    await simulateLatency(); 

    try {
      
      setMockServerData(prev => ({ ...prev, token: null })); 

      setStep('complete');
      setMessage({ type: 'success', text: 'Password successfully reset! You can now log in.' });
      
    } catch (error) {
      console.error('Password Reset Error:', error);
      setMessage({ type: 'error', text: 'A network error occurred during password reset.' });
    } finally {
      setIsLoading(false);
    }
  };

  

  const renderInputForm = () => (
    <form onSubmit={handleRequestOtp} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Forgot Password</h2>
      <p className="text-gray-600">
        Choose your recovery method and enter your details to receive a verification code.
      </p>

      
      <div className="flex bg-gray-200 rounded-lg p-1">
        <button
          type="button"
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition duration-200 ${
            selectionType === 'email' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-blue-500'
          }`}
          onClick={() => { setSelectionType('email'); setMessage(null); }}
        >
          <Mail className="w-4 h-4 inline-block mr-2" />
          Email
        </button>
        <button
          type="button"
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition duration-200 ${
            selectionType === 'mobile' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-blue-500'
          }`}
          onClick={() => { setSelectionType('mobile'); setMessage(null); }}
        >
          <Smartphone className="w-4 h-4 inline-block mr-2" />
          Mobile
        </button>
      </div>

      
      {selectionType === 'email' ? (
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              disabled={isLoading}
            />
          </div>
        </div>
      ) : (
        
        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <div className="flex space-x-2">
            
            <select
              id="countryCode"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out shadow-sm"
              disabled={isLoading}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.name})
                </option>
              ))}
            </select>
           
            <div className="relative rounded-lg shadow-sm flex-1">
              <input
                id="mobile"
                type="tel"
                inputMode="numeric"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))} // Only allow digits
                placeholder="Mobile number (e.g., 5551234)"
                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Sending Request...' : 'Request Verification Code'}
      </button>

      <a
        href="http://localhost:5173/auth"
        className="w-full text-center py-2 text-sm text-gray-500 border border-transparent hover:text-gray-700 transition duration-150 ease-in-out mt-2 block"
      >
        Cancel and Return to Login
      </a>
    </form>
  );

  const renderVerifyForm = () => (
    <form onSubmit={handleVerifyOtp} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Verify Code</h2>
      <p className="text-gray-600">
        A 6-digit verification code was generated for <strong className="text-gray-900">{currentIdentifier}</strong>. Please enter it below.
      </p>

      {/* OTP Input */}
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
          Verification Code
        </label>
        <div className="relative rounded-lg shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="otp"
            type="text"
            inputMode="numeric"
            maxLength="6"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
            placeholder="Enter 6-digit code"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-center tracking-widest transition duration-150 ease-in-out"
            disabled={isLoading}
          />
        </div>
      </div>

      
      <div className="flex justify-between items-center text-sm">
        {timer > 0 ? (
          <p className="text-gray-500">
            Code expires in: <span className="font-semibold text-blue-600">{timer}s</span>
          </p>
        ) : (
          <p className="text-red-500 font-medium">Code expired.</p>
        )}
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={isLoading || timer > 0}
          className={`font-medium transition duration-150 ${
            timer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          {isLoading ? 'Resending...' : 'Resend Code'}
        </button>
      </div>

      <button
        type="submit"
        disabled={isLoading || timer === 0 || !mockServerData.otp}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Verifying...' : 'Verify Code'}
      </button>

      <button
        type="button"
        onClick={() => { resetFormState(); }}
        className="w-full flex items-center justify-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out mt-4"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Start Over</span>
      </button>
    </form>
  );

  const renderResetForm = () => (
    <form onSubmit={handleResetPassword} className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Set New Password</h2>
      <p className="text-gray-600">
        Your identity is confirmed. Please enter and confirm your new password.
      </p>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
          New Password (Min 6 characters)
        </label>
        <input
          id="newPassword"
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out shadow-sm"
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out shadow-sm"
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );

  const renderCompleteScreen = () => (
    <div className="text-center p-8 space-y-4">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
      <h2 className="text-3xl font-bold text-gray-800">Success!</h2>
      <p className={`text-lg ${message.type === 'success' ? 'text-green-600' : 'text-gray-600'}`}>
        {message.text}
      </p>
      <button
        onClick={() => { resetFormState(); }}
        className="mt-6 inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
      >
        Go to Login
      </button>
    </div>
  );

  const renderForm = () => {
    switch (step) {
      case 'verify':
        return renderVerifyForm();
      case 'reset':
        return renderResetForm();
      case 'complete':
        return renderCompleteScreen();
      case 'input':
      default:
        return renderInputForm();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-xl shadow-2xl border border-gray-200">
        {/* Message Alert */}
        {message && (
          <div
            className={`p-4 mb-6 rounded-lg text-sm border font-medium ${
              message.type === 'success'
                ? 'bg-green-100 border-green-400 text-green-700'
                : 'bg-red-100 border-red-400 text-red-700'
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        {renderForm()}
      </div>
    </div>
  );
};

export default App;


