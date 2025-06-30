import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");

      if (token && userString) {
        try {
          const user = JSON.parse(userString);
          setIsAuthenticated(true);
          setUserInfo(user);
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsAuthenticated(false);
          setUserInfo(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserInfo(null);
      }
    };

    checkAuthStatus();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserInfo(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/coders-app-nav.png"
                  alt="Coders App"
                  className="h-8 w-auto mr-3"
                />
                <span className="text-xl font-bold text-teal-400">
                  Coders App
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-lime-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Home
              </Link>
              <Link
                to="/challenges"
                className="text-gray-300 hover:text-lime-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Challenges
              </Link>
              <Link
                to="/leaderboard"
                className="text-gray-300 hover:text-lime-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Leaderboard
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-300 hover:text-lime-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/workspace"
                    className="text-gray-300 hover:text-lime-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Workspace
                  </Link>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">
                      Welcome, {userInfo?.firstName}!
                    </span>
                    <button
                      onClick={handleLogout}
                      className="btn-secondary text-sm"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-300 hover:text-lime-400 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary hover:text-lime-400 text-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2025 <span className="text-lime-400">Coders App</span> by{" "}
              <span className="text-lime-400">mrKevler</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
