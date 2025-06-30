import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const res = await axios.post("http://localhost:5001/auth/login", {
        ...authInfo,
      });

      const token = res.data.token;
      const user = res.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/profile");

      console.log("Login successful:", { token, user });
    } catch (error) {
      setError(
        "Login failed: " + (error?.response?.data?.message || error?.message),
      );
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <img
            src="/coders-app-logo.png"
            alt="Coders App"
            className="mx-auto h-20 w-auto mb-8"
          />
          <h2 className="text-3xl font-bold text-white mb-6">Sign In</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={authInfo.email}
              className="input-field"
              placeholder="Enter your email"
              onChange={(e) =>
                setAuthInfo((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={authInfo.password}
              className="input-field"
              placeholder="Enter your password"
              onChange={(e) =>
                setAuthInfo((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
            />
          </div>

          <button type="submit" className="w-full btn-primary">
            Sign In
          </button>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-900/20 p-3 rounded-md">
              {error}
            </div>
          )}
        </form>

        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-teal-400 hover:text-teal-300">
              Sign Up
            </Link>
          </p>
          <br />
          <p className="text-gray-400">
            Go back to{" "}
            <Link to="/" className="text-teal-400 hover:text-teal-300">
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
