import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [authInfo, setAuthInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

      // Check if passwords match
      if (authInfo.password !== authInfo.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Register the user
      const registerRes = await axios.post(
        "http://localhost:5001/auth/register",
        {
          firstName: authInfo.firstName,
          lastName: authInfo.lastName,
          email: authInfo.email,
          password: authInfo.password,
        },
      );

      // Auto-login after successful registration
      const loginRes = await axios.post("http://localhost:5001/auth/login", {
        email: authInfo.email,
        password: authInfo.password,
      });

      const token = loginRes.data.token;
      const user = loginRes.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/profile");

      console.log("Registration and login successful:", { token, user });
    } catch (error) {
      setError(
        "Registration failed: " +
          (error?.response?.data?.message || error?.message),
      );
      console.error("Registration error:", error);
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
          <h2 className="text-3xl font-bold text-white mb-6">Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={authInfo.firstName}
              className="input-field"
              placeholder="Enter your first name"
              onChange={(e) =>
                setAuthInfo((prev) => ({
                  ...prev,
                  firstName: e.target.value,
                }))
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={authInfo.lastName}
              className="input-field"
              placeholder="Enter your last name"
              onChange={(e) =>
                setAuthInfo((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              required
            />
          </div>

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
              placeholder="Create a password"
              onChange={(e) =>
                setAuthInfo((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={authInfo.confirmPassword}
              className="input-field"
              placeholder="Confirm your password"
              onChange={(e) =>
                setAuthInfo((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
              required
            />
          </div>

          <button type="submit" className="w-full btn-primary">
            Sign Up
          </button>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-900/20 p-3 rounded-md">
              {error}
            </div>
          )}
        </form>

        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-teal-400 hover:text-teal-300">
              Sign In
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

export default SignUp;
