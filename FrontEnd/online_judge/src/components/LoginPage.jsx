import { useState } from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
=======
import { Link } from "react-router-dom";
>>>>>>> 6cf0a87c67f0683187bbb8ad2c818981437ac3a1
import { login } from "../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> 6cf0a87c67f0683187bbb8ad2c818981437ac3a1

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login(email, password);
      // Handle successful login (e.g., store token, redirect user)
<<<<<<< HEAD
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/home");
=======
>>>>>>> 6cf0a87c67f0683187bbb8ad2c818981437ac3a1
      console.log("Login successful:", response);
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md space-y-8 p-10 bg-gray-800 rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold">Welcome!</h2>
          <p className="mt-2 text-sm">
            Access your account in seconds. Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-500 hover:text-blue-400"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-200"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-500 hover:text-blue-400"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in to your account
            </button>
          </div>
          <div className="flex items-center justify-center mt-6">
            <button className="w-full bg-white text-gray-900 font-semibold py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google logo"
                className="h-5 w-5 mr-2"
              />
              Sign in with Google
            </button>
          </div>
          <div className="flex items-center justify-center mt-2">
            <button className="w-full bg-white text-gray-900 font-semibold py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center">
              <img
                src="https://www.svgrepo.com/show/69341/apple-logo.svg"
                alt="Apple logo"
                className="h-5 w-5 mr-2"
              />
              Sign in with Apple
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
