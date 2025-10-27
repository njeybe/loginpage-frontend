import React, { useState } from 'react';

// --- Main App Component ---
export default function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // 'idle', 'loading', 'success', 'error'
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (event) => {
        // 1. Prevent the form from submitting the traditional way
        event.preventDefault();

        // 2. Show loading state
        setStatus('loading');
        setMessage('');

        // 
        // --- THIS IS WHERE YOU CONNECT TO YOUR BACKEND ---
        //
        try {
            // 3. Create the API request
            //    Replace 'http://localhost:5000/api/auth/login' with your actual backend endpoint
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // 4. Handle successful login
                setStatus('success');
                setMessage('Login successful! Redirecting...');
                // e.g., save the token: localStorage.setItem('token', data.token);
                // and redirect (in React, you'd use React Router's useNavigate)
                console.log('Success:', data);
                
            } else {
                // 5. Handle login failure (e.g., wrong password)
                setStatus('error');
                setMessage(data.message || 'Login failed. Please check your credentials.');
            }

        } catch (error) {
            // 6. Handle network or server errors
            console.error('Login error:', error);
            setStatus('error');
            setMessage('An error occurred. Please try again later.');
        
        }
    };

    // Helper to determine message styles
    const getMessageStyles = () => {
        if (status === 'success') {
            return 'bg-green-100 text-green-700';
        }
        if (status === 'error') {
            return 'bg-red-100 text-red-700';
        }
        return '';
    };

    return (
        <div className="bg-gray-100 font-sans antialiased">
            {/* Main Container */}
            <div className="min-h-screen flex items-center justify-center p-4">
                
                {/* Login Card */}
                <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">
                    
                    {/* Header */}
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-center text-gray-600 mb-8">
                        Please enter your details to log in.
                    </p>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit}>
                        
                        {/* Email Input */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                disabled={status === 'loading'}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
                                    Forgot?
                                </a>
                            </div>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                disabled={status === 'loading'}
                            />
                        </div>
                        
                        {/* Status Message Area (for errors or success) */}
                        {message && (
                            <div className={`text-sm text-center mb-4 p-3 rounded-lg ${getMessageStyles()}`}>
                                {message}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-sm text-gray-600 mt-8">
                        Don't have an account? 
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
                            Sign up
                        </a>
                    </p>

                </div>
                {/* End Login Card */}
            </div>
        </div>
    );
}
