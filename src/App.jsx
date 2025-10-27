import React, { useState } from 'react';

// --- Login Form Component ---
function LoginForm({ onToggleView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      console.log('Login successful:', data);
      setMessage('Login successful! Token: ' + data.token);
      // In a real app: localStorage.setItem('token', data.token);
      // and redirect: window.location.href = '/dashboard';

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Please enter your details to log in.
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        {error && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-md">
            {error}
          </div>
        )}
        {message && (
          <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-300 rounded-md">
            {message}
          </div>
        )}

        {/* --- FIX: Removed the extra password/confirm password fields --- */}
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">Email Address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            {/* --- FIX: Changed id and autoComplete for login password --- */}
            <label htmlFor="password-login" className="sr-only">Password</label>
            <input
              id="password-login"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <label htmlFor="remember-me" className="block ml-2 text-gray-900">
              Remember me
            </label>
          </div>
          <div className="font-medium text-indigo-600 hover:text-indigo-500">
            <a href="#">Forgot password?</a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Signing in...' : 'Log In'}
          </button>
        </div>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        Don't have an account?{' '}
        <button onClick={onToggleView} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
          Sign up
        </button>
      </p>
    </div>
  );
}

// --- Register Form Component (This was missing) ---
function RegisterForm({ onToggleView }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError(null);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      console.log('Registration successful:', data);
      setMessage('Registration successful! Please log in.');
      // Automatically switch to login view after successful registration
      setTimeout(() => {
        onToggleView();
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Create an Account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Sign up to get started.
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleRegister}>
        {error && (
          <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-md">
            {error}
          </div>
        )}
        {message && (
          <div className="p-3 text-sm text-green-800 bg-green-100 border border-green-300 rounded-md">
            {message}
          </div>
        )}

        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label htmlFor="name" className="sr-only">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email-address-reg" className="sr-only">Email Address</label>
            <input
              id="email-address-reg"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password-reg" className="sr-only">Password</label>
            <input
              id="password-reg"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className="relative block w-full px-3 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </div>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        Already have an account?{' '}
        <button onClick={onToggleView} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
          Log in
        </button>
      </p>
    </div>
  );
}


// --- Main App Component ---
export default function App() {
  const [view, setView] = useState('login'); // Can be 'login' or 'register'

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      {view === 'login' ? (
        <LoginForm onToggleView={() => setView('register')} />
      ) : (
        <RegisterForm onToggleView={() => setView('login')} />
      )}
    </div>
  );
}

