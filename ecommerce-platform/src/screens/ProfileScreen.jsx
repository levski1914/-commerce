import React from "react";
import { useSelector } from "react-redux";

const ProfileScreen = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {userInfo ? (
        <div>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          <p>Role: {userInfo.isAdmin ? "Admin" : "User"}</p>
        </div>
      ) : (
        <p>No user info available.</p>
      )}
    </div>
  );
};

export default ProfileScreen;
