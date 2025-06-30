
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
      return;
    }

    // Get user info from localStorage
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setUserInfo(user);
      } catch (error) {
        console.error("Error parsing user data:", error);
        navigate("/signin");
      }
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const logOutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  if (!userInfo) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 h-32"></div>

          {/* Profile content */}
          <div className="relative px-8 pb-8">
            {/* Avatar and basic info */}
            <div className="flex items-end -mt-16 mb-6">
              <div className="w-24 h-24 bg-gray-700 rounded-full border-4 border-gray-800 overflow-hidden">
                <img
                  src="https://cataas.com/cat/cute?width=96&height=96"
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-6 pb-2">
                <h2 className="text-2xl font-bold text-white">
                  {userInfo.firstName} {userInfo.lastName}
                </h2>
                <p className="text-gray-400">@{userInfo.email.split('@')[0]}</p>
              </div>
            </div>

            {/* Profile details grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-teal-400 mb-3">
                    Personal Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email</span>
                      <span className="text-white">{userInfo.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">First Name</span>
                      <span className="text-white">{userInfo.firstName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Name</span>
                      <span className="text-white">{userInfo.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Joined</span>
                      <span className="text-white">
                        {userInfo.createdAt 
                          ? new Date(userInfo.createdAt).toLocaleDateString() 
                          : "Recently"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-teal-400 mb-3">
                    Account Settings
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition duration-200">
                      Edit Profile
                    </button>
                    <button
                      className="w-full btn-primary"
                      onClick={logOutUser}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold text-teal-400 mb-3">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-white">Account created</span>
                  <span className="text-gray-400 text-sm">
                    {userInfo.createdAt 
                      ? new Date(userInfo.createdAt).toLocaleDateString() 
                      : "Recently"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-white">Profile updated</span>
                  <span className="text-gray-400 text-sm">Today</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-white">Last login</span>
                  <span className="text-gray-400 text-sm">Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
