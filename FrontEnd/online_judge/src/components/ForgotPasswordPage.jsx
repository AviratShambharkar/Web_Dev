import { useState } from "react";
import { forgotPassword } from "../services/authService";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleForgotPasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await forgotPassword(email);
      setSuccess("Password reset link sent to your email.");
      setError(null);
      console.log("Forgot password successful:", response);
    } catch (err) {
      setError("Error sending password reset email.");
      setSuccess(null);
      console.error("Forgot password error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold">Forgot Password</h2>
          <p className="mt-2 text-sm">
            Enter your email address to reset your password.
          </p>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{success}</div>}
        <form className="mt-8 space-y-6" onSubmit={handleForgotPasswordSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="forgot-password-email" className="sr-only">
                Email address
              </label>
              <input
                id="forgot-password-email"
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
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send reset link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
